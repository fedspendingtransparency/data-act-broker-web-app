/**
* LoginContainer.jsx
* Created by Kevin Li 3/17/16
**/

import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Request from 'superagent';
import { hashHistory } from 'react-router';

import { kGlobalConstants } from '../../GlobalConstants.js';
import LoginPanel from '../../components/login/LoginPanel.jsx';
import * as sessionActions from '../../redux/actions/sessionActions.js';

class LoginContainer extends React.Component {
	performLogin(username, password) {
		Request.post(kGlobalConstants.API + 'login/')
               .withCredentials()
               .send({ 'username': username, 'password': password })
               .end((err, res) => {
					if (err) {
						this.props.setLoginState("failed");
					} else {
						this.loadActiveUser();
					}
               });
	}
	loadActiveUser() {
		Request.get(kGlobalConstants.API + 'current_user/')
			.withCredentials()
			.send()
			.end((err, res) => {
				if (err) {
					this.props.setLoginState("loggedOut");
				}
				else {
					// changing the login state will propagate through Redux and trigger a router action
					this.props.setLoginState("loggedIn");
					this.props.setActiveUser(res.body);
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