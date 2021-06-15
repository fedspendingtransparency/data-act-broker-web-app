/**
 * StackedBarGroup.jsx
 * Created by Lizzie Salita 11/22/19
 */

import React from 'react';
import PropTypes from 'prop-types';

import StackedBar from './StackedBar';

const propTypes = {
    xPos: PropTypes.number,
    stack: PropTypes.array,
    showTooltip: PropTypes.func,
    hideTooltip: PropTypes.func,
    toggleTooltip: PropTypes.func
};

export default class StackedBarGroup extends React.Component {
    constructor(props) {
        super(props);

        this.toggleTooltip = this.toggleTooltip.bind(this);
    }

    toggleTooltip(label, xValue, toggle) {
        const warnings = this.props.stack.map((warning) => ({
            value: warning.value,
            description: warning.description,
            percent: warning.tooltipData.percent,
            color: warning.color
        }));
        if (toggle === false) {
            this.props.showTooltip({
                label: label,
                xValue: xValue,
                warnings,
                position: this.props.stack[0].tooltipData.position,
                totalWarnings: this.props.stack[0].tooltipData.totalWarnings
            });
        }
        else {
            this.props.toggle({
                label: label,
                xValue: xValue,
                warnings,
                position: this.props.stack[0].tooltipData.position,
                totalWarnings: this.props.stack[0].tooltipData.totalWarnings
            });
        }
    }

    render() {
        const items = this.props.stack.map((item) => (
            <StackedBar
                {...item}
                key={`${item.label}-${item.xValue}`}
                showTooltip={this.toggleTooltip}
                hideTooltip={this.props.hideTooltip}
                toggleTooltip={this.toggleTooltip} />
        ));

        return (
            <g
                className="bar-group"
                transform={`translate(${this.props.xPos},0)`}>
                {items}
            </g>
        );
    }
}

StackedBarGroup.propTypes = propTypes;
