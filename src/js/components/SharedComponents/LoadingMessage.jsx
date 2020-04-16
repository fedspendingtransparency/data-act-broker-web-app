/**
  * LoadingMessage.jsx
  * Copied from USASpending by Jonathan Hill 03/19/19
  **/

import React from 'react';
import PropTypes from 'prop-types';
import { CSSTransitionGroup } from 'react-transition-group';
import LoadingBars from './LoadingBars';

const propTypes = {
    loadingMessage: PropTypes.string,
    barWidth: PropTypes.number,
    barHeight: PropTypes.number,
    barPad: PropTypes.number
};

const defaultProps = {
    loadingMessage: 'Gathering your data...',
    barWidth: 10,
    barHeight: 50,
    barPad: 2
};

const LoadingMessage = (props) => (
    <div className="results-table-content">
        <CSSTransitionGroup
            transitionName="table-message-fade"
            transitionLeaveTimeout={225}
            transitionEnterTimeout={195}
            transitionLeave>
            <div className="results-table-message-container">
                <div className="results-table-loading">
                    <LoadingBars barWidth={props.barWidth} barHeight={props.barHeight} barPad={props.barPad} />
                    <div className="loading-message">
                        {props.loadingMessage}
                    </div>
                </div>
            </div>
        </CSSTransitionGroup>
    </div>
);

LoadingMessage.propTypes = propTypes;
LoadingMessage.defaultProps = defaultProps;
export default LoadingMessage;
