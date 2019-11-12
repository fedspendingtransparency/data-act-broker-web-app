/**
 * SubmitButton.jsx
 * Created by Lizzie Salita 11/12/19
 */

import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
    requestsComplete: PropTypes.bool,
    filtersChanged: PropTypes.bool,
    applyStagedFilters: PropTypes.func,
    resetFilters: PropTypes.func
};

const SubmitButton = (props) => {
    let disabled = false;
    let title = 'Click to submit your search.';
    if (!props.requestsComplete || !props.filtersChanged) {
        title = 'Add or update a filter to submit.';
        disabled = true;
    }

    return (
        <div
            className="sidebar-submit"
            role="region"
            aria-label="Submit search">
            <button
                className="submit-button"
                title={title}
                aria-label={title}
                disabled={disabled}
                onClick={props.applyStagedFilters}>
                Submit Search
            </button>
            <button
                className="reset-button"
                aria-label="Reset search"
                disabled={!props.requestsComplete}
                onClick={props.resetFilters}>
                Reset search
            </button>
        </div>
    );
};

SubmitButton.propTypes = propTypes;

export default SubmitButton;
