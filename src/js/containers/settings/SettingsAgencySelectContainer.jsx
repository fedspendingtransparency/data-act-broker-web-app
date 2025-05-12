/**
 * SettingsAgencyFilterContainer.jsx
 * Created by Alisa Burdeyny 04/13/20
 */

import React from 'react';
import PropTypes from 'prop-types';

import * as AgencyHelper from 'helpers/agencyHelper';
import DashboardAgencyFilter from 'components/dashboard/filters/DashboardAgencyFilter';

const propTypes = {
    updateAgency: PropTypes.func.isRequired,
    selectedAgency: PropTypes.object.isRequired
};

const minCharsToSearch = 2;

export default class SettingsAgencySelectContainer extends React.Component {
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
        const agencyObj = this.state.results.filter((result) => {
            const code = result.cgac_code || result.frec_code;
            return code === agency;
        });
        const code = agencyObj[0].cgac_code || agencyObj[0].frec_code;
        // Add or remove the rule from Redux state
        if (code !== this.props.selectedAgency.code) {
            this.props.updateAgency({ code, name: agencyObj[0].agency_name });
        }
        else {
            this.props.updateAgency({ code: '', name: '' });
        }
    }

    loadData() {
        // we need to populate the list
        AgencyHelper.fetchAgencies('submitter', 'dabs')
            .then((res) => {
                const agencies = AgencyHelper.parseAgencies(res, 'perm');
                this.setState({
                    results: agencies,
                    singleAgency: agencies.length === 1
                });
                if (agencies.length === 1) {
                    const code = agencies[0].cgac_code ? agencies[0].cgac_code : agencies[0].frec_code;
                    this.props.updateAgency({ code, name: agencies[0].agency_name });
                }
            })
            .catch((err) => {
                console.error(err);
            });
    }

    render() {
        return (
            <DashboardAgencyFilter
                selectedAgency={this.props.selectedAgency}
                {...this.state}
                onSelect={this.onSelect}
                minCharsToSearch={minCharsToSearch}
                filterLocation="settings" />
        );
    }
}

SettingsAgencySelectContainer.propTypes = propTypes;
