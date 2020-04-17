/*
 * HistoricalDashboardTooltip.jsx
 * Created by Lizzie Salita 4/10/20
*/

import React from 'react';
import PropTypes from 'prop-types';
import { formatNumberWithPrecision } from 'helpers/moneyFormatter';

const propTypes = {
    xValue: PropTypes.string,
    value: PropTypes.number,
    totalWarnings: PropTypes.number,
    percent: PropTypes.number
};

const HistoricalDashboardTooltip = ({
    xValue,
    value,
    totalWarnings,
    percent
}) => (
    <table>
        <tbody>
            <tr>
                <th>Time Period</th>
                <td>{xValue}</td>
            </tr>
            <tr>
                <th># of Rule Instances</th>
                <td>{formatNumberWithPrecision(value, 0)}</td>
            </tr>
            <tr>
                <th>Total # of Warnings</th>
                <td>{formatNumberWithPrecision(totalWarnings, 0)}</td>
            </tr>
            <tr>
                <th>% of all Warnings</th>
                <td>{percent}%</td>
            </tr>
        </tbody>
    </table>
);

HistoricalDashboardTooltip.propTypes = propTypes;
export default HistoricalDashboardTooltip;
