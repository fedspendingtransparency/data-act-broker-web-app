/**
* AddDataContainer.jsx
* Created by Kevin Li 3/24/16
**/

import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { hashHistory } from 'react-router';

import * as uploadActions from '../../redux/actions/uploadActions.js';

import AddDataContent from '../../components/addData/AddDataContent.jsx';
import { fileTypes } from './fileTypes.js';
import { kGlobalConstants } from '../../GlobalConstants.js';

import * as UploadHelper from '../../helpers/uploadHelper.js';

class AddDataContainer extends React.Component {
	constructor(props) {
		super(props);

	}
	componentDidUpdate(prevProps, prevState) {
		
		if (prevProps.submission.state == 'empty') {
			if (Object.keys(this.props.submission.files).length == fileTypes.length) {
				this.props.setSubmissionState('ready');
			}
		}
	}

	performUpload() {
		this.props.setSubmissionState('uploading');
		if (kGlobalConstants.LOCAL == true) {
			UploadHelper.performLocalUpload(this.props.submission)
				.then((submissionId) => {
					// TODO: Remove this when this is eventually tied to user accounts
					this.props.setSubmissionId(submissionID);
				});
        }
        else {
        	UploadHelper.performRemoteUpload(this.props.submission)
        		.then((submissionID) => {
        			// TODO: Remove this when this is eventually tied to user accounts
        			this.props.setSubmissionId(submissionID);

                    hashHistory.push('/validateData/' + submissionID);
        		})
        		.catch(() => {
        			// error handling is done at the file item/dropzone level
        		});
        }
	}


	render() {
		return (
			<AddDataContent {...this.props} fileTypes={fileTypes} performUpload={this.performUpload.bind(this)} />
		);
	}
}

export default connect(
	state => ({ submission: state.submission }),
	dispatch => bindActionCreators(uploadActions, dispatch)
)(AddDataContainer)