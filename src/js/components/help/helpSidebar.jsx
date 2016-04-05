/**
 * HelpSidebar.jsx
 * Created by Mike Bray 4/1/16
 **/

import React from 'react';

export default class LandingPage extends React.Component {
    render() {
        return (
            <div className="usa-da-help-sidebar">
                <h6>What’s New in This Version</h6>
                <ul>
                    <li>
                        <a href="/#/help#dataElements">Updated Data Elements and Validations</a>
                    </li>
                    <li>
                        <a href="/#/help#accounts">Individual User Accounts</a>
                    </li>
                    <li>
                        <a href="/#/help#browser">Browser Requirements &amp; Known Issues</a>
                    </li>
                </ul>
                <h6>Getting More Help</h6>
            </div>
        );
    }
}
