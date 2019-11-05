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
import SelectedRules from 'components/dashboard/filters/SelectedRules';

const propTypes = {
    updateGenericFilter: PropTypes.func,
    selectedFilters: PropTypes.object
};

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
        this.queryAutocompleteDebounced = debounce(this.fetchAutocompleteResults, 300);
    }

    componentDidUpdate(prevProps) {
        if (prevProps.selectedFilters.file !== this.props.selectedFilters.file) {
            this.queryAutocompleteDebounced();
        }
    }

    onSelect(rule) {
        this.props.updateGenericFilter('rules', rule.code);
    }

    parseAutocomplete(input) {
        let results = this.state.results;
        if (input) {
            results = this.state.results.filter((code) => code.includes(input.toUpperCase()));
        }

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
                    results: res.labels,
                    inFlight: false
                });
                this.parseAutocomplete(res.labels);
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

        this.setState({
            filteredResults: [],
            inFlight: true
        });

        const input = event.target.value;
        this.parseAutocomplete(input);
    }

    render() {
        let selectedRules = null;
        if (this.props.selectedFilters.rules.size > 0) {
            selectedRules = (<SelectedRules
                selectedRules={this.props.selectedFilters.rules}
                removeRule={this.onSelect} />);
        }
        return (
            <div className="rules-filter">
                <Autocomplete
                    values={this.state.filteredResults}
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
                    inFlight={this.state.inFlight}
                    minCharsToSearch={0}
                    disabled={!this.props.selectedFilters.file} />
                {selectedRules}
            </div>
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
