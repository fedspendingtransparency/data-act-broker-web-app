/**
 * DashboardAgencyFilter.jsx
 * Created by Alisa Burdeyny 11/8/19
 */

import React from 'react';
import PropTypes from 'prop-types';

import Autocomplete from 'components/SharedComponents/autocomplete/Autocomplete';
import SelectedRules from 'components/dashboard/filters/SelectedRules';
import WarningTooltip from 'components/SharedComponents/WarningTooltip';

const propTypes = {
    selectedFilters: PropTypes.object.isRequired,
    noResults: PropTypes.bool,
    inFlight: PropTypes.bool,
    onSelect: PropTypes.func.isRequired,
    filteredResults: PropTypes.array.isRequired,
    handleTextInput: PropTypes.func.isRequired,
    clearAutocompleteSuggestions: PropTypes.func.isRequired,
    minCharsToSearch: PropTypes.number
};

const defaultProps = {
    noResults: false,
    inFlight: false,
    minCharsToSearch: 0
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
            </div>
        );
    }
}

DashboardAgencyFilter.propTypes = propTypes;
DashboardAgencyFilter.defaultProps = defaultProps;
