/**
 * HelpSidebar.jsx
 * Created by Mike Bray 4/1/16
 **/

import React from 'react';

export default class HelpSidebar extends React.Component {
    render() {
        return (
            <div className="usa-da-help-sidebar">
                <h6>What’s New in This Release</h6>
                <ul>
                    <li>
                        <a href="/#/help?section=stepby">Step-by-Step Guide</a>
                    </li>
                    <li>
                        <a href="/#/help?section=subguide">Submission Guide</a>
                    </li>
                    <li>
                        <a href="/#/help?section=dateselect">Select Reporting Period</a>
                    </li>
                     <li>
                        <a href="/#/help?section=valjun01">Updated Validations</a>
                    </li>
                    <li>
                        <a href="/#/help?section=browser">Browser Requirements &amp; Known Issues</a>
                    </li>
                </ul>
                <h6>Getting More Help</h6>
                <ul>
                    <li>
                        <a href="/#/help?section=filingIssue">Filing an Issue</a>
                    </li>
                </ul>
            </div>
        );
    }
}
