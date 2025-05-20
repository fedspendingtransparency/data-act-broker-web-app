/**
  * AuthContainer.jsx
  * Created by Kevin Li 10/13/16
  */

import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import Cookies from 'js-cookie';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as LoginHelper from 'helpers/loginHelper';
import LoginCaiaLoading from 'components/login/LoginCaiaLoading';

const propTypes = {
    history: PropTypes.object
};

export class AuthContainer extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            ticket: '',
            code: '',
            error: ''
        };
    }

    componentDidMount() {
        this.processTicket();
    }

    processTicket() {
        // extract the ticket string from the URL
        const url = window.location.href;

        const caiaRegex = /code=([^&])+/g;
        const caiaRegexOutput = caiaRegex.exec(url);
        if (caiaRegexOutput) {
            // a CAIA code was found, process it
            const code = caiaRegexOutput[0].substring('code='.length);

            // save the code value in the component state
            this.setState({
                code,
                error: ''
            }, () => {
                // remove the code from the URL
                const updatedUrl = url.replace(`?code=${this.state.code}`, '');
                window.history.replaceState({}, null, updatedUrl);

                let destination = '/landing';

                // check if a redirection cookie exists, if it exists, set that as the destination
                const cookieRedirect = Cookies.get('brokerRedirect');
                if (cookieRedirect) {
                    destination = cookieRedirect;
                }

                // perform the login
                LoginHelper.performCAIALogin(this.state.code)
                    .then((loginRes) => {
                        LoginHelper.establishSession(loginRes.headers);
                        
                        if (!Cookies.get('session')) {
                            // couldn't set cookie, fail this request and notify the user
                            this.props.setLoginState('failed');
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
                        this.props.history.push(destination);
                    })
                    .catch((err) => {
                        // if the endpoint that failed was the login
                        if (err.request?.responseURL.includes('caia_login')) {
                            this.props.setLoginState('failed');
                        }
                        // if the endpoint that failed was the active user check
                        if (err.request?.responseURL.includes('active_user')) {
                            this.props.setLoggedOut();
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

                        this.setState({
                            error: message
                        });

                        // remove any redirection cookies
                        Cookies.remove('brokerRedirect');
                    });
            });
        }
        else {
            // no ticket or code found, toss back to login page
            this.props.history.push('/login');

            // remove any redirection cookies
            Cookies.remove('brokerRedirect');
        }
    }

    render() {
        return (
            <div className="login-right usa-da-login-container">
                <LoginCaiaLoading errorMessage={this.state.error} />
            </div>
        );
    }
}

AuthContainer.propTypes = propTypes;

export default connect(
    (state) => ({ session: state.session }),
    (dispatch) => bindActionCreators(sessionActions, dispatch)
)(AuthContainer);
