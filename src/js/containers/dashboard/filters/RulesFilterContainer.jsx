/**
 * RulesFilterContainer.jsx
 * Created by Lizzie Salita 11/1/19
 */

import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { debounce } from 'lodash';

import * as DashboardHelper from 'helpers/dashboardHelper';
import * as filterActions from 'redux/actions/dashboard/dashboardFilterActions';
import Autocomplete from 'components/SharedComponents/autocomplete/Autocomplete';

const propTypes = {
    updateGenericFilter: PropTypes.func,
    selectedFilters: PropTypes.object
};

export class RulesFilterContainer extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            searchString: '',
            autocompleteResults: [],
            noResults: false
        };

        this.rulesRequest = null;

        this.handleTextInput = this.handleTextInput.bind(this);
        this.clearAutocompleteSuggestions = this.clearAutocompleteSuggestions.bind(this);
        this.onSelect = this.onSelect.bind(this);
        this.fetchAutocompleteResults = this.fetchAutocompleteResults.bind(this);
        this.queryAutocompleteDebounced = debounce(this.fetchAutocompleteResults, 300);
    }

    onSelect(rule) {
        this.props.updateGenericFilter('rules', rule);
    }

    parseAutocomplete(results) {
        let filteredResults = results;
        if (this.state.searchString) {
            filteredResults = results.filter((code) => code.includes(this.state.searchString.toUpperCase()));
        }

        const parsedResults = filteredResults.map((code) => ({
            title: code,
            subtitle: '',
            data: { code }
        }));

        this.setState({
            autocompleteResults: parsedResults,
            noResults: parsedResults.length === 0
        });
    }

    fetchAutocompleteResults(input) {
        this.setState({
            noResults: false,
            searchString: input
        });

        const searchParams = {
            fabs: false,
            files: [this.props.selectedFilters.file],
            error_level: "warning"
        };

        DashboardHelper.fetchRules(searchParams)
            .then((res) => {
                this.parseAutocomplete(res.labels);
            })
            .catch((err) => {
                console.error(err);
            });
    }

    clearAutocompleteSuggestions() {
        this.setState({
            autocompleteResults: []
        });
    }

    handleTextInput(event) {
        event.persist();

        this.setState({
            autocompleteResults: []
        });

        const input = event.target.value;
        this.queryAutocompleteDebounced(input);
    }

    render() {
        return (
            <Autocomplete
                values={this.state.autocompleteResults}
                handleTextInput={this.handleTextInput}
                onSelect={this.onSelect}
                placeholder="Enter Code (e.g. C23)"
                errorHeader="Unknown Rule"
                errorMessage="We were unable to find that Rule based on the current filters."
                ref={(input) => {
                    this.rulesList = input;
                }}
                clearAutocompleteSuggestions={this.clearAutocompleteSuggestions}
                noResults={this.state.noResults}
                minCharsToSearch={0}
                disabled={!this.props.selectedFilters.file} />

        );
    }
}

RulesFilterContainer.propTypes = propTypes;

export default connect(
    (state) => ({
        selectedFilters: state.dashboardFilters
    }),
    (dispatch) => bindActionCreators(filterActions, dispatch),
)(RulesFilterContainer);
