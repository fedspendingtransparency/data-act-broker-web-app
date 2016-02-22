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

export default class LoginPanel extends React.Component {
    loginClicked() {
        Request.post(kGlobalConstants.API + 'login/')
               .withCredentials()
               .send({ 'username': 'user3', 'password': '123abc' })
               .end((err) => {
                   if (err) {
                       console.log(err);
                   } else {
                       // Route to landing page on success
                       location.href = '#/landing';
                   }
               });
    }

    render() {
        return (
            <div className="col-md-6 usa-da-login-container">
                <form>
                    <Username/>
                    <Password/>
                    <LoginLinks/>
                    <SignInButton
                      onClick={this.loginClicked.bind(this)}
                      buttonText={"Sign In"}
                    />
                </form>
            </div>
        );
    }
}
