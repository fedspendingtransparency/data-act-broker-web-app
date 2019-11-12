/**
 * DashboardAgencyFilterContainer.jsx
 * Created by Alisa Burdeyny 11/8/19
 */

import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

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
            singleAgency: false
        };

        this.onSelect = this.onSelect.bind(this);
    }

    componentDidMount() {
        this.loadData();
    }

    onSelect(agency) {
        // Add or remove the rule from Redux state
        this.props.updateAgencyFilter(agency);
    }

    loadData() {
        // we need to populate the list
        AgencyHelper.fetchAgencies()
            .then((agencies) => {
                this.setState({
                    results: agencies,
                    singleAgency: agencies.length === 1
                });
                if (agencies.length === 1) {
                    const code = agencies[0].cgac_code ? agencies[0].cgac_code : agencies[0].frec_code;
                    this.props.updateAgencyFilter(code);
                }
            })
            .catch((err) => {
                console.error(err);
            });
    }

    render() {
        return (
            <DashboardAgencyFilter
                selectedFilters={this.props.selectedFilters}
                {...this.state}
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
