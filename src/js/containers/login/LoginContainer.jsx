/**
* LoginContainer.jsx
* Created by Kevin Li 3/17/16
**/

import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Request from 'superagent';

import { kGlobalConstants } from '../../GlobalConstants.js';
import LoginPanel from '../../components/login/LoginPanel.jsx';
import * as sessionActions from '../../redux/actions/sessionActions.js';

class LoginContainer extends React.Component {
	performLogin(username, password) {
		Request.post(kGlobalConstants.API + 'login/')
               .withCredentials()
               .send({ 'username': username, 'password': password })
               .end((err) => {
                   if (err) {

                        this.props.setLoginState("failed");

                   } else {
                        this.props.setLoginState("loggedIn");
                       // Route to landing page on success
                       location.href = '#/landing';
                   }
               });
	}
	render() {

		return (
			<LoginPanel {...this.props} performLogin={this.performLogin.bind(this)} />
		);
	}
}

export default connect(
	state => ({ session: state.session }),
	dispatch => bindActionCreators(sessionActions, dispatch)
)(LoginContainer)