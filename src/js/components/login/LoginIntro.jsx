/**
* LoginIntro.jsx
* Created by Kyle Fox 12/4/15
**/

import React from 'react';

export default class LoginIntro extends React.Component {
    render() {
        return (
            <div className="login-left usa-da-page-title">
                <div className="login-title">DATA Act Broker</div>
                <p>Welcome to the DATA Act Broker.</p>
                <p>Sign in to upload your agency financial data and validate it against the DATA Act Information Model Schema (DAIMS).</p>
            </div>
        );
    }
}