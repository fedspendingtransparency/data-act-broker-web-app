/**
 * DashboardAgencyFilter.jsx
 * Created by Alisa Burdeyny 11/8/19
 */

import React from 'react';
import PropTypes from 'prop-types';

import Typeahead from 'components/SharedComponents/Typeahead';
import ShownValue from './ShownValue';

const propTypes = {
    selectedFilters: PropTypes.object.isRequired,
    onSelect: PropTypes.func.isRequired,
    results: PropTypes.array.isRequired,
    singleAgency: PropTypes.bool
};

const defaultProps = {
    singleAgency: true
};

export default class DashboardAgencyFilter extends React.Component {
    dataFormatter(item) {
        return {
            label: item.agency_name,
            value: item.cgac_code ? item.cgac_code : item.frec_code
        };
    }

    render() {
        let selectedAgency = null;
        let filteredList = this.props.results;
        if (this.props.selectedFilters.agency !== '') {
            const agencyCode = this.props.selectedFilters.agency;
            // select only the agency we've selected for clearing and displaying
            const agency = this.props.results.filter((result) => {
                const code = result.cgac_code || result.frec_code;
                return code === agencyCode;
            });

            // make the rest of the items so we don't have the chosen agency in the results list
            filteredList = filteredList.filter((result) => {
                const code = result.cgac_code || result.frec_code;
                return code !== agencyCode;
            });
            // if it's a single agency user, we don't want to remove the value
            const removeVal = this.props.singleAgency ? null : this.props.onSelect.bind(null, agencyCode);
            selectedAgency = (
                <div className="selected-filters">
                    <ShownValue
                        label={agency[0].agency_name}
                        removeValue={removeVal} />
                </div>
            );
        }

        const fliterContents = this.props.singleAgency ? (
            <div className="dashboard-agency-filter">
                {selectedAgency}
            </div>
        ) : (
            <div className="dashboard-agency-filter">
                <div className="typeahead-holder">
                    <Typeahead
                        formatter={this.dataFormatter}
                        onSelect={this.props.onSelect}
                        prioritySort={false}
                        values={filteredList}
                        clearAfterSelect
                        placeholder="Enter Agency Name" />
                </div>
                {selectedAgency}
            </div>
        );
        return (
            fliterContents
        );
    }
}

DashboardAgencyFilter.propTypes = propTypes;
DashboardAgencyFilter.defaultProps = defaultProps;
