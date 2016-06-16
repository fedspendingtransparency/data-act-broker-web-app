/**
  * CrossFileUploadButtonContainer.jsx
  * Created by Kevin Li 6/16/16
  **/

import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as uploadActions from '../../redux/actions/uploadActions.js';
import { kGlobalConstants } from '../../GlobalConstants.js';
import * as UploadHelper from '../../helpers/uploadHelper.js';

import UploadButton from '../../components/validateData/ValidateDataUploadButton.jsx';

class CrossFileUploadButtonContainer extends React.Component {

	onDrop(file) {
		this.props.setUploadItem({
			name: this.props.fileKey,
			state: 'ready',
			file: file
		});
	}

	render() {
		return (
			<UploadButton {...this.props} onDrop={this.onDrop.bind(this)} />
		)
	}
}

export default connect(
	state => ({ submission: state.submission }),
	dispatch => bindActionCreators(uploadActions, dispatch)
)(CrossFileUploadButtonContainer)