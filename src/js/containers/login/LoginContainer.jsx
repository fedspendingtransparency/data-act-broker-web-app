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
						errorMessage: 'Browser cookie support is required to access this site. Enable cookies on your browser to continue.'
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

		return (
			<LoginPanel {...this.props} performLogin={this.performLogin.bind(this)} loading={this.state.loading} errorMessage={this.state.errorMessage} />
		);
	}
}

export default connect(
	state => ({ session: state.session }),
	dispatch => bindActionCreators(sessionActions, dispatch)
)(LoginContainer)