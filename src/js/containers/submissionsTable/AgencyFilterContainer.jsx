/**
 * AgencyFilterContainer.jsx
 * Created by Lizzie Salita 8/30/18
 */

import PropTypes from 'prop-types';
import { useEffect } from 'react';
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

const AgencyFilterContainer = ({
    setAgencyList = () => {},
    agencyList = {},
    selectedFilters = [],
    table = '',
    type = '',
    placeholder = '',
    onSelect = () => {}
}) => {
    useEffect(() => {
        loadData();
    }, []);

    const loadData = () => {
        // we need to populate the list
        AgencyHelper.fetchAgencies()
            .then((res) => {
                const agencies = AgencyHelper.parseAgencies(res, 'perm');
                setAgencyList(agencies);
            })
            .catch((err) => {
                console.error(err);
            });
    };

    const dataFormatter = (item) => {
        return {
            label: item.agency_name,
            value: item.cgac_code ? item.cgac_code : item.frec_code
        };
    };

    let values = agencyList.agencies;
    if (type && table) {
        const selectedAgencies = selectedFilters[type][table].agencies;
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
            onSelect={onSelect}
            placeholder={placeholder}
            values={values}
            formatter={dataFormatter}
            prioritySort={false}
            clearAfterSelect />
    );
};

AgencyFilterContainer.propTypes = propTypes;

export default connect(
    (state) => ({
        agencyList: state.agencyList,
        selectedFilters: state.submissionsTableFilters
    }),
    (dispatch) => bindActionCreators(agencyActions, dispatch)
)(AgencyFilterContainer);
