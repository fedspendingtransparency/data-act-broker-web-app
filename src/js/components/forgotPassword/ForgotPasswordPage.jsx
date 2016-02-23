/**
* ForgotPasswordPage.jsx
* Created by Kyle Fox 2/22/16
**/

import React from 'react';
import ForgotPasswordBanner from './ForgotPasswordBanner.jsx';

export default class ForgotPasswordPage extends React.Component {
    render() {
        return (
            <div className="usa-da-login container-fluid">
                <ForgotPasswordBanner/>
            </div>
        );
    }
}
