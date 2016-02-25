/**
* ForgotPasswordBanner.jsx
* Created by Kyle Fox 2/23/16
**/

import React, { PropTypes } from 'react';
import LoginIntro from '../login/LoginIntro.jsx';
import ForgotPasswordPanel from './ForgotPasswordPanel.jsx';
import SetNewPasswordPanel from './SetNewPasswordPanel.jsx';

const propTypes = {
    message: PropTypes.string,
    email: PropTypes.string
};

export default class ForgotPasswordBanner extends React.Component {
    render() {
        let panelComponent = <ForgotPasswordPanel />;

        // If a message exists, a token has either confirmed or failed
        if (this.props.message === 'success') {
            panelComponent = <SetNewPasswordPanel email={this.props.email} />;
        } else if (this.props.message === 'Link already used') {
            panelComponent = <ForgotPasswordPanel message={this.props.message} />;
        }

        return (
            <div className="usa-da-color-gray-light-eighth-tone">
                <div className="container">
                    <div className="row">
                        <LoginIntro/>
                        {panelComponent}
                    </div>
                </div>
            </div>
        );
    }
}

ForgotPasswordBanner.propTypes = propTypes;
