/**
* LoginPanel.jsx
* Created by Kyle Fox 2/19/16
**/

import React from 'react';
import { kGlobalConstants } from '../../GlobalConstants.js';
import Username from './Username.jsx';
import Password from './Password.jsx';
import LoginLinks from './LoginLinks.jsx';
import SignInButton from './SignInButton.jsx';
import Request from 'superagent';
import ErrorMessage from '../SharedComponents/ErrorMessage.jsx';

export default class LoginPanel extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            username: '',
            password: '',
            loginFailed: false
        };
    }

    loginClicked() {
        Request.post(kGlobalConstants.API + 'login/')
               .withCredentials()
               .send({ 'username': this.state.username, 'password': this.state.password })
               .end((err) => {
                   if (err) {
                       console.log(err);
                       this.setState({
                           loginFailed: true
                       });
                   } else {
                       this.setState({
                           loginFailed: false
                       });

                       // Route to landing page on success
                       location.href = '#/landing';
                   }
               });
    }

    handleKeyPress(e) {
        if (e.charCode === 13) {
            this.loginClicked();
        }
    }

    handleUsernameChange(e) {
        this.setState({
            username: e.target.value
        });
    }

    handlePasswordChange(e) {
        this.setState({
            password: e.target.value
        });
    }

    render() {
        let errorMessageComponent = null;

        if (this.state.loginFailed) {
            errorMessageComponent = <ErrorMessage message={"Username or password is incorrect"} />;
        }

        return (
            <div className="col-md-6 usa-da-login-container">
                <form onKeyPress={this.handleKeyPress.bind(this)}>
                    <Username handleChange={this.handleUsernameChange.bind(this)} />
                    <Password handleChange={this.handlePasswordChange.bind(this)} />
                    <LoginLinks/>
                    <SignInButton
                      onClick={this.loginClicked.bind(this)}
                      buttonText={"Sign In"}
                    />
                    {errorMessageComponent}
                </form>
            </div>
        );
    }
}
