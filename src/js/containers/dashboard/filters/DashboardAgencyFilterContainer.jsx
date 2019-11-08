/**
 * DashboardAgencyFilterContainer.jsx
 * Created by Alisa Burdeyny 11/8/19
 */

import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import _ from 'lodash';

import * as AgencyHelper from 'helpers/agencyHelper';
import * as filterActions from 'redux/actions/dashboard/dashboardFilterActions';
import DashboardAgencyFilter from 'components/dashboard/filters/DashboardAgencyFilter';

const propTypes = {
    updateAgencyFilter: PropTypes.func.isRequired,
    clearGenericFilter: PropTypes.func.isRequired,
    selectedFilters: PropTypes.object.isRequired
};

const minCharsToSearch = 2;

export class DashboardAgencyFilterContainer extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            results: [],
            filteredResults: [],
            noResults: false,
            inFlight: true,
            singleAgency: true,
            showTooltip: false
        };

        this.rulesRequest = null;

        this.handleTextInput = this.handleTextInput.bind(this);
        this.clearAutocompleteSuggestions = this.clearAutocompleteSuggestions.bind(this);
        this.onSelect = this.onSelect.bind(this);
    }

    componentDidMount() {
        this.loadData();
    }

    onSelect(selection) {
        // Add or remove the rule from Redux state
        this.props.updateAgencyFilter(selection.agency);
    }

    loadData() {
        // we need to populate the list
        AgencyHelper.fetchAgencies()
            .then((agencies) => {
                if (agencies.length === 1) {
                    this.props.updateAgencyFilter(agencies[0]);
                }
                else {
                    this.setState({
                        results: agencies,
                        singleAgency: false,
                        inFlight: false
                    });
                }
            })
            .catch((err) => {
                console.error(err);
                this.setState({
                    inFlight: false
                });
            });
    }

    parseAutocomplete(input) {
        let results = this.state.results;

        if (input) {
            // If the user has entered a search string, only show matching results
            results = results.filter((agency) => agency.agency_name.toUpperCase().includes(input.toUpperCase()));
        }

        // Exclude agency that has already been selected
        results = results.filter((agency) => !_.isEqual(this.props.selectedFilters.agency, agency));

        // Format the results for display in the dropdown
        const filteredResults = results.map((agency) => ({
            title: agency.agency_name,
            subtitle: '',
            data: { agency }
        }));

        this.setState({
            filteredResults,
            noResults: filteredResults.length === 0,
            inFlight: false
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
            <DashboardAgencyFilter
                selectedFilters={this.props.selectedFilters}
                {...this.state}
                handleTextInput={this.handleTextInput}
                clearAutocompleteSuggestions={this.clearAutocompleteSuggestions}
                onSelect={this.onSelect}
                minCharsToSearch={minCharsToSearch} />
        );
    }
}

DashboardAgencyFilterContainer.propTypes = propTypes;

export default connect(
    (state) => ({
        selectedFilters: state.dashboardFilters
    }),
    (dispatch) => bindActionCreators(filterActions, dispatch),
)(DashboardAgencyFilterContainer);
