/**
 * CreatedByFilter.jsx
 * Created by Lizzie Salita 02/04/20
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
    minCharsToSearch: PropTypes.number
};

const defaultProps = {
    noResults: false,
    inFlight: false,
    minCharsToSearch: 0
};

export default class CreatedByFilter extends React.Component {
    render() {
        let selectedUser = null;
        const createdBy = this.props.selectedFilters.createdBy;
        if (this.props.selectedFilters.createdBy) {
            selectedUser = (<ShownValue
                label={createdBy}
                key={createdBy}
                removeValue={this.props.onSelect.bind(null, createdBy)} />);
        }
        return (
            <div className="rules-filter">
                <Autocomplete
                    values={this.props.filteredResults}
                    handleTextInput={this.props.handleTextInput}
                    onSelect={this.props.onSelect}
                    errorHeader="Unknown User"
                    errorMessage="We were unable to find that user."
                    ref={(input) => {
                        this.usersList = input;
                    }}
                    clearAutocompleteSuggestions={this.props.clearAutocompleteSuggestions}
                    noResults={this.props.noResults}
                    inFlight={this.props.inFlight}
                    minCharsToSearch={this.props.minCharsToSearch} />
                {selectedUser}
            </div>
        );
    }
}

CreatedByFilter.propTypes = propTypes;
CreatedByFilter.defaultProps = defaultProps;
