/**
  * LoginMaxLoading.jsx
  * Createdd by Kevin Li 10/14/16
  */

import React, { PropTypes } from 'react';
import LoginMaxErrorMessage from './components/LoginMaxErrorMessage';
import LoadingBauble from '../SharedComponents/overlays/LoadingBauble';

const propTypes = {
    errorMessage: PropTypes.string
};

const defaultProps = {
    errorMessage: ''
};

const maxUrl = "https://community.max.gov/pages/viewpage.action?spaceKey=TREASExternal&" +
    "title=DATA+Act+Broker+Registration";

export default class LoginMaxLoading extends React.Component {
    render() {
        let errorMessageComponent = null;
        let hideLoading = '';
        let hideError = ' hide';

        if (this.props.errorMessage && this.props.errorMessage !== "") {
            errorMessageComponent = <LoginMaxErrorMessage message={this.props.errorMessage} url={maxUrl} />;
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
                            Signing into the DATA Act Broker...
                        </div>
                    </div>
                </div>
                <div className={`row${hideError}`}>
                    <div className="col-md-12">
                        {errorMessageComponent}
                        <div className="back-link">
                            <a href="/">Back to login page</a>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

LoginMaxLoading.propTypes = propTypes;
LoginMaxLoading.defaultProps = defaultProps;
