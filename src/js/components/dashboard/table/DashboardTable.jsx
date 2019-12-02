/**
 * DashboardTable.jsx
 * Created by Alisa Burdeyny 11/13/19
 */

import React from 'react';
import PropTypes from 'prop-types';

import DashboardTableHeader from 'components/dashboard/table/DashboardTableHeader';
import NoResultsMessage from 'components/SharedComponents/NoResultsMessage';
import LoadingMessage from 'components/SharedComponents/LoadingMessage';
import ErrorMessageOverlay from 'components/SharedComponents/ErrorMessageOverlay';
import DashboardTableLabelButton from 'components/dashboard/table/DashboardTableLabelButton';

const propTypes = {
    results: PropTypes.array,
    inFlight: PropTypes.bool,
    hasError: PropTypes.bool,
    changeSort: PropTypes.func.isRequired,
    currSort: PropTypes.string,
    currOrder: PropTypes.string,
    openModal: PropTypes.func.isRequired
};

const defaultProps = {
    results: [],
    inFlight: false,
    hasError: false,
    currSort: 'period',
    currOrder: 'desc'
};

const tableHeaders = [
    {
        text: 'File',
        class: 'dashboard-table__file-column',
        sortType: 'file'
    },
    {
        text: 'Fiscal Year/ Quarter',
        class: 'dashboard-table__fyq-column',
        sortType: 'period'
    },
    {
        text: 'Warning Rule',
        class: 'dashboard-table__label-column',
        sortType: 'rule_label'
    },
    {
        text: 'Number of Instances',
        class: 'dashboard-table__instances-column',
        sortType: 'instances'
    },
    {
        text: 'Rule Description',
        class: null,
        sortType: 'description'
    }
];

export default class DashboardTable extends React.Component {
    render() {
        let tableRows = this.props.results.map((row) => (
            <tr key={`dashboard-table-row-${row.submissionId}-${row.ruleLabel}`}>
                <td>
                    <DashboardTableLabelButton
                        row={row}
                        openModal={this.props.openModal} />
                </td>
                <td>
                    {row.period}
                </td>
                <td>
                    {row.ruleLabel}
                </td>
                <td>
                    {row.instanceCount}
                </td>
                <td>
                    <div className="ellipse-box">
                        {row.ruleDescription}
                    </div>
                </td>
            </tr>
        ));

        let contentMessage = null;
        if (this.props.inFlight) {
            contentMessage = <LoadingMessage />;
            tableRows = [];
        }
        else if (this.props.hasError) {
            contentMessage = <ErrorMessageOverlay />;
        }
        else if (this.props.results.length === 0) {
            contentMessage = <NoResultsMessage />;
        }
        return (
            <div className="dashboard-table">
                <h3 className="dashboard-viz__heading">Table</h3>
                <table>
                    <DashboardTableHeader
                        headers={tableHeaders}
                        changeSort={this.props.changeSort}
                        currSort={this.props.currSort}
                        currOrder={this.props.currOrder} />
                    <tbody>
                        {tableRows}
                    </tbody>
                </table>
                {contentMessage}
            </div>
        );
    }
}

DashboardTable.defaultProps = defaultProps;
DashboardTable.propTypes = propTypes;
