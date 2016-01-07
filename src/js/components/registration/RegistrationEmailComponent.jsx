/**
* RegistrationEmailComponent.jsx
* Created by Kyle Fox 12/11/15
**/

import React from 'react';
import EmailValidation from '../SharedComponents/EmailValidation.jsx';
import SubmitEmailButton from './SubmitButton.jsx';

// An email input field that does basic validation for .mil and .gov emails
export default class EmailComponent extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            buttonDisabled: true
        };
    }

    setButtonDisabled(disabled) {
        this.setState({
            buttonDisabled: disabled
        });
    }

    render() {
        // Regex for matching foo@bar.mil or foo@bar.gov
        const emailRegex = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.(?:gov|mil)$/;

        return (
            <form action="/registrationEmail" method="post">
                <label htmlFor="input-registration-email">Registration Email</label>
                <EmailValidation
                  id={"registrationEmail"}
                  placeholder={"Please enter your .gov or .mil email address"}
                  regex={emailRegex}
                  buttonDisabled={this.setButtonDisabled.bind(this)}
                />
                <SubmitEmailButton buttonDisabled={this.state.buttonDisabled} />
            </form>
        );
    }
}
