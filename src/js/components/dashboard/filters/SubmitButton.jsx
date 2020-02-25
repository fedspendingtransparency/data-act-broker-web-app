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

export default class SubmitButton extends React.Component {
    constructor(props) {
        super(props);

        this.applyFilters = this.applyFilters.bind(this);
        this.resetFilters = this.resetFilters.bind(this);
    }

    applyFilters() {
        this.props.applyStagedFilters(this.props.type);
    }

    resetFilters() {
        this.props.resetFilters(this.props.type);
    }

    render() {
        const disabled = !this.props.filtersChanged;
        const title = this.props.filtersChanged ? 'Click to submit your search.' : 'Add or update a filter to submit.';
        return (
            <div
                className="sidebar-submit"
                role="region"
                aria-label="Submit search">
                <button
                    className="submit-button"
                    title={title}
                    aria-label={title}
                    disabled={disabled || !this.props.validFilters}
                    onClick={this.applyFilters}>
                    Apply Filters
                </button>
                <button
                    className="reset-button"
                    aria-label="Reset search"
                    onClick={this.resetFilters}>
                    Reset Filters
                </button>
            </div>
        );
    }
}

SubmitButton.propTypes = propTypes;

