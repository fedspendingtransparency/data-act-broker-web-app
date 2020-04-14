/**
 * ErrorLevelTab.jsx
 * Created by Lizzie Salita 4/13/20
 */

import React from 'react';
import PropTypes from 'prop-types';
import { startCase } from 'lodash';

const propTypes = {
    errorLevel: PropTypes.string,
    setErrorLevel: PropTypes.func,
    active: PropTypes.bool
};

const ErrorLevelTab = ({ errorLevel, setErrorLevel, active }) => {
    const activeClass = active ? 'dashboard-tabs__button_active' : '';
    return (
        <button
            className={`dashboard-tabs__button ${activeClass}`}
            onClick={() => setErrorLevel(errorLevel)}>
            {startCase(errorLevel)}s
        </button>
    );
};

ErrorLevelTab.propTypes = propTypes;
export default ErrorLevelTab;
