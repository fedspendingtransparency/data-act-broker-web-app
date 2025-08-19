/**
 * SaveSettingsButton.jsx
 * Created by Lizzie Salita 5/1/20
 */

import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import { isEqual } from 'lodash';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
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

    useEffect(() => {
        setSuccessMessage('');
        setErrorMessage('');
    }, [agencyCode, file, stagedSettings]);

    const save = () => {
        setLoading(true);
        saveSettings({
            errors,
            warnings,
            file,
            agency_code: agencyCode
        })
            .then(() => {
                setSuccessMessage('Settings Saved');
                setLoading(false);
                dispatch(updateSavedSettings(stagedSettings));
            })
            .catch((err) => {
                setErrorMessage(err.response.data.message);
                setLoading(false);
            });
    };

    return (
        <div className="save-status">
            <div className="save-status__message">
                {errorMessage ? (
                    <div className=" save-status__error">
                        <FontAwesomeIcon icon="triangle-exclamation" />{errorMessage}
                    </div>
                ) : null}
                {successMessage ? (
                    <div className="save-status__success">
                        <FontAwesomeIcon icon="circle-check" />{successMessage}
                    </div>
                ) : null}
            </div>
            <button
                className="btn-primary save-status__button"
                disabled={isEqual(stagedSettings, savedSettings)}
                onClick={save}>
                {loading ? 'Saving...' : 'Save'}
            </button>
        </div>
    );
};

SaveSettingsButton.propTypes = propTypes;
export default SaveSettingsButton;
