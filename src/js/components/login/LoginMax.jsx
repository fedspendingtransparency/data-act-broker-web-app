/**
  * LoginMax.jsx
  * Createdd by Kevin Li 10/13/16
  */

import React, { PropTypes } from 'react';
import _ from 'lodash';
import Cookies from 'js-cookie';
import { kGlobalConstants } from '../../GlobalConstants';

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

        if (Object.prototype.hasOwnProperty.call(this.props.location.query, 'redirect')) {
            this.setState({
                redirect: this.props.location.query.redirect
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

    render() {
        return (
            <div className="row">
                <div className="col-xs-12">
                    <p className="instructions">Sign in or register for the DATA Act Broker using your MAX ID.</p>
                    <a
                        href={`${kGlobalConstants.CAS_ROOT}/cas/login?service=${
                            encodeURIComponent(kGlobalConstants.AUTH_CALLBACK)}`}
                        className="usa-da-button btn-primary btn-lg btn-full">
                        Sign In Using MAX
                    </a>
                </div>
            </div>
        );
    }
}

LoginMax.propTypes = propTypes;
LoginMax.defaultProps = defaultProps;
