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
import GTASBanner from '../SharedComponents/GTASWarningBanner.jsx';
import * as permissionHelper from '../../helpers/permissionsHelper.js';

import * as ReviewHelper from '../../helpers/reviewHelper.js';

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

        this.state = {
            expanded: false,
            gtas: null
        };
    }

    componentDidMount() {
        this.isGtas();
    }

    isGtas() {
        ReviewHelper.isGtasWindow()
            .then((res) => {
                this.setState({gtas: res.data})
            })
            .catch((err) => {
                console.log(err)
            })
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
        const limit=3;

        let agencyName = 'Your Agency';
        if (affiliations && affiliations.length > limit && !this.state.expanded) {
            agencyName = affiliations.slice(0, limit).map((a) => a.agency_name).join(', ') + "...";
        }
        else if (affiliations && affiliations.length > 0) {
            agencyName = affiliations.map((a) => a.agency_name).join(', ');
        }

        let recentHeader = 'recent-activity-header';
        let recentActivity = 'recent-activity';
        let expand = 'hide block';
        let expandContent = '';
        let gtasWarning = null;

        if (affiliations && affiliations.length > limit && !this.state.expanded) {
            recentHeader +='-hidden';
            recentActivity +='-hidden';
            expand = 'expand-button block'
            expandContent = 'Show More';
        }
        else if (affiliations && affiliations.length > limit && this.state.expanded) {
            expand = 'expand-button block'
            expandContent = 'Show Less';
        }

        let uploadBlock = <LandingBlock type={this.props.type} icon={<Icons.CloudUpload />} text="In order to upload and validate your agency's files, please follow the link below to request access" buttonText="Request Access" url="https://community.max.gov/x/fJwuRQ"></LandingBlock>;
        if (this.props.type == 'fabs') {
            if (permissionHelper.checkFabsWriterPerms(this.props.session)) {
                uploadBlock = <LandingBlock type={this.props.type} icon={<Icons.CloudUpload />} text="Ready to upload and validate your agency's files? Great, we'll be happy to walk you through the process." buttonText="Upload & Validate a New Submission" url="#/uploadDetachedFiles">
                                  <LandingBlockBottomLink onClick={this.clickedUploadReqs.bind(this)} />
                              </LandingBlock>
            }
        }
        else if (permissionHelper.checkDabsWriterPerms(this.props.session)) {
            uploadBlock = <LandingBlock type={this.props.type} icon={<Icons.CloudUpload />} text="Ready to upload and validate your agency's files? Great, we'll be happy to walk you through the process." buttonText="Upload & Validate a New Submission" url="#/submissionGuide">
                              <LandingBlockBottomLink onClick={this.clickedUploadReqs.bind(this)} />
                          </LandingBlock>
        }

        if(this.state.gtas){
            gtasWarning = <GTASBanner data={this.state.gtas}/>
        }
        let dBlock = <LandingBlock icon={<Icons.CloudDownload />} text="Generate your D1 and D2 award files without having to create a submission." buttonText="Generate D Files" url="#/generateDetachedFiles" />;
        let dashboardLink = '#/dashboard'
        let dashboardButton = 'Continue or Certify a Saved Submission'
        if(this.props.type=='fabs'){
            dBlock = null;
            dashboardLink = '#/detachedDashboard'
            dashboardButton = 'Continue or Publish a Saved Submission'
        }

        let header = "Welcome to the DATA Act Broker";
        let headerBody = <div>
                            <p>Upload your agency’s files and validate them against the latest version of the DATA Act Information Model Schema (DAIMS).</p>
                            <p>Details on how to format your data, including required and optional fields, can be found in the <a href="https://broker.usaspending.gov/#/resources" target="_blank" rel="noopener noreferrer" >Resources section.</a>.</p>
                        </div>;
        let headerClass = 'dark';
        if(this.props.type == 'fabs') {
            header = "Financial Assistance Broker Submission (FABS)";
            headerBody = <div></div>
            headerClass = 'teal'
        }

        return (
                <div className="site_content">
                    <div className={"usa-da-content-"+headerClass}>
                        <div className="container">
                            <div className="row usa-da-content-landing usa-da-page-title">
                                <div className="col-md-7 mt-40 mb-50">
                                    <h1 className="display-2" data-contentstart="start" tabIndex={-1}>{header}</h1>
                                    {headerBody}
                                </div>
                            </div>
                        </div>
                    </div>
                    {gtasWarning}
                    <div className="container mb-60">
                        <div className="row">
                            <div className="usa-da-landing col-md-12">
                                <div className="usa-da-landing-btns">
                                    {uploadBlock}
                                    <LandingBlock type={this.props.type} icon={<Icons.Floppy />} text="Did you start a submission but were unable to complete it? No problem, we can help you pick up where you left off." buttonText={dashboardButton} url={dashboardLink} />
                                    {dBlock}
                                    <div id="modalHolder">
                                        <LandingRequirementsModal ref="modal" gtas={this.state.gtas} type={this.props.type}/>
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
                                <RecentActivityTable {...this.props} />
                            </div>
                        </div>
                    </div>
                </div>
            );
        }
    }

LandingContent.defaultProps = defaultProps;
