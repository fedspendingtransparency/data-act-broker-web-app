/**
  * DashboardTable.jsx
  * Created by Daniel Boos 6/29/17
  **/

import React from 'react';
import Reactable from 'reactable';
import _ from 'lodash';

import FormattedTable from '../SharedComponents/table/FormattedTable.jsx';
import SubmissionLink from '../landing/recentActivity/SubmissionLink.jsx';
import HistoryLink from '../dashboard/HistoryLink.jsx';
import * as Status from '../landing/recentActivity//SubmissionStatus.jsx';
import * as LoginHelper from '../../helpers/loginHelper.js';
import * as PermissionsHelper from '../../helpers/permissionsHelper.js';
import DeleteLink from '../landing/recentActivity/DeleteLink.jsx';

import DashboardPaginator from '../dashboard/DashboardPaginator.jsx';

const defaultProps = {
    data: [],
    isLoading: true
};

const tableHeadersActive = [
    'View',
    'Agency',
    'Action Date Range',
    'Submitted By',
    'Last Modified',
    'Status'
];

const tableHeadersCertified = [
    'Action Date Range',
    'Agency',
    'Submitted By',
    'Last Modified',
    'Status',
    'Certified By',
    'Certified On',
    'History'
];

export default class DetachedDashboardTable extends React.Component {
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
            deleteIndex: -1,
            sortColumn: 0,
            sortDirection: 'desc',
            user: true
        }
    };

    componentDidMount() {
        this.props.loadTableData(this.state.currentPage, this.props.isCertified, this.getCategory(), this.state.sortDirection);
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
            this.props.loadTableData(this.state.currentPage, this.props.isCertified, this.getCategory(), this.state.sortDirection);
        });
    }

    reload(){
        this.props.loadTableData(this.state.currentPage, this.props.isCertified, this.getCategory(), this.state.sortDirection);
        this.buildRow();
    }

    deleteWarning(index){
        this.setState({
            deleteIndex: index
        }, () =>{
            this.buildRow()
        })
    }

    sortTable(direction, column) {
        // the table sorting changed
        this.setState({
            sortDirection: direction,
            sortColumn: column
        }, () => {
            // re-display the data
            this.props.loadTableData(this.state.currentPage, this.props.isCertified, this.getCategory(), this.state.sortDirection);
            this.buildRow();
        });
    }

    getCategory(){
        switch(this.state.sortColumn){
            case 1:
                return 'agency';
                break;
            case 2:
                return 'reporting';
                break;
            case 3:
                return 'submitted_by';
                break;
            default:
                return 'modified';
        }
    }

    convertToLocalDate(dateToConvert) {
        // convert date to local date, need to replace the space with a T for Date() formatting
		// Add a Z to the end to imply the date is in UTC
		dateToConvert = dateToConvert.replace(" ", "T") + "Z";
		const tmpDate = new Date(dateToConvert);
        
		// format date as YYYY-MM-DD
		const year = tmpDate.getFullYear()
		let month = tmpDate.getMonth() + 1;
		if(month < 10){
			month = "0" + month;
		}
		let day = tmpDate.getDate();
		if (day < 10){
			day = "0" + day;
		}
		return year + "-" + month + "-" + day;
    }

    buildRow() {
        // iterate through the recent activity
        const output = [];
        const rowClasses = [];

        let classes = ['row-10 text-center', 'row-20 text-center', 'row-15 text-right white-space', 'row-15 text-right', 'row-10 text-right','row-20 text-right progress-cell', 'row-10 text-center'];

        if(this.props.isCertified) {
            classes = ['row-15 text-center', 'row-20 text-right white-space', 'row-12_5 text-right', 'row-10 text-right','row-20 text-right progress-cell', 'row-10 text-center', 'row-10 text-center', 'row-10 text-center']
        }

        // iterate through each item returned from the API
        this.props.data.forEach((item, index) => {
            let reportingDateString = "Earliest: "+item.reporting_start_date + "\nLatest: " + item.reporting_end_date;
            if (!item.reporting_start_date || !item.reporting_end_date) {
                reportingDateString = 'No action dates found';
            }

            let userName = '--';
            if (item.hasOwnProperty('user')) {
                userName = item.user.name;
            }

            let deleteConfirm = false;
            if(this.state.deleteIndex !== -1 && index === this.state.deleteIndex){
                deleteConfirm = true;
            }

            // break the object out into an array for the table component
            let row = [];
            if(this.props.isCertified){
            	let certified_on = item.certified_on;
            	if(certified_on !== "") {
            		certified_on = this.convertToLocalDate(certified_on)
            	}
            	row = [
                    <SubmissionLink submissionId={item.submission_id} value={reportingDateString} />,
                    item.agency,
                    userName,
                    this.convertToLocalDate(item.last_modified),
                    <Status.SubmissionStatus status={item.rowStatus} certified={this.props.isCertified} />,
                    item.certifying_user,
                    certified_on,
                    <HistoryLink submissionId={item.submission_id} />
                ];
            } else {
                row = [
                    <SubmissionLink submissionId={item.submission_id} />,
                    item.agency,
                    reportingDateString,
                    userName,
                    this.convertToLocalDate(item.last_modified),
                    <Status.SubmissionStatus status={item.rowStatus} certified={this.props.isCertified} />
                ];    
                if(PermissionsHelper.checkPermissions(this.props.session)) {
                    if(item.publish_status === "unpublished" && PermissionsHelper.checkAgencyPermissions(this.props.session, item.agency)) {
                        row.push(<DeleteLink submissionId={item.submission_id} index={index} warning={this.deleteWarning.bind(this)} confirm={deleteConfirm} reload={this.reload.bind(this)} item={item} account={this.state.account}/>);
                    }
                    else {
                        row.push("N/A");
                    }   
                }
            }

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

        let newHeaders = tableHeadersActive;

        //cannot be added to the const because if a user is read only then delete will not be created

        if(PermissionsHelper.checkPermissions(this.props.session) && !this.props.isCertified){
            newHeaders = tableHeadersActive.concat('Delete');
        } else if(this.props.isCertified) {
            newHeaders = tableHeadersCertified;
        }
        let unsortable = [0,5,6]
        if(this.isCertified){
        	unsortable = [0,4,7]
        }

        return (
            <div className="usa-da-submission-list">
                <div className={"submission-table-content" + loadingClass}>
                    <FormattedTable headers={newHeaders} data={this.state.parsedData} sortable={true} cellClasses={this.state.cellClasses} unsortable={[0,5,6]} headerClasses={this.state.headerClasses} onSort={this.sortTable.bind(this)} />
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

DetachedDashboardTable.defaultProps = defaultProps;