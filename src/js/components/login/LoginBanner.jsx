/**
* LoginBanner.jsx
* Created by Kyle Fox 2/19/16
*/

import React from 'react';
import LoginIntro from './LoginIntro';
import LoginContainer from '../../containers/login/LoginContainer';

export default class LoginBanner extends React.Component {
    render() {
        return (
            <div className="login-banner-wrap">
                <div className="usa-da-login-wrap">
                    <LoginIntro />
                    <LoginContainer {...this.props} />
                </div>
            </div>
        );
    }
}
