/**
 * NoResultsMessage.jsx
 * Created by Lizzie Salita 3/10/20
 */

import React from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const NoResultsMessage = () => (
    <div className="dashboard-message-flex">
        <div className="dashboard-message">
            <div className="dashboard-message__icon dashboard-message__icon_alert">
                <FontAwesomeIcon icon="exclamation-circle" />
            </div>
            <span className="dashboard-message__message">
                No submissions were found matching these criteria. <br />
                Please try a different set of filters.
            </span>
        </div>
    </div>
);

export default NoResultsMessage;
