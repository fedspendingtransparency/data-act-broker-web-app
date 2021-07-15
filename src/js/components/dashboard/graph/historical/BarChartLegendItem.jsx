/**
 * BarChartLegendItem.jsx
 * Created by Lizzie Salita 11/21/19
 */

import React from 'react';
import PropTypes from 'prop-types';
import { createOnKeyDownHandler } from 'helpers/util';

const propTypes = {
    color: PropTypes.string,
    label: PropTypes.string,
    offset: PropTypes.number,
    legendClicked: PropTypes.func,
    faded: PropTypes.bool
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
        const fadedCSS = this.props.faded ? ' faded' : '';
        const onKeyDownHandler = createOnKeyDownHandler(this.legendClicked);
        return (
            <g
                className={`chart-legend-item${fadedCSS}`}
                transform={`translate(0, ${this.props.offset})`}
                tabIndex="0"
                focusable
                onClick={this.legendClicked}
                onKeyDown={onKeyDownHandler} >
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
