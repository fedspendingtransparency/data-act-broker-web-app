/**
* ForgotPasswordPage.jsx
* Created by Kyle Fox 2/22/16
**/

import React, { PropTypes } from 'react';
import ForgotPasswordBanner from './ForgotPasswordBanner.jsx';

const propTypes = {
    token: PropTypes.string
};

export default class ForgotPasswordPage extends React.Component {
    render() {
        return (
            <div className="usa-da-login container-fluid">
                <ForgotPasswordBanner token={this.props.token} />
            </div>
        );
    }
}

ForgotPasswordPage.propTypes = propTypes;
