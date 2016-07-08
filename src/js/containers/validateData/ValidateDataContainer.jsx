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
			notYours: false
		};

		this.isCancelled = false;
	}


	componentDidMount() {
		this.isCancelled = false;
		this.validateSubmission();
		
	}

	componentWillUnmount() {
		// remove any timers
		this.isCancelled = true;
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
			if (item.job_status != 'finished' && item.job_status != 'invalid' || item.file_status == 'incomplete' ) {
				finished = false;
				break;
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

		ReviewHelper.validateSubmission(this.props.submissionID)
			.then((data) => {

				if (this.isCancelled) {
					// the component has been unmounted, so don't bother with updating the state (it doesn't exist anymore anyway)
					return;
				}

				this.setState({
					finishedLoad: true
				});

				this.props.setSubmissionState('review');
				this.props.setValidation(data.file);
				
				if (!this.checkForCompletion(data.file)) {
					statusTimer = setTimeout(() => {
						this.validateSubmission();
					}, 5*1000);
				}
				else {
					this.setState({
						initialLoad: moment()
					});
				}

				this.checkForErrors();
			})
			.catch((err) => {
				if (err.reason == 400) {
					this.setState({
						notYours: true,
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

		if (this.state.notYours) {
			validationContent = '';
			cancel = <ValidateNotYours message="You cannot view or modify this submission because you are not the original submitter." />;
		}

		return (
			<div>
				{validationContent}
			</div>
		);
	}
}

export default connect(
	state => ({ submission: state.submission }),
	dispatch => bindActionCreators(uploadActions, dispatch)
)(ValidateDataContainer)
