/**
* BlockContent.jsx
* Creted By Minahm Kim 7/20/2017
**/

import React from 'react';
import LandingBlock from './blocks/LandingBlock.jsx';
import LandingBlockBottomLink from './blocks/LandingBlockBottomLink.jsx';

import * as Icons from '../SharedComponents/icons/Icons.jsx';
import * as permissionHelper from '../../helpers/permissionsHelper.js';
import * as ReviewHelper from '../../helpers/reviewHelper.js';

export default class BlockContent extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        let firstBlock = <LandingBlock type={this.props.type} icon={<Icons.CloudUpload />} text="In order to upload and validate your agency's files, please follow the link below to request access" buttonText="Request Access" url="https://community.max.gov/x/fJwuRQ" />;
        let secondBlock = <LandingBlock type={this.props.type} icon={<Icons.Floppy />} text="Did you start a submission but were unable to complete it? Want to see your certified submissions? Continue here to the submissions dashboard." buttonText='View Submissions Dashboard' url='#/dashboard' />;
        let thirdBlock = null;

        if (this.props.type === 'home') {
            if (this.props.session.user.helpOnly) {
                // No access
                firstBlock = <LandingBlock type={this.props.type} icon={<h5>DATA Act Broker Submission</h5>} text="In order to view the DATA Act Broker Submissions, please follow the link below to request access" buttonText="Request Access" url="https://community.max.gov/x/fJwuRQ" />;
                secondBlock = <LandingBlock type={this.props.type} icon={<h5>Financial Assistance Broker Submission</h5>} text="In order to view the Financial Assistance Broker Submissions, please follow the link below to request access" buttonText="Request Access" url="https://community.max.gov/x/fJwuRQ" />;
            }
            else if (permissionHelper.checkDabsReader(this.props.session)) {
                // Access to FABS and DABS
                firstBlock = <LandingBlock type={this.props.type} icon={<h5>DATA Act Broker Submission</h5>} text="Enter here to upload, validate, and certify your agency's quarterly financial data. You can also test your monthly financial data, generate your award files, and view your DATA Act submissions." buttonText="Enter" url="#/landing" />;
                secondBlock = <LandingBlock type={this.props.type} icon={<h5>Financial Assistance Broker Submission</h5>} text="Enter here to upload, validate, and publish your agency's bi-monthly financial assistance data. You can also test your financial assistance data and view your submissions." buttonText='Enter' url='#/detachedLanding' />;
            }
            else {
                // Only access to FABS
                firstBlock = <LandingBlock type={this.props.type} icon={<h5>DATA Act Broker Submission</h5>} text="In order to view the DATA Act Broker Submissions, please follow the link below to request access" buttonText="Request Access" url="https://community.max.gov/x/fJwuRQ" />;
                secondBlock = <LandingBlock type={this.props.type} icon={<h5>Financial Assistance Broker Submission</h5>} text="Enter here to upload, validate, and publish your agency's bi-monthly financial assistance data. You can also test your financial assistance data and view your submissions." buttonText='Enter' url='#/detachedLanding' />;
            }
        }
        else if (this.props.type === 'dabs') {
            if (permissionHelper.checkPermissions(this.props.session)) {
                // DABS submission access
                firstBlock = <LandingBlock type={this.props.type} icon={<Icons.CloudUpload />} text="Ready to upload and validate your agency's files? Great, we'll be happy to walk you through the process." buttonText="Upload & Validate a New Submission" url="#/submissionGuide" >
                                <LandingBlockBottomLink onClick={this.props.clickedUploadReqs} />
                            </LandingBlock>;
            }
            thirdBlock = <LandingBlock type={this.props.type} icon={<Icons.CloudDownload />} text="Generate your D1 and D2 award files without having to create a submission." buttonText="Generate D Files" url="#/generateDetachedFiles" />;
        }
        else if (this.props.type === 'fabs') {
            if (permissionHelper.checkFabsPermissions(this.props.session)) {
                // FABS submission access
                firstBlock = <LandingBlock type={this.props.type} icon={<Icons.CloudUpload />} text="Ready to upload and validate your agency's files? Great, we'll be happy to walk you through the process." buttonText="Upload & Validate a New Submission" url="#/uploadDetachedFiles" >
                                <LandingBlockBottomLink onClick={this.props.clickedUploadReqs} />
                            </LandingBlock>;
            }
            secondBlock = <LandingBlock type={this.props.type} icon={<Icons.Floppy />} text="Did you start a submission but were unable to complete it? Want to see your previous submissions? Continue here to the submissions dashboard." buttonText='View Submissions Dashboard' url='#/detachedDashboard' />;
        }

        return (
            <div>
                {firstBlock}
                {secondBlock}
                {thirdBlock}
            </div>
        );
    }
}
