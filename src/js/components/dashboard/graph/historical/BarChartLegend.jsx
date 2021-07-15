/**
 * BarChartLegend.jsx
 * Created by Lizzie Salita 11/21/19
 */

import React from 'react';
import PropTypes from 'prop-types';

import BarChartLegendItem from './BarChartLegendItem';

const propTypes = {
    legend: PropTypes.arrayOf(PropTypes.object),
    legendClicked: PropTypes.func,
    filteredRules: PropTypes.arrayOf(PropTypes.string)
};

export default class BarChartLegend extends React.Component {
    render() {
        const items = this.props.legend.map((item) => {
            let faded = false;
            if (this.props.filteredRules.includes(item.label)) {
                faded = true;
            }
            return (
                <BarChartLegendItem
                    {...item}
                    key={item.label}
                    legendClicked={this.props.legendClicked}
                    faded={faded} />
            );
        });

        return (
            <g className="chart-legend">
                {items}
            </g>
        );
    }
}

BarChartLegend.propTypes = propTypes;
