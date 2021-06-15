/**
 * DashboardGraphTooltip.jsx
 * Created by Lizzie Salita 11/27/19
 */

import React from 'react';
import PropTypes from 'prop-types';
import { throttle } from 'lodash';

const propTypes = {
    description: PropTypes.string,
    xValue: PropTypes.string,
    position: PropTypes.shape({
        x: PropTypes.number,
        y: PropTypes.number
    }),
    children: PropTypes.node,
    shape: PropTypes.oneOf(['bar', 'circle'])
};

export default class DashboardGraphTooltip extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            windowWidth: 0,
            tooltipWidth: 0,
            xOffset: 0
        };
        this.measureDOM = throttle(this.measureDOM.bind(this), 50);
    }

    componentDidMount() {
        this.measureDOM();
        window.addEventListener('resize', this.measureDOM);
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.measureDOM);
    }

    measureDOM() {
        // measure the window width
        const windowWidth = window.innerWidth;
        const tooltipWidth = this.div.offsetWidth;
        // measure where on the screen the tooltip's 0 x position is
        const xOffset = this.div.getBoundingClientRect().left;

        // save the measurements before updating the tooltip, this prevents layout thrashing
        this.setState({
            windowWidth,
            tooltipWidth,
            xOffset
        }, this.positionTooltip);
    }

    positionTooltip() {
        const { shape } = this.props;
        const position = this.props.position;
        // we need to wait for the tooltip to render before we can full position it due to its
        // dynamic width
        const tooltipWidth = shape === 'bar' ? 340 : this.state.tooltipWidth;
        // determine how far from the right edge of the window we are
        const distanceFromRight = this.state.windowWidth -
            (this.state.xOffset + position.x + tooltipWidth);

        // determine the tooltip direction
        let direction = 'left';
        // if we are too close to the right edge, the arrow should point right (bc the
        // tooltip will be on the left of the bar)
        if (shape === 'bar' && distanceFromRight <= 55) {
            direction = 'right';
        }
        else if (shape === 'circle' && distanceFromRight <= 120) {
            direction = 'right';
        }

        // offset the tooltip position to account for its arrow/pointer
        const offsetAdjust = shape === 'bar' ? 38 : 120;
        const rightOffsetAdjust = shape === 'bar' ? 38 : -62;
        let offset = 9 + offsetAdjust;
        if (direction === 'right') {
            offset = -9 - tooltipWidth - rightOffsetAdjust;
        }

        const offsetY = shape === 'bar' ? 0 : -23;

        // determining which color to make the tooltip pointer
        const tooltipType = this.props.shape === 'bar' ? ' historic' : '';

        this.div.style.transform =
            `translate(${position.x + offset}px,${position.y + offsetY}px)`;
        this.div.className = `tooltip ${direction} warnings-info-graph__tooltip${tooltipType}`;
        this.pointerDiv.className = `tooltip-pointer ${direction}${tooltipType}`;
    }

    render() {
        let title = this.props.description;
        let headerType = '';
        let hr = <hr />
        if (this.props.shape === 'bar') {
            headerType = ' historic';
            title = this.props.xValue;
            hr = null;
        }
        return (
            <div
                className="tooltip warnings-info-graph__tooltip"
                ref={(div) => {
                    this.div = div;
                }}>
                <div
                    className="tooltip-pointer"
                    ref={(div) => {
                        this.pointerDiv = div;
                    }} />
                <div className={`tooltip__title${headerType}`}>
                    {title}
                </div>
                {hr}
                <div className={`tooltip__body${headerType}`}>
                    {this.props.children}
                </div>
            </div>
        );
    }
}

DashboardGraphTooltip.propTypes = propTypes;
