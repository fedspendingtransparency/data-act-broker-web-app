/**
 * BarChartXAxisItem.jsx
 * Created by Lizzie Salita 11/15/19
 */

import PropTypes from 'prop-types';

const propTypes = {
    label: PropTypes.string,
    x: PropTypes.number,
    y: PropTypes.number
};

const BarChartXAxisItem = (props) => (
    <g
        className="axis-item x-axis"
        transform={`translate(${props.x},${props.y})`}>
        <text textAnchor="middle">
            {props.label}
        </text>
    </g>
);

BarChartXAxisItem.propTypes = propTypes;

export default BarChartXAxisItem;
