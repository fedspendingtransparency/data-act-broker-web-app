/**
* ErrorMessageOverlay.jsx
* Created by Daniel Boos 11/25/19
*/

import React from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const ErrorMessageOverlay = () => (
    <div className="results-table-content">
        <div className="results-table-message-container">
            <div className="results-table-error">
                <div className="icon">
                    <FontAwesomeIcon icon="exclamation-circle" />
                </div>
                <div className="title">
                    An error occurred.
                </div>
                <div className="description">
                    Something went wrong while gathering your data.
                </div>
            </div>
        </div>
    </div>
);

export default ErrorMessageOverlay;
