/**
* LoginPage.jsx
* Created by Kyle Fox 12/4/15
*/

import React from 'react';
import { kGlobalConstants } from '../../GlobalConstants';
import LoginBanner from './LoginBanner';
import LoginWarningTxt from './LoginWarningTxt';
import TestEnvironmentBanner from '../SharedComponents/banners/TestEnvironmentBanner';

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
