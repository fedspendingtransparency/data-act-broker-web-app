/**
 * BarChartLegend.jsx
 * Created by Lizzie Salita 11/21/19
 */

import React from 'react';
import PropTypes from 'prop-types';

import BarChartLegendItem from './BarChartLegendItem';

const propTypes = {
    legend: PropTypes.arrayOf(PropTypes.object),
    legendClicked: PropTypes.func
};

export default class BarChartLegend extends React.Component {
    render() {
        const items = this.props.legend.map((item) => (
            <BarChartLegendItem
                {...item}
                key={item.label}
                legendClicked={this.props.legendClicked} />));

        return (
            <g className="chart-legend">
                {items}
            </g>
        );
    }
}

BarChartLegend.propTypes = propTypes;
