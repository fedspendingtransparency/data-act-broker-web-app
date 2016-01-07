/**
* LoginComponents.jsx
* Created by Kyle Fox 12/4/15
**/

import React from 'react';

class Username extends React.Component {
    render() {
        return (
            <div className="usa-da-input-container">
                <label className="sr-only" htmlFor="username">Username or email address</label>
                <input id="username" name="username" type="text"placeholder="Username" aria-describedby="username" />
                <div className="usa-da-icon usa-da-icon-user"></div>
            </div>
        );
    }
}

class Password extends React.Component {
    render() {
        return (
            <div className="usa-da-input-container">
                <label className="sr-only" htmlFor="password">Password</label>
                <input id="password" name="password" type="password" placeholder="Password" aria-describedby="password" />
                <div className="usa-da-icon usa-da-icon-lock"></div>
            </div>
        );
    }
}

class LoginLinks extends React.Component {
    render() {
        return (
            <div className="col-md-6 usa-da-registration-links">
                <p>
                    <a href="#/registration/email">Register</a>&nbsp;&nbsp;|&nbsp;&nbsp;<a href="#">Help</a>
                </p>
            </div>
        );
    }
}

class SignInButton extends React.Component {
    render() {
        return (
            <div className="col-md-6 usa-da-login-button-holder">
                <div className="align-right">
                    <a href="/#/landing"><button className="usa-button-big" type="button">Sign in</button></a>
                </div>
            </div>
        );
    }
}

class LoginPanel extends React.Component {
    render() {
        return (
            <div className="col-md-6 usa-da-login-container">
                <form>
                    <Username/>
                    <Password/>
                    <LoginLinks/>
                    <SignInButton/>
                </form>
            </div>
        );
    }
}

class LoginIntro extends React.Component {
    render() {
        return (
            <div className="col-md-6 usa-da-text-white">
                <h1>Data Broker</h1>
                <h3>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi accumsan eleifend nunc.
                    Donec blandit accumsan lacus, ut feugiat diam bibendum vitae. Fusce sit amet elit dolor.
                    Praesent malesuada sem id tortor scelerisque, a pretium purus sagittis.
                </h3>
            </div>
        );
    }
}

class LoginBanner extends React.Component {
    render() {
        return (
            <div className="usa-da-color-gray-light-eighth-tone">
                <div className="container">
                    <div className="row">
                        <LoginIntro/>
                       <LoginPanel/>
                    </div>
                </div>
            </div>
        );
    }
}

export default class LoginPage extends React.Component {
    render() {
        return (
            <div className="usa-da-login container-fluid">
                <LoginBanner/>
            </div>
        );
    }
}
