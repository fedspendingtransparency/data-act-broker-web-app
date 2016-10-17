/**
* LoginContainer.jsx
* Created by Kevin Li 3/17/16
**/

import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { hashHistory } from 'react-router';

import { kGlobalConstants } from '../../GlobalConstants.js';
import LoginPanel from '../../components/login/LoginPanel.jsx';
import LoginMax from '../../components/login/LoginMax.jsx';
import * as sessionActions from '../../redux/actions/sessionActions.js';

import * as LoginHelper from '../../helpers/loginHelper.js';

class LoginContainer extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			loading: false,
			errorMessage: ""
		};
	}

	performLogin(username, password) {
		this.setState({
			loading: true
		});

		LoginHelper.performLogin(username, password)
			.catch((err) => {
				if (err == "cookie") {
					this.setState({
						loading: false,
						errorMessage: 'Your browser does not support cookies, which the DATA Act Broker requires to function correctly. Try changing your browser settings to enable cookies or use a different browser.'
					});
				}
				else {
					this.setState({
						loading: false,
						errorMessage: err
					});
				}
			})
	}

	render() {
		let login = <LoginMax />;

		if (kGlobalConstants.LOCAL) {
			login = <LoginPanel {...this.props} performLogin={this.performLogin.bind(this)} loading={this.state.loading} errorMessage={this.state.errorMessage} />;
		}

		return (
			<div className="login-right usa-da-login-container">
				{login}
			</div>
		);
	}
}

export default connect(
	state => ({ session: state.session }),
	dispatch => bindActionCreators(sessionActions, dispatch)
)(LoginContainer)