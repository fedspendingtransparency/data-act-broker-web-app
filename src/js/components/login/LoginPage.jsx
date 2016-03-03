/**
* LoginPage.jsx
* Created by Kyle Fox 12/4/15
**/

import React from 'react';
import LoginBanner from './LoginBanner.jsx';

export default class LoginPage extends React.Component {
    render() {
        return (
            <div className="usa-da-login container-fluid">
                <LoginBanner/>
            </div>
        );
    }
}
