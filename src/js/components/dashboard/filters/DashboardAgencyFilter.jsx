/**
 * DashboardAgencyFilter.jsx
 * Created by Alisa Burdeyny 11/8/19
 */

import React from 'react';
import PropTypes from 'prop-types';

import Autocomplete from 'components/SharedComponents/autocomplete/Autocomplete';
import ShownValue from './ShownValue';

const propTypes = {
    selectedFilters: PropTypes.object.isRequired,
    noResults: PropTypes.bool,
    inFlight: PropTypes.bool,
    onSelect: PropTypes.func.isRequired,
    filteredResults: PropTypes.array.isRequired,
    handleTextInput: PropTypes.func.isRequired,
    clearAutocompleteSuggestions: PropTypes.func.isRequired,
    minCharsToSearch: PropTypes.number,
    singleAgency: PropTypes.bool
};

const defaultProps = {
    noResults: false,
    inFlight: false,
    minCharsToSearch: 0,
    singleAgency: true
};

export default class DashboardAgencyFilter extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            showTooltip: false
        };

        this.toggleTooltip = this.toggleTooltip.bind(this);
    }

    toggleTooltip(showTooltip) {
        if (showTooltip !== this.state.showTooltip) {
            this.setState({
                showTooltip
            });
        }
    }

    render() {
        let selectedAgency = null;
        if (Object.keys(this.props.selectedFilters.agency).length > 0) {
            const agency = this.props.selectedFilters.agency;
            selectedAgency = (
                <div className="selected-filters">
                    <ShownValue
                        label={agency.agency_name}
                        removeValue={this.props.onSelect.bind(null, { agency })} />
                </div>
            );
        }
        return (
            <div className="rules-filter">
                <Autocomplete
                    values={this.props.filteredResults}
                    handleTextInput={this.props.handleTextInput}
                    onSelect={this.props.onSelect}
                    placeholder="Enter Agency Name"
                    errorHeader="Unknown Agency"
                    errorMessage="We were unable to find that Agency based on the current filters."
                    ref={(input) => {
                        this.agencyList = input;
                    }}
                    clearAutocompleteSuggestions={this.props.clearAutocompleteSuggestions}
                    noResults={this.props.noResults}
                    inFlight={this.props.inFlight}
                    minCharsToSearch={this.props.minCharsToSearch}
                    disabled={this.props.singleAgency}
                    toggleTooltip={this.toggleTooltip} />
                {selectedAgency}
            </div>
        );
    }
}

DashboardAgencyFilter.propTypes = propTypes;
DashboardAgencyFilter.defaultProps = defaultProps;
