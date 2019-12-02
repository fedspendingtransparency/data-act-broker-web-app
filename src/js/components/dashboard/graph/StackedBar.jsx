/**
 * StackedBar.jsx
 * Created by Lizzie Salita 11/22/19
 */

import React from 'react';
import PropTypes from 'prop-types';

import { formatNumberWithPrecision } from 'helpers/moneyFormatter';

const propTypes = {
    xValue: PropTypes.string,
    description: PropTypes.string,
    value: PropTypes.number,
    x: PropTypes.number,
    y: PropTypes.number,
    width: PropTypes.number,
    height: PropTypes.number,
    color: PropTypes.string
};

const StackedBar = (props) => (
    <g>
        <desc>
            {`${props.description} in ${props.xValue}: ${formatNumberWithPrecision(props.value, 0)}`}
        </desc>
        <rect
            className="stacked-bar-item"
            x={props.x}
            y={props.y}
            width={props.width}
            height={props.height}
            fill={props.color} />
    </g>
);

StackedBar.propTypes = propTypes;

export default StackedBar;
