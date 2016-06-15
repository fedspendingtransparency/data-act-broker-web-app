/**
* ValidateDataContainer.jsx
* Created by Kevin Li 3/29/16
**/

import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { hashHistory } from 'react-router';
import moment from 'moment';

import * as uploadActions from '../../redux/actions/uploadActions.js';

import ValidateDataContent from '../../components/validateData/ValidateDataContent.jsx';
import ValidateValuesContent from '../../components/validateData/validateValues/ValidateValuesContent.jsx';
import ValidateCancellation from '../../components/validateData/ValidateCancellation.jsx';
import ValidateNotYours from '../../components/validateData/ValidateNotYours.jsx';
import ValidateLoadingScreen from '../../components/validateData/ValidateLoadingScreen.jsx';
import { fileTypes } from '../addData/fileTypes.js';
import { kGlobalConstants } from '../../GlobalConstants.js';

import * as UploadHelper from '../../helpers/uploadHelper.js';
import * as ReviewHelper from '../../helpers/reviewHelper.js';

let statusTimer;

class ValidateDataContainer extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			finishedLoad: false,
			headerErrors: true,
			initialLoad: moment(),
			offerCancellation: false,
			notYours: false
		};
	}


	componentDidMount() {
		this.validateSubmission();
		
	}

	componentWillUnmount() {
		// remove any timers
		if (statusTimer) {
			clearTimeout(statusTimer);
			statusTimer = null;
		}
	}

	componentDidUpdate(prevProps, prevState) {
		// check if the submission state changed, indicating a re-upload
		if (prevProps.submission.state != this.props.submission.state) {
			if (this.props.submission.state == "prepare") {
				// uploads are done, reset the cancellation timer
				this.setState({
					initialLoad: moment()
				}, () => {
					this.validateSubmission();
				});
			}
		}
	}

	checkForCompletion(data) {
		// check if all the validations are done
		let finished = true;
		for (let key in data) {
			let item = data[key];
			if (item.job_type == 'csv_record_validation') {
				if (item.job_status != 'finished' && item.job_status != 'invalid' || item.file_status == 'incomplete' ) {
					finished = false;
					break;
				}
			}
		}

		return finished;
	}

	checkForErrors() {
		
		let hasHeaderErrors = false;
		for (let key in this.props.submission.validation) {
			const item = this.props.submission.validation[key];

			if (item.error_type == 'header_errors') {
				hasHeaderErrors = true;
				break;
			}

		}
		

		this.setState({
			headerErrors: hasHeaderErrors
		});

	}

	validateSubmission() {

		// check how long it's been since the initial validation check
		if (!this.state.offerCancellation && !this.state.notYours) {
			const secondsPassed = moment().unix() - this.state.initialLoad.unix();
			if (secondsPassed >= 5 * 60) {
				this.setState({
					offerCancellation: true
				});
			}
		}

		ReviewHelper.validateSubmission(this.props.submissionID)
			.then((data) => {
				this.setState({
					finishedLoad: true
				});

				this.props.setSubmissionState('review');
				this.props.setValidation(data);
				
				if (!this.checkForCompletion(data)) {
					statusTimer = setTimeout(() => {
						this.validateSubmission();
					}, 5*1000);
				}
				else {
					// all the files have returned something, hide the cancellation banner if necessary
					// reset the initial load time to reset how long until the cancellation banner appears
					this.setState({
						offerCancellation: false,
						initialLoad: moment()
					});
				}

				this.checkForErrors();
			})
			.catch((err) => {
				if (err.reason == 400) {
					this.setState({
						notYours: true,
						offerCancellation: false,
						initialLoad: moment()
					});
				}
				else {
					statusTimer = setTimeout(() => {
						this.validateSubmission();
					}, 5*1000);
				}
			
			});
	}

	render() {
		
		let checkingValues = false;

		let validationContent = <ValidateDataContent {...this.props} submissionID={this.props.submissionID} />;
		if (!this.state.headerErrors && this.checkForCompletion(this.props.submission.validation)) {
			// no header errors, move onto content errors
			checkingValues = true;
			validationContent = <ValidateValuesContent {...this.props} submissionID={this.props.submissionID} />;
		}
		else if (!this.state.finishedLoad) {
			validationContent = <ValidateLoadingScreen />;
		}

		let cancel = '';
		if (this.state.offerCancellation && !checkingValues) {
			cancel = <ValidateCancellation />;
		}

		if (this.state.notYours) {
			validationContent = '';
			cancel = <ValidateNotYours message="You cannot view or modify this submission because you are not the original submitter." />;
		}

		return (
			<div>
				{cancel}
				{validationContent}
			</div>
		);
	}
}

export default connect(
	state => ({ submission: state.submission }),
	dispatch => bindActionCreators(uploadActions, dispatch)
)(ValidateDataContainer)
