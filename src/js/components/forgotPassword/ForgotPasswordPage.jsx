/**
* ForgotPasswordPage.jsx
* Created by Kyle Fox 2/22/16
**/

import React, { PropTypes } from 'react';
import ForgotPasswordBanner from './ForgotPasswordBanner.jsx';

const propTypes = {
    errorCode: PropTypes.number,
    message: PropTypes.string,
    email: PropTypes.string
};

export default class ForgotPasswordPage extends React.Component {
    render() {
        return (
            <div className="usa-da-login container-fluid">
                <ForgotPasswordBanner errorCode={this.props.errorCode} message={this.props.message} email={this.props.email} />
            </div>
        );
    }
}

ForgotPasswordPage.propTypes = propTypes;
