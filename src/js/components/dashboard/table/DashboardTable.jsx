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
import DashboardTableDownloadButton from 'components/dashboard/table/DashboardTableDownloadButton';

const propTypes = {
    results: PropTypes.array,
    inFlight: PropTypes.bool,
    hasError: PropTypes.bool,
    changeSort: PropTypes.func.isRequired,
    currSort: PropTypes.string,
    currOrder: PropTypes.string
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
        text: 'Submission ID',
        class: 'dashboard-table__submission-column',
        sortType: 'submission_id'
    },
    {
        text: 'Reporting Period',
        class: 'dashboard-table__period-column',
        sortType: 'period'
    },
    {
        text: 'Submitted By',
        class: 'dashboard-table__submitted-by-column',
        sortType: 'submitted_by'
    },
    {
        text: 'Warning Rule',
        class: 'dashboard-table__label-column',
        sortType: 'rule_label'
    },
    {
        text: 'Rule Count',
        class: 'dashboard-table__instances-column',
        sortType: 'instances'
    },
    {
        text: 'Rule Description',
        class: null,
        sortType: 'description'
    },
    {
        text: 'Download',
        class: 'dashboard-table__file-column',
        sortType: null
    }
];

export default class DashboardTable extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            results: [],
            totalItems: 0,
            page: 1,
            limit: 10,
            inFlight: true,
            hasError: false,
            sort: 'period',
            order: 'desc',
            showModal: false,
            modalData: {}
        };

        this.downloadFile = this.downloadFile.bind(this);
    }

    downloadFile(fileLabel, submissionId) {
        this.props.downloadFile(fileLabel, submissionId);
    }

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
                tableRows = this.props.results.map((row) => {
                    const fileTypes = row.fileTypes.map(
                        (fileType) => (
                            <DashboardTableDownloadButton
                                downloadFile={this.downloadFile}
                                row={row}
                                label={fileType}
                                key={`${fileType}-${row.submissionId}-${row.ruleLabel}`}
                            />
                        ));

                    return <tr key={`dashboard-table-row-${row.submissionId}-${row.ruleLabel}`}>
                        <td>
                            <a href={`#/submission/${row.submissionId}`} className="date-link">{row.submissionId}</a>
                        </td>
                        <td>
                            {row.period}
                        </td>
                        <td>
                            {row.submittedBy}
                        </td>
                        <td>
                            {row.ruleLabel}
                        </td>
                        <td className="right-align">
                            {row.instanceCount}
                        </td>
                        <td>
                            <div className="scroll-box">
                                {row.ruleDescription}
                            </div>
                        </td>
                        <td>
                            {fileTypes}
                        </td>
                    </tr>
                });
            }
        }
        return (
            <div className="dashboard-table">
                <table className="broker-table historical">
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
