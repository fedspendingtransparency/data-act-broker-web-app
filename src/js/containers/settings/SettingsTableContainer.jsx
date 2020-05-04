/**
 * SettingsTableContainer.jsx
 * Created by Lizzie Salita 4/23/20
 */

import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';

import { updateSavedSettings, updateImpact, updateStagedSettings } from 'redux/actions/settingsActions';
import { fetchSettings } from 'helpers/settingsHelper';
import { fileLabels } from 'dataMapping/dashboard/fileLabels';
import SettingsTable from 'components/settings/table/SettingsTable';
import LoadingMessage from 'components/SharedComponents/LoadingMessage';
import ChooseFiltersMessage from 'components/dashboard/ChooseFiltersMessage';

const propTypes = {
    agencyCode: PropTypes.string,
    file: PropTypes.oneOf(Object.keys(fileLabels)),
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
        return <LoadingMessage />;
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
        <ChooseFiltersMessage>
            Please select an agency.
        </ChooseFiltersMessage>
    );
};

SettingsTableContainer.propTypes = propTypes;
export default SettingsTableContainer;
