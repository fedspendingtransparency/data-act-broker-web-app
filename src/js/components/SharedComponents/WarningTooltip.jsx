/**
 * WarningTooltip.jsx
 * Created by Lizzie Salita 10/26/19
 */

import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const propTypes = {
    message: PropTypes.string
};

const WarningTooltip = (props) => (
    <div className="warning-tooltip">
        <div className="warning-content">
            <div className="tooltip-pointer left" />
            <div className="icon" aria-label="Warning">
                <FontAwesomeIcon icon="exclamation-triangle" />
            </div>
            <div className="message">
                {props.message}
            </div>
        </div>
    </div>
);

WarningTooltip.propTypes = propTypes;
export default WarningTooltip;
