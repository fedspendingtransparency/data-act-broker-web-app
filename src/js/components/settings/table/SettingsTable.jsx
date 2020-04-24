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
        <tr key={`dashboard-table-row-${row.label}`}>
            <td>
                {row.significance} {row.label}
            </td>
            <td>
                {row.impact}
            </td>
            <td>
                <div title={row.description} className="ellipse-box">
                    {row.description}
                </div>
            </td>
        </tr>
    ));
    return (
        <div className="settings-table">
            <table>
                <thead>
                    <tr>
                        {tableHeaders}
                    </tr>
                </thead>
                <tbody>
                    {tableRows}
                </tbody>
            </table>
        </div>
    );
};

SettingsTable.defaultProps = defaultProps;
SettingsTable.propTypes = propTypes;

export default SettingsTable;
