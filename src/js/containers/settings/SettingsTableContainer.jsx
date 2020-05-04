/**
 * SettingsTableContainer.jsx
 * Created by Lizzie Salita 4/23/20
 */

import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';

import { updateSavedSettings, updateImpact, updateStagedSettings } from 'redux/actions/settingsActions';
import { fetchSettings } from 'helpers/settingsHelper';
import SettingsTable from 'components/settings/table/SettingsTable';

const propTypes = {
    agencyCode: PropTypes.string,
    file: PropTypes.string, // TODO: import list of valid file values
    errorLevel: PropTypes.oneOf(['error', 'warning'])
};

const SettingsTableContainer = ({ agencyCode, file, errorLevel }) => {
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();
    const { stagedSettings } = useSelector((state) => state.settings);
    const updateImpactSetting = (impact, rule) => dispatch(updateImpact(impact, rule, errorLevel));
    const updateOrder = (settings) => dispatch(updateStagedSettings(settings, errorLevel));

    useEffect(() => {
        if (agencyCode && file) {
            setLoading(true);
            fetchSettings(agencyCode, file).then((data) => {
                dispatch(updateSavedSettings(data));
                setLoading(false);
            });
        }
    }, [agencyCode, file]);

    if (loading) {
        return (<p>Loading...</p>);
    }
    else if (stagedSettings[`${errorLevel}s`].length !== 0) {
        return (
            <SettingsTable
                results={stagedSettings[`${errorLevel}s`]}
                updateImpact={updateImpactSetting}
                updateOrder={updateOrder} />
        );
    }
    return (
        <p>Please select an agency.</p>
    );
};

SettingsTableContainer.propTypes = propTypes;
export default SettingsTableContainer;
