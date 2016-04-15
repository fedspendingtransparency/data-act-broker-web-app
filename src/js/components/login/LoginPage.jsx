/**
* LoginPage.jsx
* Created by Kyle Fox 12/4/15
**/

import React from 'react';
import LoginTopBar from './LoginTopBar.jsx';
import LoginBanner from './LoginBanner.jsx';
import LoginWarningTxt from './LoginWarningTxt.jsx';

export default class LoginPage extends React.Component {
    render() {
        return (
            <div className="usa-da-login container-fluid">
            	<LoginTopBar/>
                <LoginBanner/>
                <LoginWarningTxt/>
            </div>
        );
    }
}
