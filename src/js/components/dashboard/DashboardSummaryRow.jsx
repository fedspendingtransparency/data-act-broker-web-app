/**
 * DashboardSummaryRow.jsx
 * Created by Daniel Boos 11/12/19
 */

import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
    file: PropTypes.string,
    period: PropTypes.string,
    subID: PropTypes.number,
    submitter: PropTypes.string,
    header: PropTypes.bool
};

const defaultProps = {
    file: '',
    period: '',
    subID: null,
    submitter: '',
    header: false
};

export default class DashboardSummaryRow extends React.Component {
    render() {
        const headerClass = this.props.header ? 'header' : '';
        const rowClassName = "dashboard-page__summary-table-row " + headerClass; 
        return (
            <tr className={rowClassName}>
                <td className='row-8'></td>
                <td className='row-12'>{this.props.file}</td>
                <td className='row-8'></td>
                <td className='row-16'>{this.props.period}</td>
                <td className='row-8'></td>
                <td className='row-17'>{this.props.subID}</td>
                <td className='row-8'></td>
                <td className='row-23'>{this.props.submitter}</td>
            </tr>
        );
    }
}

DashboardSummaryRow.propTypes = propTypes;
DashboardSummaryRow.defaultProps = defaultProps;
