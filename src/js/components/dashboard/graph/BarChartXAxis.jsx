/**
 * BarChartXAxis.jsx
 * Created by Lizzie Salita 11/15/19
 */

import React from 'react';
import PropTypes from 'prop-types';

import BarChartXAxisItem from './BarChartXAxisItem';

const propTypes = {
    title: PropTypes.string,
    description: PropTypes.string,
    items: PropTypes.array,
    line: PropTypes.object,
    lineGroup: PropTypes.object,
    labelGroup: PropTypes.object
};

export default class BarChartXAxis extends React.Component {
    render() {
        const timePeriodLabels = [];
        this.props.items.forEach((yearItem) => {
            yearItem.timePeriodItems.forEach((periodItem) => (
                timePeriodLabels.push(
                    <BarChartXAxisItem
                        key={`${yearItem.value} ${periodItem.value}`}
                        label={periodItem.label}
                        x={periodItem.x}
                        y={periodItem.y} />
                )
            ));
        });
        const yearLines = this.props.items.map((item) => (
            <line
                key={item.value}
                className="x-axis"
                x1={item.startX}
                x2={item.endX}
                y1={40}
                y2={40} />
        ));
        const yearLabels = this.props.items.map((yearItem) => (
            <BarChartXAxisItem
                key={yearItem.value}
                label={`FY ${yearItem.label}`}
                x={yearItem.x}
                y={yearItem.y} />
        ));

        return (
            <g className="bar-axis">
                <title>{this.props.title}</title>
                <desc>{this.props.description}</desc>
                <g transform={`translate(${this.props.lineGroup.x}, ${this.props.lineGroup.y})`}>
                    <line
                        className="x-axis"
                        x1={this.props.line.x1}
                        x2={this.props.line.x2}
                        y1={this.props.line.y1}
                        y2={this.props.line.y2} />
                </g>
                <g
                    className="axis-labels"
                    transform={`translate(${this.props.labelGroup.x},${this.props.labelGroup.y})`}>
                    {timePeriodLabels}
                </g>
                <g transform={`translate(${this.props.lineGroup.x}, ${this.props.lineGroup.y})`}>
                    {yearLines}
                </g>
                <g
                    className="axis-labels"
                    transform={`translate(${this.props.labelGroup.x},${this.props.labelGroup.y})`}>
                    {yearLabels}
                </g>
            </g>
        );
    }
}

BarChartXAxis.propTypes = propTypes;
