/**
* ForgotPasswordPanel.jsx
* Created by Kyle Fox 2/23/16
**/

import React, { PropTypes } from 'react';
import { hashHistory } from 'react-router';
import { kGlobalConstants } from '../../GlobalConstants.js';
import Request from 'superagent';
import Username from '../login/Username.jsx';
import SignInButton from '../login/SignInButton.jsx';
import ErrorMessage from '../SharedComponents/ErrorMessage.jsx';
import SuccessMessage from '../SharedComponents/SuccessMessage.jsx';

const propTypes = {
    message: PropTypes.string
};

export default class ForgotPasswordPanel extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            username: '',
            requestSent: false,
            resetFailed: false
        };
    }

    requestReset() {
        Request.post(kGlobalConstants.API + 'reset_password/')
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
            if (this.state.resetFailed) {
                messageComponent = <ErrorMessage message={"The given email or username does not exist."} />;
            } else {
                messageComponent = <SuccessMessage message={"You will receive an email shortly."} />;
            }
        } else if (this.props.message) {
            messageComponent = <ErrorMessage message={this.props.message} />;
        }

        return (
            <div className="col-md-5 usa-da-login-container">
                <div className="col-xs-12">
                    <p className="msg">Please enter your email address below. We will send an email to the registered email address with a link to reset your password.</p>
                </div>
                <form onKeyPress={this.handleKeyPress.bind(this)}>
                    <div className='row'>
                        <Username handleChange={this.handleUsernameChange.bind(this)}/>
                    </div>
                    <div className='row'>
                        <div className="col-xs-6 usa-da-registration-links">
                            <a href="#/login" className="forgot-back">Back to login page</a>
                        </div>
                        <div className="col-xs-6 usa-da-login-button-holder">
                            <SignInButton onClick={this.requestReset.bind(this)} buttonText={"Reset"} />
                        </div>
                    </div>
                    {messageComponent}
                </form>
            </div>
        );
    }
}

ForgotPasswordPanel.propTypes = propTypes;
