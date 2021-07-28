/**
 * SignificanceCircle.jsx
 * Created by Lizzie Salita 11/22/19
 */

import React from 'react';
import PropTypes from 'prop-types';

import { formatNumberWithPrecision } from 'helpers/moneyFormatter';

const propTypes = {
    xPos: PropTypes.number,
    yPos: PropTypes.number,
    xValue: PropTypes.number,
    yValue: PropTypes.number,
    color: PropTypes.string,
    label: PropTypes.string,
    showTooltip: PropTypes.func,
    hideTooltip: PropTypes.func,
    toggleTooltip: PropTypes.func
};

// consistent radius (pixels) of the significance circles
const radius = 23;

export default class SignificanceCircle extends React.Component {
    constructor(props) {
        super(props);

        this.mouseEntered = this.mouseEntered.bind(this);
        this.mouseExited = this.mouseExited.bind(this);
        this.onTouch = this.onTouch.bind(this);
    }

    onTouch() {
        this.props.toggleTooltip({
            ...this.props,
            position: {
                x: this.props.xPos,
                y: this.props.yPos
            }
        });
    }


    mouseExited() {
        this.props.hideTooltip();
    }

    mouseEntered() {
        this.props.showTooltip({
            ...this.props,
            itemWidth: radius * 2,
            position: {
                x: this.props.xPos,
                y: this.props.yPos
            }
        });
    }

    render() {
        return (
            <g
                tabIndex="0"
                focusable
                onMouseOver={this.mouseEntered}
                onFocus={this.mouseEntered}
                onMouseOut={this.mouseExited}
                onBlur={this.mouseExited}
                onTouchStart={this.onTouch} >
                <desc>
                    {`Rule ${this.props.label} of significance ${this.props.xValue}: ` +
                    `${formatNumberWithPrecision(this.props.yValue, 0)} instances`}
                </desc>
                <g className="rule-circle">
                    <circle
                        cx={this.props.xPos}
                        cy={this.props.yPos}
                        r={radius.toString()}
                        fill={this.props.color} />
                    <text
                        className="rule-circle__text"
                        x={this.props.xPos}
                        y={this.props.yPos}
                        textAnchor="middle"
                        dominantBaseline="central"
                        fill="white">
                        {this.props.label}
                    </text>
                </g>
            </g>
        );
    }
}

SignificanceCircle.propTypes = propTypes;
