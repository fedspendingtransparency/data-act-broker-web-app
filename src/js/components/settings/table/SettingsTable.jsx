/**
 * SettingsTable.jsx
 * Created by Lizzie Salita 4/24/20
 */

import React from 'react';
import PropTypes from 'prop-types';
import { startCase } from 'lodash';

const propTypes = {
    results: PropTypes.array
};

const defaultProps = {
    results: []
};

const columns = [
    'significance',
    'impact',
    'description'
];

const SettingsTable = ({ results }) => {
    const tableHeaders = columns.map((col) => (
        <th>{startCase(col)}</th>
    ));
    const tableRows = results.map((row) => (
        <tr key={`settings-table-row-${row.label}`}>
            <td>
                {row.significance}. {row.label}
            </td>
            <td>
                {startCase(row.impact)}
            </td>
            <td>
                <div title={row.description} className="ellipse-box">
                    {row.description}
                </div>
            </td>
        </tr>
    ));
    return (
        <table className="broker-table">
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
