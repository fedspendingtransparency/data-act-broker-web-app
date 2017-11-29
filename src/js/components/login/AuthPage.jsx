/**
* LoginPage.jsx
* Created by Kevin Li 10/24/16
*/

import React from 'react';
import { kGlobalConstants } from '../../GlobalConstants';
import AuthContainer from '../../containers/login/AuthContainer';
import LoginWarningTxt from './LoginWarningTxt';
import LoginIntro from './LoginIntro';
import TestEnvironmentBanner from '../SharedComponents/banners/TestEnvironmentBanner';


export default class AuthPage extends React.Component {
    render() {
        let testBanner = null;
        if (!kGlobalConstants.PROD) {
            testBanner = <TestEnvironmentBanner />;
        }

        return (
            <div className="usa-da-login-page">
                <div className="flex-wrapper">
                    <div className="usa-da-login container-fluid">
                        {testBanner}
                        <div className="login-banner-wrap">
                            <div className="usa-da-login-wrap">
                                <LoginIntro />
                                <AuthContainer />
                            </div>
                        </div>
                        <LoginWarningTxt />
                    </div>
                </div>
            </div>
        );
    }
}
