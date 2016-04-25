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

import * as LoginHelper from '../../helpers/loginHelper.js';

class LoginContainer extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			loading: false
		};
	}
	performLogin(username, password) {
		this.setState({
			loading: true
		});

		LoginHelper.performLogin(username, password)
			.catch(() => {
				this.setState({
					loading: false
				});
			})
	}
	render() {

		return (
			<LoginPanel {...this.props} performLogin={this.performLogin.bind(this)} loading={this.state.loading} />
		);
	}
}

export default connect(
	state => ({ session: state.session }),
	dispatch => bindActionCreators(sessionActions, dispatch)
)(LoginContainer)