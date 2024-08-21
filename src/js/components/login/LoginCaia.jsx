/**
  * LoginCaia.jsx
  * Createdd by Kevin Li 10/13/16
  */

import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import Cookies from 'js-cookie';
import { kGlobalConstants } from '../../GlobalConstants';
import { getRedirectPath } from '../../helpers/loginHelper';

const propTypes = {
    location: PropTypes.object
};

const defaultProps = {
    location: null
};

export default class LoginCaia extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            redirect: ''
        };
        this.handleClick = this.handleClick.bind(this);
    }

    componentDidMount() {
        this.detectRedirection();
    }

    componentDidUpdate(prevProps) {
        if (!_.isEqual(prevProps.location, this.props.location)) {
            this.detectRedirection();
        }
    }

    detectRedirection() {
        // check if the URL has a redirect param, save it in the state
        const redirectPath = getRedirectPath(this.props.location);
        if (redirectPath) {
            this.setState({
                redirect: redirectPath
            }, () => {
                // save the redirect destination as a cookie, expire after 5 min (expressed in units of
                // days per library documentation)
                Cookies.set('brokerRedirect', this.state.redirect, { expires: (5 / (24 * 60)) });
            });
        }
        else {
            this.setState({
                redirect: ''
            }, () => {
                // remove the redirect destination cookie
                Cookies.remove('brokerRedirect');
            });
        }
    }

    handleClick(e) {
        if (e.keyCode === '13' || !e.keyCode) {
            const scope = "openid email profile address phone";
            const url = `${kGlobalConstants.CAIA_ROOT}/as/authorization.oauth2?`
                + `response_type=code`
                + `&scope=${scope}`
                + `&redirect_uri=${encodeURIComponent(kGlobalConstants.AUTH_CALLBACK)}`
                + `&client_id=${encodeURIComponent(kGlobalConstants.CAIA_CLIENT)}`;
            window.location.assign(url);
        }
    }

    render() {
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
                        onKeyDown={this.handleClick}
                        onClick={this.handleClick}>
                        Sign In Using CAIA
                    </button>
                </div>
            </div>
        );
    }
}

LoginCaia.propTypes = propTypes;
LoginCaia.defaultProps = defaultProps;
