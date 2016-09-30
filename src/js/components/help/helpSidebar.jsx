/**
 * HelpSidebar.jsx
 * Created by Mike Bray 4/1/16
 **/

import React from 'react';
import HelpSidebarItem from './helpSidebarItem.jsx';

export default class HelpSidebar extends React.Component {
    render() {
        const sectionList = this.props.sections.map((section, index) => {
            return <HelpSidebarItem key={index} sectionName={section.name} sectionId={section.link} />
        });

        return (
            <div className="usa-da-help-sidebar">
                <h6>What’s New in This Release</h6>
                <ul>
                    {sectionList}
					<li>
                        <a href="/#/history">Release Notes Archive</a>
                    </li>
                </ul>
                <h6>Getting More Help</h6>
                <ul>
                    <li>
                        <a href="/#/help?section=filingIssue">Filing an Issue</a>
                    </li>
		    <li>
                        <a href="/#/resources">Resources - DAIMS</a>
                    </li>
		    <li>
                        <a href="/#/validations">Validations</a>
                    </li>
                </ul>
            </div>
        );
    }
}
