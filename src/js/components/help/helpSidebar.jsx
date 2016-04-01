/**
 * HelpSidebar.jsx
 * Created by Mike Bray 4/1/16
 **/

import React from 'react';

export default class LandingPage extends React.Component {
    render() {
        return (
            <div className="usa-da-help-sidebar">
                <h4>
                    <a href="/#/help#dataElements">Updated Data Elements and Validations</a>
                </h4>
                <h4>
                    <a href="/#/help#accounts">Individual User Accounts</a>
                </h4>
                <h4>
                    <a href="/#/help#browser">Browser Requirements &amp; Known Issues</a>
                </h4>
            </div>
        );
    }
}
