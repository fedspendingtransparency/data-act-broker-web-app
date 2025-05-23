/**
 * AgencyFilterContainer.jsx
 * Created by Lizzie Salita 8/30/18
 */

import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as agencyActions from '../../redux/actions/agencyActions';
import * as AgencyHelper from '../../helpers/agencyHelper';

import Typeahead from '../../components/SharedComponents/Typeahead';

const propTypes = {
    setAgencyList: PropTypes.func,
    agencyList: PropTypes.object,
    selectedFilters: PropTypes.object,
    type: PropTypes.string,
    table: PropTypes.string,
    placeholder: PropTypes.string,
    onSelect: PropTypes.func
};

const defaultProps = {
    setAgencyList: () => {},
    agencyList: {},
    selectedFilters: [],
    table: '',
    type: '',
    placeholder: '',
    onSelect: () => {}
};

class AgencyFilterContainer extends React.Component {
    componentDidMount() {
        this.loadData();
    }

    loadData() {
        // we need to populate the list
        AgencyHelper.fetchAgencies()
            .then((res) => {
                const agencies = AgencyHelper.parseAgencies(res, 'perm');
                this.props.setAgencyList(agencies);
            })
            .catch((err) => {
                console.error(err);
            });
    }

    dataFormatter(item) {
        return {
            label: item.agency_name,
            value: item.cgac_code ? item.cgac_code : item.frec_code
        };
    }

    render() {
        let values = this.props.agencyList.agencies;
        if (this.props.type && this.props.table) {
            const selectedAgencies = this.props.selectedFilters[this.props.type][this.props.table].agencies;
            if (selectedAgencies.length > 0) {
                // remove selected agencies from the options
                const selectedAgencyCodes = selectedAgencies.map((selectedAgency) => selectedAgency.code);
                values = values.filter((agency) => {
                    const code = agency.cgac_code || agency.frec_code;
                    return !selectedAgencyCodes.includes(code);
                });
            }
        }
        return (
            <Typeahead
                {...this.props}
                values={values}
                formatter={this.dataFormatter}
                prioritySort={false}
                clearAfterSelect />
        );
    }
}

AgencyFilterContainer.propTypes = propTypes;
AgencyFilterContainer.defaultProps = defaultProps;

export default connect(
    (state) => ({
        agencyList: state.agencyList,
        selectedFilters: state.submissionsTableFilters
    }),
    (dispatch) => bindActionCreators(agencyActions, dispatch)
)(AgencyFilterContainer);
