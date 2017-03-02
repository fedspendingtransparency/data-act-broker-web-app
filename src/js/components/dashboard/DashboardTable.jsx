/**
  * DashboardTable.jsx
  * Created by Kevin Li 10/28/16
  **/

import React from 'react';
import Reactable from 'reactable';
import _ from 'lodash';

import FormattedTable from '../SharedComponents/table/FormattedTable.jsx';
import SubmissionLink from '../landing/recentActivity/SubmissionLink.jsx';
import * as Status from '../landing/recentActivity//SubmissionStatus.jsx';
import * as LoginHelper from '../../helpers/loginHelper.js';
import DeleteLink from '../landing/recentActivity/DeleteLink.jsx';

import DashboardPaginator from './DashboardPaginator.jsx';

const defaultProps = {
    data: [],
    isLoading: true
};

const tableHeaders = [
    'View',
    'Agency',
    'Reporting Period',
    'Submitted By',
    'Last Modified Date',
    'Status',
    'Delete'
];

export default class DashboardTable extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            parsedData: [],
            cellClasses: [],
            headerClasses: [],
            message: 'Loading submissions...',
            currentPage: 1,
            totalPages: 1,
            account: null,
            user: true
        }
    };

    componentDidMount() {
        this.props.loadTableData(this.state.currentPage, this.props.isCertified);
        this.loadUser();
    }

    componentDidUpdate(prevProps, prevState) {
        if (!_.isEqual(prevProps.data, this.props.data)) {
            this.buildRow();
        }
    }

    loadUser(){
        LoginHelper.fetchActiveUser().then((user)=>{
            this.setState({account: user});
        })
    }

    changePage(newPage) {
        this.setState({
            currentPage: newPage,
        }, () => {
            this.props.loadTableData(this.state.currentPage, this.props.isCertified);
        });
    }

    reload(){
        this.props.loadTableData(this.state.currentPage, this.props.isCertified);
        buildRow();
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

    buildRow() {
        // iterate through the recent activity
        const output = [];
        const rowClasses = [];

        const classes = ['row-10 text-center', 'row-20 text-center', 'row-15 text-right white-space', 'row-15 text-right', 'row-15 text-right','row-15 text-right progress-cell', 'row-10 text-center'];

        // iterate through each item returned from the API
        this.props.data.forEach((item) => {

            let reportingDateString = "Start: "+item.reporting_start_date + "\nEnd: " + item.reporting_end_date;
            if (!item.reporting_start_date || !item.reporting_end_date) {
                reportingDateString = 'No reporting period specified';
            }

            let userName = '--';
            if (item.hasOwnProperty('user')) {
                userName = item.user.name;
            }

            // break the object out into an array for the table component
            const row = 
            [
                <SubmissionLink submissionId={item.submission_id} />,
                item.agency,
                reportingDateString,
                userName,
                item.last_modified,
                <Status.SubmissionStatus status={item.rowStatus} />,
                <DeleteLink submissionId={item.submission_id} reload={this.reload.bind(this)} item={item} account={this.state.account}/>
            ];

            rowClasses.push(classes);
            output.push(row);
        });

        const headerClasses = classes;

        let message = '';
        if (this.props.data.length == 0) {
            message = 'No submissions to list';
        }

        this.setState({
            parsedData: output,
            cellClasses: rowClasses,
            headerClasses: headerClasses,
            message: message,
            totalPages: Math.ceil(this.props.total / 10)
        });
    }

    render() {
        let paginator;

        if (this.state.totalPages > 1) {
            paginator = <DashboardPaginator
                current={this.state.currentPage}
                total={this.state.totalPages}
                changePage={this.changePage.bind(this)} />;
        }

        let loadingClass = '';
        if (this.props.isLoading) {
            loadingClass = ' loading';
        }

        return (
            <div className="usa-da-submission-list">
                <div className={"submission-table-content" + loadingClass}>
                    <FormattedTable headers={tableHeaders} data={this.state.parsedData} sortable={true} cellClasses={this.state.cellClasses} unsortable={[0,6]} headerClasses={this.state.headerClasses} onSort={this.sortTable.bind(this)} />
                </div>
                <div className="text-center">
                    {this.state.message}
                </div>
                <div className="paginator-wrap">
                    {paginator}
                </div>
            </div>
        );
    }
}

DashboardTable.defaultProps = defaultProps;