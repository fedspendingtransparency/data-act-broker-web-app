/**
* ValidateDataContainer.jsx
* Created by Kevin Li 3/29/16
**/

import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { hashHistory } from 'react-router';

import * as uploadActions from '../../redux/actions/uploadActions.js';

import ValidateDataContent from '../../components/validateData/ValidateDataContent.jsx';
import ValidateValuesContent from '../../components/validateData/validateValues/ValidateValuesContent.jsx';
import { fileTypes } from '../addData/fileTypes.js';
import { kGlobalConstants } from '../../GlobalConstants.js';

import * as UploadHelper from '../../helpers/uploadHelper.js';
import * as ReviewHelper from '../../helpers/reviewHelper.js';

let statusTimer;

class ValidateDataContainer extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			headerErrors: true
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
			if (this.props.submission.state == "review") {
				// uploads are done
				this.validateSubmission();
			}
		}
	}

	checkForCompletion(data) {
		// check if all the validations are done
		let finished = true;
		for (let key in data) {
			let item = data[key];
			if (item.job_status != 'finished' && item.job_status != 'invalid') {
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

			if (item.file_status != 'complete') {
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
				this.props.setValidation(data);
				
				if (!this.checkForCompletion(data)) {
					setTimeout(() => {
						this.validateSubmission();
					}, 5*1000);
				}

				this.checkForErrors();
			})
			.catch((err) => {
				setTimeout(() => {
					this.validateSubmission();
				}, 5*1000);
			});
	}

	render() {

		let validationContent = <ValidateDataContent {...this.props} submissionID={this.props.submissionID} />;
		if (!this.state.headerErrors) {
			// no header errors, move onto content errors
			validationContent = <ValidateValuesContent {...this.props} submissionID={this.props.submissionID} />;
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