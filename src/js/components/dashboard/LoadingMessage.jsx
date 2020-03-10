/**
 * LoadingMessage.jsx
 * Created by Lizzie Salita 3/10/20
 */

import React from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const LoadingMessage = () => (
    <div className="dashboard-message-flex">
        <div className="dashboard-message">
            <div className="dashboard-message__icon">
                <FontAwesomeIcon icon="spinner" spin />
            </div>
            <span className="dashboard-message__message">
                Loading submissions
            </span>
        </div>
    </div>
);

export default LoadingMessage;
