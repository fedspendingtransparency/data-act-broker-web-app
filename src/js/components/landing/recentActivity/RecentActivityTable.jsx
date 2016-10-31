/**
  * RecentActivityTable.jsx
  * Created by Kevin Li 5/16/16
  **/

import React from 'react';
import _ from 'lodash';
import FormattedTable from '../../SharedComponents/table/FormattedTable.jsx';
import SubmissionLink from './SubmissionLink.jsx';

import * as SubmissionListHelper from '../../../helpers/submissionListHelper.js';
import * as Status from './SubmissionStatus.jsx';


export default class RecentActivityTable extends React.Component {
	constructor(props) {
		super(props);

		this.didUnmount = false;

		this.tableHeaders = [
			'View',
			'Reporting Period',
			'Submitted By',
			'Last Modified Date',
			'Size',
			'Status',
			'Errors'
		];

		this.state = {
			cachedResponse: [],
			data: [],
			cellClasses: [],
			headerClasses: [],
			message: 'Loading recent activity...',
			sortDirection: 'desc',
			sortColumn: 1
		};
	}

	componentDidMount() {
		this.loadActivity();
		this.didUnmount = false;
	}

	componentWillUnmount() {
		this.didUnmount = true;
	}

	loadActivity() {
		SubmissionListHelper.loadRecentActivity()
			.then((data) => {
				if (this.didUnmount) {
					return;
				}
				// save the response for sorting later
				this.setState({
					cachedResponse: data
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

	buildRow() {
		// iterate through the recent activity
		const output = [];
		const rowClasses = [];

		const classes = ['row-10 text-center', 'row-15 text-right', 'row-15 text-right', 'row-15 text-right','row-10 text-right', 'row-25 text-right progress-cell', 'row-10 text-right'];

		// sort the array by object key
		const orderKeys = ['sortableReportingDate', 'sortableName', 'sortableDate', 'sortableSize', 'sortableStatus', 'errors'];
		const data = _.orderBy(this.state.cachedResponse, orderKeys[this.state.sortColumn - 1], this.state.sortDirection);

		// iterate through each item returned from the API
		data.forEach((item) => {

			let reportingDateString = item.reporting_start_date + ' to ' + item.reporting_end_date;
			if (!item.reporting_start_date || !item.reporting_end_date) {
				reportingDateString = 'No reporting period specified';
			}

			let userName = '--';
			if (item.hasOwnProperty('user')) {
				userName = item.user.name;
			}

            // break the object out into an array for the table component
			const row = [
				<SubmissionLink submissionId={item.submission_id} />,
				reportingDateString,
				userName,
				item.last_modified,
				item.fileSize,
				<Status.SubmissionStatus status={item.rowStatus} />,
				item.errors
			];

			rowClasses.push(classes);
			output.push(row);
		});

		const headerClasses = classes;

		let message = '';
		if (data.length == 0) {
			message = 'No recent activity';
		}

		this.setState({
			data: output,
			cellClasses: rowClasses,
			headerClasses: headerClasses,
			message: message
		});
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
				<FormattedTable headers={this.tableHeaders} data={this.state.data} sortable={true} cellClasses={this.state.cellClasses} headerClasses={this.state.headerClasses} unsortable={[0]} onSort={this.sortTable.bind(this)} />
				<div className="text-center">
					{this.state.message}
				</div>
			</div>
		);
	}
}