/**
* ValidateValuesContainer.jsx
* Created by Kevin Li 3/29/16
**/

import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { hashHistory } from 'react-router';
import _ from 'lodash';

import * as uploadActions from '../../redux/actions/uploadActions.js';

import ValidateValuesOverlay from '../../components/validateData/validateValues/ValidateValuesOverlay.jsx';
import { fileTypes } from '../addData/fileTypes.js';
import { kGlobalConstants } from '../../GlobalConstants.js';

import * as UploadHelper from '../../helpers/uploadHelper.js';
import * as ReviewHelper from '../../helpers/reviewHelper.js';

class ValidateValuesOverlayContainer extends React.Component {
	constructor(props) {
		super(props);
	}

	uploadFiles() {
		UploadHelper.performRemoteCorrectedUpload(this.props.submission);
	}


	render() {

		// check if the critical error files are selected for re-upload
		const fileKeys = Object.keys(this.props.submission.files);
		const requiredKeys = [];
		for (let key in this.props.submission.validation) {
			const value = this.props.submission.validation[key];
			if (value.error_data.length > 0) {
				requiredKeys.push(key);
			}
		}
		const allowUpload = _.isEqual(_.intersection(fileKeys, requiredKeys), requiredKeys);



		return (
			<ValidateValuesOverlay {...this.props} uploadFiles={this.uploadFiles.bind(this)} allowUpload={allowUpload} />
		);
	}
}

export default connect(
	state => ({ submission: state.submission }),
	dispatch => bindActionCreators(uploadActions, dispatch)
)(ValidateValuesOverlayContainer)