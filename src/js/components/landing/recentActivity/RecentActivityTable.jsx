/**
  * RecentActivityTable.jsx
  * Created by Kevin Li 5/16/16
  **/

import React from 'react';
import _ from 'lodash';
import FormattedTable from '../../SharedComponents/table/FormattedTable.jsx';
import SubmissionLink from './SubmissionLink.jsx';
import DeleteLink from './DeleteLink.jsx';

import * as SubmissionListHelper from '../../../helpers/submissionListHelper.js';
import * as LoginHelper from '../../../helpers/loginHelper.js';
import * as PermissionsHelper from '../../../helpers/permissionsHelper.js';
import * as Status from './SubmissionStatus.jsx';


export default class RecentActivityTable extends React.Component {
    constructor(props) {
        super(props);

        this.didUnmount = false;

        this.state = {
            cachedResponse: [],
            data: [],
            cellClasses: [],
            headerClasses: [],
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

    componentWillReceiveProps(nextProps) {
        if (this.props.type !== nextProps.type) {
            this.loadActivity(nextProps.type);
            this.loadUser();
        }
    }

    componentWillUnmount() {
        this.didUnmount = true;
    }

    getAgency(item) {
        let agency = item.agency;
        if (this.props.type === 'fabs') {
            agency += ":\n" + item.files[0].split('/').pop().replace(/^[0-9]*_/, "");
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
                'Submission ID',
                'Agency',
                'Reporting Period',
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
        this.setState({
            deleteIndex: index
        }, () => {
            this.buildRow();
        });
    }

    reload() {
        this.loadActivity();
        this.buildRow();
    }

    loadUser() {
        LoginHelper.fetchActiveUser().then((user) => {
            this.setState({ account: user });
        });
    }

    loadActivity(type = this.props.type) {
        SubmissionListHelper.loadRecentActivity(type)
            .then((data) => {
                if (this.didUnmount) {
                    return;
                }
                // save the response for sorting later
                this.setState({
                    cachedResponse: data.submissions
                }, () => {
                    // show the response once the data is in place
                    this.buildRow();
                });
            })
            .catch((err) => {
                if (this.didUnmount) {
                    return;
                }
                this.setState({
                    message: 'An error occurred while loading recent activity.'
                });
                console.log(err);
            });
    }

    convertToLocalDate(dateToConvert) {
        // convert date to local date, need to replace the space with a T for Date() formatting
        // Add a Z to the end to imply the date is in UTC
        const formattedDate = dateToConvert.replace(" ", "T") + "Z";
        const tmpDate = new Date(formattedDate);

        // format date as YYYY-MM-DD
        const year = tmpDate.getFullYear();
        let month = tmpDate.getMonth() + 1;
        if (month < 10) {
            month = "0" + month;
        }
        let day = tmpDate.getDate();
        if (day < 10) {
            day = "0" + day;
        }
        return year + "-" + month + "-" + day;
    }

    buildRow() {
        // iterate through the recent activity
        const output = [];
        const rowClasses = [];

        let classes = ['row-10 text-center', 'row-20 text-center', 'row-15 text-right white-space', 'row-15 text-right',
            'row-10 text-right', 'row-20 text-right progress-cell', 'row-10 text-center'];
        if (this.props.type === 'fabs') {
            classes = ['row-10 text-center', 'row-40 text-center', 'row-15 text-right', 'row-15 text-right',
                'row-15 text-right', 'row-10 text-center'];
        }
        // sort the array by object key
        const orderKeys = ['sortableAgency', 'sortableReportingDate', 'sortableName', 'sortableDate'];
        const data = _.orderBy(this.state.cachedResponse, orderKeys[this.state.sortColumn - 1],
            this.state.sortDirection);

        // iterate through each item returned from the API
        data.forEach((item, index) => {
            // break the object out into an array for the table component
            const row = this.formatRow(item, index);

            rowClasses.push(classes);
            output.push(row);
        });

        const headerClasses = classes;

        this.setState({
            data: output,
            cellClasses: rowClasses,
            headerClasses: headerClasses,
            message: (data.length === 0) ? 'No recent activity' : ''
        });
    }

    formatRow(rowData, index) {
        let link = <SubmissionLink submissionId={rowData.submission_id} type={this.props.type} />;
        let reportingDateString = "Start: " + rowData.reporting_start_date + "\nEnd: " + rowData.reporting_end_date;

        if (!rowData.reporting_start_date || !rowData.reporting_end_date) {
            reportingDateString = 'No reporting period specified';
        }
        let userName = rowData.hasOwnProperty('user') ? rowData.user.name : '--';

        let row = [
            link,
            this.getAgency(rowData),
            reportingDateString,
            userName,
            this.convertToLocalDate(rowData.last_modified)
        ];

        let unpublished = rowData.publish_status === 'unpublished';
        let deleteCol = false;
        let canDelete = false;
        if (this.props.type === 'fabs') {
            deleteCol = PermissionsHelper.checkFabsPermissions(this.props.session);
            canDelete = PermissionsHelper.checkFabsAgencyPermissions(this.props.session, rowData.agency);
        }
        else {
            row.push(<Status.SubmissionStatus status={rowData.rowStatus} certified={!unpublished} />);

            deleteCol = PermissionsHelper.checkPermissions(this.props.session);
            canDelete = PermissionsHelper.checkAgencyPermissions(this.props.session, rowData.agency);
        }

        if (deleteCol) {
            if (canDelete && unpublished) {
                let deleteConfirm = (this.state.deleteIndex !== -1 && index === this.state.deleteIndex);
                row.push(<DeleteLink submissionId={rowData.submission_id} index={index}
                    warning={this.deleteWarning.bind(this)} confirm={deleteConfirm} reload={this.reload.bind(this)}
                    item={rowData} account={this.state.account}/>);
            }
            else {
                row.push("N/A");
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
            this.buildRow();
        });
    }


    render() {
        return (
            <div className="usa-da-recent-activity">
                <FormattedTable headers={this.getHeaders()} data={this.state.data} sortable={true}
                    cellClasses={this.state.cellClasses} headerClasses={this.state.headerClasses}
                    unsortable={[0, 2, 5, 6]} onSort={this.sortTable.bind(this)} />
                <div className="text-center">
                    {this.state.message}
                </div>
            </div>
        );
    }
}
