/**
 * ReviewDataContent.jsx
 * Created by Mike Bray 3/28/16
 */

import { Link } from 'react-router';
import { useState } from 'react';
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

const ReviewDataContent = ({data = null, session = null, submissionID = '', submission = null, ...props}) => {

    const [openNotify, setOpenNotify] = useState(false);
    const [openCertify, setOpenCertify] = useState(false);
    const [type, setType] = useState('both');
    const [commentSaveState, setCommentSaveState] = useState('');

    const openNotifyModal = () => {
        openModal('Notify');
    };

    const openPublishModal = (e) => {
        e.preventDefault();

        openModal('Certify', 'publish');
    };

    const openCertifyModal = (e) => {
        e.preventDefault();

        openModal('Certify', 'certify');
    };

    const openPublishAndCertifyModal = (e) => {
        e.preventDefault();

        openModal('Certify');
    };

    const openModal = (modalType, publishType = 'both') => {
        if (modalType === 'Notify') {
            setOpenNotify(true);
        }
        else {
            setOpenCertify(true);
        }
        setType(publishType);
    };

    const closeModal = () => {
        setOpenNotify(false);
        setOpenCertify(false);
        setType('both');
    };

    const windowBlocked = () => {
        if (!data.window) {
            return false;
        }
        let currentWindow = null;
        for (let i = 0; i < data.window.length; i++) {
            if (data.window[i].notice_block) {
                if (currentWindow === null) {
                    currentWindow = data.window[i];
                }
                else if (moment(data.window[i].end_date) > moment(currentWindow.end_date)) {
                    currentWindow = data.window[i];
                }
            }
        }
        if (currentWindow) {
            return currentWindow;
        }
        return false;
    };

    const updateCommentSaving = (newSavingState) => {
        setCommentSaveState(newSavingState);
    };

    const reportLabels = ['Agency Name', 'Report Start Date', 'Report End Date', 'Award Obligations Incurred (File C)',
        'Total Financial Assistance Obligations', 'Total Procurement Obligations'];

    const reportData = [
        data.agency_name,
        data.reporting_period,
        data.reporting_period,
        formatMoneyWithPrecision(data.total_obligations, 2),
        formatMoneyWithPrecision(data.total_assistance_obligations, 2),
        formatMoneyWithPrecision(data.total_procurement_obligations, 2)
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
    let notifyButtonAction = openNotifyModal;
    let twoButtons = false;
    let certifyIcon = <FontAwesomeIcon icon="earth-americas" />;
    // TODO: I don't think we ever actually have window data to gather, we should look into this
    const blockedWindow = windowBlocked();

    const certDeadline = moment(data.certification_deadline, 'YYYY-MM-DD');
    const hasPubPerms = (checkAffiliations(session, 'submitter', data.agency_name) || session.admin);

    // determine if it's 1 button or 2
    if (!data.quarterly_submission && !data.certified && moment() < certDeadline) {
        twoButtons = true;
        certifyIcon = <FontAwesomeIcon icon="clipboard-check" />;
    }

    // checks for publish and certify text
    if (props.testSubmission) {
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

        if (data.publish_status === 'published') {
            certifyButtonClass = '';
            certifyButtonAction = openCertifyModal;
        }
        else {
            publishButtonClass = '';
            publishButtonAction = openPublishModal;
        }
    }
    else if (!twoButtons && hasPubPerms) {
        if (data.publish_status === 'published' && data.certified) {
            certifyButtonText = 'This submission has already been certified';
        }
        else if (data.publish_status === 'published') {
            certifyButtonText = 'Publish & Certify';
            certifyButtonClass = '';
            certifyButtonAction = openCertifyModal;
        }
        else {
            certifyButtonText = 'Publish & Certify';
            certifyButtonClass = '';
            certifyButtonAction = openPublishAndCertifyModal;
        }
    }

    // submission status based blocking
    const blockedStatuses = ['reverting', 'publishing'];
    if (blockedStatuses.indexOf(submission.publishStatus) > -1) {
        publishButtonAction = null;
        certifyButtonAction = null;
        notifyButtonAction = null;
        publishButtonText = `Cannot publish while ${submission.publishStatus}`;
        certifyButtonText = `Cannot certify while ${submission.publishStatus}`;
        publishButtonClass = ' btn-disabled';
        certifyButtonClass = ' btn-disabled';
    }

    // comment saving based blocking
    if (commentSaveState == 'Saving') {
        publishButtonAction = null;
        certifyButtonAction = null;
        notifyButtonAction = null;
        publishButtonText = `Cannot publish while saving comments`;
        certifyButtonText = `Cannot certify while saving comments`;
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
                                <FontAwesomeIcon icon="circle-check" className="check-circle-icon" />
                            </div>
                            <div className="usa-da-submission-info">
                                <div className="row">
                                    <div className="col-xs-6 left-col">Total File Size</div>
                                    <div className="col-xs-6 data">{formatSize(data.total_size)}</div>
                                </div>
                                <div className="row">
                                    <div className="col-xs-6 left-col">Total Data Rows (excludes headers)</div>
                                    <div className="col-xs-6 data">{data.number_of_rows}</div>
                                </div>
                                <div className="row">
                                    <div className="col-xs-6 left-col">Created on</div>
                                    <div className="col-xs-6 data">{data.created_on}</div>
                                </div>
                                <div className="row">
                                    <div className="col-xs-6 left-col">Total Warnings</div>
                                    <div className="col-xs-6 data">{data.number_of_warnings}</div>
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
                    narrative={data.file_narrative}
                    submissionID={submissionID}
                    loadData={props.loadData}
                    publishStatus={submission.publishStatus}
                    saveState={commentSaveState}
                    updateSaving={updateCommentSaving} />
                <div className="row comment-note">
                    <div className="col-md-6">
                        <b>Note:</b> After a submission is published all of the associated comments will be made
                        available on the&nbsp;
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
                        <RevertToCertifiedContainer loadData={props.loadData} />
                        <RevalidateContainer
                            publishStatus={submission.publishStatus}
                            disabled={commentSaveState === 'Saving'} />
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
                        submissionID={submissionID}
                        closeModal={closeModal}
                        isOpen={openNotify}
                        fromUser={session.user.name}
                        submittingAgency={data.agency_name} />
                </div>
                <div id="reviewDataCertifyModalHolder">
                    <ReviewDataCertifyModal
                        session={session}
                        submissionID={submissionID}
                        closeModal={closeModal}
                        isOpen={openCertify}
                        warnings={data.number_of_warnings}
                        type={type} />
                </div>
            </div>
        </div>
    );
};

ReviewDataContent.propTypes = propTypes;
export default ReviewDataContent;
