/**
 * FileNameFilter.jsx
 * Created by Lizzie Salita 8/22/18
 */

import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
    updateFilterList: PropTypes.func,
    table: PropTypes.oneOf(['certified', 'active', 'published'])
};

const defaultProps = {
    updateFilterList: null
};

export default class FileNameFilter extends React.Component {
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
            this.props.updateFilterList('fileNames', this.state.value);
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
                        id={`${this.props.table}-file-name`}
                        type="text"
                        className="text-filter__input"
                        placeholder="File Name"
                        value={this.state.value}
                        onChange={this.changedInput} />
                    <button
                        className="text-filter__button"
                        onClick={this.handleSubmit}
                        disabled={!this.state.value}
                        title="Add"
                        aria-label="Filter by File Name">
                        Add
                    </button>
                </form>
            </div>
        );
    }
}

FileNameFilter.propTypes = propTypes;
FileNameFilter.defaultProps = defaultProps;
