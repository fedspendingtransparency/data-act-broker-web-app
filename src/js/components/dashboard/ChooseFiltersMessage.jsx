/**
 * ChooseFiltersMessage.jsx
 * Created by Alisa Burdeyny 11/7/19
 */

import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const propTypes = {
    children: PropTypes.node
};

const ChooseFiltersMessage = ({ children }) => (
    <div className="dashboard-message-flex">
        <div className="dashboard-message">
            <div className="dashboard-message__icon">
                <FontAwesomeIcon icon="arrow-circle-left" />
            </div>
            <span className="dashboard-message__message">
                {children}
            </span>
        </div>
    </div>
);

ChooseFiltersMessage.propTypes = propTypes;
export default ChooseFiltersMessage;
