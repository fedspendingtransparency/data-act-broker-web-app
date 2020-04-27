/**
 * SettingsTable.jsx
 * Created by Lizzie Salita 4/24/20
 */

import React from 'react';
import PropTypes from 'prop-types';
import { startCase } from 'lodash';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ImpactDropdown from './ImpactDropdown';

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
        <th key={col}>{startCase(col)}</th>
    ));
    const tableRows = results.map((row) => (
        <tr key={`settings-table-row-${row.label}`}>
            <td className="settings-table__row settings-table__row_significance">
                <FontAwesomeIcon icon="bars" />
                {row.significance}.<span className="settings-table__rule">{row.label}</span>
            </td>
            <td className="settings-table__row">
                <ImpactDropdown
                    rule={row.label}
                    selectedOption={startCase(row.impact)}
                    updateImpact={(rule, impact) => console.log(rule, impact)} />
            </td>
            <td className="settings-table__row">
                <div title={row.description} className="ellipse-box">
                    {row.description}
                </div>
            </td>
        </tr>
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
