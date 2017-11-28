/**
 * HelpSidebar.jsx
 * Created by Mike Bray 4/1/16
 */

import React, { PropTypes } from 'react';
import HelpSidebarItem from './helpSidebarItem.jsx';

const propTypes = {
    changeSections: PropTypes.array,
    technicalSections: PropTypes.array,
    type: PropTypes.string,
    helpOnly: PropTypes.bool
};

export default class HelpSidebar extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const clSectionList = this.props.changeSections.map((section, index) => {
            return (<HelpSidebarItem key={index} sectionName={section.name} sectionId={section.link}
                type={this.props.type} />);
        });

        const tSectionList = this.props.technicalSections.map((section, index) => {
            return (<HelpSidebarItem key={index} sectionName={section.name} sectionId={section.link}
                type={this.props.type} />);
        });

        let membership = null;
        if (this.props.helpOnly) {
            membership = (
                <li>
                    <a href="/#/help?section=agencyAccess">Request Agency Access</a>
                </li>
            );
        }

        const help = this.props.type === 'fabs' ? "/#/FABSHelp" : '/#/help';
        const history = this.props.type === 'fabs' ? "/#/FABSHistory" : '/#/history';
        const technicalHistory = this.props.type === 'fabs' ? "/#/FABSTechnicalHistory" : '/#/technicalHistory';
        const resources = this.props.type === 'fabs' ? "/#/FABSResources" : '/#/resources';
        const validations = this.props.type === 'fabs' ? "/#/FABSValidations" : '/#/validations';
        return (
            <div className="usa-da-help-sidebar">
                <h6>What’s New in This Release</h6>
                <ul>
                    {clSectionList}
                    <li>
                        <a href={history}>Release Notes Archive</a>
                    </li>
                </ul>
                <h6>This Releases Technical Notes</h6>
                <ul>
                    {tSectionList}
                    <li>
                        <a href={technicalHistory}>Technical Notes Archive</a>
                    </li>
                </ul>
                <h6>Getting More Help</h6>
                <ul>
                    {membership}
                    <li>
                        <a href={help + "?section=membership"}>Contact the Service Desk</a>
                    </li>
                    <li>
                        <a href={help + "?section=filingIssue"}>Filing an Issue</a>
                    </li>
                    <li>
                        <a href={resources}>Resources - DAIMS</a>
                    </li>
                    <li>
                        <a href={validations}>Validations</a>
                    </li>
                </ul>
            </div>
        );
    }
}

HelpSidebar.propTypes = propTypes;
