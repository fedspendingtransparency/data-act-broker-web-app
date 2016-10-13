/**
  * AuthContainer.jsx
  * Created by Kevin Li 10/13/16
  **/

import React from 'react';
import { hashHistory } from 'react-router';
import LoginMax from '../../components/login/LoginMax.jsx';

export default class AuthContainer extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			ticket: '',
			error: ''
		};
	}

	componentDidMount() {
		this.extractTicket();
	}

	extractTicket() {
		const url = window.location.href;
		// MAX may insert the ticket in the middle of the URL instead of at the end like a civilised person
		const regex = /ticket=([A-Za-z0-9]|\.|-)+/g;
		const regexOutput = regex.exec(url);
		if (regexOutput) {
			const ticket = regexOutput[0].substring('ticket='.length);
			this.setState({
				ticket: ticket,
				error: ''
			}, () => {
				hashHistory.push('/login');
			});
		}
		else {
			// no ticket found, display error
			this.setState({
				ticket: '',
				error: 'An error occurred while validating the user account. Try again later.'
			});

		}
	}

	render() {
		return (
			<LoginMax errorMessage={this.state.error} />
		)
	}
}