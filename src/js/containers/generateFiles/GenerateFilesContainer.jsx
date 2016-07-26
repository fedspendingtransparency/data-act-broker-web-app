/**
  * GenerateFilesContainer.jsx
  * Created by Kevin Li 7/22/16
  */

import React from 'react'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { kGlobalConstants } from '../../GlobalConstants.js';
import GenerateFilesContent from '../../components/generateFiles/GenerateFilesContent.jsx';

import * as sessionActions from '../../redux/actions/sessionActions.js';

class GenerateFilesContainer extends React.Component {
	render() {
		return (
			<GenerateFilesContent {...this.props} />
		);
	}
}

export default connect(
	state => ({ session: state.session }),
	dispatch => bindActionCreators(sessionActions, dispatch)
)(GenerateFilesContainer)