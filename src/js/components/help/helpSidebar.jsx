/**
 * HelpSidebar.jsx
 * Created by Mike Bray 4/1/16
 **/

import React from 'react';
import HelpSidebarItem from './helpSidebarItem.jsx';

export default class HelpSidebar extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        const clSectionList = this.props.changeSections.map((section, index) => {
            return <HelpSidebarItem key={index} sectionName={section.name} sectionId={section.link} />
        });

        const tSectionList = this.props.technicalSections.map((section, index) => {
            return <HelpSidebarItem key={index} sectionName={section.name} sectionId={section.link} />
        });

        let membership = null;
        if(this.props.helpOnly){
            membership=
                     <li>
                        <a href="/#/help?section=agencyAccess">Request Agency Access</a>
                    </li>;
        }
        

        return (
            <div className="usa-da-help-sidebar">
                <h6>What’s New in This Release</h6>
                <ul>
                    {clSectionList}
					<li>
                        <a href="/#/history">Release Notes Archive</a>
                    </li>
                </ul>
                <h6>This Release's Technical Notes</h6>
                <ul>
                    {tSectionList}
                    <li>
                        <a href="/#/technicalHistory">Technical Notes Archive</a>
                    </li>
                </ul>
                <h6>Getting More Help</h6>
                <ul>
                    {membership}
                    <li>
                        <a href="https://servicedesk.usaspending.gov">Contact the Service Desk</a>
                    </li>
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
