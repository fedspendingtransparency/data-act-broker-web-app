/**
 * RulesFilter.jsx
 * Created by Lizzie Salita 11/5/19
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

export default class RulesFilter extends React.Component {
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
        let selectedRules = null;
        if (this.props.selectedFilters.rules.size > 0) {
            selectedRules = (<SelectedRules
                selectedRules={this.props.selectedFilters.rules}
                removeRule={this.props.onSelect} />);
        }
        return (
            <div className="rules-filter">
                <Autocomplete
                    values={this.props.filteredResults}
                    handleTextInput={this.props.handleTextInput}
                    onSelect={this.props.onSelect}
                    placeholder="Enter Code (e.g. C23)"
                    errorHeader="Unknown Rule"
                    errorMessage="We were unable to find that Rule based on the current filters."
                    ref={(input) => {
                        this.rulesList = input;
                    }}
                    clearAutocompleteSuggestions={this.props.clearAutocompleteSuggestions}
                    noResults={this.props.noResults}
                    inFlight={this.props.inFlight}
                    minCharsToSearch={this.props.minCharsToSearch}
                    disabled={!this.props.selectedFilters.file}
                    toggleTooltip={this.toggleTooltip} />
                {this.state.showTooltip &&
                <WarningTooltip message={`You have not selected a file. Please select a file before identifying a ` +
                    `GSDM rule(s).`} />}
                {selectedRules}
            </div>
        );
    }
}

RulesFilter.propTypes = propTypes;
RulesFilter.defaultProps = defaultProps;
