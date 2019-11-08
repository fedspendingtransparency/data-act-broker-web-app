/**
 * ChooseFiltersMessage.jsx
 * Created by Alisa Burdeyny 11/7/19
 */

import React from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const ChooseFiltersMessage = () => (
    <div className="dashboard-choose-filters-flex">
        <div className="dashboard-choose-filters">
            <div className="dashboard-choose-filters__arrow">
                <FontAwesomeIcon icon="arrow-circle-left" />
            </div>
            <span className="dashboard-choose-filters__message">
                Choose your filters and submit <br />
                your search to begin
            </span>
        </div>
    </div>
);

export default ChooseFiltersMessage;
