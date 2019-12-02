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
    render() {
        const items = this.props.stack.map((item) => (
            <StackedBar
                {...item}
                key={`${item.label}-${item.xValue}`}
                showTooltip={this.props.showTooltip}
                hideTooltip={this.props.hideTooltip}
                toggleTooltip={this.props.toggleTooltip} />
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
