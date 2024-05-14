/**
* BlockContent.jsx
* Creted By Minahm Kim 7/20/2017
*/

import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import LandingBlock from './blocks/LandingBlock';
import LandingBlockBottomLink from './blocks/LandingBlockBottomLink';

import * as permissionHelper from '../../helpers/permissionsHelper';

const propTypes = {
    clickedUploadReqs: PropTypes.func,
    session: PropTypes.object,
    type: PropTypes.string
};

const defaultProps = {
    clickedUploadReqs: null,
    session: null,
    type: ''
};

export default class BlockContent extends React.Component {
    render() {
        let firstBlock = (<LandingBlock
            type={this.props.type}
            icon={<FontAwesomeIcon icon="cloud-upload-alt" />}
            text="In order to upload and validate your agency's files, please request access in CAIA."
            buttonText="Request Access"
            url="https://iiq.fiscal.treasury.gov/identityiq/home.jsf" />);
        let secondBlock = (<LandingBlock
            type={this.props.type}
            icon={<FontAwesomeIcon icon={['far', 'save']} />}
            text={"Did you start a submission but were unable to complete it? Want to see your certified " +
            "submissions? Continue here to the submission table."}
            buttonText="View Submission Table"
            url="submissionTable" />);
        let thirdBlock = null;
        let fourthBlock = null;

        if (this.props.type === 'home') {
            firstBlock = (<LandingBlock
                type={this.props.type}
                icon={<h5>DATA Broker Submission</h5>}
                text={"Enter here to upload, validate, and certify your agency's financial data. You can " +
                "also test financial data, generate your award files, and view your DATA Act " +
                "submissions."}
                buttonText="Enter"
                url="landing" />);
            secondBlock = (<LandingBlock
                type={this.props.type}
                icon={<h5>Financial Assistance Broker Submission</h5>}
                text={"Enter here to upload, validate, and publish your agency's financial assistance data. You can " +
                "also test your financial assistance data and view your submissions."}
                buttonText="Enter"
                url="FABSlanding" />);
        }
        else if (this.props.type === 'dabs') {
            if (permissionHelper.checkPermissions(this.props.session)) {
                // DABS submission access
                firstBlock = (
                    <LandingBlock
                        type={this.props.type}
                        icon={<FontAwesomeIcon icon="cloud-upload-alt" />}
                        text={"Ready to upload and validate your agency's files? Great, we'll be happy to walk you " +
                        "through the process."}
                        buttonText="Upload & Validate a New Submission"
                        url="submissionGuide" >
                        <LandingBlockBottomLink onClick={this.props.clickedUploadReqs} />
                    </LandingBlock>
                );
            }
            thirdBlock = (<LandingBlock
                type={this.props.type}
                icon={<FontAwesomeIcon icon="cloud-download-alt" />}
                text="Generate your D1 and D2 award files without having to create a submission."
                buttonText="Generate D Files"
                url="generateDetachedFiles" />);
            fourthBlock = (
                <LandingBlock
                    type={this.props.type}
                    icon={<FontAwesomeIcon icon="cloud-download-alt" />}
                    text="Compare published Data Broker and GTAS data or generate File A outside of a submission."
                    buttonText="Generate Files"
                    url="generateDetachedFYPFiles" />
            );
        }
        else if (this.props.type === 'fabs') {
            if (permissionHelper.checkFabsPermissions(this.props.session)) {
                // FABS submission access
                firstBlock = (
                    <LandingBlock
                        type={this.props.type}
                        icon={<FontAwesomeIcon icon="cloud-upload-alt" />}
                        text={"Ready to upload and validate your agency's files? Great, we'll be happy to walk you " +
                        "through the process."}
                        buttonText="Upload & Validate a New Submission"
                        url="FABSaddData" >
                        <LandingBlockBottomLink onClick={this.props.clickedUploadReqs} />
                    </LandingBlock>
                );
            }
            secondBlock = (<LandingBlock
                type={this.props.type}
                icon={<FontAwesomeIcon icon={['far', 'save']} />}
                text={"Did you start a submission but were unable to complete it? Want to see your previous " +
                    "submissions? Continue here to the submission table."}
                buttonText="View Submission Table"
                url="FABSsubmissionTable" />);
        }

        return (
            <div>
                {firstBlock}
                {secondBlock}
                {thirdBlock}
                {fourthBlock}
            </div>
        );
    }
}

BlockContent.propTypes = propTypes;
BlockContent.defaultProps = defaultProps;
