/**
 * SignificanceGraph.jsx
 * Created by Lizzie Salita 3/27/20
 */

import React from 'react';
import PropTypes from 'prop-types';
import { scaleLinear, scaleLog } from 'd3-scale';
import { max, min, isEqual, startCase, cloneDeep } from 'lodash';
import { formatNumberWithPrecision } from 'helpers/moneyFormatter';
import { significanceColors } from 'dataMapping/dashboard/fileLabels';
import BarChartXAxis from 'components/dashboard/graph/BarChartXAxis';
import BarChartYAxis from 'components/dashboard/graph/BarChartYAxis';
import SignificanceCircle from './SignificanceCircle';

/* eslint-disable react/no-unused-prop-types */
// allow unused prop types. they are indirectly accessed as nextProps
const propTypes = {
    xSeries: PropTypes.arrayOf(PropTypes.number),
    ySeries: PropTypes.arrayOf(PropTypes.object),
    allY: PropTypes.object,
    height: PropTypes.number,
    width: PropTypes.number,
    padding: PropTypes.object,
    errorLevel: PropTypes.oneOf(['error', 'warning']).isRequired,
    showTooltip: PropTypes.func,
    hideTooltip: PropTypes.func,
    toggleTooltip: PropTypes.func,
    categories: PropTypes.arrayOf(PropTypes.oneOf(['accuracy', 'completeness', 'existence']))
};
/* eslint-enable react/no-unused-prop-types */

const defaultProps = {
    padding: {
        left: 90,
        bottom: 70,
        right: 20
    }
};

export default class SignificanceGraph extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            chartReady: false,
            virtualChart: {},
            logScale: false
        };
    }

    componentDidMount() {
        this.buildVirtualChart(this.props);
    }

    componentDidUpdate(prevProps) {
        if (!isEqual(prevProps.xSeries, this.props.xSeries) ||
            !isEqual(prevProps.ySeries, this.props.ySeries) ||
            prevProps.width !== this.props.width ||
            prevProps.height !== this.props.height ||
            prevProps.categories !== this.props.categories) {
            this.buildVirtualChart(this.props);
        }
    }

    buildVirtualChart(props) {
        const values = {
            width: props.width,
            height: props.height,
            allY: props.allY,
            xSeries: props.xSeries,
            ySeries: props.ySeries
        };

        // calculate what the visible area of the chart itself will be (excluding the axes and their
        // labels)
        values.graphHeight = values.height - props.padding.bottom;
        values.graphWidth = values.width - props.padding.left - props.padding.right;
        values.padding = props.padding;

        // build a virtual representation of the chart first
        // when we actually draw the chart, we won't need to do any more calculations

        // calculate the X and Y max value
        const yMax = max(values.allY);
        // add one for padding, it will be hidden by CSS
        const xMax = max(values.xSeries) + 1;

        // build the D3 scale objects for each axis
        // remember, in D3 scales, domain is the data range (or data set for non-continuous data)
        // and range is the range of possible pixel positions along the axis
        values.xScale = scaleLinear()
            .domain([0, xMax])
            .range([0, values.graphWidth])
            .clamp(true);

        // have an inverted range so that the yScale output returns the correct Y position within
        // the SVG element (y = 0 is the top of the graph)
        if (yMax < 1000) {
            values.yScale = scaleLinear()
                .domain([0, yMax])
                .range([values.graphHeight, 0])
                .clamp(true);
        }
        else {
            this.setState({ logScale: true });
            values.yScale = scaleLog()
                .domain([1, yMax])
                .range([values.graphHeight, 0])
                .base(2)
                .clamp(true);
        }


        // now we need to build the X and Y axes
        const yAxis = this.buildVirtualYAxis(values, yMax);
        const xAxis = this.buildVirtualXAxis(values, xMax);
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

    buildVirtualYAxis(values, yMax) {
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

        const numberOfTicks = min([9, yMax]);
        // generate the tick marks
        const tickPoints = values.yScale.ticks(numberOfTicks);

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

    buildVirtualXAxis(values, xMax) {
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

        const tickPoints = values.xScale.ticks(xMax + 1);

        // go through each X axis item and add a label
        tickPoints.forEach((x) => {
            const xPos = values.xScale(x);

            const item = {
                label: `${x}`,
                value: x,
                y: 13, // prevent overlap with circles near the bottom of the graph
                x: xPos // must be the middle of the circle
            };
            xAxis.items.push(item);
        });

        xAxis.description = `The X-axis of the chart, showing a range of values from \
${xAxis.items[0].label} to ${xAxis.items[xAxis.items.length - 1].label}.`;

        return xAxis;
    }

    buildVirtualBody(values) {
        let filteredData = cloneDeep(values.ySeries);
        if (this.props.categories.length < 3) {
            filteredData = filteredData.filter((rule) => this.props.categories.includes(rule.category));
        }
        return filteredData.map((rule) => ({
            color: significanceColors[rule.category],
            yPos: values.yScale(rule.instances),
            xPos: values.xScale(rule.significance),
            label: rule.label,
            xValue: rule.significance,
            yValue: rule.instances,
            category: rule.category,
            impact: rule.impact,
            percent: rule.percentage,
            totalInstances: rule.totalInstances
        }));
    }

    render() {
        // the chart hasn't been created yet, so don't render anything
        if (!this.state.chartReady) {
            return null;
        }

        const body = this.state.virtualChart.body.map((item) => (
            <SignificanceCircle
                {...item}
                key={item.label}
                showTooltip={this.props.showTooltip}
                hideTooltip={this.props.hideTooltip}
                toggleTooltip={this.props.toggleTooltip} />
        ));

        return (
            <svg
                className="bar-graph"
                width={this.props.width}
                height={this.props.height + 20}>
                <BarChartYAxis
                    {...this.state.virtualChart.yAxis}
                    x={this.state.virtualChart.yAxis.group.x}
                    y={this.state.virtualChart.yAxis.group.y} />
                <text
                    className="bar-graph__axis-label"
                    y={this.props.height / 2}
                    x="0"
                    textAnchor="middle"
                    dominantBaseline="central"
                    transform={`rotate(-90, 0,${this.props.height / 2} )`}>
                    Count of {startCase(this.props.errorLevel)} Instances{this.state.logScale ? ' (Logarithmic)' : ''}
                </text>
                <BarChartXAxis
                    {...this.state.virtualChart.xAxis} />
                <text
                    className="bar-graph__axis-label"
                    x={this.props.width / 2}
                    y={this.props.height + 10}
                    textAnchor="middle">
                    Rule Significance
                </text>
                <g className="significance-rules" transform={`translate(${this.props.padding.left}, 0)`}>
                    {body}
                </g>
            </svg>
        );
    }
}

SignificanceGraph.propTypes = propTypes;
SignificanceGraph.defaultProps = defaultProps;
