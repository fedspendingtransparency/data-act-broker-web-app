/**
 * RevertToCertified.jsx
 * Created by Lizzie Salita 3/16/20
 */

import React from 'react';
import PropTypes from 'prop-types';

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
    let buttonText = 'Revert Submission';
    if (loading) {
        buttonText = 'Reverting';
    }
    let alert = null;
    if (error) {
        alert = (<div>Error: {error}</div>);
    }
    else if (message) {
        alert = (<div>{message}</div>);
    }
    return (
        <React.Fragment>
            <button
                disabled={disabled}
                onClick={revert}
                className={`usa-da-button btn-primary btn-full${disabled ? ' btn-disabled' : ''}`}>
                {buttonText}
            </button>
            {alert}
        </React.Fragment>
    );
};


RevertToCertified.propTypes = propTypes;
export default RevertToCertified;
