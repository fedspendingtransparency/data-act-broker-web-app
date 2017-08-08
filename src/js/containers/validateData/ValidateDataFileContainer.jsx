/**
  * ValidateDataFileContainer.jsx
  * Created by Kevin Li 4/1/2016
  */

import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { hashHistory } from 'react-router';

import * as uploadActions from '../../redux/actions/uploadActions.js';

import ValidateDataFileComponent from '../../components/validateData/ValidateDataFileComponent.jsx';
import { fileTypes } from '../addData/fileTypes.js';
import { kGlobalConstants } from '../../GlobalConstants.js';

class ValidateDataFileContainer extends React.Component {

	selectedFile(file) {
		this.props.setUploadItem({
			name: this.props.type.requestName,
			state: 'ready',
			file: file
		});
	}

	render() {
		return (
			<ValidateDataFileComponent {...this.props} item={this.props.data[this.props.type.requestName]} onFileChange={this.selectedFile.bind(this)} />
		)
	}
}

export default connect(
	state => ({ submission: state.submission,
	session: state.session }),
	dispatch => bindActionCreators(uploadActions, dispatch)
)(ValidateDataFileContainer)