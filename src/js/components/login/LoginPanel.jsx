/**
* LoginPanel.jsx
* Created by Kyle Fox 2/19/16
**/ 

import React from 'react';
import Username from './Username.jsx';
import Password from './Password.jsx';
import LoginLinks from './LoginLinks.jsx';
import SignInButton from './SignInButton.jsx';
import ErrorMessage from '../SharedComponents/ErrorMessage.jsx';

export default class LoginPanel extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            username: '',
            password: ''
        };
    }

    loginClicked() {
        this.props.performLogin(this.state.username, this.state.password);
    }

    handleKeyPress(e) {
        const enterKey = 13;
        if (e.charCode === enterKey) {
            this.loginClicked();
            e.preventDefault();
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
        let signInButtonText = "Sign In";

        let errorMessageComponent = null;

        if (this.props.session.login == "failed") {
            errorMessageComponent = <ErrorMessage message={"Username or password is incorrect"} />;
        }


        return (
            <div className="col-md-5 usa-da-login-container">
                <form onKeyPress={this.handleKeyPress.bind(this)}>
                    <div className="row">
                        <div className="col-md-12">
                            <Username handleChange={this.handleUsernameChange.bind(this)} />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-12">
                            <Password handleChange={this.handlePasswordChange.bind(this)} />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-xs-12 col-sm-4 col-sm-push-8">
                            <SignInButton onClick={this.loginClicked.bind(this)} buttonText={"Sign In"}/>
                        </div>
                        <LoginLinks/>
                    </div>
                    <div className="row">
                        <div className="col-md-12">
                            {errorMessageComponent}
                        </div>
                    </div>
                </form>
            </div>
        );
    }
}
