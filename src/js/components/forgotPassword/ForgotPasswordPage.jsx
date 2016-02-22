/**
* ForgotPasswordPage.jsx
* Created by Kyle Fox 2/22/16
**/

import React from 'react';
import LoginIntro from '../login/LoginIntro.jsx';
import Username from '../login/Username.jsx';
import SignInButton from '../login/SignInButton.jsx';

export default class ForgotPasswordPage extends React.Component {
    render() {
        return (
            <div className="usa-da-login container-fluid">
                <ForgotPasswordBanner/>
            </div>
        );
    }
}

class ForgotPasswordBanner extends React.Component {
    render() {
        return (
            <div className="usa-da-color-gray-light-eighth-tone">
                <div className="container">
                    <div className="row">
                        <LoginIntro/>
                        <ForgotPasswordPanel/>
                    </div>
                </div>
            </div>
        );
    }
}

class ForgotPasswordPanel extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            username: ''
        };
    }

    handleUsernameChange(e) {
        this.setState({
            username: e.target.value
        });
    }

    resetPassword() {
        console.log('Email: ' + this.state.username);
    }

    render() {
        return (
            <div className="col-md-6 usa-da-login-container">
                <Username handleChange={this.handleUsernameChange.bind(this)}/>
                <div className="col-md-8 usa-da-text-white">
                    Please enter your email or username.
                </div>
                <SignInButton
                  onClick={this.resetPassword.bind(this)}
                  buttonText={"Reset"}
                />
            </div>
        );
    }
}
