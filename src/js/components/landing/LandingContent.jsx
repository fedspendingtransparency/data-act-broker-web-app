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

    toggleExpand() {
        this.setState({
            expanded: !this.state.expanded
        })
    }

    render() {
        const affiliations = this.props.session.user.affiliations;

        //Size to set off the limiting of the recent activity
        let limit=1;

        let agencyName = 'Your Agency';
        if (affiliations && affiliations.length > 0 && this.state.expanded) {
            agencyName = affiliations.map((a) => a.agency_name).join(', ');
        }else if(affiliations && affiliations.length > limit && !this.state.expanded){
            agencyName = affiliations.map((a) => a.agency_name)[0] + "...";
        }else if(affiliations && affiliations.length < limit && affiliations.length > 0 && !this.state.expanded){
            agencyName = affiliations.map((a) => a.agency_name).join(', ');
        }

        let recentHeader = 'recent-activity-header';
        let recentActivity = 'recent-activity';
        let expand = 'hide block';
        let expandContent = '';
        if(affiliations.length > limit && !this.state.expanded){
            recentHeader +='-hidden';
            recentActivity +='-hidden';
            expand = 'expand-button block'
            expandContent = 'Show More';
        }else if(affiliations.length > limit && this.state.expanded){
            expand = 'expand-button block'
            expandContent = 'Show Less';
        }

        return (
                <div className="site_content">
                    <div className="usa-da-content-dark">
                        <div className="container">
                            <div className="row usa-da-content-landing usa-da-page-title">
                                <div className="col-md-7 mt-40 mb-50">
                                    <h1 className="display-2" data-contentstart="start" tabIndex={-1}>Welcome to the DATA Act Broker</h1>
                                    <p>Upload your agency's files and validate them against the latest version of the DATA Act Information Model Schema.</p>
                                    <p>Details on how to format your data, including required and optional fields, can be found in the <a href={this.state.rssUrl} target="_blank" rel="noopener noreferrer" aria-label="Download the RSS specification as an Excel file">Reporting Submission Specification (RSS) v1.0</a>.</p>
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
                                        <LandingBlock icon={<Icons.Floppy />} text="Did you start a submission but were unable to complete it? No problem, we can help you pick up where you left off." buttonText="Continue or Certify a Saved Submission" url="#/dashboard" />
                                        <LandingBlock icon={<Icons.CloudDownload />} text="Generate your D1 and D2 award files without having to create a submission." buttonText="Generate D Files" url="#/generateDetachedFiles" />
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
                                    <h2 className={recentHeader}>
                                        <div className="recent-header">Recent Activity for:</div>
                                        <div className={recentActivity}>{agencyName}</div>
                                    </h2>
                                    <div className='see-more-wrapper'>
                                        <a className={expand} onClick={this.toggleExpand.bind(this)}>{expandContent}</a>
                                    </div>
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
