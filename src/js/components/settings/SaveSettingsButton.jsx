/**
 * SaveSettingsButton.jsx
 * Created by Lizzie Salita 5/1/20
 */

import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import { isEqual } from 'lodash';
import { fileLabels } from 'dataMapping/dashboard/fileLabels';
import { saveSettings } from 'helpers/settingsHelper';
import { prepareSettings } from 'helpers/settingsTableHelper';
import { updateSavedSettings } from 'redux/actions/settingsActions';

const propTypes = {
    agencyCode: PropTypes.string,
    file: PropTypes.oneOf(Object.keys(fileLabels))
};

const SaveSettingsButton = ({ agencyCode, file }) => {
    const dispatch = useDispatch();
    const { stagedSettings, savedSettings } = useSelector((state) => state.settings);
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [loading, setLoading] = useState(false);
    const { errors, warnings } = prepareSettings(stagedSettings);
    const save = () => {
        setLoading(true);
        saveSettings({
            errors,
            warnings,
            file,
            agency_code: agencyCode
        })
            .then((data) => {
                setSuccessMessage(data.message);
                setLoading(false);
                dispatch(updateSavedSettings(stagedSettings));
            })
            .catch((err) => {
                setErrorMessage(err.message);
                setLoading(false);
            });
    };
    return (
        <div>
            {errorMessage ? (<div>{errorMessage}</div>) : null}
            {successMessage ? (<div>{successMessage}</div>) : null}
            <button
                disabled={isEqual(stagedSettings, savedSettings)}
                onClick={save}>
                {loading ? 'Saving...' : 'Save'}
            </button>
        </div>
    );
};

SaveSettingsButton.propTypes = propTypes;
export default SaveSettingsButton;
