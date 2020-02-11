/**
 * SubmissionIdFilter.jsx
 * Created by Lizzie Salita 2/11/20
 */

import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
    updateGenericFilter: PropTypes.func,
    selectedFilters: PropTypes.object
};

export default class SubmissionIdFilter extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: ''
        };
        this.changedInput = this.changedInput.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    changedInput(e) {
        this.setState({
            value: e.target.value
        });
    }

    handleSubmit(e) {
        e.preventDefault();

        if (this.state.value) {
            // prevent submitting an empty string
            this.props.updateGenericFilter('active', 'submissionId', this.state.value);
        }

        // clear the value
        this.setState({
            value: ''
        });
    }

    render() {
        return (
            <div className="dashboard-filters__filter">
                <form
                    className="text-filter"
                    onSubmit={this.handleSubmit}>
                    <input
                        id="active-dashboard__submission_id"
                        aria-label="submission-id-filter"
                        type="number"
                        className="text-filter__input"
                        placeholder="Submission ID"
                        value={this.state.value}
                        onChange={this.changedInput} />
                    <button
                        className="text-filter__button"
                        onClick={this.handleSubmit}
                        disabled={!this.state.value}
                        title="Add"
                        aria-label="Filter by Submission ID">
                        Add
                    </button>
                </form>
            </div>
        );
    }
}

SubmissionIdFilter.propTypes = propTypes;
