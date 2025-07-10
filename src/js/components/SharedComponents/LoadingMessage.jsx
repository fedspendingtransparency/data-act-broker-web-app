/**
  * LoadingMessage.jsx
  * Copied from USASpending by Jonathan Hill 03/19/19
  **/

import PropTypes from 'prop-types';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
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
        <TransitionGroup>
            <CSSTransition
                classNames="table-message-fade"
                timeout={{ enter: 195, exit: 225 }}
                exit>
                <div className="results-table-message-container">
                    <div className="results-table-loading">
                        <LoadingBars barWidth={props.barWidth} barHeight={props.barHeight} barPad={props.barPad} />
                        <div className="loading-message">
                            {props.loadingMessage}
                        </div>
                    </div>
                </div>
            </CSSTransition>
        </TransitionGroup>
    </div>
);

LoadingMessage.propTypes = propTypes;
LoadingMessage.defaultProps = defaultProps;
export default LoadingMessage;
