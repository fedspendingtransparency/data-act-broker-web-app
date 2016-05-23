/**
  * RecentActivityTable.jsx
  * Created by Kevin Li 5/16/16
  **/

import React from 'react';
import FormattedTable from '../../SharedComponents/table/FormattedTable.jsx';
import SubmissionLink from './SubmissionLink.jsx';

import * as RecentActivityHelper from '../../../helpers/recentActivityHelper.js';
import * as Status from './SubmissionStatus.jsx';


export default class RecentActivityTable extends React.Component {
	constructor(props) {
		super(props);

		this.tableHeaders = [
			'View',
			'Last Modified Date',
			'Size',
			'Status',
			'Errors'
		];

		this.state = {
			data: [],
			cellClasses: [],
			headerClasses: [],
			message: 'Loading recent activity...'
		};
	}

	componentDidMount() {
		this.loadActivity();
	}

	loadActivity() {
		RecentActivityHelper.loadActivity()
			.then((data) => {
				this.parseActivity(data);
			})
			.catch((err) => {
				this.setState({
					message: 'An error occurred while loading recent activity.'
				});
				console.log(err);
			});
	}

	parseActivity(data) {
		// iterate through the recent activity
		const output = [];
		const rowClasses = [];

		const classes = ['row-10 text-center', 'row-20 text-right', 'row-20 text-right', 'row-30 text-right progress-cell', 'row-10 text-right'];

		const statusMap = {
			'ready': Status.StatusTypes.STARTED,
			'waiting': Status.StatusTypes.STARTED,
			'running': Status.StatusTypes.INPROGRESS,
			'finished': Status.StatusTypes.VALIDATED,
			'invalid': Status.StatusTypes.HASERRORS,
			'failed': Status.StatusTypes.HASERRORS
		};

		data.forEach((item) => {

			let rowStatus = Status.StatusTypes.UNKNOWN
			if (statusMap.hasOwnProperty(item.status)) {
				rowStatus = statusMap[item.status];
			}

			const row = [
				<SubmissionLink submissionId={item.submission_id} />,
				item.last_modified,
				item.size,
				<Status.SubmissionStatus status={rowStatus} />,
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

	render() {
		return (
			<div className="usa-da-recent-activity">
				<FormattedTable headers={this.tableHeaders} data={this.state.data} sortable={false} cellClasses={this.state.cellClasses} headerClasses={this.state.headerClasses} />
				<div className="text-center">
					{this.state.message}
				</div>
			</div>
		);
	}
}