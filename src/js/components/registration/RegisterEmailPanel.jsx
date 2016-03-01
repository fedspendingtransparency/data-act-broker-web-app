/**
* RegisterEmailPanel.jsx
* Created by Katie Rose on 2/25/16
**/

import React from 'react';
import { kGlobalConstants } from '../../GlobalConstants.js';
import Request from 'superagent';
import Username from '../login/Username.jsx';
import SignInButton from '../login/SignInButton.jsx';
import ErrorMessage from '../SharedComponents/ErrorMessage.jsx';
import SuccessMessage from '../SharedComponents/SuccessMessage.jsx';

export default class RegisterEmailPanel extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            username: '',
            requestSent: false,
            resetFailed: false
        };
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
    }

    render() {
        let messageComponent = null;
        let successMsg = "An email has been sent to the address above. Please follow the link within this email to verify your email address.";
        let submitComponent = <SignInButton
                                onClick={this.requestReset.bind(this)}
                                buttonText={"Submit"}
                              />
        let actionComponent = submitComponent;

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
                    <Username handleChange={this.handleUsernameChange.bind(this)}/>
                    <div className="col-md-8 usa-da-text-white">
                        Please enter your email or username.
                    </div>
                    {actionComponent}
                </form>
            </div>
        );
    }
}
