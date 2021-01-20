/**
 * ReviewDataContent.jsx
 * Created by Mike Bray 3/28/16
 */

import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { formatMoneyWithPrecision } from 'helpers/moneyFormatter';
import { checkAffiliations } from 'helpers/permissionsHelper';
import RevertToCertifiedContainer from 'containers/reviewData/RevertToCertifiedContainer';
import ReviewDataContentRow from './ReviewDataContentRow';
import ReviewDataNotifyModal from './ReviewDataNotifyModal';
import ReviewDataCertifyModal from './CertificationModal/ReviewDataCertifyModal';
import RevalidateDataModal from './CertificationModal/RevalidateDataModal';
import ReviewDataNarrative from './ReviewDataNarrative';

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
            openRevalidate: false,
            type: 'both'
        };

        this.openNotifyModal = this.openNotifyModal.bind(this);
        this.openRevalidateModal = this.openRevalidateModal.bind(this);
        this.openPublishModal = this.openPublishModal.bind(this);
        this.openCertifyModal = this.openCertifyModal.bind(this);
        this.openPublishAndCertifyModal = this.openPublishAndCertifyModal.bind(this);
        this.openModal = this.openModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
    }

    openNotifyModal(e) {
        e.preventDefault();

        this.openModal('Notify');
    }

    openRevalidateModal(e) {
        e.preventDefault();

        this.openModal('Revalidate');
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
            openRevalidate: false,
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
            'Award Obligations Incurred (file C)', 'Total Financial Assistance Obligations',
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
        let revalidateButtonText = 'You do not have permission to revalidate';
        let publishButtonClass = ' btn-disabled';
        let certifyButtonClass = ' btn-disabled';
        let publishButtonAction;
        let certifyButtonAction;
        let revalidateButtonAction;
        let notifyButtonAction = this.openNotifyModal;
        let testSubmissionError = null;
        let twoButtons = false;
        let certifyIcon = <FontAwesomeIcon icon="globe-americas" />;
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
            testSubmissionError = (
                <div
                    className="alert alert-danger text-center test-submission-error"
                    role="alert">
                    Test submissions cannot be published or certified
                </div>);
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
        if (checkAffiliations(this.props.session, 'writer', this.props.data.agency_name) || hasPubPerms) {
            revalidateButtonText = 'Revalidate';
            revalidateButtonAction = this.openRevalidateModal;
        }

        const blockedStatuses = ['reverting', 'publishing'];
        if (blockedStatuses.indexOf(this.props.submission.publishStatus) > -1) {
            revalidateButtonAction = null;
            publishButtonAction = null;
            certifyButtonAction = null;
            notifyButtonAction = null;
            revalidateButtonText = `Cannot revalidate while ${this.props.submission.publishStatus}`;
            publishButtonText = `Cannot publish while ${this.props.submission.publishStatus}`;
            certifyButtonText = `Cannot certify while ${this.props.submission.publishStatus}`;
            publishButtonClass = ' btn-disabled';
            certifyButtonClass = ' btn-disabled';
        }

        const middleButtons = [];
        if (twoButtons) {
            middleButtons.push(
                <div className="right-link" key="publish-button">
                    <button
                        onClick={publishButtonAction}
                        disabled={!publishButtonAction}
                        className={`usa-da-button btn-primary btn-lg btn-full ${publishButtonClass}`}>
                        <div className="button-wrapper row">
                            <div className="button-icon">
                                <FontAwesomeIcon icon="file-upload" />
                            </div>
                            <div className="button-content">
                                {publishButtonText}
                            </div>
                        </div>
                    </button>
                </div>);
        }

        // both monthly and quarterly need the certify button
        middleButtons.push(
            <div className="right-link" key="certify-button">
                <button
                    onClick={certifyButtonAction}
                    disabled={!certifyButtonAction}
                    className={`usa-da-button btn-primary btn-lg btn-full ${certifyButtonClass}`}>
                    <div className="button-wrapper row">
                        <div className="button-icon">
                            {certifyIcon}
                        </div>
                        <div className="button-content">
                            {certifyButtonText}
                        </div>
                    </div>
                </button>
            </div>);

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
                                    <FontAwesomeIcon icon="check-circle" />
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
                    <h5>Agency Comments <span className="not-bold">(optional)</span></h5>
                    <ReviewDataNarrative
                        narrative={this.props.data.file_narrative}
                        submissionID={this.props.submissionID}
                        loadData={this.props.loadData}
                        publishStatus={this.props.submission.publishStatus} />
                    <div className="row comment-note">
                        <div className="col-md-6">
                            <b>Note:</b> After a submission is published all of the associated comments will be made
                            available on USAspending.gov in the&nbsp;
                            <a href="https://www.usaspending.gov/submission-statistics/">
                                Agency Submission Statistics section
                            </a> and the&nbsp;
                            <a href="https://files.usaspending.gov/agency_submissions/">
                                Agency Submission Files section
                            </a>.
                        </div>
                    </div>
                    <hr />
                    <div className="row submission-button-holder">
                        <div className="submission-wrapper">
                            <div className="revert-revalidate-buttons">
                                <div className="left-link">
                                    <RevertToCertifiedContainer loadData={this.props.loadData} />
                                </div>
                                <div className="left-link">
                                    <button
                                        onClick={revalidateButtonAction}
                                        disabled={!revalidateButtonAction}
                                        className="usa-da-button btn-primary-alt btn-lg btn-full">
                                        <div className="button-wrapper">
                                            <div className="button-icon">
                                                <FontAwesomeIcon icon="check" />
                                            </div>
                                            <div className="button-content">
                                                {revalidateButtonText}
                                            </div>
                                        </div>
                                    </button>
                                </div>
                            </div>
                            <div className="publish-certify-buttons">
                                {middleButtons}
                            </div>
                        </div>
                    </div>
                    <div className="notify-button">
                        <a
                            onClick={notifyButtonAction}
                            disabled={!notifyButtonAction}>
                            <FontAwesomeIcon icon="bell" />
                            Notify another user about this submission
                        </a>
                    </div>
                    {testSubmissionError}
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
                    <div id="revalidateDataModalHolder">
                        <RevalidateDataModal
                            {...this.props}
                            closeModal={this.closeModal}
                            isOpen={this.state.openRevalidate} />
                    </div>
                </div>
            </div>
        );
    }
}

ReviewDataContent.propTypes = propTypes;
ReviewDataContent.defaultProps = defaultProps;
