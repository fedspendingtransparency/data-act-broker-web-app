/**
* LoginLinks.jsx
* Created by Kyle Fox 2/19/16
**/

import React from 'react';

export default class LoginLinks extends React.Component {
    render() {
        return (
            <div className="col-md-8 usa-da-registration-links">
                <p>
                    <a href="#/registration/email">Register</a>&nbsp;&nbsp;|&nbsp;&nbsp;<a href="#/forgotpassword">Forgot password</a>&nbsp;&nbsp;|&nbsp;&nbsp;<a href="#">Help</a>
                </p>
            </div>
        );
    }
}
