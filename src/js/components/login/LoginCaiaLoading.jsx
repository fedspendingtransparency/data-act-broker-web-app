/**
  * LoginCaiaLoading.jsx
  * Created by Kevin Li 10/14/16
  */

import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import LoginCaiaErrorMessage from './LoginCaiaErrorMessage';
import LoadingBauble from '../SharedComponents/overlays/LoadingBauble';

const propTypes = {
    errorMessage: PropTypes.string
};

const defaultProps = {
    errorMessage: ''
};

export default class LoginCaiaLoading extends React.Component {
    render() {
        let errorMessageComponent = null;
        let hideLoading = '';
        let hideError = ' hide';

        if (this.props.errorMessage) {
            errorMessageComponent = <LoginCaiaErrorMessage message={this.props.errorMessage} />;
            hideLoading = ' hide';
            hideError = '';
        }

        return (
            <div>
                <div className="row">
                    <div className={`col-md-12 login-loading${hideLoading}`}>
                        <div className="loading-animation">
                            <LoadingBauble />
                        </div>
                        <div className="loading-text">
                            Signing into Data Broker...
                        </div>
                    </div>
                </div>
                <div className={`row${hideError}`}>
                    <div className="col-md-12">
                        {errorMessageComponent}
                        <div className="back-link">
                            <Link to="/">Back to login page</Link>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

LoginCaiaLoading.propTypes = propTypes;
LoginCaiaLoading.defaultProps = defaultProps;
