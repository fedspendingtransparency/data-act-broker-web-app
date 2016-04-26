/**
* ValidateDataContainer.jsx
* Created by Kevin Li 3/29/16
**/

import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { hashHistory } from 'react-router';

import * as uploadActions from '../../redux/actions/uploadActions.js';

import ValidateDataOverlay from '../../components/validateData/ValidateDataOverlay.jsx';
import { fileTypes } from '../addData/fileTypes.js';
import { kGlobalConstants } from '../../GlobalConstants.js';

import * as UploadHelper from '../../helpers/uploadHelper.js';
import * as ReviewHelper from '../../helpers/reviewHelper.js';

class ValidateDataOverlayContainer extends React.Component {
	constructor(props) {
		super(props);
	}

	uploadFiles() {
		if (kGlobalConstants.LOCAL == true) {
			UploadHelper.performLocalCorrectedUpload(this.props.submission)
				.then(() => {
					this.props.setSubmissionState('prepare');
				});
		}
		else {
			UploadHelper.performRemoteCorrectedUpload(this.props.submission)
				.then(() => {
					this.props.setSubmissionState('prepare');
				});
		}
	}


	render() {
		return (
			<ValidateDataOverlay {...this.props} uploadFiles={this.uploadFiles.bind(this)} />
		);
	}
}

export default connect(
	state => ({ submission: state.submission }),
	dispatch => bindActionCreators(uploadActions, dispatch)
)(ValidateDataOverlayContainer)