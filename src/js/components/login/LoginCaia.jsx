/**
  * LoginCaia.jsx
  * Createdd by Kevin Li 10/13/16
  */

import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Cookies from 'js-cookie';
import { kGlobalConstants } from '../../GlobalConstants';
import { getRedirectPath } from '../../helpers/loginHelper';

const propTypes = {
    location: PropTypes.object
};

const LoginCaia = ({location = null}) => {
    const [loginRedirect, setLoginRedirect] = useState('');

    useEffect(() => {
        detectRedirection();
    }, []);

    useEffect(() => {
        detectRedirection();
    }, [location]);

    useEffect(() => {
        if(loginRedirect === '') {
            // remove the redirect destination cookie
            Cookies.remove('brokerRedirect');
        }
        else {
            // save the redirect destination as a cookie, expire after 5 min (expressed in units of
            // days per library documentation)
            Cookies.set('brokerRedirect', loginRedirect, { expires: (5 / (24 * 60)) });
        }
    }, [loginRedirect]);

    const detectRedirection = () => {
        // check if the URL has a redirect param, save it in the state
        const redirectPath = getRedirectPath(location);
        if (redirectPath) {
            setLoginRedirect(redirectPath);
        }
        else {
            setLoginRedirect('');
        }
    };

    const handleClick = (e) => {
        if (e.keyCode === '13' || !e.keyCode) {
            const scope = "openid email profile address phone";
            const url = `${kGlobalConstants.CAIA_ROOT}/as/authorization.oauth2?`
                + `response_type=code`
                + `&scope=${scope}`
                + `&redirect_uri=${encodeURIComponent(kGlobalConstants.AUTH_CALLBACK)}`
                + `&client_id=${encodeURIComponent(kGlobalConstants.CAIA_CLIENT)}`;
            window.location.assign(url);
        }
    };

    return (
        <div className="row">
            <div className="col-xs-12">
                <p className="instructions">
                    Sign in or register for the Data Broker using your CAIA login.
                </p>
                <button
                    className="usa-da-button btn-primary btn-lg btn-full bottom-login-button"
                    tabIndex="0"
                    role="link"
                    onKeyDown={handleClick}
                    onClick={handleClick}>
                    Sign In Using CAIA
                </button>
            </div>
        </div>
    );
};

LoginCaia.propTypes = propTypes;
export default LoginCaia;
