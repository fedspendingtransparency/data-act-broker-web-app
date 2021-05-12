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
        text: (<span>Fiscal Year/<br />Quarter</span>),
        class: 'dashboard-table__fyq-column',
        sortType: 'period'
    },
    {
        text: 'Warning Rule',
        class: 'dashboard-table__label-column',
        sortType: 'rule_label'
    },
    {
        text: (<span>Number of<br />Instances</span>),
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
        let contentMessage = <LoadingMessage />;
        let tableRows = [];
        if (!this.props.inFlight) {
            if (this.props.hasError) {
                contentMessage = <ErrorMessageOverlay />;
            }
            else if (this.props.results.length === 0) {
                contentMessage = <NoResultsMessage />;
            }
            else {
                contentMessage = null;
                tableRows = this.props.results.map((row) => (
                    <tr key={`dashboard-table-row-${row.submissionId}-${row.ruleLabel}`}>
                        <td>
                            <DashboardTableLabelButton
                                label={row.fileLabel}
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
            }
        }
        return (
            <div className="dashboard-table">
                <table className="broker-table">
                    <DashboardTableHeader
                        headers={tableHeaders}
                        changeSort={this.props.changeSort}
                        currSort={this.props.currSort}
                        currOrder={this.props.currOrder} />
                    <tbody className="broker-table__body">
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
