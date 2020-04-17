/**
 * BarChartLegendItem.jsx
 * Created by Lizzie Salita 11/21/19
 */

import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
    color: PropTypes.string,
    label: PropTypes.string,
    offset: PropTypes.number
};

const BarChartLegendItem = (props) =>
    (
        <g
            className="chart-legend-item"
            transform={`translate(0, ${props.offset})`}>
            <rect
                className="key-color"
                fill={props.color}
                height="13"
                width="15" />
            <text
                className="key-label"
                x="20"
                y="10">
                {props.label}
            </text>
        </g>
    );

BarChartLegendItem.propTypes = propTypes;
export default BarChartLegendItem;
