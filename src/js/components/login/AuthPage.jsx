/**
* LoginPage.jsx
* Created by Kevin Li 10/24/16
*/

import AuthContainer from 'containers/login/AuthContainer';
import { kGlobalConstants } from '../../GlobalConstants';
import LoginWarningTxt from './LoginWarningTxt';
import LoginIntro from './LoginIntro';
import TestEnvironmentBanner from '../SharedComponents/banners/TestEnvironmentBanner';


const AuthPage = (props) => {
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
                            <AuthContainer {...props} />
                        </div>
                    </div>
                    <LoginWarningTxt />
                </div>
            </div>
        </div>
    );
};

export default AuthPage;
