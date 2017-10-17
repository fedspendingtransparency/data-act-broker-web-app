/**
* LoginPage.jsx
* Created by Kyle Fox 12/4/15
**/

import React from 'react';
import { kGlobalConstants } from '../../GlobalConstants.js';
import LoginContainer from '../../containers/login/LoginContainer.jsx';
import LoginBanner from './LoginBanner.jsx';
import LoginWarningTxt from './LoginWarningTxt.jsx';
import TestEnvironmentBanner from '../SharedComponents/banners/TestEnvironmentBanner.jsx';

export default class LoginPage extends React.Component {
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
                        <LoginBanner {...this.props} />
                        <LoginWarningTxt />
                    </div>
                </div>
            </div>
        );
    }
}
