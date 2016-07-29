/**
* ForgotPasswordPanel.jsx
* Created by Kyle Fox 2/23/16
**/

import React, { PropTypes } from 'react';
import { hashHistory } from 'react-router';
import { kGlobalConstants } from '../../GlobalConstants.js';
import Username from '../login/Username.jsx';
import SignInButton from '../login/SignInButton.jsx';
import ErrorMessage from '../SharedComponents/ErrorMessage.jsx';
import SuccessMessage from '../SharedComponents/SuccessMessage.jsx';

import * as LoginHelper from '../../helpers/loginHelper.js';

const propTypes = {
    message: PropTypes.string
};

export default class ForgotPasswordPanel extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            username: '',
            requestSent: false,
            resetFailed: false,
            buttonText: 'Reset',
            buttonDisabled: false,
            hideButton: false
        };
    }

    requestReset() {
        this.setState({
            buttonText: 'Submitting...',
            buttonDisabled: true
        });

        LoginHelper.requestPasswordToken(this.state.username)
            .then(() => {
                this.setState({
                    requestSent: true,
                    resetFailed: false,
                    hideButton: true,
                    buttonText: 'Reset',
                    buttonDisabled: false
                });
            })
            .catch((err) => {
                this.setState({
                    requestSent: true,
                    resetFailed: true,
                    hideButton: false,
                    buttonText: 'Reset',
                    buttonDisabled: false
                });
            });
    }

    handleKeyPress(e) {
        const enterKey = 13;
        if (e.charCode === enterKey) {
            e.preventDefault();
            this.requestReset();
        }
    }

    handleUsernameChange(e) {
        this.setState({
            username: e.target.value
        });
    }

    render() {
        let messageComponent = null;

        if (this.state.requestSent) {
            messageComponent = <SuccessMessage message={"If this email address has a user account, you will receive an email shortly. Don't forget to check your spam folder for messages from the DATA Act Broker."} />;
        } else if (this.props.message) {
            messageComponent = <ErrorMessage message={this.props.message} />;
        }

        let hideButton = '';
        if (this.state.hideButton) {
            hideButton = 'hide';
        }

        return (
            <div className="col-md-5 usa-da-login-container">
                <div className="row">
                    <div className="col-xs-12">
                        <p className="msg">Please enter your email address below. We will send an email to the registered email address with a link to reset your password.</p>
                    </div>
                </div>
                <form onKeyPress={this.handleKeyPress.bind(this)}>
                    <div className="row">
                        <div className="col-md-12">
                            <Username handleChange={this.handleUsernameChange.bind(this)}/>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-xs-6 usa-da-registration-links mt-20">
                            <a href="#/login" className="forgot-back">Back to login page</a>
                        </div>
                        <div className="col-xs-6">
                            <div className={hideButton}>
                                <SignInButton onClick={this.requestReset.bind(this)} disabled={this.state.buttonDisabled} buttonText={this.state.buttonText} />
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-12">
                            {messageComponent}
                        </div>
                    </div>
                </form>
            </div>
        );
    }
}

ForgotPasswordPanel.propTypes = propTypes;
