/**
 * SettingsTable.jsx
 * Created by Lizzie Salita 4/24/20
 */

import React from 'react';
import PropTypes from 'prop-types';
import { startCase } from 'lodash';
import SettingsTableRow from './SettingsTableRow';

const propTypes = {
    results: PropTypes.array,
    updateImpact: PropTypes.func
};

const defaultProps = {
    results: []
};

const columns = [
    'significance',
    'impact',
    'description'
];

const SettingsTable = ({ results, updateImpact }) => {
    const tableHeaders = columns.map((col) => (
        <th key={col}>{startCase(col)}</th>
    ));
    const tableRows = results.map((row) => (
        <SettingsTableRow
            key={row.label}
            {...row}
            updateImpact={updateImpact} />
    ));
    return (
        <table className="broker-table settings-table">
            <thead className="broker-table__header">
                <tr>
                    {tableHeaders}
                </tr>
            </thead>
            <tbody className="broker-table__body">
                {tableRows}
            </tbody>
        </table>
    );
};

SettingsTable.defaultProps = defaultProps;
SettingsTable.propTypes = propTypes;

export default SettingsTable;
