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
    toggleTooltip: PropTypes.func,
    height: PropTypes.number
};

export default class StackedBarGroup extends React.Component {
    constructor(props) {
        super(props);

        this.toggleTooltip = this.toggleTooltip.bind(this);
        this.hoveredAbove = this.hoveredAbove.bind(this);
        this.barTouched = this.barTouched.bind(this);
    }

    toggleTooltip(label, xValue, toggle) {
        const warnings = this.props.stack.map((warning) => ({
            value: warning.value,
            description: warning.description,
            percent: warning.tooltipData.percent,
            color: warning.color
        }));
        const position = {
            x: this.props.stack[0].tooltipData.position.x,
            y: Math.floor(this.props.height / 5)
        };
        if (toggle === false) {
            this.props.showTooltip({
                label,
                xValue,
                warnings,
                position,
                itemWidth: this.props.stack[0].tooltipData.itemWidth,
                totalWarnings: this.props.stack[0].tooltipData.totalWarnings,
                shownWarnings: this.props.stack[0].tooltipData.shownWarnings
            });
        }
        else {
            this.props.toggleTooltip({
                label,
                xValue,
                warnings,
                position,
                totalWarnings: this.props.stack[0].tooltipData.totalWarnings,
                shownWarnings: this.props.stack[0].tooltipData.shownWarnings
            });
        }
    }

    hoveredAbove() {
        if (this.props.stack.length > 0) {
            this.toggleTooltip('', this.props.stack[0].xValue, false);
        }
    }

    barTouched() {
        if (this.props.stack.length > 0) {
            this.toggleTooltip('', this.props.stack[0].xValue, true);
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
        let hitZoneWidth = 0;
        if (this.props.stack.length > 0) {
            hitZoneWidth = this.props.stack[0].width;
        }

        return (
            <g
                className="bar-group"
                transform={`translate(${this.props.xPos},0)`}>
                <rect
                    className="hit-zone"
                    fill="rgba(0,0,0,0)"
                    x={0}
                    y={0}
                    width={hitZoneWidth}
                    height={this.props.height - 50}
                    onMouseEnter={this.hoveredAbove}
                    onMouseLeave={this.props.hideTooltip}
                    onTouchStart={this.barTouched} />
                {items}
            </g>
        );
    }
}

StackedBarGroup.propTypes = propTypes;
