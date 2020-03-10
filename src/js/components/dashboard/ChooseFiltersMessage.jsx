/**
 * ChooseFiltersMessage.jsx
 * Created by Alisa Burdeyny 11/7/19
 */

import React from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const ChooseFiltersMessage = () => (
    <div className="dashboard-message-flex">
        <div className="dashboard-message">
            <div className="dashboard-message__icon">
                <FontAwesomeIcon icon="arrow-circle-left" />
            </div>
            <span className="dashboard-message__message">
                Choose your filters and submit <br />
                your search to begin
            </span>
        </div>
    </div>
);

export default ChooseFiltersMessage;
