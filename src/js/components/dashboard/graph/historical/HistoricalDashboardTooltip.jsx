/*
 * HistoricalDashboardTooltip.jsx
 * Created by Lizzie Salita 4/10/20
*/

import React from 'react';
import PropTypes from 'prop-types';
import { formatNumberWithPrecision } from 'helpers/moneyFormatter';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const propTypes = {
    label: PropTypes.string,
    warnings: PropTypes.array,
    totalWarnings: PropTypes.number,
    shownWarnings: PropTypes.number
};

export default class HistoricalDashboardTooltip extends React.Component {
    render() {
        const warnings = this.props.warnings.map((warning) => {
            const highlightCSS = warning.description === this.props.label ? 'highlighted' : '';
            return (
                <tr key={warning.description} className={highlightCSS}>
                    <td className={`text-left ${highlightCSS}`}><FontAwesomeIcon icon="circle" color={warning.color} />
                        {warning.description}
                    </td>
                    <td className={highlightCSS}>{formatNumberWithPrecision(warning.value, 0)}</td>
                    <td className={highlightCSS}>
                        {warning.percent < 1 ? '<1' : formatNumberWithPrecision(warning.percent, 0)}%
                    </td>
                </tr>
            );
        });
        const shownPercent = (this.props.shownWarnings / this.props.totalWarnings) * 100;
        return (
            <React.Fragment>
                <table className="tooltip__historic-dashboard-table">
                    <thead>
                        <tr>
                            <th className="text-left">Warning</th>
                            <th>Count</th>
                            <th>% Total</th>
                        </tr>
                    </thead>
                    <tbody>
                        {warnings}
                        <tr className="last-row">
                            <td className="text-left">Warnings Shown</td>
                            <td>{formatNumberWithPrecision(this.props.shownWarnings, 0)}</td>
                            <td>{shownPercent < 1 ? '<1' : formatNumberWithPrecision(shownPercent, 0)}%</td>
                        </tr>
                        <tr className="last-row no-border">
                            <td className="text-left">Submission Total</td>
                            <td>{formatNumberWithPrecision(this.props.totalWarnings, 0)}</td>
                            <td>100%</td>
                        </tr>
                    </tbody>
                </table>
            </React.Fragment>
        );
    }
}

HistoricalDashboardTooltip.propTypes = propTypes;
