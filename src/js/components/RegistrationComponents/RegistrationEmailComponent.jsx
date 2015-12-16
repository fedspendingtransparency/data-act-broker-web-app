/**
* RegistrationEmailComponent.jsx
* Created by Kyle Fox 12/11/15
**/

import React from 'react';
import SubmitEmailButton from './SubmitButton.jsx';

// An email input field that does basic validation for .mil and .gov emails
export default class EmailComponent extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            buttonDisabled: true
        };
    }

    handleChange(e) {
        var inputText = e.target.value;
        // Regex for matching foo@bar.mil or foo@bar.gov
        var emailRegex = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.(?:gov|mil)$/;
        var newButtonDisabled;

        // Activate submit button if input is either .mil or .gov email address
        if (inputText.match(emailRegex)) {
            newButtonDisabled = false;
        } else {
            newButtonDisabled = true;
        }

        this.setState({
            buttonDisabled: newButtonDisabled
        });
    }

    render() {
        return (
            <div>
                <label for="input-registration-email">Registration Email</label>
                <input id="input-registration-email" name="input-registration-email" placeholder="Please enter your .gov or .mil email address" type="text" onChange={this.handleChange.bind(this)} />
                <SubmitEmailButton buttonDisabled={this.state.buttonDisabled}/>
            </div>
        );
    }
}
