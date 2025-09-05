/**
 * LoadingMessage.jsx
 * Created by Lizzie Salita 3/10/20
 */

import React from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const LoadingMessage = () => (
    <div className="dashboard-page__content">
        <div className="dashboard-message-flex">
            <div className="dashboard-message">
                <div className="dashboard-message__icon">
                    <FontAwesomeIcon icon="spinner" className="spinner-icon" spin />
                </div>
                <span className="dashboard-message__message">
                    Loading submissions
                </span>
            </div>
        </div>
    </div>
);

export default LoadingMessage;
