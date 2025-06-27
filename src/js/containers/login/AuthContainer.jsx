/**
  * AuthContainer.jsx
  * Created by Kevin Li 10/13/16
  */

import { useState } from 'react';
import { useNavigate } from 'react-router';
import { useLocation } from 'react-router-dom';
import _ from 'lodash';
import Cookies from 'js-cookie';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as sessionActions from 'redux/actions/sessionActions';

import * as LoginHelper from 'helpers/loginHelper';
import LoginCaiaLoading from 'components/login/LoginCaiaLoading';

const AuthContainer = (props) => {
    const [code, setCode] = useState('');
    const [error, setError] = useState('');
    const [runRedirect, setRunRedirect] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        processTicket();
    }, []);

    useEffect(() => {
        if (runRedirect) {
            setRunRedirect(false);
            navigate(pathname, { replace: true })

            let destination = '/landing';

            // check if a redirection cookie exists, if it exists, set that as the destination
            const cookieRedirect = Cookies.get('brokerRedirect');
            if (cookieRedirect) {
                destination = cookieRedirect;
            }

            // perform the login
            LoginHelper.performCAIALogin(code)
                .then((loginRes) => {
                    LoginHelper.establishSession(loginRes.headers);
                    
                    if (!Cookies.get('session')) {
                        // couldn't set cookie, fail this request and notify the user
                        props.setLoginState('failed');
                        return Promise.reject('cookie');
                    }
    
                    return LoginHelper.fetchActiveUser();
                })
                .then((data) => {
                    // remove any redirection cookies
                    Cookies.remove('brokerRedirect');

                    // success authorization from API, continue to destination
                    if (data.helpOnly) {
                        destination = '/help';
                    }
                    navigate(destination);
                })
                .catch((err) => {
                    // if the endpoint that failed was the login
                    if (err.request?.responseURL.includes('caia_login')) {
                        props.setLoginState('failed');
                    }
                    // if the endpoint that failed was the active user check
                    if (err.request?.responseURL.includes('active_user')) {
                        props.setLoggedOut();
                    }
                    // unset the login state cookie
                    Cookies.remove('brokerLogin');

                    // something went wrong (or API passed back an error status and message)
                    let message = err;
                    if (message === 'cookie') {
                        // this is a cookie issue
                        message = 'Your browser does not support cookies, which Data Broker requires to ' +
                            'function correctly. Try changing your browser settings to enable cookies or use a ' +
                            'different browser.';
                    }
                    else if (!_.isString(message)) {
                        // message isn't a string, fallback
                        message = 'An error occurred while authorizing the user account. Try again later.';
                    }

                    setError(message);

                    // remove any redirection cookies
                    Cookies.remove('brokerRedirect');
                });
        }
    }, [runRedirect]);

    const processTicket = () => {
        // extract the ticket string from the URL
        const urlParams = location.search;

        const caiaRegex = /code=([^&])+/g;
        const caiaRegexOutput = caiaRegex.exec(urlParams);
        if (caiaRegexOutput) {
            // a CAIA code was found, process it
            const code = caiaRegexOutput[0].substring('code='.length);

            // save the code value in the component state
            setCode(code);
            setError('');
            setRunRedirect(true);
        }
        else {
            // no ticket or code found, toss back to login page
            navigate('/login');

            // remove any redirection cookies
            Cookies.remove('brokerRedirect');
        }
    }

    return (
        <div className="login-right usa-da-login-container">
            <LoginCaiaLoading errorMessage={error} />
        </div>
    );
};

export default connect(
    (state) => ({ session: state.session }),
    (dispatch) => bindActionCreators(sessionActions, dispatch)
)(AuthContainer);
