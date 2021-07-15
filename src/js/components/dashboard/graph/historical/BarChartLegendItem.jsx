/**
 * BarChartLegendItem.jsx
 * Created by Lizzie Salita 11/21/19
 */

import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
    color: PropTypes.string,
    label: PropTypes.string,
    offset: PropTypes.number,
    legendClicked: PropTypes.func
};

export default class BarChartLegendItem extends React.Component {
    constructor(props) {
        super(props);

        this.legendClicked = this.legendClicked.bind(this);
    }

    legendClicked() {
        this.props.legendClicked(this.props.label);
    }

    render() {
        return (
            <g
                className="chart-legend-item"
                transform={`translate(0, ${this.props.offset})`}
                tabIndex="0"
                focusable
                onClick={this.legendClicked} >
                <rect
                    className="key-color"
                    fill={this.props.color}
                    height="13"
                    width="15" />
                <text
                    className="key-label"
                    x="20"
                    y="10">
                    {this.props.label}
                </text>
            </g>
        );
    }
}

BarChartLegendItem.propTypes = propTypes;
