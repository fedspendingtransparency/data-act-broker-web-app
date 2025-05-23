/**
 * RulesFilterContainer.jsx
 * Created by Lizzie Salita 11/1/19
 */

import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as DashboardHelper from 'helpers/dashboardHelper';
import * as filterActions from 'redux/actions/dashboard/dashboardFilterActions';
import RulesFilter from 'components/dashboard/filters/RulesFilter';

const propTypes = {
    updateFilterSet: PropTypes.func.isRequired,
    clearFilter: PropTypes.func.isRequired,
    selectedFilters: PropTypes.object.isRequired
};

const minCharsToSearch = 0;

export class RulesFilterContainer extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            results: [],
            filteredResults: [],
            noResults: false,
            inFlight: false
        };

        this.rulesRequest = null;

        this.handleTextInput = this.handleTextInput.bind(this);
        this.clearAutocompleteSuggestions = this.clearAutocompleteSuggestions.bind(this);
        this.onSelect = this.onSelect.bind(this);
        this.fetchAutocompleteResults = this.fetchAutocompleteResults.bind(this);
    }

    componentDidUpdate(prevProps) {
        // Make an API call for the corresponding rule labels when the selected file changes
        if (prevProps.selectedFilters.file !== this.props.selectedFilters.file && this.props.selectedFilters.file) {
            this.fetchAutocompleteResults();
            this.props.clearFilter('historical', 'rules');
        }
    }

    onSelect(rule) {
        // Add or remove the rule from Redux state
        this.props.updateFilterSet('historical', 'rules', rule.code);
    }

    parseAutocomplete(input) {
        let results = this.state.results;

        if (input) {
            // If the user has entered a search string, only show matching results
            results = results.filter((code) => code.includes(input.toUpperCase()));
        }

        // Exclude rules that have already been selected
        results = results.filter((rule) => {
            const selectedRules = this.props.selectedFilters.rules;
            return !selectedRules.has(rule);
        });

        // Format the results for display in the dropdown
        const filteredResults = results.map((code) => ({
            title: code,
            subtitle: '',
            data: { code }
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

        const searchParams = {
            fabs: false,
            files: [this.props.selectedFilters.file],
            error_level: "warning"
        };

        DashboardHelper.fetchRules(searchParams)
            .then((res) => {
                this.setState({
                    results: res.data.labels,
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
            <RulesFilter
                selectedFilters={this.props.selectedFilters}
                {...this.state}
                handleTextInput={this.handleTextInput}
                clearAutocompleteSuggestions={this.clearAutocompleteSuggestions}
                onSelect={this.onSelect}
                minCharsToSearch={minCharsToSearch} />
        );
    }
}

RulesFilterContainer.propTypes = propTypes;

export default connect(
    (state) => ({
        selectedFilters: state.dashboardFilters.historical
    }),
    (dispatch) => bindActionCreators(filterActions, dispatch)
)(RulesFilterContainer);
