/**
* LoginBanner.jsx
* Created by Kyle Fox 2/19/16
*/

import LoginIntro from './LoginIntro';
import LoginContainer from '../../containers/login/LoginContainer';

const LoginBanner = (props) => {
    return (
        <div className="login-banner-wrap">
            <div className="usa-da-login-wrap">
                <LoginIntro />
                <LoginContainer {...props} />
            </div>
        </div>
    );
};

export default LoginBanner;
