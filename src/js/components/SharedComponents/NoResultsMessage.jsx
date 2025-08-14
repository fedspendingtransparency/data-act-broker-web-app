/**
  * NoResultsMessage.jsx
  * Copied from USASpending by Jonathan Hill 03/19/19
  **/

import React from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const NoResultsMessage = () => (
    <div className="results-table-content">
        <div className="results-table-message-container">
            <div className="results-table-no-results">
                <div className="no-results-icon">
                    <FontAwesomeIcon icon="magnifying-glass" />
                </div>
                <div className="title">
                    No results found.
                </div>
                <div className="description">
                    Try again using different filters.
                </div>
            </div>
        </div>
    </div>
);

export default NoResultsMessage;
