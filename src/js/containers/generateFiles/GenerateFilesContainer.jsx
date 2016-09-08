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

const timerDuration = 10;

class GenerateFilesContainer extends React.Component {

	constructor(props) {
		super(props);

		this.isUnmounted = false;

		this.state = {
			state: 'loading',
			d1: {
				startDate: null,
				endDate: null,
				error: {
					show: false,
					header: '',
					description: ''
				},
				download: {
					show: false,
					url: ''
				}
			},
			d2: {
				startDate: null,
				endDate: null,
				error: {
					show: false,
					header: '',
					description: ''
				},
				download: {
					show: false,
					url: ''
				}
			},
			d1Status: "waiting",
			d2Status: "waiting",
			errorDetails: ""
		};
	}

	componentDidMount() {
		this.isUnmounted = false;
		this.checkForPreviousFiles();
	}

	componentWillUnmount() {
		this.isUnmounted = true;
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
		else {
			// it's months
			month = raw.split('/')[0];
			year = raw.split('/')[1];
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

	checkForPreviousFiles() {
		// check if D1 and D2 files already exist for this submission
		Q.allSettled([
			GenerateFilesHelper.fetchFile('D1', this.props.submissionID),
			GenerateFilesHelper.fetchFile('D2', this.props.submissionID)
		])
			.then((allResponses) => {
				if (this.isUnmounted) {
					return;
				}

				// check if both files have been requested
				let allRequested = true;
				const combinedData = [];
				allResponses.forEach((response) => {
					if (response.state != 'fulfilled' || response.value.status == 'invalid') {
						// no request has been made yet
						allRequested = false;
					}
					else {
						combinedData.push(response.value);
					}
				});

				if (!allRequested) {
					// files have not been requested before, prepopulate with the submission date
					// it's possible that only one file was requested before, but in that case treat it as though it wasn't
					this.loadSubmissionData();
				}
				else {
					// files have been requested before, load the dates
					const d1Start = moment(allResponses[0].value.start, 'MM/DD/YYYY');
					const d1End = moment(allResponses[0].value.end, 'MM/DD/YYYY');
					const d2Start = moment(allResponses[1].value.start, 'MM/DD/YYYY');
					const d2End = moment(allResponses[1].value.end, 'MM/DD/YYYY');

					// load them into React state
					const d1 = Object.assign({}, this.state.d1);
					d1.startDate = d1Start;
					d1.endDate = d1End;

					const d2 = Object.assign({}, this.state.d2);
					d2.startDate = d1Start;
					d2.endDate = d1End;

					this.setState({
						d1: d1,
						d2: d2
					}, () => {
						// now parse the data (in case the files were still in pending state)
						this.parseFileStates(combinedData);
					});
				}
			});
		
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

				if (this.isUnmounted) {
					return;
				}

				this.setState(mergedState, () => {
					this.validateDates();
				});
			})
			.catch((err) => {
				if (err.hasOwnProperty('text')) {
					// handle non-existant submission IDs
					this.props.showError(JSON.parse(err.text).message);
				}
				else {
					console.log(err);
				}
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
		Q.allSettled([
			GenerateFilesHelper.generateFile('D1', this.props.submissionID, this.state.d1.startDate.format('MM/DD/YYYY'), this.state.d1.endDate.format('MM/DD/YYYY')),
			GenerateFilesHelper.generateFile('D2', this.props.submissionID, this.state.d2.startDate.format('MM/DD/YYYY'), this.state.d2.endDate.format('MM/DD/YYYY')),
		])
			.then((allResponses) => {
				if (this.isUnmounted) {
					return;
				}

				const responses = [];
				allResponses.forEach((response) => {
					if (response.state == 'fulfilled') {
						responses.push(response.value);
					}
					else {
						responses.push(response.reason);
					}
				});

				this.parseFileStates(responses);
			});

	}

	checkFileStatus() {
		// check the status of both D1 and D2 files
		Q.allSettled([
			GenerateFilesHelper.fetchFile('D1', this.props.submissionID),
			GenerateFilesHelper.fetchFile('D2', this.props.submissionID)
		])
			.then((allResponses) => {
				if (this.isUnmounted) {
					return;
				}

				const responses = [];
				allResponses.forEach((response) => {
					if (response.state == 'fulfilled') {
						responses.push(response.value);
					}
					else {
						responses.push(response.reason);
					}
				})
				this.parseFileStates(responses);
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
			else if (fileData.status == 'failed' || fileData.status == 'invalid') {
				errors.push(file);

				let message = 'File ' + fileData.file_type + ' could not be generated.';

				if (fileData.message != '') {
					message = fileData.message;
				}

				this.showError(file, fileData.file_type.toUpperCase() + ' File Error', message);
			}
			else if (fileData.status == 'finished') {
				this.hideError(file);

				// display dowload buttons
				// make a clone of the file's react state
				const item = Object.assign({}, this.state[file]);
				// update the download properties
				item.download = {
					show: true,
					url: fileData.url
				};
				// add this to the new state
				output[file] = item;
			}
		});

		if (errors.length > 0) {
			// there are errors
			output.state = 'failed';
			output.errorDetails = '';
		}
		else if (errors.length == 0 && allDone) {
			output.state = 'done';
		}
		else {
			output.state = 'generating';
		}

		if (this.isUnmounted) {
			return;
		}

		this.setState(output);


		if (!allDone && !this.isUnmounted) {
			// wait 5 seconds and check the file status again
			window.setTimeout(() => {
				this.checkFileStatus();
			}, timerDuration * 1000);
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