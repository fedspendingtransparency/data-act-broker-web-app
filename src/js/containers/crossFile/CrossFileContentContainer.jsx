/**
* CrossFileContentContainer.jsx
* Created by Kevin Li 6/14/16
**/

import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { hashHistory } from 'react-router';

import * as uploadActions from '../../redux/actions/uploadActions.js';
import { kGlobalConstants } from '../../GlobalConstants.js';
import * as UploadHelper from '../../helpers/uploadHelper.js';
import * as ReviewHelper from '../../helpers/reviewHelper.js';

import CrossFileContent from '../../components/crossFile/CrossFileContent.jsx';

const timerDuration = 10;

class CrossFileContentContainer extends React.Component {
	constructor(props) {
		super(props);

		this.dataTimer;
	}

	componentDidMount() {
		this.loadData();
		this.startTimer();
	}

	uploadFiles() {
		if (kGlobalConstants.LOCAL == true) {
			UploadHelper.performLocalCorrectedUpload(this.props.submission)
				.then(() => {
					this.props.resetSubmission();
					// reload the data
					this.loadData();
					this.startTimer();
				});
		}
		else {
			UploadHelper.performRemoteCorrectedUpload(this.props.submission)
				.then(() => {
					this.props.resetSubmission();
					// reload the data
					this.loadData();
					this.startTimer();
				});
		}
	}

	prepareCrossFileReports(data) {
		// store the cross file report CSV URLs in Redux
		const reports = data.crossFile.reports;

		const updatedData = [];
		this.props.submission.crossFileOrder.forEach((pair) => {

			// create a new metadata object for each expected cross file pairing
			const updatedPair = Object.assign({}, pair, {
				report: reports[pair.key]
			});
			
			updatedData.push(updatedPair);
		});

		this.props.setExpectedCrossPairs(updatedData);
	}

	crossFileComplete(data) {
		// check if the validations are complete
		let crossFileDone = false;

		// check if cross file is done
		if (data.crossFile.state == 'finished' || data.crossFile.state == 'invalid') {
			crossFileDone = true;
		}

		return crossFileDone;
	}

	individualPassedValidation(data) {
		let state = 'pending';

		// check if the individual files are done
		let allPassed = true;
		for (let key in data.file) {
			const jobStatus = data.file[key].job_status;
			const errorType = data.file[key].error_type;

			if (jobStatus == 'invalid' || (jobStatus == 'finished' && errorType != 'none')) {
				state = 'errors';
				allPassed = false;
				break;
			}
			else if (jobStatus != 'finished') {
				allPassed = false;
			}
		}

		if (state == 'pending' && allPassed) {
			state = 'passed';
		} 

		return state;

		
	}

	loadData() {
		this.props.setSubmissionState('empty');
		ReviewHelper.validateSubmission(this.props.submissionID)
		.then((data) => {
			let done = false;
			// check if invididual files have validation errors
			const individualState = this.individualPassedValidation(data);
			if (individualState == 'passed') {
				// everything finished and passed
				done = true;
			}
			else if (individualState == 'errors') {
				// there are errors, return to file validation screen
				// stop the timer
				if (this.dataTimer) {
					window.clearInterval(this.dataTimer);
					this.dataTimer = null;
				}

				// redirect
				hashHistory.push('/validateData/' + this.props.submissionID);
			}

			// individual files are done and valid
			if (done && this.crossFileComplete(data)) {
				// stop the timer once the validations are complete
				this.props.setSubmissionState('crossFile');
				this.props.setCrossFile(data.crossFile.data);
				this.prepareCrossFileReports(data);

				if (this.dataTimer) {
					window.clearInterval(this.dataTimer);
					this.dataTimer = null;
				}
			}
		})
		.catch((err) => {
			console.log(err);

			// stop the timer
			if (this.dataTimer) {
				window.clearInterval(this.dataTimer);
				this.dataTimer = null;
			}
		});
	}

	startTimer() {
		// keep checking the data every 5 seconds until it has finished loaded;
		this.dataTimer = window.setInterval(() => {
			this.loadData();
		}, timerDuration * 1000);
	}
	
	reloadData() {
		this.props.resetSubmission();
		this.loadData()
		this.startTimer();
	}

	render() {
		return (
			<CrossFileContent {...this.props} uploadFiles={this.uploadFiles.bind(this)} reloadData={this.reloadData.bind(this)} />
		);
	}
}

export default connect(
	state => ({ submission: state.submission }),
	dispatch => bindActionCreators(uploadActions, dispatch)
)(CrossFileContentContainer)