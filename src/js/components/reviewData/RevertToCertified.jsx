/**
 * RevertToCertified.jsx
 * Created by Lizzie Salita 3/16/20
 */

import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const propTypes = {
    loading: PropTypes.bool,
    error: PropTypes.string,
    message: PropTypes.string,
    disabled: PropTypes.bool,
    revert: PropTypes.func
};

const RevertToCertified = ({
    disabled, loading, error, message, revert
}) => {
    let buttonText = [<FontAwesomeIcon icon="arrow-rotate-right" key="revert-icon" />, 'Revert'];
    if (loading) {
        buttonText = ['Reverting', <FontAwesomeIcon icon="spinner" spin key="reverting-icon" />];
    }
    let alert = null;
    if (error) {
        alert = (
            <div className="revert-submission-alert revert-submission-alert_error" role="alert">
                <FontAwesomeIcon icon="triangle-exclamation" /> Error: {error}
            </div>
        );
    }
    else if (message) {
        alert = (
            <div className="revert-submission-alert revert-submission-alert_success" role="alert">
                <FontAwesomeIcon icon="circle-check" /> {message}
            </div>
        );
    }
    return (
        <div className="revert-group">
            <button
                onClick={revert}
                disabled={disabled}
                className={`usa-da-button btn-primary-alt${disabled ? ' btn-disabled' : ''}`}>
                <div className="button-wrapper">
                    {buttonText}
                </div>
            </button>
            {alert}
        </div>
    );
};


RevertToCertified.propTypes = propTypes;
export default RevertToCertified;
