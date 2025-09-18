/**
 * NoResultsMessage.jsx
 * Created by Lizzie Salita 3/10/20
 */

import PropTypes from 'prop-types';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const propTypes = {
    children: PropTypes.node
};

const NoResultsMessage = (props) => (
    <div className="dashboard-page__content">
        <div className="dashboard-message-flex">
            <div className="dashboard-message">
                <div className="dashboard-message__icon dashboard-message__icon_alert">
                    <FontAwesomeIcon icon="circle-exclamation" className="exclamation-circle-icon" />
                </div>
                <span className="dashboard-message__message">
                    {props.children}
                </span>
            </div>
        </div>
    </div>
);

NoResultsMessage.propTypes = propTypes;
export default NoResultsMessage;
