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
        let firstBlock = <LandingBlock icon={<Icons.CloudUpload />} text="In order to upload and validate your agency's files, please follow the link below to request access" buttonText="Request Access" url="https://community.max.gov/x/fJwuRQ"></LandingBlock>;
        if(this.props.type=='home'){
        	firstBlock = <LandingBlock type={this.props.type} icon={<h5>DATA Act Broker Submission</h5>} text="Submit quarterly and monthly financial data." buttonText='Enter' url='#/landing' />
        } else if(permissionHelper.checkPermissions(this.props.session)){
            if(this.props.type=='fabs'){
                firstBlock = <LandingBlock type={this.props.type} icon={<Icons.CloudUpload />} text="Ready to upload and validate your agency's files? Great, we'll be happy to walk you through the process." buttonText="Upload & Validate a New Submission" url="#/uploadDetachedFiles">
                                    <LandingBlockBottomLink onClick={this.props.clickedUploadReqs} />
                            </LandingBlock>
            }else {
                firstBlock = <LandingBlock type={this.props.type} icon={<Icons.CloudUpload />} text="Ready to upload and validate your agency's files? Great, we'll be happy to walk you through the process." buttonText="Upload & Validate a New Submission" url="#/submissionGuide">
                                    <LandingBlockBottomLink onClick={this.props.clickedUploadReqs} />
                            </LandingBlock>
            }
        }

	    let secondBlock = <LandingBlock type={this.props.type} icon={<Icons.Floppy />} text="Did you start a submission but were unable to complete it? No problem, we can help you pick up where you left off." buttonText='Continue or Certify a Saved Submission' url='#/dashboard' />
        if(this.props.type=='home') {
        	secondBlock = <LandingBlock type={this.props.type} icon={<h5>Financial Assistance Broker Submission</h5>} text="Submit bi-monthly Financial Assistance award data." buttonText='Enter' url='#/detachedLanding' />
        }else if(this.props.type=='fabs'){
            secondBlock = <LandingBlock type={this.props.type} icon={<Icons.Floppy />} text="Did you start a submission but were unable to complete it? No problem, we can help you pick up where you left off." buttonText='Continue or Publish a Saved Submission' url='#/detachedDashboard' />
        }

        let thirdBlock = <LandingBlock icon={<Icons.CloudDownload />} text="Generate your D1 and D2 award files without having to create a submission." buttonText="Generate D Files" url="#/generateDetachedFiles" />;
        if(this.props.type!='dabs'){
        	thirdBlock = null;
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
