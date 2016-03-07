/**
* SetNewPasswordPanel.jsx
* Created by Kyle Fox 2/25/16
**/

import React, { PropTypes } from 'react';
import { kGlobalConstants } from '../../GlobalConstants.js';
import Request from 'superagent';
import Password from '../login/Password.jsx';
import SignInButton from '../login/SignInButton.jsx';
import ErrorMessage from '../SharedComponents/ErrorMessage.jsx';
import ErrorMessageList from '../SharedComponents/ErrorMessageList.jsx';
import SuccessMessage from '../SharedComponents/SuccessMessage.jsx';

const propTypes = {
    email: PropTypes.string
};

export default class SetNewPasswordPanel extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            password1: '',
            password2: '',
            passwordsMatch: true,
            passwordErrors : [],
            requestSent: false,
            resetFailed: false
        };
    }

    requestReset() {
        let errorMessages = []
        if(this.state.password1.length < 8) {
            errorMessages.push("Password must be at least 8 characters in length.");
        }
        if (!this.state.password1.match(/[a-z]/)) {
            errorMessages.push("Password must contain at least one lowercase letter.");
        }
        if (!this.state.password1.match(/[A-Z]/)) {
            errorMessages.push("Password must contain at least one uppercase letter.");
        }
        if (!this.state.password1.match(/\d/i)) {
            errorMessages.push("Password must contain at least one number.");
        }
        if (!this.state.password1.match(/[\[\]\{\}~!@#$%^,.?;<>]/i)) {
            errorMessages.push("Password must contain at least one of the following characters [ ] { } ~ ! @ # $ % ^, . ? ;");
        }
        this.setState({passwordErrors:errorMessages});
        if (errorMessages.length == 0) {
            if (this.state.password1 === this.state.password2) {
                Request.post(kGlobalConstants.API + 'set_password/')
                    .withCredentials()
                    .send({ 'user_email': this.props.email, 'password': this.state.password1 })
                    .end((err) => {
                        if (err) {
                            this.setState({
                                passwordsMatch: true,
                                requestSent: true,
                                resetFailed: true
                            });
                        } else {
                            this.setState({
                                passwordsMatch: true,
                                requestSent: true,
                                resetFailed: false
                            });
                        }
                    });
            } else {
                this.setState({
                    passwordsMatch: false
                });
            }
        }
    }

    handleKeyPress(e) {
        const enterKey = 13;
        if (e.charCode === enterKey) {
            this.requestReset();
            e.preventDefault();
        }
    }

    handlePassword1Change(e) {
        this.setState({
            password1: e.target.value
        });
    }

    handlePassword2Change(e) {
        this.setState({
            password2: e.target.value
        });
    }

    render() {
        let messageComponent = null;
        if(this.state.passwordErrors.length == 1) {
            messageComponent = <ErrorMessage message={this.state.passwordErrors[0]}/>;
        }
        else if(this.state.passwordErrors.length > 1) {
            messageComponent = <ErrorMessageList errorMessages={this.state.passwordErrors}/>;
        }
        else if (!this.state.passwordsMatch) {
            messageComponent = <ErrorMessage message={"Your passwords do not match."} />;
        } else if (this.state.requestSent) {
            if (this.state.resetFailed) {
                messageComponent = <ErrorMessage message={"We could not reset your password at this time."} />;
            } else {
                messageComponent = <SuccessMessage message={"Password successfully reset."} />;
            }
        }
        return (
            <div className="col-md-6 usa-da-login-container">
                <form onKeyPress={this.handleKeyPress.bind(this)}>
                    <Password handleChange={this.handlePassword1Change.bind(this)}/>
                    <Password handleChange={this.handlePassword2Change.bind(this)}/>
                    <div className="col-md-8 usa-da-text-white">
                        Please enter your new password.
                    </div>
                    <SignInButton
                      onClick={this.requestReset.bind(this)}
                      buttonText={"Reset"}
                    />
                    {messageComponent}
                </form>
            </div>
        );
    }
}

SetNewPasswordPanel.propTypes = propTypes;
