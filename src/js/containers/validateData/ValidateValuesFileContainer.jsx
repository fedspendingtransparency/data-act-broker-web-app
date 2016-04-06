/**
  * ValidateValuesFileContainer.jsx
  * Created by Kevin Li 4/6/2016
  */

import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { hashHistory } from 'react-router';

import * as uploadActions from '../../redux/actions/uploadActions.js';

import ValidateValuesFileComponent from '../../components/validateData/validateValues/ValidateValuesFileComponent.jsx';
import { fileTypes } from '../addData/fileTypes.js';
import { kGlobalConstants } from '../../GlobalConstants.js';

class ValidateValuesFileContainer extends React.Component {

	selectedFile(file) {
		this.props.setUploadItem({
			name: this.props.type.requestName,
			state: 'ready',
			file: file
		});
	}

	render() {

		return (
			<ValidateValuesFileComponent {...this.props} onFileChange={this.selectedFile.bind(this)} />
		)
	}
}

export default connect(
	state => ({ submission: state.submission }),
	dispatch => bindActionCreators(uploadActions, dispatch)
)(ValidateValuesFileContainer)