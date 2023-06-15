/**
  * LoginMax.jsx
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

export default class LoginMax extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            redirect: ''
        };
        this.handleClick = this.handleMaxClick.bind(this);
        this.handleClick = this.handleCaiaClick.bind(this);
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

    handleMaxClick(e) {
        if (e.keyCode === '13' || !e.keyCode) {
            const url = `${kGlobalConstants.CAS_ROOT}/cas/login?` +
                `service=${encodeURIComponent(kGlobalConstants.AUTH_CALLBACK)}`;
            window.location.assign(url);
        }
    }

    handleCaiaClick(e) {
        if (e.keyCode === '13' || !e.keyCode) {
            // TODO: update scope appropriately
            const scope = "openid email profile address phone";
            const url = `${kGlobalConstants.CAIA_ROOT}/as/authorization.oauth2?`
                + `response_type=code`
                + `&scope=${scope}`
                + `&redirect_uri=${encodeURIComponent(kGlobalConstants.AUTH_CALLBACK)}`
                + `&client_id=${encodeURIComponent(kGlobalConstants.CAIA_CLIENT)}`;
            console.log(url);
            window.location.assign(url);
        }
    }

    render() {
        return (
            <div className="row">
                <div className="col-xs-12">
                    <p className="instructions">
                        Sign in or register for the DATA Act Broker using your MAX ID or CAIA login.
                    </p>
                    <button
                        className="usa-da-button btn-primary btn-lg btn-full"
                        tabIndex="0"
                        role="link"
                        onKeyDown={this.handleMaxClick}
                        onClick={this.handleMaxClick}>
                        Sign In Using MAX
                    </button>
                    <button
                        className="usa-da-button btn-primary btn-lg btn-full bottom-login-button"
                        tabIndex="0"
                        role="link"
                        onKeyDown={this.handleCaiaClick}
                        onClick={this.handleCaiaClick}>
                        Sign In Using CAIA
                    </button>
                </div>
            </div>
        );
    }
}

LoginMax.propTypes = propTypes;
LoginMax.defaultProps = defaultProps;
