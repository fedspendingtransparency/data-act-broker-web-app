/**
 * SubmitButton.jsx
 * Created by Lizzie Salita 11/12/19
 */

import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
    filtersChanged: PropTypes.bool,
    applyStagedFilters: PropTypes.func,
    resetFilters: PropTypes.func,
    validFilters: PropTypes.bool,
    type: PropTypes.oneOf(['historical', 'active'])
};

const SubmitButton = (props) => {
    const disabled = !props.filtersChanged;
    const title = props.filtersChanged ? 'Click to submit your search.' : 'Add or update a filter to submit.';

    return (
        <div
            className="sidebar-submit"
            role="region"
            aria-label="Submit search">
            <button
                className="submit-button"
                title={title}
                aria-label={title}
                disabled={disabled || !props.validFilters}
                onClick={() => props.applyStagedFilters(props.type)}>
                Apply Filters
            </button>
            <button
                className="reset-button"
                aria-label="Reset search"
                onClick={() => props.resetFilters(props.type)}>
                Reset Filters
            </button>
        </div>
    );
};

SubmitButton.propTypes = propTypes;

export default SubmitButton;
