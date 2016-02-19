/**
* LoginPanel.jsx
* Created by Kyle Fox 2/19/16
**/

import React from 'react';
import Username from './Username.jsx';
import Password from './Password.jsx';
import LoginLinks from './LoginLinks.jsx';
import SignInButton from './SignInButton.jsx';

export default class LoginPanel extends React.Component {
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
