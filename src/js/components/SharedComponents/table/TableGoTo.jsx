/**
 * TableGoTo.jsx
 * Created by Alisa Burdeyny 12/5/19
 */

import React from 'react';
import PropTypes from 'prop-types';

import { keyCodes } from 'dataMapping/keyMappings';

const propTypes = {
    changePage: PropTypes.func.isRequired,
    totalPages: PropTypes.number
};

const defaultProps = {
    totalPages: 10
};

export default class TableLimit extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            goToPage: ''
        };

        this.onKeyDownHandler = this.onKeyDownHandler.bind(this);
        this.changePage = this.changePage.bind(this);
        this.changedInput = this.changedInput.bind(this);
        this.validPage = this.validPage.bind(this);
    }

    onKeyDownHandler(e) {
        if (e.keyCode === keyCodes.enter && this.validPage()) {
            e.preventDefault();
            this.changePage();
        }
    }

    changePage() {
        this.props.changePage(parseInt(this.state.goToPage, 10));
    }

    changedInput(e) {
        this.setState({
            goToPage: e.target.value
        });
    }

    validPage() {
        if (this.state.goToPage === '' || parseInt(this.state.goToPage, 10) < 1 ||
            parseInt(this.state.goToPage, 10) > this.props.totalPages) {
            return false;
        }

        return true;
    }

    render() {
        return (
            <div className="table-go-to">
                <label htmlFor="table-go-to">
                    Go to page
                </label>
                <input
                    type="number"
                    id="table-go-to"
                    title={`Enter a number between 1 and ${this.props.totalPages}`}
                    min="1"
                    max={this.props.totalPages}
                    placeholder={`1-${this.props.totalPages}`}
                    value={this.state.goToPage}
                    onChange={this.changedInput}
                    onKeyDown={this.onKeyDownHandler} />
                <button
                    onClick={this.changePage}
                    disabled={!this.validPage()}>
                    Go
                </button>
            </div>
        );
    }
}

TableLimit.propTypes = propTypes;
TableLimit.defaultProps = defaultProps;
