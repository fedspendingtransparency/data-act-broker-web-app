/**
 * BarChartStacked.jsx
 * Created by Lizzie Salita 11/15/19
 */

import React from 'react';
import PropTypes from 'prop-types';
import { scaleLinear, scaleOrdinal } from 'd3-scale';
import { max, isEqual, cloneDeep } from 'lodash';
import { formatNumberWithPrecision } from 'helpers/moneyFormatter';
import { calculateLegendOffset } from 'helpers/stackedBarChartHelper';

import BarChartXAxis from 'components/dashboard/graph/BarChartXAxis';
import BarChartYAxis from 'components/dashboard/graph/BarChartYAxis';
import BarChartLegend from './BarChartLegend';
import StackedBarGroup from './StackedBarGroup';

/* eslint-disable react/no-unused-prop-types */
// allow unused prop types. they are indirectly accessed as nextProps
const propTypes = {
    xSeries: PropTypes.arrayOf(PropTypes.string),
    ySeries: PropTypes.arrayOf(PropTypes.object),
    allY: PropTypes.object,
    height: PropTypes.number,
    width: PropTypes.number,
    padding: PropTypes.object,
    legend: PropTypes.array,
    showTooltip: PropTypes.func,
    hideTooltip: PropTypes.func,
    toggleTooltip: PropTypes.func,
    spaceBetweenStacks: PropTypes.number,
    hovered: PropTypes.string
};
/* eslint-enable react/no-unused-prop-types */

const defaultProps = {
    padding: {
        left: 70,
        bottom: 50,
        right: 80
    },
    spaceBetweenStacks: 0
};

export default class BarChartStacked extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            chartReady: false,
            virtualChart: {},
            filteredRules: []
        };

        this.legendClicked = this.legendClicked.bind(this);
    }

    componentDidMount() {
        this.buildVirtualChart(this.props);
    }

    componentDidUpdate(prevProps) {
        if (!isEqual(prevProps.xSeries, this.props.xSeries) ||
            !isEqual(prevProps.ySeries, this.props.ySeries) ||
            prevProps.width !== this.props.width ||
            prevProps.height !== this.props.height) {
            this.buildVirtualChart(this.props);
        }
    }

    buildVirtualChart(props) {
        const values = {
            width: props.width,
            height: props.height,
            allY: cloneDeep(props.allY),
            xSeries: props.xSeries,
            ySeries: cloneDeep(props.ySeries),
            stacks: props.legend
        };

        // loop through all the filtered rules
        for (let filteredKey = 0; filteredKey < this.state.filteredRules.length; filteredKey++) {
            const currRule = this.state.filteredRules[filteredKey];
            // loop through each bar in the chart
            for (let seriesKey = 0; seriesKey < values.ySeries.length; seriesKey++) {
                const keys = Object.keys(values.ySeries[seriesKey]);
                // if the bar includes the filtered rule, filter it out
                if (keys.includes(currRule)) {
                    const barVal = values.ySeries[seriesKey][currRule].value;
                    const barTop = values.ySeries[seriesKey][currRule].top;

                    values.allY.shownWarnings[seriesKey] -= barVal;
                    delete values.ySeries[seriesKey][currRule];
                    // clean up the top/bottom of the remaining bar sections
                    for (const barKey in values.ySeries[seriesKey]) {
                        if (Object.prototype.hasOwnProperty.call(values.ySeries[seriesKey], barKey)) {
                            // make sure the shown warnings are filtered down as well
                            values.ySeries[seriesKey][barKey].shownWarnings -= barVal;
                            // move the bar section if it was above the old one
                            if (values.ySeries[seriesKey][barKey].bottom >= barTop) {
                                values.ySeries[seriesKey][barKey].bottom -= barVal;
                                values.ySeries[seriesKey][barKey].top -= barVal;
                            }
                        }
                    }
                }
            }
        }

        // calculate what the visible area of the chart itself will be (excluding the axes and their
        // labels)
        values.graphHeight = values.height - props.padding.bottom;
        values.graphWidth = values.width - props.padding.left - props.padding.right;
        values.padding = props.padding;

        // build a virtual representation of the chart first
        // when we actually draw the chart, we won't need to do any more calculations

        // calculate the Y axis range
        const yRange = [0, max(values.allY.shownWarnings)];
        if (values.allY.shownWarnings.length === 1) {
            yRange[0] = 0;
        }

        // build the D3 scale objects for each axis
        // remember, in D3 scales, domain is the data range (or data set for non-continuous data)
        // and range is the range of possible pixel positions along the axis
        // put 20px padding on each side of the group with a minimum width of 66px

        // Calculating the column values given the weights of each bar (depending on period/quarter)
        const maxWidth = 150;
        const xWeights = values.xSeries.map((period) => {
            // Merged P01-P02 is scaled to two-thirds
            if (period.includes('-')) {
                return (2 / 3);
            }
            // Periods are scaled to a third
            else if (period.includes('P')) {
                return (1 / 3);
            }
            // Quarters are unchanged
            return 1;
        });
        let rangeMap = xWeights.map((weight) => weight * (values.graphWidth / xWeights.length));
        const maxCalculatedWidth = Math.max(...rangeMap);

        // Use the normal calculation when the screen is small; otherwise, enforce the maxwidth
        if (maxCalculatedWidth > maxWidth) {
            const descaleFactor = ((maxCalculatedWidth - maxWidth) / maxCalculatedWidth);
            rangeMap = rangeMap.map((barWidth) => barWidth - (barWidth * descaleFactor));
        }

        values.xScale = scaleOrdinal()
            .domain(values.xSeries)
            .range(rangeMap);

        // have an inverted range so that the yScale output returns the correct Y position within
        // the SVG element (y = 0 is the top of the graph)
        values.yScale = scaleLinear()
            .domain(yRange)
            .range([values.graphHeight, 0])
            .clamp(true);

        // now we need to build the X and Y axes
        const yAxis = this.buildVirtualYAxis(values);
        const xAxis = this.buildVirtualXAxis(values);

        // now build the chart body
        const body = this.buildVirtualBody(values);

        const chart = {
            yAxis,
            xAxis,
            body
        };

        this.setState({
            virtualChart: chart,
            chartReady: true
        });
    }

    buildVirtualYAxis(values) {
        const yAxis = {
            items: [],
            line: {
                x1: 0,
                x2: 0,
                y1: 0,
                y2: values.graphHeight
            },
            group: {
                x: values.padding.left,
                y: 0
            },
            title: 'Y-Axis'
        };

        // generate the tick marks
        const tickPoints = values.yScale.ticks(10);

        // Find the distance (in px) between tick marks
        let height = 1;
        if (tickPoints.length > 1) {
            const y1 = values.yScale(tickPoints[0]);
            const y2 = values.yScale(tickPoints[1]);
            height = Math.abs(y2 - y1) || 1;
        }

        // create ticks and grid lines at each point
        tickPoints.forEach((y) => {
            // create the label
            const labelText = formatNumberWithPrecision(y, 0);

            // set all the labels 10px left of the edge of Y axis
            // all labels should be 6px below the grid line
            const label = {
                text: labelText,
                x: -10,
                y: 6,
                value: y
            };

            // now create the gridline
            const gridLine = {
                x1: 0,
                x2: values.graphWidth,
                y1: 0,
                y2: 0,
                height,
                width: values.graphWidth,
                value: y
            };

            const item = {
                label,
                gridLine,
                x: values.padding.left,
                y: values.yScale(y)
            };
            yAxis.items.push(item);
        });

        yAxis.description = `The Y-axis of the chart, showing a range of values from \
${yAxis.items[0].label.text} to ${yAxis.items[yAxis.items.length - 1].label.text}.`;

        return yAxis;
    }

    buildVirtualXAxis(values) {
        const xAxis = {
            items: [],
            line: {
                x1: 0,
                x2: values.graphWidth,
                y1: 0,
                y2: 0
            },
            lineGroup: {
                x: values.padding.left,
                y: values.yScale(0)
            },
            labelGroup: {
                x: values.padding.left,
                y: values.graphHeight + 27
            },
            title: 'X-Axis'
        };

        // Calculate the same distance between each bar
        const totalBarsWidth = values.xSeries.reduce((a, b) => a + values.xScale(b), 0);
        const padding = (values.graphWidth - totalBarsWidth) / (values.xSeries.length + 1);

        // go through each X axis item and add a label
        let xPos = 0;
        values.xSeries.forEach((x) => {
            // we need to center the label within the bar width
            const barWidth = values.xScale(x);
            xPos += (padding + (barWidth / 2));

            const item = {
                label: x,
                value: x,
                y: 0,
                x: xPos
            };
            xAxis.items.push(item);
            xPos += (barWidth / 2);
        });

        xAxis.description = `The X-axis of the chart, showing a range of values from \
${xAxis.items[0].label} to ${xAxis.items[xAxis.items.length - 1].label}.`;

        return xAxis;
    }

    buildVirtualBody(values) {
        const body = {
            items: [],
            group: {
                x: values.padding.left,
                y: 0
            }
        };

        // Calculate the same distance between each bar
        const totalBarsWidth = values.xSeries.reduce((a, b) => a + values.xScale(b), 0);
        const padding = (values.graphWidth - totalBarsWidth) / (values.xSeries.length + 1);
        const minWidth = 10;

        let xPos = 0;
        values.xSeries.forEach((x, index) => {
            const y = values.ySeries[index];

            let barWidth = values.xScale(x);
            xPos += padding;
            barWidth = Math.max(barWidth, minWidth);

            const item = {
                xPos,
                xValue: x,
                stack: []
            };

            // iterate through each stacked item
            values.stacks.forEach((stack) => {
                // get the data for the stacked item
                const data = y[stack.label];
                let height = 0;
                let yPos = 0;
                if (data) {
                    // if this stack type is present in the current bar
                    // determine the Y position of the top of the bar
                    yPos = values.yScale(data.top);

                    // Don't leave padding below the first bar
                    const space = data.bottom === 0 ? 0 : this.props.spaceBetweenStacks;
                    // calculate height by getting the Y position of the bottom of
                    // the bar and taking the difference
                    const yPosBottom = values.yScale(data.bottom);
                    height = (yPosBottom - space) - yPos;
                    // prevent a negative height
                    height = height < 0 ? 0 : height;

                    // Get the midpoint of the stack for the tooltip position
                    const mid = yPos - ((yPos - yPosBottom) / 2);

                    // merge the positioning of the stacked item with its metadata
                    const element = Object.assign({}, stack, {
                        height,
                        width: barWidth,
                        x: 0,
                        y: yPos,
                        xValue: x,
                        value: data.value,
                        description: data.description,
                        tooltipData: {
                            ...data,
                            itemWidth: barWidth,
                            position: {
                                x: xPos + (barWidth / 2), // must be the middle of the bar
                                y: mid - 22 // subtract 22px to line up the pointer instead of the top of the tooltip
                            }
                        }
                    });
                    item.stack.push(element);
                }
            });

            // Moving the cursor passed the bar
            xPos += barWidth;

            // reverse the array so that the first elements are rendered last (in front)
            item.stack.reverse();

            // draw a bar for each item
            body.items.push(item);
        });

        return body;
    }

    legendClicked(label) {
        const currentFilters = [...this.state.filteredRules];
        if (!this.state.filteredRules.includes(label)) {
            currentFilters.push(label);
        }
        else {
            currentFilters.splice(currentFilters.indexOf(label), 1);
        }
        this.setState({
            filteredRules: currentFilters
        }, () => {
            this.buildVirtualChart(this.props);
        });
    }

    render() {
        // the chart hasn't been created yet, so don't render anything
        if (!this.state.chartReady) {
            return null;
        }
        const legendOffset = calculateLegendOffset(
            this.props.legend.length, // number of items in the legend
            this.props.height - this.props.padding.bottom // height of the graph
        );

        const body = this.state.virtualChart.body.items.map((item) => {
            let faded = false;
            if (this.props.hovered !== '' && this.props.hovered !== item.xValue) {
                faded = true;
            }
            return (
                <StackedBarGroup
                    {...item}
                    key={item.xValue}
                    showTooltip={this.props.showTooltip}
                    hideTooltip={this.props.hideTooltip}
                    toggleTooltip={this.props.toggleTooltip}
                    height={this.props.height}
                    faded={faded} />
            );
        });

        return (
            <div>
                <svg
                    className="bar-graph"
                    width={this.props.width}
                    height={this.props.height + 20}>
                    <BarChartYAxis
                        {...this.state.virtualChart.yAxis}
                        x={this.state.virtualChart.yAxis.group.x}
                        y={this.state.virtualChart.yAxis.group.y} />
                    <BarChartXAxis
                        {...this.state.virtualChart.xAxis} />
                    <g
                        className="bar-data"
                        transform={`translate(${this.state.virtualChart.body.group.x},\
                            ${this.state.virtualChart.body.group.y})`}>
                        {body}
                    </g>
                    <g
                        className="legend-container"
                        transform={`translate(${this.props.width - 68}, ${legendOffset})`}>
                        <BarChartLegend
                            legend={this.props.legend}
                            legendClicked={this.legendClicked}
                            filteredRules={this.state.filteredRules} />
                    </g>
                </svg>
            </div>
        );
    }
}

BarChartStacked.propTypes = propTypes;
BarChartStacked.defaultProps = defaultProps;
