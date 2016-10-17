/**
  * AuthContainer.jsx
  * Created by Kevin Li 10/13/16
  **/

import React from 'react';
import { hashHistory } from 'react-router';
import _ from 'lodash';
import Cookies from 'js-cookie';

import LoginMaxLoading from '../../components/login/LoginMaxLoading.jsx';

import * as LoginHelper from '../../helpers/loginHelper.js';

export default class AuthContainer extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			ticket: '',
			error: ''
		};
	}

	componentDidMount() {
		this.processTicket();
	}

	processTicket() {

		// extract the ticket string from the URL
		const url = window.location.href;
		// MAX may insert the ticket in the middle of the URL instead of at the end like a civilised person
		const regex = /ticket=([A-Za-z0-9]|\.|-)+/g;
		const regexOutput = regex.exec(url);

		// a ticket was found, process it
		if (regexOutput) {
			
			const ticket = regexOutput[0].substring('ticket='.length);

			// save the ticket value in the component state
			this.setState({
				ticket: ticket,
				error: ''
			}, () => {

				// remove the ticket from the URL
				const updatedUrl = url.replace('?ticket=' + this.state.ticket, '');
				window.history.replaceState({}, null, updatedUrl);

				let destination = '/landing';

				// check if a redirection cookie exists, if it exists, set that as the destination
				const cookieRedirect = Cookies.get('brokerRedirect');
				if (cookieRedirect) {
					destination = cookieRedirect;
				}

				// perform the login
				LoginHelper.performMaxLogin(this.state.ticket)
					.then((data) => {
						// remove any redirection cookies
						Cookies.remove('brokerRedirect');

						// success authorization from API, continue to destination
						hashHistory.push(destination);
					})
					.catch((err) => {
						// something went wrong (or API passed back an error status and message)
						let message = err;
						if (message == 'cookie') {
							// this is a cookie issue
							message = 'Your browser does not support cookies, which the DATA Act Broker requires to function correctly. Try changing your browser settings to enable cookies or use a different browser.';
						}
						else if (!_.isString(message)) {
							// message isn't a string, fallback
							message = 'An error occurred while authorizing the user account. Try again later.';
						}

						this.setState({
							error: message
						});

						// remove any redirection cookies
						Cookies.remove('brokerRedirect');
					});
			});
		}
		else {
			// no ticket found, toss back to login page
			hashHistory.push('/login');

			// remove any redirection cookies
			Cookies.remove('brokerRedirect');

		}
	}

	render() {
		return (
			<div className="login-right usa-da-login-container">
				<LoginMaxLoading errorMessage={this.state.error} />
			</div>
		)
	}
}