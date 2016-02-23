/**
* ForgotPasswordPanel.jsx
* Created by Kyle Fox 2/23/16
**/

import React, { PropTypes } from 'react';
import Username from '../login/Username.jsx';
import SignInButton from '../login/SignInButton.jsx';

const propTypes = {
    token: PropTypes.string
};

export default class ForgotPasswordPanel extends React.Component {
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

ForgotPasswordPanel.propTypes = propTypes;
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
