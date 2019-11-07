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
                <FontAwesomeIcon icon="times" />
            </div>
            Choose your filters and submit your search to begin
        </div>
    </div>
);

export default ChooseFiltersMessage;
