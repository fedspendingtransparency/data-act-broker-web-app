/**
* SignInButton.jsx
* Created by Kyle Fox 2/19/16
**/

import React from 'react';
import { kGlobalConstants } from '../../GlobalConstants.js';
import Request from 'superagent';

export default class SignInButton extends React.Component {
    loginClicked() {
        Request.post(kGlobalConstants.API + 'login/')
               .withCredentials()
               .send({ 'username': 'bray_michael@bah.com', 'password': 'pass' })
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
            <div className="col-md-6 usa-da-login-button-holder">
                <div className="align-right">
                    <button className="usa-button-big" type="button" onClick={this.loginClicked.bind(this)}>Sign in</button>
                </div>
            </div>
        );
    }
}
