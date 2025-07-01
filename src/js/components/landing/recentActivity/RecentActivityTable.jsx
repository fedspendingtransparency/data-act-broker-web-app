/**
 * RecentActivityTable.jsx
 * Created by Kevin Li 5/16/16
 */

import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import * as SubmissionListHelper from 'helpers/submissionListHelper';
import * as PermissionsHelper from 'helpers/permissionsHelper';
import FormattedTable from 'components/SharedComponents/table/FormattedTable';
import LastModifiedCell from 'components/landing/recentActivity/LastModifiedCell';
import SubmissionLink from './SubmissionLink';
import DeleteLink from './DeleteLink';
import * as Status from './SubmissionStatus';

const propTypes = {
    session: PropTypes.object,
    type: PropTypes.string
};

const defaultProps = {
    session: {},
    type: ''
};

export default class RecentActivityTable extends React.Component {
    constructor(props) {
        super(props);

        this.didUnmount = false;

        this.state = {
            cachedResponse: [],
            data: [],
            cellClasses: [],
            headerClasses: [],
            rowClasses: [],
            message: 'Loading recent activity...',
            sortDirection: 'desc',
            sortColumn: 4,
            account: null,
            user: true
        };
    }

    componentDidMount() {
        this.loadActivity();
        this.loadUser();
        this.didUnmount = false;
    }

    componentDidUpdate(prevProps) {
        if (prevProps.type !== this.props.type) {
            this.loadActivity(this.props.type);
            this.loadUser();
        }
    }

    componentWillUnmount() {
        this.didUnmount = true;
    }

    getAgency(item) {
        let agency = item.agency;
        if (this.props.type === 'fabs') {
            agency += `:\n${item.files[0]
                .split('/')
                .pop()
                .replace(/^[0-9]*_/, '')}`;
        }
        return agency;
    }

    getHeaders() {
        let headers = [];
        if (this.props.type === 'fabs') {
            headers = [
                'Submission ID',
                'Agency: Filename',
                'Action Date Range',
                'Created By',
                'Last Modified'
            ];
            if (PermissionsHelper.checkFabsPermissions(this.props.session)) {
                headers.push('Delete');
            }
        }
        else {
            headers = [
                'View',
                'Agency',
                'Reporting Period (CY)',
                'Created By',
                'Last Modified',
                'Status'
            ];
            if (PermissionsHelper.checkPermissions(this.props.session)) {
                headers.push('Delete');
            }
        }
        return headers;
    }

    deleteWarning(index) {
        this.setState(
            {
                deleteIndex: index
            },
            () => {
                this.buildRow();
            }
        );
    }

    reload() {
        this.loadActivity();
        this.buildRow();
    }

    loadUser() {
        // Leaving this as a function in case the user changes and we want to update it
        this.setState({
            account: this.props.session.user
        });
    }

    loadActivity(type = this.props.type) {
        SubmissionListHelper.loadRecentActivity(type)
            .then((res) => {
                if (this.didUnmount) {
                    return;
                }
                // save the response for sorting later
                this.setState(
                    {
                        cachedResponse: SubmissionListHelper.parseRecentActivity(res.data.submissions)
                    },
                    () => {
                        // show the response once the data is in place
                        this.buildRow();
                    }
                );
            })
            .catch((err) => {
                if (this.didUnmount) {
                    return;
                }
                this.setState({
                    message: 'An error occurred while loading recent activity.'
                });
                console.error(err);
            });
    }

    buildRow() {
        // iterate through the recent activity
        const output = [];
        const allCellClasses = [];
        const rowClasses = [];

        let baseCellClasses = [
            'row-12_5',
            'row-17_5',
            'row-15 white-space',
            'row-12_5',
            'row-15',
            'row-20 progress-cell',
            'row-7_5 text-center'
        ];
        if (this.props.type === 'fabs') {
            baseCellClasses = [
                'row-10 text-center',
                'row-35',
                'row-15',
                'row-15',
                'row-15',
                'row-10 text-center'
            ];
        }
        const headerClasses = [...baseCellClasses];
        headerClasses[headerClasses.length - 1] = headerClasses[headerClasses.length - 1].split(' ')[0];

        // sort the array by object key
        const orderKeys = [
            'sortableAgency',
            'sortableReportingDate',
            'sortableName',
            'sortableDate'
        ];
        // When sorting the FABS recent activity table, we need two values to sort by the agency/filename column
        if (this.props.type === 'fabs') {
            orderKeys[0] = ['sortableAgency', 'sortableFileName'];
        }
        const data = _.orderBy(
            this.state.cachedResponse,
            orderKeys[this.state.sortColumn - 1],
            this.state.sortDirection
        );

        // iterate through each item returned from the API
        data.forEach((item, index) => {
            // break the object out into an array for the table component
            const row = this.formatRow(item, index);

            const rowClass = item.test_submission ? 'test-submission-row' : '';

            rowClasses.push(rowClass);
            allCellClasses.push(baseCellClasses);
            output.push(row);
        });

        this.setState({
            data: output,
            cellClasses: allCellClasses,
            headerClasses,
            rowClasses,
            message: data.length === 0 ? 'No recent activity' : ''
        });
    }

    formatRow(rowData, index) {
        const link = (<SubmissionLink
            submissionId={rowData.submission_id}
            type={this.props.type}
            testSubmission={rowData.test_submission} />);
        let reportingDateString = `Start: ${rowData.reporting_start_date}\nEnd: ${rowData.reporting_end_date}`;
        if (this.props.type === 'fabs') {
            reportingDateString = `Earliest: ${rowData.reporting_start_date}\nLatest: ${rowData.reporting_end_date}`;
        }

        if (!rowData.reporting_start_date || !rowData.reporting_end_date) {
            reportingDateString = 'No reporting period specified';
        }

        const userName = Object.prototype.hasOwnProperty.call(rowData, 'user')
            ? rowData.user.name
            : '--';

        const row = [
            link,
            this.getAgency(rowData),
            reportingDateString,
            userName,
            <LastModifiedCell expirationDate={rowData.expiration_date} lastModified={rowData.last_modified} />
        ];

        const unpublished = rowData.publish_status === 'unpublished';
        const certfied = rowData.certified;
        let deleteCol = false;
        let canDelete = false;
        if (this.props.type === 'fabs') {
            deleteCol = PermissionsHelper.checkFabsPermissions(this.props.session);
            canDelete = PermissionsHelper.checkFabsAgencyPermissions(
                this.props.session,
                rowData.agency
            );
        }
        else {
            row.push(
                <Status.SubmissionStatus status={rowData.rowStatus} published={!unpublished} certified={certfied} />
            );

            deleteCol = PermissionsHelper.checkPermissions(this.props.session);
            canDelete = PermissionsHelper.checkAgencyPermissions(
                this.props.session,
                rowData.agency
            );
        }

        if (deleteCol) {
            if (canDelete && unpublished) {
                const deleteConfirm =
                    this.state.deleteIndex !== -1 && index === this.state.deleteIndex;
                row.push(
                    <DeleteLink
                        submissionId={rowData.submission_id}
                        index={index}
                        warning={this.deleteWarning.bind(this)}
                        confirm={deleteConfirm}
                        reload={this.reload.bind(this)}
                        item={rowData}
                        account={this.state.account} />
                );
            }
            else {
                row.push('N/A');
            }
        }
        return row;
    }

    sortTable(direction, column) {
        // the table sorting changed
        let dir = direction;
        // When sorting by agency/filename in FABS, we need two directions
        if (this.props.type === 'fabs' && column === 1) {
            dir = [direction, direction];
        }
        this.setState(
            {
                sortDirection: dir,
                sortColumn: column
            },
            () => {
                // re-display the data
                this.buildRow();
            }
        );
    }

    render() {
        return (
            <div className="usa-da-recent-activity">
                <FormattedTable
                    headers={this.getHeaders()}
                    data={this.state.data}
                    cellClasses={this.state.cellClasses}
                    headerClasses={this.state.headerClasses}
                    rowClasses={this.state.rowClasses}
                    unsortable={[0, 2, 5, 6]}
                    onSort={this.sortTable.bind(this)} />
                <div className="text-center">{this.state.message}</div>
            </div>
        );
    }
}

RecentActivityTable.propTypes = propTypes;
RecentActivityTable.defaultProps = defaultProps;
