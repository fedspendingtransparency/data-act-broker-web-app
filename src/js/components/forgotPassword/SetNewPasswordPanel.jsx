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

import * as LoginHelper from '../../helpers/loginHelper.js';

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
            resetFailed: false,
            buttonDisabled: false,
            buttonText: 'Reset'
        };
    }

    requestReset() {
        let errorMessages = [];

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

        this.setState({ passwordErrors:errorMessages });

        if (errorMessages.length == 0) {
            if (this.state.password1 === this.state.password2) {
                this.setState({
                    buttonDisabled: true,
                    buttonText: 'Submitting...'
                });

                LoginHelper.resetPassword(this.props.email, this.state.password1)
                    .then(() => {
                        this.setState({
                            passwordsMatch: true,
                            requestSent: true,
                            resetFailed: false,
                            buttonText: 'Reset'
                        });
                    })
                    .catch((err) => {
                        this.setState({
                            passwordsMatch: true,
                            requestSent: true,
                            resetFailed: true,
                            buttonDisabled: false,
                            buttonText: 'Reset'
                        });
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
        if (e.charCode === enterKey && !this.state.buttonDisabled) {
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

        // Only show confirmation and log-in link on successful reset
        if (this.state.requestSent && !this.state.resetFailed){
            return (
                <div className="col-md-5 usa-da-login-container">
                    {messageComponent}
                    <div className="col-md-12 usa-da-reset-success">
                        <p>Please click <a href="#">here</a> to log in with your new password</p>
                    </div>
                </div>
            );
        } else {
            return (
                <div className="col-md-5 usa-da-login-container">
                    <form onKeyPress={this.handleKeyPress.bind(this)}>
                        <div className='row'>
                            <div className="col-md-12">
                                <p className="msg">Please enter your new password.</p>
                            </div>
                        </div>
                        <div className='row'>
                            <Password handleChange={this.handlePassword1Change.bind(this)}/>
                        </div>
                        <div className='row'>
                            <div className="col-md-12">
                                <p className="info">
                                    Please include an uppercase letter, a lowercase letter, a number, and a special character [ ] { } ~ ! @ # $ % ^, . ? ; in your password.
                                </p>
                            </div>
                        </div>
                        <div className='row'>
                            <Password handleChange={this.handlePassword2Change.bind(this)}/>
                        </div>
                        <div className='row'>
                            <div className="col-md-12 usa-da-login-button-holder">
                                <SignInButton onClick={this.requestReset.bind(this)} buttonText={this.state.buttonText} disabled={this.state.buttonDisabled} />
                            </div>
                        </div>
                        <div className='row'>
                            {messageComponent}
                        </div>
                    </form>
                </div>
            );
        }
    }
}

SetNewPasswordPanel.propTypes = propTypes;
