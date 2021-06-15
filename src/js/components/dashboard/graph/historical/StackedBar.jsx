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
    color: PropTypes.string,
    tooltipData: PropTypes.object,
    hideTooltip: PropTypes.func,
    toggleTooltip: PropTypes.func
};

export default class StackedBar extends React.Component {
    constructor(props) {
        super(props);

        this.mouseEntered = this.mouseEntered.bind(this);
        this.mouseExited = this.mouseExited.bind(this);
        this.barTouched = this.barTouched.bind(this);
    }

    mouseEntered() {
        this.props.toggleTooltip(this.props.tooltipData.description, this.props.xValue, false);
    }

    mouseExited() {
        this.props.hideTooltip();
    }

    barTouched() {
        this.props.toggleTooltip(this.props.tooltipData.description, this.props.xValue, true);
    }

    render() {
        return (
            <g>
                <desc>
                    {`${this.props.description} in ${this.props.xValue}: ` +
                    `${formatNumberWithPrecision(this.props.value, 0)}`}
                </desc>
                <rect
                    className="stacked-bar-item"
                    x={this.props.x}
                    y={this.props.y}
                    width={this.props.width}
                    height={this.props.height}
                    fill={this.props.color}
                    tabIndex="0"
                    focusable
                    onMouseOver={this.mouseEntered}
                    onFocus={this.mouseEntered}
                    onMouseOut={this.mouseExited}
                    onBlur={this.mouseExited}
                    onTouchStart={this.barTouched} />
            </g>
        );
    }
}

StackedBar.propTypes = propTypes;
