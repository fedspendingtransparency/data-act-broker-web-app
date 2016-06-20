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

class CrossFileContentContainer extends React.Component {
	constructor(props) {
		super(props);
	}

	componentDidMount() {
		this.loadData();
	}

	uploadFiles() {
		if (kGlobalConstants.LOCAL == true) {
			UploadHelper.performLocalCorrectedUpload(this.props.submission)
				.then(() => {
					this.props.setSubmissionState('prepare');
					// redirect back to the validation page
					hashHistory.push('/validateData/' + this.props.submissionID);
				});
		}
		else {
			UploadHelper.performRemoteCorrectedUpload(this.props.submission)
				.then(() => {
					this.props.setSubmissionState('prepare');
					// redirect back to the validation page
					hashHistory.push('/validateData/' + this.props.submissionID);
				});
		}
	}

	loadData() {
		ReviewHelper.validateSubmission(this.props.submissionID)
			.then((data) => {
				this.props.setSubmissionState('crossFile');
				this.props.setValidation(data);
				
			})
			.catch((err) => {
				console.log(err);			
			});
	}
	
	render() {
		return (
			<CrossFileContent {...this.props} uploadFiles={this.uploadFiles.bind(this)} />
		);
	}
}

export default connect(
	state => ({ submission: state.submission }),
	dispatch => bindActionCreators(uploadActions, dispatch)
)(CrossFileContentContainer)