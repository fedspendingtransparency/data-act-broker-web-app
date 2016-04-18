/**
  * ForgotPasswordContainer.jsx
  * Created by Kevin Li 4/18/2016
  */

import React from 'react'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { kGlobalConstants } from '../../GlobalConstants.js';
import ForgotPasswordPage from '../../components/forgotPassword/ForgotPasswordPage.jsx';

import * as sessionActions from '../../redux/actions/sessionActions.js';

class ForgotPasswordContainer extends React.Component {
	componentDidMount() {
		this.props.setLoggedOut();
	}
	render() {
		return (
			<ForgotPasswordPage />
		);
	}
}

export default connect(
	state => ({ session: state.session }),
	dispatch => bindActionCreators(sessionActions, dispatch)
)(ForgotPasswordContainer)