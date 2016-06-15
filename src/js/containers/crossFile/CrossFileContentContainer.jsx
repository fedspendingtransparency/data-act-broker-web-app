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

import CrossFileContent from '../../components/crossFile/CrossFileContent.jsx';

class CrossFileContentContainer extends React.Component {
	constructor(props) {
		super(props);

	}
	
	render() {
		return (
			<CrossFileContent {...this.props} />
		);
	}
}

export default connect(
	state => ({ submission: state.submission }),
	dispatch => bindActionCreators(uploadActions, dispatch)
)(CrossFileContentContainer)