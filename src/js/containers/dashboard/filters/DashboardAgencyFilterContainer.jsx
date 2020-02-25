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
    updateGenericFilter: PropTypes.func.isRequired,
    selectedFilters: PropTypes.object.isRequired,
    setDescription: PropTypes.func.isRequired,
    type: PropTypes.oneOf(['historical', 'active'])
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

    componentDidUpdate(prevProps) {
        if (this.props.type !== prevProps.type) {
            this.loadData();
        }
    }

    onSelect(agency) {
        // Add or remove the rule from Redux state
        this.props.updateGenericFilter(this.props.type, 'agency', agency);
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
                    // Prevent removing the agency if it has already been set by the other dashboard type
                    if (this.props.selectedFilters[this.props.type].agency !== code) {
                        this.props.updateGenericFilter(this.props.type, 'agency', code);
                    }
                    this.props.setDescription(true);
                }
            })
            .catch((err) => {
                console.error(err);
            });
    }

    render() {
        return (
            <DashboardAgencyFilter
                selectedFilters={this.props.selectedFilters[this.props.type]}
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
