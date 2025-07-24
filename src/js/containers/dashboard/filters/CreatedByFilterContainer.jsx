/**
 * CreatedByFilterContainer.jsx
 * Created by Lizzie Salita 02/04/20
 */

import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { isEqual } from 'lodash';

import * as createdByHelper from 'helpers/createdByHelper';
import * as filterActions from 'redux/actions/dashboard/dashboardFilterActions';
import CreatedByFilter from 'components/dashboard/filters/CreatedByFilter';

const propTypes = {
    updateGenericFilter: PropTypes.func.isRequired,
    clearFilter: PropTypes.func.isRequired,
    selectedFilters: PropTypes.object.isRequired
};

const minCharsToSearch = 0;

export class CreatedByFilterContainer extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            results: [],
            filteredResults: [],
            noResults: false,
            inFlight: false
        };

        this.handleTextInput = this.handleTextInput.bind(this);
        this.clearAutocompleteSuggestions = this.clearAutocompleteSuggestions.bind(this);
        this.onSelect = this.onSelect.bind(this);
        this.fetchAutocompleteResults = this.fetchAutocompleteResults.bind(this);
    }

    componentDidMount() {
        // Make an API call for the list of users
        this.fetchAutocompleteResults();
    }

    onSelect(user) {
        // Add or remove the user from Redux state
        this.props.updateGenericFilter('active', 'createdBy', user);
    }

    parseAutocomplete(input) {
        let results = this.state.results;

        if (input) {
            // If the user has entered a search string, only show matching results
            results = results.filter((user) => {
                const name = (user.name && user.name.toLowerCase()) || user.email.toLowerCase();
                return name.includes(input.toLowerCase());
            });
        }

        // Exclude the user that has already been selected
        const selectedUser = this.props.selectedFilters.createdBy;
        if (selectedUser.name && selectedUser.id) {
            results = results.filter((user) => {
                const formattedUser = {
                    name: user.name || user.email, // because some older users have no name
                    id: user.user_id
                };
                return !isEqual(formattedUser, selectedUser);
            });
        }

        // Format the results for display in the dropdown
        const filteredResults = results.map((user) => ({
            title: user.name || user.email,
            subtitle: '',
            data: { name: user.name || user.email, id: user.user_id }
        }));

        this.setState({
            filteredResults,
            noResults: filteredResults.length === 0,
            inFlight: false
        });
    }

    fetchAutocompleteResults() {
        this.setState({
            noResults: false,
            inFlight: true
        });

        createdByHelper.fetchCreatedBy('dabs')
            .then((res) => {
                this.setState({
                    results: res.data.users,
                    inFlight: false
                });
            })
            .catch((err) => {
                console.error(err);
                this.setState({
                    inFlight: false
                });
            });
    }

    clearAutocompleteSuggestions() {
        this.setState({
            filteredResults: []
        });
    }

    handleTextInput(event) {
        event.persist();
        const value = event.target.value;

        if (value.length >= minCharsToSearch) {
            this.setState({
                filteredResults: [], // Clear any existing results
                inFlight: true
            });
            const input = value;
            this.parseAutocomplete(input);
        }
    }

    render() {
        return (
            <CreatedByFilter
                selectedFilters={this.props.selectedFilters}
                {...this.state}
                handleTextInput={this.handleTextInput}
                clearAutocompleteSuggestions={this.clearAutocompleteSuggestions}
                onSelect={this.onSelect}
                minCharsToSearch={minCharsToSearch} />
        );
    }
}

CreatedByFilterContainer.propTypes = propTypes;

export default connect(
    (state) => ({
        selectedFilters: state.dashboardFilters.active
    }),
    (dispatch) => bindActionCreators(filterActions, dispatch)
)(CreatedByFilterContainer);
