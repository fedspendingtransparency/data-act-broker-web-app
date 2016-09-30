/**
* LandingContent.jsx
* Created by Kyle Fox 2/19/16
**/

import React from 'react';
import RecentActivityTable from './recentActivity/RecentActivityTable.jsx';
import LandingBlock from './blocks/LandingBlock.jsx';
import LandingBlockBottomLink from './blocks/LandingBlockBottomLink.jsx';
import LandingRequirementsModal from './blocks/LandingRequirementsModal.jsx';

import * as Icons from '../SharedComponents/icons/Icons.jsx';
import { generateRSSUrl } from '../../helpers/util.js';

const defaultProps = {
    session: {
        user: {
            agency_name: "Your Agency"
        }
    }
};

export default class LandingContent extends React.Component {
    constructor(props) {
        super(props);

        this.rssPromise = null;

        this.state = {
            rssUrl: ''
        };
    }
    componentDidMount() {
        this.rssPromise = generateRSSUrl();
        this.rssPromise.promise
            .then((url) => {
                this.setState({
                    rssUrl: url
                });

                this.rssPromise = null;
            });
    }

    componentWillUnmount() {
        if (this.rssPromise) {
            this.rssPromise.cancel();
        }
    }


    clickedUploadReqs(e) {
        e.preventDefault();

        this.refs.modal.openModal();
    }

    render() {
        let agencyName = this.props.session.user.agency_name;
        if (!agencyName) {
            agencyName = 'Your Agency';
        }

        return (
                <div className="site_content">
                    <div className="usa-da-content-dark">
                        <div className="container">
                            <div className="row usa-da-content-landing usa-da-page-title">
                                <div className="col-md-7 mt-40 mb-50">
                                    <h1 className="display-2" data-contentstart="start" tabIndex={-1}>Welcome to the DATA Act Broker</h1>
                                    <p>Upload your agency's files and validate them against the latest version of the DATA Act Information Model Schema (v1.0).</p>
                                    <p>Details on how to format your data, including required and optional fields, can be found in the <a href={this.state.rssUrl} target="_blank" aria-label="Download the RSS specification as an Excel file">Reporting Submission Specification (RSS) v1.0</a>.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                        <div className="container mb-60">
                            <div className="row">
                                <div className="usa-da-landing col-md-12">
                                    <div className="usa-da-landing-btns">
                                        <LandingBlock icon={<Icons.CloudUpload />} text="Ready to upload and validate your agency's files? Great, we'll be happy to walk you through the process.*" buttonText="Upload & Validate a New Submission" url="#/submissionGuide">
                                        <LandingBlockBottomLink onClick={this.clickedUploadReqs.bind(this)} />
                                        </LandingBlock>
                                        <LandingBlock comingSoon="comingSoon" icon={<Icons.Floppy />} text="Did you start a submission but were unable to complete it? No problem, we can help you pick up where you left off." buttonText="Continue a Saved Submission" disabled={true} />
                                        <LandingBlock comingSoon="comingSoon" icon={<Icons.Search />} text="Is a submission ready to be reviewed, certified, and published? Let's look at that submission." buttonText="Review, Certify & Publish Submission" disabled={true} />
                                        <div id="modalHolder">
                                            <LandingRequirementsModal ref="modal" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="container">
                            <div className="row">
                                <div className="col-md-12">
                                    <h2 className="recent-activity-header">Recent Activity for {agencyName}</h2>
                                    <RecentActivityTable />
                                </div>
                            </div>
                        </div>

                    <div className="usa-da-landing-disclosure text-center">
                        * The DATA Act Broker allows agencies to test financial data but does not connect to USAspending.gov.
                    </div>
                </div>
            );
        }
    }

LandingContent.defaultProps = defaultProps;
