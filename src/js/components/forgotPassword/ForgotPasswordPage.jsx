/**
* ForgotPasswordPage.jsx
* Created by Kyle Fox 2/22/16
**/

import React, { PropTypes } from 'react';
import ForgotPasswordBanner from './ForgotPasswordBanner.jsx';

const propTypes = {
    message: PropTypes.string,
    email: PropTypes.string
};

export default class ForgotPasswordPage extends React.Component {
    render() {
        return (
            <div className="usa-da-login container-fluid">
                <ForgotPasswordBanner message={this.props.message} email={this.props.email} />
            </div>
        );
    }
}

ForgotPasswordPage.propTypes = propTypes;
