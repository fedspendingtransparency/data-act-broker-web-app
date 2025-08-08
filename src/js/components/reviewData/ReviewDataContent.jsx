/**
 * ReviewDataContent.jsx
 * Created by Mike Bray 3/28/16
 */

import React from 'react';
import { Link } from 'react-router';
import PropTypes from 'prop-types';
import moment from 'moment';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { formatMoneyWithPrecision } from 'helpers/moneyFormatter';
import { checkAffiliations } from 'helpers/permissionsHelper';
import RevertToCertifiedContainer from 'containers/reviewData/RevertToCertifiedContainer';
import RevalidateContainer from 'containers/SharedContainers/RevalidateContainer';
import ReviewDataContentRow from './ReviewDataContentRow';
import ReviewDataNotifyModal from './ReviewDataNotifyModal';
import ReviewDataCertifyModal from './CertificationModal/ReviewDataCertifyModal';
import ReviewDataNarrative from './Narrative/ReviewDataNarrative';

import { formatSize } from '../../helpers/util';

const propTypes = {
    data: PropTypes.object,
    session: PropTypes.object,
    submissionID: PropTypes.string,
    testSubmission: PropTypes.bool,
    loadData: PropTypes.func,
    submission: PropTypes.object
};

const defaultProps = {
    data: null,
    session: null,
    submissionID: '',
    submission: null
};

export default class ReviewDataContent extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            openNotify: false,
            openCertify: false,
            type: 'both'
        };

        this.openNotifyModal = this.openNotifyModal.bind(this);
        this.openPublishModal = this.openPublishModal.bind(this);
        this.openCertifyModal = this.openCertifyModal.bind(this);
        this.openPublishAndCertifyModal = this.openPublishAndCertifyModal.bind(this);
        this.openModal = this.openModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
    }

    openNotifyModal() {
        this.openModal('Notify');
    }

    openPublishModal(e) {
        e.preventDefault();

        this.openModal('Certify', 'publish');
    }

    openCertifyModal(e) {
        e.preventDefault();

        this.openModal('Certify', 'certify');
    }

    openPublishAndCertifyModal(e) {
        e.preventDefault();

        this.openModal('Certify');
    }

    openModal(type, publishType = 'both') {
        this.setState({
            [`open${type}`]: true,
            type: publishType
        });
    }

    closeModal() {
        this.setState({
            openNotify: false,
            openCertify: false,
            type: 'both'
        });
    }

    windowBlocked() {
        if (!this.props.data.window) {
            return false;
        }
        let currentWindow = null;
        for (let i = 0; i < this.props.data.window.length; i++) {
            if (this.props.data.window[i].notice_block) {
                if (currentWindow === null) {
                    currentWindow = this.props.data.window[i];
                }
                else if (moment(this.props.data.window[i].end_date) > moment(currentWindow.end_date)) {
                    currentWindow = this.props.data.window[i];
                }
            }
        }
        if (currentWindow) {
            return currentWindow;
        }
        return false;
    }

    render() {
        const reportLabels = ['Agency Name', 'Report Start Date', 'Report End Date',
            'Award Obligations Incurred (File C)', 'Total Financial Assistance Obligations',
            'Total Procurement Obligations'];

        const reportData = [
            this.props.data.agency_name,
            this.props.data.reporting_period,
            this.props.data.reporting_period,
            formatMoneyWithPrecision(this.props.data.total_obligations, 2),
            formatMoneyWithPrecision(this.props.data.total_assistance_obligations, 2),
            formatMoneyWithPrecision(this.props.data.total_procurement_obligations, 2)
        ];

        const reportRows = [];

        for (let j = 0; j < reportLabels.length; j++) {
            reportRows.push(<ReviewDataContentRow key={j} label={reportLabels[j]} data={reportData[j]} />);
        }

        let publishButtonText = 'You do not have permission to publish';
        let certifyButtonText = 'You do not have permission to certify';
        let publishButtonClass = ' btn-disabled';
        let certifyButtonClass = ' btn-disabled';
        let publishButtonAction;
        let certifyButtonAction;
        let notifyButtonAction = this.openNotifyModal;
        let twoButtons = false;
        let certifyIcon = <FontAwesomeIcon icon="earth-americas" />;
        // TODO: I don't think we ever actually have window data to gather, we should look into this
        const blockedWindow = this.windowBlocked();

        const certDeadline = moment(this.props.data.certification_deadline, 'YYYY-MM-DD');
        const hasPubPerms = (checkAffiliations(this.props.session, 'submitter', this.props.data.agency_name) ||
            this.props.session.admin);

        // determine if it's 1 button or 2
        if (!this.props.data.quarterly_submission && !this.props.data.certified && moment() < certDeadline) {
            twoButtons = true;
            certifyIcon = <FontAwesomeIcon icon="clipboard-check" />;
        }

        // checks for publish and certify text
        if (this.props.testSubmission) {
            publishButtonText = 'Test submissions cannot be published';
            certifyButtonText = 'Test submissions cannot be certified';
        }
        else if (blockedWindow) {
            const windowDate = moment(blockedWindow.end_date).format('dddd, MMMM D, YYYY');
            publishButtonText = `You cannot publish until ${windowDate}`;
            certifyButtonText = `You cannot certify until ${windowDate}`;
        }
        else if (twoButtons && hasPubPerms) {
            publishButtonText = 'Publish';
            certifyButtonText = 'Certify';

            if (this.props.data.publish_status === 'published') {
                certifyButtonClass = '';
                certifyButtonAction = this.openCertifyModal;
            }
            else {
                publishButtonClass = '';
                publishButtonAction = this.openPublishModal;
            }
        }
        else if (!twoButtons && hasPubPerms) {
            if (this.props.data.publish_status === 'published' && this.props.data.certified) {
                certifyButtonText = 'This submission has already been certified';
            }
            else if (this.props.data.publish_status === 'published') {
                certifyButtonText = 'Publish & Certify';
                certifyButtonClass = '';
                certifyButtonAction = this.openCertifyModal;
            }
            else {
                certifyButtonText = 'Publish & Certify';
                certifyButtonClass = '';
                certifyButtonAction = this.openPublishAndCertifyModal;
            }
        }

        const blockedStatuses = ['reverting', 'publishing'];
        if (blockedStatuses.indexOf(this.props.submission.publishStatus) > -1) {
            publishButtonAction = null;
            certifyButtonAction = null;
            notifyButtonAction = null;
            publishButtonText = `Cannot publish while ${this.props.submission.publishStatus}`;
            certifyButtonText = `Cannot certify while ${this.props.submission.publishStatus}`;
            publishButtonClass = ' btn-disabled';
            certifyButtonClass = ' btn-disabled';
        }

        const publishCertifyButtons = [];
        if (twoButtons) {
            publishCertifyButtons.push(
                <button
                    key="publish-button"
                    onClick={publishButtonAction}
                    disabled={!publishButtonAction}
                    className={`usa-da-button btn-primary${publishButtonClass}`}>
                    <div className="button-wrapper">
                        <FontAwesomeIcon icon="file-arrow-up" />{publishButtonText}
                    </div>
                </button>);
        }

        // both monthly and quarterly need the certify button
        publishCertifyButtons.push(
            <button
                key="certify-button"
                onClick={certifyButtonAction}
                disabled={!certifyButtonAction}
                className={`usa-da-button btn-primary${certifyButtonClass}`}>
                <div className="button-wrapper">
                    {certifyIcon}{certifyButtonText}
                </div>
            </button>);

        return (
            <div className="container">
                <div className="row center-block mt-60">
                    <div className="col-md-12 text-center">
                        <h5 data-testid="review-header">
                            Congratulations your data has been successfully validated!
                            Now, what would you like to do with it?
                        </h5>
                    </div>
                </div>
                <div className="center-block usa-da-review-data-content-holder">
                    <h4>Submission Summary</h4>
                    <div className="row">
                        <div className="col-md-3">
                            <h5>File Details</h5>
                            <div className="usa-da-file-wrap">
                                <div className="usa-da-icon usa-da-icon-check-circle">
                                    <FontAwesomeIcon icon="circle-check" />
                                </div>
                                <div className="usa-da-submission-info">
                                    <div className="row">
                                        <div className="col-xs-6 left-col">Total File Size</div>
                                        <div className="col-xs-6 data">{formatSize(this.props.data.total_size)}</div>
                                    </div>
                                    <div className="row">
                                        <div className="col-xs-6 left-col">Total Data Rows (excludes headers)</div>
                                        <div className="col-xs-6 data">{this.props.data.number_of_rows}</div>
                                    </div>
                                    <div className="row">
                                        <div className="col-xs-6 left-col">Created on</div>
                                        <div className="col-xs-6 data">{this.props.data.created_on}</div>
                                    </div>
                                    <div className="row">
                                        <div className="col-xs-6 left-col">Total Warnings</div>
                                        <div className="col-xs-6 data">{this.props.data.number_of_warnings}</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="right-side col-md-9">
                            <h5>Submission Details</h5>
                            <div className="usa-da-review-data-alternating-rows">
                                {reportRows}
                            </div>
                        </div>
                    </div>
                    <ReviewDataNarrative
                        narrative={this.props.data.file_narrative}
                        submissionID={this.props.submissionID}
                        loadData={this.props.loadData}
                        publishStatus={this.props.submission.publishStatus} />
                    <div className="row comment-note">
                        <div className="col-md-6">
                            <b>Note:</b> After a submission is published all of the associated comments will be made
                            available on USAspending.gov in the&nbsp;
                            <a
                                href="https://www.usaspending.gov/submission-statistics"
                                target="_blank"
                                rel="noopener noreferrer">
                                Agency Submission Statistics Page
                            </a> and the&nbsp;
                            <Link
                                to="/rawfiles"
                                target="_blank"
                                rel="noopen noreferrer">
                                Raw Submission Files page
                            </Link>.
                        </div>
                    </div>
                    <hr />
                    <div className="row submission-button-holder">
                        <div className="col-md-6 revert-revalidate-buttons">
                            <RevertToCertifiedContainer loadData={this.props.loadData} />
                            <RevalidateContainer publishStatus={this.props.submission.publishStatus} />
                        </div>
                        <div className="col-md-6 publish-certify-buttons">
                            {publishCertifyButtons}
                        </div>
                    </div>
                    <div className="notify-button">
                        <button
                            onClick={notifyButtonAction}
                            disabled={!notifyButtonAction}>
                            <FontAwesomeIcon icon="bell" />
                            Notify another user about this submission
                        </button>
                    </div>
                    <div id="reviewDataNotifyModalHolder">
                        <ReviewDataNotifyModal
                            {...this.props}
                            closeModal={this.closeModal}
                            isOpen={this.state.openNotify}
                            fromUser={this.props.session.user.name}
                            submittingAgency={this.props.data.agency_name} />
                    </div>
                    <div id="reviewDataCertifyModalHolder">
                        <ReviewDataCertifyModal
                            {...this.props}
                            closeModal={this.closeModal}
                            isOpen={this.state.openCertify}
                            warnings={this.props.data.number_of_warnings}
                            type={this.state.type} />
                    </div>
                </div>
            </div>
        );
    }
}

ReviewDataContent.propTypes = propTypes;
ReviewDataContent.defaultProps = defaultProps;
