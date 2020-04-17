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
    isCertified: PropTypes.bool,
    isLoading: PropTypes.bool,
    errorMessage: PropTypes.string
};

const defaultProps = {
    data: [],
    isLoading: true,
    isCertified: true,
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
            this.state.currentPage, this.props.isCertified, this.getCategory(),
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
        if (this.props.isCertified) {
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
                    'Reporting Period\nSubmission ID',
                    'Agency',
                    'Created By',
                    'Last Modified',
                    'Status',
                    'Certification'
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
                dateName = 'Reporting Period';
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
        if (this.props.isCertified) {
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
                    return 'certified_date';
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
        const progressSize = this.props.type === 'fabs' ? 15 : 20;
        const viewSize = this.props.type === 'fabs' ? 15 : 10;
        let classes = ['row-10 text-center', 'row-20 text-left', 'row-15 white-space', 'row-12_5', 'row-12_5',
            `row-${progressSize} progress-cell`, 'row-10 text-center'];

        if (this.props.isCertified) {
            classes = [`row-${viewSize} text-center`, 'row-20', 'row-12_5', 'row-10', 'row-20 progress-cell',
                'row-15 text-center'];
            if (this.props.type === 'fabs') {
                classes = ['row-10 text-center', 'row-25', 'row-10', 'row-15 white-space', 'row-10',
                    'row-10 text-center'];
            }
        }

        // iterate through each item returned from the API
        this.props.data.forEach((item, index) => {
            // break the object out into an array for the table component
            const row = this.formatRow(item, index);

            rowClasses.push(classes);
            output.push(row);
        });

        const headerClasses = classes;

        let noResults = false;
        if (this.props.data.length === 0) {
            noResults = true;
        }

        this.setState({
            parsedData: output,
            cellClasses: rowClasses,
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

        let link = <SubmissionLink submissionId={item.submission_id} type={this.props.type} />;

        if (this.props.isCertified) {
            link = (<SubmissionLink
                submissionId={item.submission_id}
                value={reportingDateString}
                type={this.props.type} />);
        }

        let row = [];
        if (this.props.isCertified) {
            // Certified Submissions table
            row = [
                link,
                this.getAgency(item),
                userName
            ];

            const certifiedOn = item.certified_on !== '' ? UtilHelper.convertToLocalDate(item.certified_on) :
                item.certified_on;
            if (this.props.type === 'fabs') {
                row = row.concat([
                    reportingDateString,
                    item.certifying_user,
                    certifiedOn
                ]);
            }
            else {
                row = row.concat([
                    UtilHelper.convertToLocalDate(item.last_modified),
                    <Status.SubmissionStatus status={item.rowStatus} certified={this.props.isCertified} />,
                    <span>
                        {item.certifying_user}<br />
                        {certifiedOn}<br />
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
                UtilHelper.convertToLocalDate(item.last_modified),
                <Status.SubmissionStatus status={item.rowStatus} certified={this.props.isCertified} />
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
                this.state.currentPage, this.props.isCertified, this.getCategory(),
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
                this.state.currentPage, this.props.isCertified, this.getCategory(),
                this.state.sortDirection, this.props.appliedFilters
            );
        });
    }

    reload() {
        this.props.loadTableData(
            this.state.currentPage, this.props.isCertified, this.getCategory(),
            this.state.sortDirection, this.props.appliedFilters
        );
        this.buildRow();
    }

    loadUser() {
        LoginHelper.fetchActiveUser().then((user) => {
            this.setState({ account: user });
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
        const paginator = (
            <Pagination
                currentPage={this.state.currentPage}
                totalItems={this.props.total}
                changePage={this.changePage}
                pageSize={10}
                goToPage />);

        const tableHeaderClasses = cx({
            'submission-table-content': true,
            loading: this.props.isLoading || this.state.noResults || this.props.errorMessage
        });

        const headers = this.getHeaders();
        // cannot be added to the const because if a user is read only then delete will not be created
        let unsortable = [0, 2, 5, 6];
        if (this.props.isCertified && this.props.type === 'fabs') {
            unsortable = [0, 3, 4];
        }
        else if (this.props.isCertified) {
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
