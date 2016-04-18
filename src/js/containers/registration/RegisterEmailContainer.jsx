/**
  * RegisterEmailContainer.jsx
  * Created by Kevin Li 4/18/2016
  */

import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { kGlobalConstants } from '../../GlobalConstants.js';
import RegisterEmailPage from '../../components/registration/RegisterEmailPage.jsx';

import * as registrationActions from '../../redux/actions/registrationActions.js';
import * as sessionActions from '../../redux/actions/sessionActions.js';

class RegisterEmailContainer extends React.Component {

	componentDidMount() {
		this.props.setLoggedOut();
	}

	render() {

		return (
			<RegisterEmailPage {...this.props} />
		);
	}
}

export default connect(
	state => ({ registration: state.registration }),
	dispatch => bindActionCreators(Object.assign({}, registrationActions, sessionActions), dispatch)
)(RegisterEmailContainer)