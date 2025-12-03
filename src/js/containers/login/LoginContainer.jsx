/**
* LoginContainer.jsx
* Created by Kevin Li 3/17/16
*/

import { useState } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import Cookies from 'js-cookie';

import LoginPanel from 'components/login/LoginPanel';
import LoginCaia from 'components/login/LoginCaia';
import Banner from 'components/SharedComponents/Banner';
import * as LoginHelper from 'helpers/loginHelper';
import * as sessionActions from 'redux/actions/sessionActions';
import { kGlobalConstants } from '../../GlobalConstants';

const propTypes = {
    location: PropTypes.object
};

const LoginContainer = ({location = {}, ...props}) => {
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const performLogin = (username, password) => {
        setLoading(true);

        LoginHelper.performLogin(username, password)
            .then((loginRes) => {
                LoginHelper.establishSession(loginRes.headers);

                if (!Cookies.get('session')) {
                    // couldn't set cookie, fail this request and notify the user
                    props.setLoginState('failed');
                    return Promise.reject('cookie');
                }

                return LoginHelper.fetchActiveUser();
            })
            .catch((err) => {
                // if the endpoint that failed was the login
                if (err.request?.responseURL.includes('login')) {
                    props.setLoginState('failed');
                }
                // if the endpoint that failed was the active user check
                if (err.request?.responseURL.includes('active_user')) {
                    props.setLoggedOut();
                }

                // unset the login state cookie
                Cookies.remove('brokerLogin');

                // if there was a cookie issue, we have to specify it, otherwise just show the error
                if (err === "cookie") {
                    props.setLoginState('failed');
                    setLoading(false);
                    setErrorMessage('Your browser does not support cookies, which Data Broker requires to function ' +
                        'correctly. Try changing your browser settings to enable cookies or use a different browser.'
                    );
                }
                else {
                    setLoading(false);
                    setLoading(err.response.data.message);
                }
            });
    }

    let login = <LoginCaia {...props} />;

    if (kGlobalConstants.LOCAL) {
        login = (<LoginPanel
            {...props}
            performLogin={performLogin}
            loading={loading}
            errorMessage={errorMessage} />);
    }

    return (
        <div className="login-right usa-da-login-container">
            <Banner type="login" />
            {login}
        </div>
    );
};

LoginContainer.propTypes = propTypes;

export default connect(
    (state) => ({ session: state.session }),
    (dispatch) => bindActionCreators(sessionActions, dispatch)
)(LoginContainer);
