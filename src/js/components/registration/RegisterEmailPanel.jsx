/**
* RegisterEmailPanel.jsx
* Created by Katie Rose on 2/25/16
**/

import React from 'react';
import { kGlobalConstants } from '../../GlobalConstants.js';
import Request from 'superagent';
import EmailValidation from '../SharedComponents/EmailValidation.jsx';
import ErrorMessage from '../SharedComponents/ErrorMessage.jsx';
import SuccessMessage from '../SharedComponents/SuccessMessage.jsx';
import SubmitEmailButton from './SubmitButton.jsx';

export default class RegisterEmailPanel extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            username: '',
            requestSent: false,
            resetFailed: false,
            buttonDisabled: true
        };
    }

    setButtonDisabled(disabled) {
        this.setState({
            buttonDisabled: disabled
        });
    }

    requestReset() {
        Request.post(kGlobalConstants.API + 'confirm_email/')
               .withCredentials()
               .send({ 'email': this.state.username })
               .end((err) => {
                   if (err) {
                       this.setState({
                           requestSent: true,
                           resetFailed: true
                       });
                   } else {
                       this.setState({
                           requestSent: true,
                           resetFailed: false
                       });
                   }
               });
    }

    handleKeyPress(e) {
        const enterKey = 13;
        if (e.charCode === enterKey) {
            this.requestReset();
            e.preventDefault();
        }
    }

    handleUsernameChange(e) {
        this.setState({
            username: e.target.value
        });

        const inputText = e.target.value;
        let newButtonDisabled;

        if (inputText.match(this.props.regex)) {
            newButtonDisabled = false;
            this.setState({
              buttonDisabled: false
            })
        } else {
            newButtonDisabled = true;
            this.setState({
              buttonDisabled: true
            })
        }


    }

    render() {
        let messageComponent = null;
        let successMsg = "An email has been sent to the address above. Please follow the link within this email to verify your email address.";
        let submitComponent = <SubmitEmailButton
                                onClick={this.requestReset.bind(this)}
                                buttonText="Verify this email address"
                                buttonDisabled={this.state.buttonDisabled}
                              />
        let actionComponent = submitComponent;
        const emailRegex = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.(?:gov|mil|com)$/;

        if (this.state.requestSent) {
            if (this.state.resetFailed) {
                messageComponent = <ErrorMessage message={"There was an error. If you already have an account, please login or reset your password."} />;
            } else {
                messageComponent = <SuccessMessage message={successMsg} />;
            }
            actionComponent = messageComponent;
        }

        return (
            <div className="col-md-6 usa-da-login-container">
                <form onKeyPress={this.handleKeyPress.bind(this)}>
                  <EmailValidation
                    id={"registrationEmail"}
                    placeholder={"Please enter your .gov or .mil email address"}
                    regex={emailRegex}
                    buttonDisabled={this.setButtonDisabled.bind(this)}
                    handleChange={this.handleUsernameChange.bind(this)}
                  />
                    {actionComponent}
                </form>
            </div>
        );
    }
}
