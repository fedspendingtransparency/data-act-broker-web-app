/**
  * GenerateFilesContainer.jsx
  * Created by Kevin Li 7/22/16
  */

import React from 'react'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { hashHistory } from 'react-router';

import moment from 'moment';
import _ from 'lodash';
import Q from 'q';

import { kGlobalConstants } from '../../GlobalConstants.js';
import GenerateFilesContent from '../../components/generateFiles/GenerateFilesContent.jsx';

import * as uploadActions from '../../redux/actions/uploadActions.js';

import * as GenerateFilesHelper from '../../helpers/generateFilesHelper.js';
import * as UtilHelper from '../../helpers/util.js';

class GenerateFilesContainer extends React.Component {

	constructor(props) {
		super(props);

		this.state = {
			state: 'loading',
			d1: {
				startDate: null,
				endDate: null,
				error: {
					show: false,
					header: '',
					description: ''
				}
			},
			d2: {
				startDate: null,
				endDate: null,
				error: {
					show: false,
					header: '',
					description: ''
				}
			},
			d1Status: "waiting",
			d2Status: "waiting",
			errorDetails: ""
		};
	}

	componentDidMount() {
		this.loadSubmissionData();
	}

	parseDate(raw, type) {
		// convert the API dates back into date objects
		let month;
		let day;
		let year;

		if (raw.indexOf('Q') > -1) {
			// it's quarters!
			const quarter = raw.split('/')[0].substring(1);
			const rawYear = raw.split('/')[1];
			const monthDay = UtilHelper.quarterToMonth(quarter, rawYear, type);
			month = monthDay.split('/')[0];
			year = monthDay.split('/')[1];
		}

		// now we need to calculate the day of month
		if (type == 'start') {
			day = '01';
		}
		else if (type == 'end') {
			const date = moment().month(parseInt(month) + 1).year(year);
			day = date.endOf('month').format('DD');
		}

		return month + '/' + day + '/' + year;
	}

	loadSubmissionData() {
		// prepopulate the fields with the submission metadata dates
		GenerateFilesHelper.fetchSubmissionMetadata(this.props.submissionID)
			.then((data) => {
				this.props.setSubmissionId(this.props.submissionID);

				// check if quarter or month
				const defaultStart = moment(this.parseDate(data.reporting_period_start_date, 'start'), 'MM/DD/YYYY');
				const defaultEnd = moment(this.parseDate(data.reporting_period_end_date, 'end'), 'MM/DD/YYYY');

				const output = {
					state: 'ready',
					d1: {
						startDate: defaultStart,
						endDate: defaultEnd,
					},
					d2: {
						startDate: defaultStart,
						endDate: defaultEnd
					}
				};

				// object.assign doesn't merge correctly, so using lodash to merge
				const mergedState = _.merge({}, this.state, output);
				this.setState(mergedState, () => {
					this.validateDates();
				});
			})
			.catch((err) => {
				console.log(err);
			})
	}

	handleDateChange(file, date, dateType) {
    	// merge the new date into the file's state without affecting the other keys
    	const newState = Object.assign(this.state[file], {
    		[dateType]: moment(date)
    	});

    	this.setState({
    		[file]: newState
    	}, () => {
    		this.validateDates();
    	});
	}

	validateDates() {
		// validate that dates are provided for both fields and the end dates don't come before the start dates
		let state = "incomplete";

    	const types = ['d1', 'd2'];

    	const d1 = Object.assign({}, this.state.d1);
    	const d2 = Object.assign({}, this.state.d2);

    	const output = {
    		d1: d1,
    		d2: d2
    	};

    	let allValid = true;
    	types.forEach((type) => {
    		// validate the date ranges
    		const start = this.state[type].startDate;
    		const end = this.state[type].endDate;
    		if (start && end) {
    			// both sets of dates exist
    			if (!end.isSameOrAfter(start)) {
    				// end date comes before start date, invalid
    				allValid = false;
    				// show an error message
    				output[type].error = {
    					show: true,
    					header: 'Invalid Dates',
    					description: 'The end date cannot be earlier than the start date.'
    				};
    			}
    			else {
    				// valid!
    				output[type].error = {
    					show: false,
    					header: '',
    					description: ''
    				};
    			}
    		}
    		else {
    			// not all dates exist yet
    			allValid = false;
    			output[type].error = {
					show: false,
					header: '',
					description: ''
				};
    		}
    	});

        if (allValid) {
            state = "ready";
        }

        output.state = state;

    	this.setState(output);
	}

	showError(file, header, description) {
		const state = Object.assign({}, this.state[file], {
			error: {
				show: true,
				header: header,
				description: description
			}
		});
		
		this.setState({
			[file]: state
		});
	}

	hideError(file) {
		const state = Object.assign({}, this.state[file], {
			error: {
				show: false,
				header: '',
				description: ''
			}
		});

		this.setState({
			[file]: state
		});
	}

	generateFiles() {
		this.setState({
			state: 'generating'
		});
		// submit both D1 and D2 date ranges to the API
		Q.all([
			GenerateFilesHelper.generateFile('d1', this.props.submissionID, this.state.d1.startDate.format('MM/DD/YYYY'), this.state.d1.endDate.format('MM/DD/YYYY')),
			GenerateFilesHelper.generateFile('d2', this.props.submissionID, this.state.d2.startDate.format('MM/DD/YYYY'), this.state.d2.endDate.format('MM/DD/YYYY')),
		])
			.then((allResponses) => {
				this.parseFileStates(allResponses);
			})
			.catch((err) => {
				let errorMessage = 'An error occurred while contacting the server.';
				if (err && err.body) {
					errorMessage = err.body.message;	
				}

				this.setState({
					state: 'failed',
					errorDetails: errorMessage
				});
			});

	}

	checkFileStatus() {
		// check the status of both D1 and D2 files
		Q.all([
			GenerateFilesHelper.fetchFile('d1', this.props.submissionID),
			GenerateFilesHelper.fetchFile('d2', this.props.submissionID)
		])
			.then((allResponses) => {
				this.parseFileStates(allResponses);
			})
			.fail((err) => {
				let errorMessage = 'An error occurred while contacting the server.';
				if (err && err.body) {
					errorMessage = err.body.message;	
				}

				this.setState({
					state: 'failed',
					errorDetails: errorMessage
				});
			});
	}

	parseFileStates(data) {
		// check which files we're still waiting on
		const files = ['d1', 'd2'];

		const responses = {
			d1: data[0],
			d2: data[1]
		};

		const output = {};
		let allDone = true;
		let errors = [];
		let message = '';

		files.forEach((file) => {
			const fileData = responses[file];
			output[file + 'Status'] = fileData.status;

			if (fileData.status == 'waiting') {
				allDone = false;
			}
			else if (fileData.status == 'failed') {
				errors.push(file);
				if (message != '') {
					message += ' ';
				}
				message += 'File ' + file.toUpperCase() + ': ' + fileData.message;
			}
		});

		if (errors.length > 0) {
			// there are errors
			output.state = 'failed';
			output.errorDetails = message;
		}
		else if (errors.length == 0 && allDone) {
			output.state = 'done';
		}

		this.setState(output);


		if (!allDone) {
			// wait 5 seconds and check the file status again
			window.setTimeout(() => {
				this.checkFileStatus();
			}, 5000);
		}
	}

	nextPage() {
		hashHistory.push('validateCrossFile/' + this.props.submissionID);
	}

	render() {
		return (
			<GenerateFilesContent {...this.props} {...this.state}
				handleDateChange={this.handleDateChange.bind(this)}
				showError={this.showError.bind(this)}
				hideError={this.hideError.bind(this)}
				generateFiles={this.generateFiles.bind(this)}
				nextPage={this.nextPage.bind(this)} />
		);
	}
}

export default connect(
	state => ({ submission: state.submission }),
	dispatch => bindActionCreators(uploadActions, dispatch)
)(GenerateFilesContainer)