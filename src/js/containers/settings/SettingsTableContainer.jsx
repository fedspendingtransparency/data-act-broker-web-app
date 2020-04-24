/**
 * SettingsTableContainer.jsx
 * Created by Lizzie Salita 4/23/20
 */

import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import { fetchSettings } from 'helpers/settingsHelper';

const propTypes = {
    agencyCode: PropTypes.string,
    file: PropTypes.string, // TODO: import list of valid file values
    errorLevel: PropTypes.oneOf(['error', 'warning'])
};

const SettingsTableContainer = ({ agencyCode, file, errorLevel }) => {
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (agencyCode && file) {
            setLoading(true);
            fetchSettings(agencyCode, file).then((data) => {
                setResults(data);
                setLoading(false);
            });
        }
    }, [agencyCode, file]);

    if (loading) {
        return (<p>Loading...</p>);
    }
    else if (results.length !== 0) {
        return (<p>{JSON.stringify(results[`${errorLevel}s`])}</p>);
    }
    return (
        <p>Please select an agency.</p>
    );
};

SettingsTableContainer.propTypes = propTypes;
export default SettingsTableContainer;
