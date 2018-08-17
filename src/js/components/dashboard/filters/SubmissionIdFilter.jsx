/**
 * SubmissionIdFilter.jsx
 * Created by Lizzie Salita 8/15/18
 */

import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
    updateFilterList: PropTypes.func
};

const defaultProps = {
    updateFilterList: null
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

        this.props.updateFilterList('submissionIds', this.state.value);

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
                        id="submission-id"
                        type="text"
                        className="text-filter__input"
                        placeholder="Submission ID"
                        value={this.state.value}
                        onChange={this.changedInput} />
                    <button
                        className="text-filter__button"
                        onClick={this.handleSubmit}
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
SubmissionIdFilter.defaultProps = defaultProps;
