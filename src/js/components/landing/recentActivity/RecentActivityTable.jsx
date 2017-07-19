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

	componentWillReceiveProps(nextProps){
		if (this.props.type != nextProps.type) {
			this.loadActivity(nextProps.type);
			this.loadUser();
		}
	}

	componentDidMount() {
		this.loadActivity();
		this.loadUser();
		this.didUnmount = false;
	}

	componentWillUnmount() {
		this.didUnmount = true;
	}

	loadUser(){
		LoginHelper.fetchActiveUser().then((user)=>{
			this.setState({account: user});
		});
	}

	convertToLocalDate(dateToConvert) {
        // convert date to local date (toString converts it to whatever the local time is but doesn't allow formatting)
        const tmpDate = new Date(dateToConvert + " UTC");
        const localDate = new Date(tmpDate.toString())
        
        // format date as YYYY-MM-DD
        const year = localDate.getFullYear()
        let month = localDate.getMonth()+1;
        if(month < 10){
            month = "0"+month;
        }
        let day = localDate.getDate();
        if(day <10){
            day = "0"+day;
        }
        return year + "-" + month + "-" + day;
    }

	loadActivity(type=this.props.type) {
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
	
	reload(){
        this.loadActivity();
        this.buildRow();
    }

    deleteWarning(index){
        this.setState({
            deleteIndex: index
        }, () =>{
            this.buildRow()
        })
    }

    getHeaders(){
    	let headers = [];
		if (this.props.type == 'fabs') {
			headers = [
				'View',
			    'Agency',
			    'Action Date Range',
			    'Submitted By',
			    'Last Modified'
		    ];
		    if (PermissionsHelper.checkFabsWriterPerms(this.props.session)) {
		    	headers.push('Delete');
		    }
		}
		else {
			headers = [
				'View',
				'Agency',
				'Reporting Period',
				'Submitted By',
				'Last Modified',
				'Status'
			];
			if (PermissionsHelper.checkDabsWriterPerms(this.props.session)) {
				headers.push('Delete');
			}
		}
		return headers;
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
		if (this.props.type == 'fabs') {
			classes = ['row-10 text-center', 'row-40 text-center', 'row-15 text-right white-space', 'row-15 text-right', 'row-15 text-right','row-10 text-center'];
		}
		// sort the array by object key
		const orderKeys = ['sortableAgency', 'sortableReportingDate', 'sortableName', 'sortableDate'];
		const data = _.orderBy(this.state.cachedResponse, orderKeys[this.state.sortColumn - 1], this.state.sortDirection);

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
			message: (data.length == 0) ? 'No recent activity' : ''
		});
	}

	formatRow(rowData, index) {
		let link = <SubmissionLink submissionId={rowData.submission_id} disabled={(rowData.publish_status === "published")} />
		
		let reportingDateString = "Start: " + rowData.reporting_start_date + "\nEnd: " + rowData.reporting_end_date;
		if (!rowData.reporting_start_date || !rowData.reporting_end_date) {
			reportingDateString = 'No reporting period specified';
		}
		let userName = rowData.hasOwnProperty('user') ? rowData.user.name : '--';
		let deleteConfirm = (this.state.deleteIndex !== -1 && index === this.state.deleteIndex);

		let row = [
				link,
				rowData.agency,
				reportingDateString,
				userName,
				this.convertToLocalDate(rowData.last_modified)
			];
		if (this.props.type == 'fabs') {
            if (PermissionsHelper.checkFabsWriterPerms(this.props.session)) {
	            if(rowData.publish_status === "unpublished" && PermissionsHelper.checkFabsAgencyPermissions(this.props.session, rowData.agency)) {
	                row.push(<DeleteLink submissionId={rowData.submission_id} index={index} warning={this.deleteWarning.bind(this)} confirm={deleteConfirm} reload={this.reload.bind(this)} item={rowData} account={this.state.account}/>);
	            }
	            else {
	                row.push("N/A");
	            }
	        }
        }
        else {
        	row.push(<Status.SubmissionStatus status={rowData.rowStatus} certified={rowData.publish_status !== 'unpublished'} />);

        	if (PermissionsHelper.checkDabsWriterPerms(this.props.session)) {
	            if (rowData.publish_status === "unpublished" && PermissionsHelper.checkDabsAgencyPermissions(this.props.session, rowData.agency)) {
	                row.push(<DeleteLink submissionId={rowData.submission_id} index={index} warning={this.deleteWarning.bind(this)} confirm={deleteConfirm} reload={this.reload.bind(this)} item={rowData} account={this.state.account}/>);
	            }
	            else {
	                row.push("N/A");
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
        	this.buildRow();
        });
    }


	render() {
		return (
			<div className="usa-da-recent-activity">
				<FormattedTable headers={this.getHeaders()} data={this.state.data} sortable={true} cellClasses={this.state.cellClasses} headerClasses={this.state.headerClasses} unsortable={[0,5,6]} onSort={this.sortTable.bind(this)} />
				<div className="text-center">
					{this.state.message}
				</div>
			</div>
		);
	}
}