/**
 * LoadingScreen.jsx
 * Copied from USASpending by Jonathan Hill 03/19/19
 */

import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
    barWidth: PropTypes.number,
    barHeight: PropTypes.number,
    barPad: PropTypes.number
};

const defaultProps = {
    barWidth: 10,
    barHeight: 50,
    barPad: 2
};

export default class LoadingBars extends React.Component {
    render() {
        const totalWidth = ((this.props.barWidth + this.props.barPad) * 4).toString();
        const totalHeight = this.props.barHeight.toString();
        const barWidth = this.props.barWidth.toString();
        return (
            <div className="loading-animation">
                <svg
                    className="loading-bars"
                    xmlns="http://www.w3.org/2000/svg"
                    version="1.1"
                    width={totalWidth}
                    height={totalHeight}
                    style={{
                        opacity: 0
                    }}>
                    <rect
                        className="bar-one"
                        x="0"
                        y="0"
                        height={totalHeight}
                        width={barWidth} />
                    <rect
                        className="bar-two"
                        x={((this.props.barWidth + this.props.barPad) * 1).toString()}
                        y="0"
                        height={totalHeight}
                        width={barWidth} />
                    <rect
                        className="bar-three"
                        x={((this.props.barWidth + this.props.barPad) * 2).toString()}
                        y="0"
                        height={totalHeight}
                        width={barWidth} />
                    <rect
                        className="bar-four"
                        x={((this.props.barWidth + this.props.barPad) * 3).toString()}
                        y="0"
                        height={totalHeight}
                        width={barWidth} />
                </svg>
            </div>
        );
    }
}

LoadingBars.defaultProps = defaultProps;
LoadingBars.propTypes = propTypes;
