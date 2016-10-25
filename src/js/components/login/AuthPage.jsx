/**
* LoginPage.jsx
* Created by Kevin Li 10/24/16
**/

import React from 'react';
import AuthContainer from '../../containers/login/AuthContainer.jsx';
import LoginTopBar from './LoginTopBar.jsx';
import LoginBanner from './LoginBanner.jsx';
import LoginWarningTxt from './LoginWarningTxt.jsx';
import LoginIntro from './LoginIntro.jsx';


export default class AuthPage extends React.Component {
    render() {
        return (
            <div className="usa-da-login-page">
                <div className="flex-wrapper">
                    <div className="usa-da-login container-fluid">
                        <LoginTopBar/>
                        <div className="login-banner-wrap">
                            <div className="usa-da-login-wrap">
                                <LoginIntro/>
                                <AuthContainer/>
                            </div>
                        </div>
                        <LoginWarningTxt/>
                    </div>
                </div>
            </div>
        );
    }
}
