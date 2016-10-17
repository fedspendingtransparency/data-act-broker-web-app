/**
* ForgotPasswordBanner.jsx
* Created by Kyle Fox 2/23/16
**/

import React, { PropTypes } from 'react';
import LoginIntro from '../login/LoginIntro.jsx';
import ForgotPasswordPanel from './ForgotPasswordPanel.jsx';
import SetNewPasswordPanel from './SetNewPasswordPanel.jsx';

const propTypes = {
    errorCode: PropTypes.number,
    message: PropTypes.string,
    email: PropTypes.string
};

export default class ForgotPasswordBanner extends React.Component {
    render() {
        let panelComponent = <ForgotPasswordPanel />;

        // If a message exists, a token has either confirmed or failed
        if (this.props.errorCode === 0) {
            panelComponent = <SetNewPasswordPanel email={this.props.email} />;
        } else {
            panelComponent = <ForgotPasswordPanel message={this.props.message} />;
        }

        return (
            <div className="login-banner-wrap">
                <div className="usa-da-login-wrap">
                    <LoginIntro/>
                    <div className="login-right usa-da-login-container">
                        {panelComponent}
                    </div>
                </div>
            </div>
        );
    }
}

ForgotPasswordBanner.propTypes = propTypes;
