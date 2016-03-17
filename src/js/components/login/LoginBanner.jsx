/**
* LoginBanner.jsx
* Created by Kyle Fox 2/19/16
**/

import React from 'react';
import LoginIntro from './LoginIntro.jsx';
import LoginPanel from './LoginPanel.jsx';

export default class LoginBanner extends React.Component {
    render() {
        return (
            <div className="usa-da-color-gray-light-eighth-tone">
                <div className="container">
                    <div className="row">
                        <LoginIntro/>
                        <LoginPanel/>
                    </div>
                </div>
            </div>
        );
    }
}
