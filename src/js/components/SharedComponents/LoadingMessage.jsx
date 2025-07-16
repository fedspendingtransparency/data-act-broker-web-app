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

const LoadingMessage = ({loadingMessage = 'Gathering your data...', barWidth = 10, barHeight = 50, barPad = 2}) => (
    <div className="results-table-content">
        <TransitionGroup>
            <CSSTransition
                classNames="table-message-fade"
                timeout={{ enter: 195, exit: 225 }}
                exit>
                <div className="results-table-message-container">
                    <div className="results-table-loading">
                        <LoadingBars barWidth={barWidth} barHeight={barHeight} barPad={barPad} />
                        <div className="loading-message">
                            {loadingMessage}
                        </div>
                    </div>
                </div>
            </CSSTransition>
        </TransitionGroup>
    </div>
);

LoadingMessage.propTypes = propTypes;
export default LoadingMessage;
