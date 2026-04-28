/**
 * SettingsAgencyFilterContainer.jsx
 * Created by Alisa Burdeyny 04/13/20
 */

import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';

import * as AgencyHelper from 'helpers/agencyHelper';
import DashboardAgencyFilter from 'components/dashboard/filters/DashboardAgencyFilter';

const propTypes = {
    updateAgency: PropTypes.func.isRequired,
    selectedAgency: PropTypes.object.isRequired
};

const SettingsAgencySelectContainer = (props) => {
    const [results, setResults] = useState([]);
    const [singleAgency, setSingleAgency] = useState(false);

    useEffect(() => {
        loadData();
    }, []);

    const onSelect = (agency) => {
        const agencyObj = results.filter((result) => {
            const code = result.cgac_code || result.frec_code;
            return code === agency;
        });
        const code = agencyObj[0].cgac_code || agencyObj[0].frec_code;
        // Add or remove the rule from Redux state
        if (code !== props.selectedAgency.code) {
            props.updateAgency({ code, name: agencyObj[0].agency_name });
        }
        else {
            props.updateAgency({ code: '', name: '' });
        }
    };

    const loadData = () => {
        // we need to populate the list
        AgencyHelper.fetchAgencies('submitter', 'dabs')
            .then((res) => {
                const agencies = AgencyHelper.parseAgencies(res, 'perm');
                setResults(agencies);
                setSingleAgency(agencies.length === 1);
                if (agencies.length === 1) {
                    const code = agencies[0].cgac_code ? agencies[0].cgac_code : agencies[0].frec_code;
                    props.updateAgency({ code, name: agencies[0].agency_name });
                }
            })
            .catch((err) => {
                console.error(err);
            });
    };

    return (
        <DashboardAgencyFilter
            selectedAgency={props.selectedAgency}
            results={results}
            singleAgency={singleAgency}
            onSelect={onSelect}
            filterLocation="settings" />
    );
};

SettingsAgencySelectContainer.propTypes = propTypes;
export default SettingsAgencySelectContainer;
