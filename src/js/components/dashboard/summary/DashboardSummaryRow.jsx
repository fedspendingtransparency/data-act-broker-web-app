/**
 * DashboardSummaryRow.jsx
 * Created by Daniel Boos 11/12/19
 */

import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
    file: PropTypes.string,
    period: PropTypes.string,
    subID: PropTypes.string,
    submitter: PropTypes.string
};

const defaultProps = {
    file: 'N/A',
    period: 'N/A',
    subID: 'N/A',
    submitter: 'N/A'
};

export default class DashboardSummaryRow extends React.Component {
    render() {
        return (
            <tr className="dashboard-page__summary-table-row">
                <td className="row-20">{this.props.file}</td>
                <td className="row-24">{this.props.period}</td>
                <td className="row-25">{this.props.subID}</td>
                <td className="row-31">{this.props.submitter}</td>
            </tr>
        );
    }
}

DashboardSummaryRow.propTypes = propTypes;
DashboardSummaryRow.defaultProps = defaultProps;
