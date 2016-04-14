/**
  * RegistrationEmailInput.jsx
  * Created by Kevin Li 4/14/2016
  */

import React from 'react';
import EmailValidation from '../SharedComponents/EmailValidation.jsx';

export default class RegistrationEmailInput extends React.Component {
	
	render() {
		// Regex for matching foo@bar.mil or foo@bar.gov
        const emailRegex = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.(?:gov|mil)$/;
        return (
			<div className="usa-da-input-container">
				<label className="sr-only" htmlFor="input-registration-email">Registration Email</label>
				<EmailValidation
	                  id="registrationEmail"
	                  placeholder="Please enter your .gov or .mil email address"
	                  regex={emailRegex}
	                  buttonDisabled={this.props.setButtonDisabled}
	                  onChange={this.props.onChange}
	                  value={this.props.value}
	                />
			</div>
		);
	}
}