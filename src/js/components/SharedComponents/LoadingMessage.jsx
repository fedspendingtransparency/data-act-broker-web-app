/**
  * LoadingMessage.jsx
  * Copied from USASpending by Jonathan Hill 03/19/19
  **/

import React, { PropTypes } from 'react';
import { CSSTransitionGroup } from 'react-transition-group';
import LoadingBars from './LoadingBars';

// export default class LoadingMessage extends Component {

//     render() {
//         return (
//             <div className="results-table-content">
//                 <CSSTransitionGroup
//                     transitionName="table-message-fade"
//                     transitionLeaveTimeout={225}
//                     transitionEnterTimeout={195}
//                     transitionLeave>
//                     <div className="results-table-message-container">
//                         <div className="results-table-loading">
//                             <LoadingBars />
//                             <div className="loading-message">
//                                 {this.props.loadingMessage}
//                             </div>
//                         </div>
//                     </div>
//                 </CSSTransitionGroup>
//             </div>
//         );
//     }
// };

const propTypes = {
    loadingMessage: PropTypes.string
};

const defaultProps = {
    loadingMessage: 'Gathering your data...'
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
                    <LoadingBars />
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
