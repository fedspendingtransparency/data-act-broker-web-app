/**
* SubmissionsTable.jsx
* Created by Kevin Li 10/28/16
*/

import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import _ from 'lodash';
import { Pagination } from 'data-transparency-ui';

import ErrorMessageOverlay from 'components/SharedComponents/ErrorMessageOverlay';
import LastModifiedCell from 'components/landing/recentActivity/LastModifiedCell';

import FormattedTable from '../SharedComponents/table/FormattedTable';
import SubmissionLink from '../landing/recentActivity/SubmissionLink';
import HistoryLink from './HistoryLink';
import * as Status from '../landing/recentActivity/SubmissionStatus';
import * as LoginHelper from '../../helpers/loginHelper';
import * as UtilHelper from '../../helpers/util';
import * as PermissionsHelper from '../../helpers/permissionsHelper';
import DeleteLink from '../landing/recentActivity/DeleteLink';
import NoResultsMessage from '../SharedComponents/NoResultsMessage';
import LoadingMessage from '../SharedComponents/LoadingMessage';

const propTypes = {
    loadTableData: PropTypes.func,
    appliedFilters: PropTypes.object,
    session: PropTypes.object,
    data: PropTypes.array,
    type: PropTypes.string,
    total: PropTypes.number,
    isPublished: PropTypes.bool,
    isLoading: PropTypes.bool,
    errorMessage: PropTypes.string
};

const defaultProps = {
    data: [],
    isLoading: true,
    isPublished: true,
    loadTableData: null,
    appliedFilters: {},
    session: null,
    type: '',
    total: 0,
    errorMessage: ''
};

export default class SubmissionsTable extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            parsedData: [],
            cellClasses: [],
            headerClasses: [],
            rowClasses: [],
            currentPage: 1,
            totalPages: 1,
            account: null,
            deleteIndex: -1,
            sortColumn: null,
            sortDirection: 'desc',
            user: true
        };

        this.reload = this.reload.bind(this);
        this.sortTable = this.sortTable.bind(this);
        this.deleteWarning = this.deleteWarning.bind(this);
        this.changePage = this.changePage.bind(this);
    }

    componentDidMount() {
        this.props.loadTableData(
            this.state.currentPage, this.props.isPublished, this.getCategory(),
            this.state.sortDirection, this.props.type === 'fabs', this.props.appliedFilters
        );
        this.loadUser();
    }

    componentDidUpdate(prevProps) {
        if (this.props.type !== prevProps.type) {
            this.reload();
        }

        if (!_.isEqual(prevProps.appliedFilters, this.props.appliedFilters)) {
            // reset to page 1
            this.changePage(1);
        }

        if (!_.isEqual(prevProps.data, this.props.data)) {
            this.buildRow();
        }
    }

    getHeaders() {
        let headers = [];
        if (this.props.isPublished) {
            if (this.props.type === 'fabs') {
                headers = [
                    'Submission ID',
                    'Agency: Filename',
                    'Created By',
                    'Action Date Range',
                    'Published By',
                    'Published On'
                ];
            }
            else {
                headers = [
                    'Reporting Period (CY)\nSubmission ID',
                    'Agency',
                    'Created By',
                    'Last Modified',
                    'Status',
                    'Submission History'
                ];
            }
        }
        else {
            let dateName = '';
            let canDelete = false;
            let agency = '';
            let view = 'View';
            if (this.props.type === 'fabs') {
                dateName = 'Action Date Range';
                canDelete = PermissionsHelper.checkFabsPermissions(this.props.session);
                agency = 'Agency:Filename';
                view = 'Submission ID';
            }
            else {
                dateName = 'Reporting Period (CY)';
                canDelete = PermissionsHelper.checkPermissions(this.props.session);
                agency = 'Agency';
            }
            headers = [
                view,
                agency,
                dateName,
                'Created By',
                'Last Modified',
                'Status'
            ];
            if (canDelete) {
                headers = headers.concat('Delete');
            }
        }
        return headers;
    }

    getCategory() {
        if (this.props.isPublished) {
            switch (this.state.sortColumn) {
                case 0:
                    return 'reporting_start';
                case 1:
                    return 'agency';
                case 2:
                    return 'submitted_by';
                case 3:
                    return 'modified';
                case 5:
                    return 'last_pub_or_cert';
                default:
                    return 'modified';
            }
        }
        switch (this.state.sortColumn) {
            case 1:
                return 'agency';
            case 2:
                return 'reporting_start';
            case 3:
                return 'submitted_by';
            default:
                return 'modified';
        }
    }

    getAgency(item) {
        let agency = item.agency;
        if (this.props.type === 'fabs') {
            agency += `:\n${item.files[0].split('/').pop().replace(/^[0-9]*_/, '')}`;
        }
        return agency;
    }

    buildRow() {
    // iterate through the recent activity
        const output = [];
        const rowClasses = [];
        const allCellClasses = [];
        const agencySize = this.props.type === 'fabs' ? '20' : '17_5';
        const progressSize = this.props.type === 'fabs' ? '15' : '20';
        const viewSize = this.props.type === 'fabs' ? '15' : '10';
        const modifiedSize = this.props.type === 'fabs' ? '12_5' : '15';
        let baseCellClasses = ['row-12_5 text-center', `row-${agencySize} text-left`, 'row-15 white-space', 'row-12_5',
            `row-${modifiedSize}`, `row-${progressSize} progress-cell`, 'row-7_5 text-center'];

        if (this.props.isPublished) {
            baseCellClasses = [`row-${viewSize} text-center`, 'row-20', 'row-12_5', 'row-10', 'row-20 progress-cell',
                'row-15 text-center'];
            if (this.props.type === 'fabs') {
                baseCellClasses = ['row-10 text-center', 'row-25', 'row-10', 'row-15 white-space', 'row-10',
                    'row-10 text-center'];
            }
        }
        const headerClasses = [...baseCellClasses];
        if (!this.props.isPublished && this.props.type !== 'fabs') {
            baseCellClasses[0] = 'row-12_5 text-left';
        }

        // iterate through each item returned from the API
        this.props.data.forEach((item, index) => {
            // break the object out into an array for the table component
            const row = this.formatRow(item, index);

            const rowClass = item.test_submission ? 'test-submission-row' : '';

            rowClasses.push(rowClass);
            allCellClasses.push(baseCellClasses);
            output.push(row);
        });

        let noResults = false;
        if (this.props.data.length === 0) {
            noResults = true;
        }

        this.setState({
            parsedData: output,
            cellClasses: allCellClasses,
            rowClasses,
            headerClasses,
            noResults
        });
    }


    formatRow(item, index) {
        let start = 'Start: ';
        let end = '\nEnd: ';
        if (this.props.type === 'fabs') {
            start = 'Earliest: ';
            end = '\nLatest: ';
        }
        let reportingDateString = start + item.reporting_start_date + end + item.reporting_end_date;
        if (!item.reporting_start_date || !item.reporting_end_date) {
            reportingDateString = 'No reporting period\nspecified';
        }

        const userName = Object.prototype.hasOwnProperty.call(item, 'user') ? item.user.name : '--';

        const deleteConfirm = this.state.deleteIndex !== -1 && index === this.state.deleteIndex;

        let link = (<SubmissionLink
            submissionId={item.submission_id}
            type={this.props.type}
            testSubmission={item.test_submission} />);

        if (this.props.isPublished) {
            link = (<SubmissionLink
                submissionId={item.submission_id}
                value={reportingDateString}
                type={this.props.type} />);
        }

        let row = [];
        if (this.props.isPublished) {
            // Published Submissions table
            row = [
                link,
                this.getAgency(item),
                userName
            ];

            const lastPubOrCert = item.last_pub_or_cert !== '' ? UtilHelper.convertToLocalDate(item.last_pub_or_cert) :
                item.last_pub_or_cert;
            if (this.props.type === 'fabs') {
                row = row.concat([
                    reportingDateString,
                    item.publishing_user,
                    lastPubOrCert
                ]);
            }
            else {
                row = row.concat([
                    UtilHelper.convertToLocalDate(item.last_modified),
                    <Status.SubmissionStatus
                        status={item.rowStatus}
                        published={this.props.isPublished}
                        certified={item.certified} />,
                    <span>
                        {item.publishing_user}<br />
                        {lastPubOrCert}<br />
                        <HistoryLink submissionId={item.submission_id} />
                    </span>
                ]);
            }
        }
        else {
            // Active Submissions table
            row = [
                link,
                this.getAgency(item),
                reportingDateString,
                userName,
                <LastModifiedCell expirationDate={item.expiration_date} lastModified={item.last_modified} />,
                <Status.SubmissionStatus status={item.rowStatus} />
            ];

            let deleteCol = false;
            let canDelete = false;
            if (this.props.type === 'fabs') {
                deleteCol = PermissionsHelper.checkFabsPermissions(this.props.session);
                canDelete = PermissionsHelper.checkFabsAgencyPermissions(this.props.session, item.agency);
            }
            else {
                deleteCol = PermissionsHelper.checkPermissions(this.props.session);
                canDelete = PermissionsHelper.checkAgencyPermissions(this.props.session, item.agency);
            }

            if (deleteCol) {
                if (canDelete && item.publish_status === 'unpublished') {
                    row.push(<DeleteLink
                        submissionId={item.submission_id}
                        index={index}
                        warning={this.deleteWarning}
                        confirm={deleteConfirm}
                        reload={this.reload}
                        item={item}
                        account={this.state.account} />);
                }
                else {
                    row.push('N/A');
                }
            }
        }
        return row;
    }

    sortTable(direction, column) {
    // the table sorting changed
        this.setState({
            sortDirection: direction,
            sortColumn: column
        }, () => {
            // re-display the data
            this.props.loadTableData(
                this.state.currentPage, this.props.isPublished, this.getCategory(),
                this.state.sortDirection, this.props.appliedFilters
            );
            this.buildRow();
        });
    }

    changePage(newPage) {
        this.setState({
            currentPage: newPage
        }, () => {
            this.props.loadTableData(
                this.state.currentPage, this.props.isPublished, this.getCategory(),
                this.state.sortDirection, this.props.appliedFilters
            );
        });
    }

    reload() {
        this.props.loadTableData(
            this.state.currentPage, this.props.isPublished, this.getCategory(),
            this.state.sortDirection, this.props.appliedFilters
        );
        this.buildRow();
    }

    loadUser() {
        LoginHelper.fetchActiveUser().then((user) => {
            this.setState({ account: user.data });
        });
    }

    deleteWarning(index) {
        this.setState({
            deleteIndex: index
        }, () => {
            this.buildRow();
        });
    }

    render() {
        const id = `pagination-${this.props.isPublished ? 'published' : 'active'}`;
        const paginator = (
            <Pagination
                currentPage={this.state.currentPage}
                totalItems={this.props.total}
                changePage={this.changePage}
                pageSize={10}
                goToPage
                id={id} />);

        const tableHeaderClasses = cx({
            'submission-table-content': true,
            loading: this.props.isLoading || this.state.noResults || this.props.errorMessage
        });

        const headers = this.getHeaders();
        // cannot be added to the const because if a user is read only then delete will not be created
        let unsortable = [0, 2, 5, 6];
        if (this.props.isPublished && this.props.type === 'fabs') {
            unsortable = [0, 3, 4];
        }
        else if (this.props.isPublished) {
            unsortable = [4];
        }

        let tableMessage = null;
        if (this.props.isLoading) {
            tableMessage = <LoadingMessage />;
        }
        else if (this.props.errorMessage) {
            tableMessage = <ErrorMessageOverlay errorMessage={this.props.errorMessage} />;
        }
        else if (this.state.noResults) {
            tableMessage = <NoResultsMessage />;
        }

        return (
            <div className="usa-da-submission-list">
                <div className={tableHeaderClasses}>
                    <FormattedTable
                        headers={headers}
                        data={this.state.parsedData}
                        cellClasses={this.state.cellClasses}
                        unsortable={unsortable}
                        headerClasses={this.state.headerClasses}
                        rowClasses={this.state.rowClasses}
                        onSort={this.sortTable} />
                </div>
                <div className="text-center">
                    {tableMessage}
                </div>
                <div className="paginator-wrap">
                    {paginator}
                </div>
            </div>
        );
    }
}

SubmissionsTable.propTypes = propTypes;
SubmissionsTable.defaultProps = defaultProps;
