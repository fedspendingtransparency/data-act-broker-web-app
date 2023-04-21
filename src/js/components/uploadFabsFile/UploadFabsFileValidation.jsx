/**
 * UploadFabsFileValidation.jsx
 * Created by Minahm Kim
 */

import { CSSTransition, TransitionGroup } from 'react-transition-group';

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import moment from 'moment';

import * as UploadHelper from 'helpers/uploadHelper';
import * as GenerateFilesHelper from 'helpers/generateFilesHelper';
import * as PermissionsHelper from 'helpers/permissionsHelper';
import * as ReviewHelper from 'helpers/reviewHelper';
import ValidateValuesFileContainer from 'containers/validateData/ValidateValuesFileContainer';
import ValidateDataFileContainer from 'containers/validateData/ValidateDataFileContainer';
import Banner from 'components/SharedComponents/Banner';
import * as Icons from 'components/SharedComponents/icons/Icons';
import DABSFABSErrorMessage from 'components/SharedComponents/DABSFABSErrorMessage';
import PublishModal from './PublishModal';
import UploadFabsFileError from './UploadFabsFileError';
import UploadFabsFileHeader from './UploadFabsFileHeader';
import { kGlobalConstants } from '../../GlobalConstants';


const propTypes = {
    setSubmissionState: PropTypes.func,
    resetSubmission: PropTypes.func,
    item: PropTypes.object,
    computedMatch: PropTypes.object,
    session: PropTypes.object,
    submission: PropTypes.object
};

const defaultProps = {
    setSubmissionState: () => {},
    item: {},
    session: {},
    submission: {}
};

const timerDuration = 5;

export class UploadFabsFileValidation extends React.Component {
    constructor(props) {
        super(props);

        this.isUnmounted = false;

        this.state = {
            agency: '',
            fabsFile: {},
            cgac_code: '',
            jobResults: { fabs: {} },
            headerErrors: false,
            validationFinished: false,
            error: 0,
            published: 'unpublished',
            submit: true,
            showPublish: false,
            showSuccess: false,
            error_message: '',
            fabs_meta: { valid_rows: 0, total_rows: 0, publish_date: null },
            metadata: {},
            signedUrl: '',
            signInProgress: false,
            inFlight: true,
            submissionErrorMessage: '',
            progressMeta: { progress: 0, name: '' }
        };

        this.uploadFile = this.uploadFile.bind(this);
        this.openModal = this.openModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.submitFabs = this.submitFabs.bind(this);
        this.startRevalidation = this.startRevalidation.bind(this);
        this.clickedReport = this.clickedReport.bind(this);
    }

    componentDidMount() {
        this.isUnmounted = false;
        const { submissionID } = this.props.computedMatch.params;
        if (submissionID) {
            this.setSubmissionMetadata(submissionID);
            this.checkFileStatus(submissionID);
        }
    }

    componentDidUpdate(prevProps) {
        const { submissionID } = this.props.computedMatch.params;
        if (prevProps.computedMatch.params.submissionID !== submissionID && submissionID) {
            this.setSubmissionMetadata(submissionID);
            this.checkFileStatus(submissionID);
            this.setSubmissionError();
        }
    }

    componentWillUnmount() {
        this.props.resetSubmission();
        this.isUnmounted = true;
    }

    setSubmissionMetadata(submissionID) {
        this.setState({
            inFlight: true
        });
        ReviewHelper.fetchSubmissionMetadata(submissionID, 'fabs')
            .then((response) => {
                this.setState({
                    metadata: response,
                    agency: response.agency_name,
                    cgac_code: response.cgac_code,
                    published: response.publish_status,
                    fabs_meta: response.fabs_meta,
                    inFlight: false
                });
            })
            .catch((err) => {
                console.error(err);
                this.setState({
                    inFlight: false
                }, () => {
                    this.setSubmissionError(err.body.message);
                });
            });
    }

    setSubmissionError(submissionErrorMessage = '') {
        this.setState({
            submissionErrorMessage
        });
    }

    openModal() {
        this.setState({
            showPublish: true
        });
    }

    closeModal() {
        this.setState({
            showPublish: false
        });
    }

    startRevalidation() {
        this.setState(
            {
                validationFinished: false,
                published: 'unpublished',
                progressMeta: { progress: 0, name: this.state.progressMeta.name }
            },
            this.revalidate()
        );
    }

    revalidate() {
        const { submissionID } = this.props.computedMatch.params;
        ReviewHelper.revalidateSubmission(submissionID, true)
            .then(() => {
                this.checkFileStatus(submissionID);
            })
            .catch((error) => {
                const errMsg =
                    error.message ||
                    'An error occurred while attempting to revalidate the submission. ' +
                        'Please contact the Service Desk.';

                this.setState({
                    error: 4,
                    error_message: errMsg
                });
            });
    }

    checkFileStatus(submissionID) {
        // callback to check file status
        ReviewHelper.fetchStatus(submissionID)
            .then((response) => {
                if (this.isUnmounted) {
                    return;
                }

                const fabsData = response.fabs;
                if (fabsData.status !== 'uploading' && fabsData.status !== 'running') {
                    let success = false;
                    if (this.dataTimer) {
                        window.clearInterval(this.dataTimer);
                        this.dataTimer = null;
                        success = true;
                    }

                    ReviewHelper.fetchSubmissionMetadata(submissionID, 'fabs').then((metadataResponse) => {
                        ReviewHelper.fetchSubmissionData(submissionID).then((dataResponse) => {
                            const fabsJob = ReviewHelper.getFileStates(dataResponse).fabs;
                            this.setState({
                                jobResults: { fabs: fabsJob },
                                error: 0,
                                showSuccess: success,
                                published: metadataResponse.publish_status,
                                fabs_meta: metadataResponse.fabs_meta,
                                validationFinished: true,
                                headerErrors: fabsJob.error_type === 'header_errors',
                                progressMeta: { progress: 100, name: fabsJob.filename }
                            });
                        });
                    });
                }
                else {
                    this.setState({
                        progressMeta: { progress: response.fabs.validation_progress, name: response.fabs.file_name }
                    });

                    if (!this.dataTimer) {
                        window.setTimeout(() => {
                            if (submissionID) {
                                this.checkFileStatus(submissionID);
                            }
                        }, timerDuration * 1000);
                    }
                }
            })
            .catch((err) => {
                if (err.status === 400) {
                    this.setState({ error: 2, submit: false });
                }
            });
    }

    checkFile(submissionID) {
        this.dataTimer = window.setInterval(() => {
            if (this.state.published !== 'published') {
                this.checkFileStatus(submissionID);
            }
        }, timerDuration * 1000);
    }

    signReport(item) {
        GenerateFilesHelper.getFabsMeta(this.props.submission.id)
            .then((result) => {
                this.setState(
                    {
                        signedUrl: result.published_file,
                        signInProgress: false
                    },
                    () => {
                        this.openReport();
                    }
                );
            })
            .catch(() => {
                this.setState({
                    error: 1,
                    error_message: `Invalid File Type Selected ${item.file_type}`,
                    signInProgress: false
                });
            });
    }

    openReport() {
        window.open(this.state.signedUrl);
    }

    clickedReport() {
        // check if the link is already signed
        if (this.state.signInProgress) {
            // sign is in progress, do nothing
        }
        else if (this.state.signedUrl !== '') {
            // it is signed, open immediately
            this.openReport();
        }
        else {
            // not signed yet, sign
            this.setState(
                {
                    signInProgress: true
                },
                () => {
                    this.signReport(this.props.item);
                }
            );
        }
    }

    submitFabs() {
        this.setState({ submit: false, published: 'publishing', showPublish: false }, () => {
            UploadHelper.submitFabs({ submission_id: this.props.submission.id })
                .then(() => {
                    this.checkFile(this.props.submission.id);
                })
                .catch((error) => {
                    if (error.httpStatus === 500) {
                        this.setState({ error: 4, error_message: error.message, published: 'unpublished' });
                    }
                    else {
                        this.setState({ error: 1, error_message: error.message, published: 'unpublished' });
                    }
                });
        });
    }

    // ERRORS
    // 1: Submission is already published
    // 2: Fetching file metadata failed
    // 3: File already has been submitted in another submission

    uploadFileHelper(local, submission) {
        if (local) {
            return UploadHelper.performFabsLocalCorrectedUpload(submission);
        }
        return UploadHelper.performFabsFileCorrectedUpload(submission);
    }

    uploadFile(item) {
        if (this.isUnmounted) {
            return;
        }

        // upload specified file
        this.props.setSubmissionState('uploading');
        const submission = this.props.submission;
        submission.meta.testSubmission = '';
        submission.files.fabs = {};
        submission.files.fabs.file = item;

        // reset file and job status
        const currentResults = this.state.jobResults;
        currentResults.fabs.file_status = '';
        currentResults.fabs.job_status = '';
        this.setState({
            jobResults: currentResults,
            progressMeta: { progress: 0, name: '' }
        });

        this.uploadFileHelper(kGlobalConstants.LOCAL, submission)
            .then((submissionID) => {
                this.setState({
                    validationFinished: false
                });
                setTimeout(() => {
                    this.checkFileStatus(submissionID);
                }, 2000);
            })
            .catch((err) => {
                this.setState({
                    validationFinished: false,
                    error: 4,
                    error_message: err.body === undefined ? err.message : err.body.message
                });
            });
    }

    render() {
        if (this.state.inFlight) {
            return (
                <div className="alert alert-info text-center" role="alert">
                    <p>Loading...</p>
                </div>
            );
        }
        else if (this.state.submissionErrorMessage) {
            return (
                <React.Fragment>
                    <UploadFabsFileHeader />
                    <DABSFABSErrorMessage message={this.state.submissionErrorMessage} />
                </React.Fragment>
            );
        }
        let validationButton = null;
        let revalidateButton = null;
        let downloadButton = null;
        let validationBox = null;

        const type = {
            fileTitle: 'Upload',
            requestName: 'fabs',
            progress: '0'
        };

        const fileData = this.state.jobResults[type.requestName];
        const status = fileData.job_status;
        let errorMessage = null;
        validationBox = (
            <ValidateDataFileContainer
                type={type}
                data={this.state.jobResults}
                setUploadItem={this.uploadFile}
                updateItem={this.uploadFile}
                publishing={this.state.published === 'publishing'}
                agencyName={this.state.agency}
                progress={this.state.progressMeta.progress}
                fileName={this.state.progressMeta.name} />
        );
        if (
            fileData.file_status === 'complete' &&
                this.state.validationFinished &&
                this.state.published !== 'publishing'
        ) {
            if (status !== 'invalid' || fileData.file_status === 'complete') {
                validationBox = (
                    <ValidateValuesFileContainer
                        type={type}
                        data={this.state.jobResults}
                        setUploadItem={this.uploadFile}
                        updateItem={this.uploadFile}
                        published={this.state.published}
                        agencyName={this.state.agency} />
                );
            }

            if (this.state.showSuccess) {
                errorMessage = (
                    <UploadFabsFileError
                        errorCode={this.state.error}
                        type="success"
                        message={this.state.error_message} />
                );
            }
            if (this.state.published === 'published') {
                // This submission is already published and cannot be republished
                let parsedDate = this.state.fabs_meta.publish_date;
                parsedDate = moment.utc(parsedDate).local().format('h:mmA [on] MM/DD/YYYY');
                if (this.state.fabs_meta.published_file === null) {
                    validationButton = (
                        <div className="col-xs-12">
                            <div className="row">
                                <div className="col-xs-8 button-text-container text-right">
                                    <Icons.CheckCircle />
                                        File Published: {this.state.fabs_meta.valid_rows} row(s) of data&nbsp;
                                        (excluding header) published at {parsedDate}
                                    <span className="tooltip-popover-container">
                                        <Icons.InfoCircle />
                                        <span className="tooltip-popover above">
                                            <span>
                                                    The published file differs from the submitted file in four ways:
                                            </span>
                                            <span>
                                                    1) It contains derivations based on agency data, as described in the
                                                    DAIMS Practices and Procedures document;
                                            </span>

                                            <span>
                                                    2) Any rows in the submitted file with unresolved critical errors
                                                    will not be published.
                                            </span>

                                            <span>
                                                    3) Its order matches the header order in DAIMS-IDD-D2, rather than
                                                    that in the submitted file.
                                            </span>

                                            <span>
                                                    4) Any extraneous headers, Flex or otherwise, are not carried over
                                                    to the published file.
                                            </span>
                                        </span>
                                    </span>
                                </div>
                                <button className="pull-right col-xs-3 us-da-disabled-button" disabled>
                                        Download Published File
                                </button>
                            </div>
                        </div>
                    );
                }
                else {
                    downloadButton = (
                        <div className="col-xs-12">
                            <div className="row">
                                <div className="col-xs-8 button-text-container text-right">
                                    <Icons.CheckCircle />
                                        File Published: {this.state.fabs_meta.valid_rows} row(s) of data&nbsp;
                                        (excluding header) published at {parsedDate}
                                    <span className="tooltip-popover-container">
                                        <Icons.InfoCircle />
                                        <span className="tooltip-popover above">
                                            <span>
                                                    The published file differs from the submitted file in four ways:
                                            </span>
                                            <span>
                                                    1) It contains derivations based on agency data, as described in the
                                                    DAIMS Practices and Procedures document;
                                            </span>

                                            <span>
                                                    2) Any rows in the submitted file with unresolved critical errors
                                                    will not be published.
                                            </span>

                                            <span>
                                                    3) Its order matches the header order in DAIMS-IDD-D2, rather than
                                                    that in the submitted file.
                                            </span>

                                            <span>
                                                    4) Any extraneous headers, Flex or otherwise, are not carried over
                                                    to the published file.
                                            </span>
                                        </span>
                                    </span>
                                </div>
                                <button
                                    className="pull-right col-xs-3 us-da-button"
                                    onClick={this.clickedReport}
                                    download={this.state.fabs_meta.published_file}
                                    rel="noopener noreferrer">
                                        Download Published File
                                </button>
                            </div>
                        </div>
                    );
                }
            }
            else if (PermissionsHelper.checkFabsPublishPermissions(this.props.session)) {
                const disabled = status !== "finished";
                const disabledClass = disabled ? ' us-da-disabled-button' : '';
                // User has permissions to publish this unpublished submission
                validationButton = (
                    <button
                        className={`pull-right col-xs-3 us-da-button${disabledClass}`}
                        onClick={this.openModal}
                        disabled={disabled}>
                            Publish
                    </button>
                );
                revalidateButton = (
                    <button
                        className="pull-right col-xs-3 us-da-button revalidate-button"
                        onClick={this.startRevalidation}>
                            Revalidate
                    </button>
                );
            }
            else {
                // User does not have permissions to publish
                validationButton = (
                    <button className="pull-right col-xs-3 us-da-disabled-button" disabled>
                            You do not have permissions to publish
                    </button>
                );
            }
            // Test submissions cannot be published, this overrides everything else
            if (this.state.metadata.test_submission) {
                validationButton = (
                    <button className="pull-right col-xs-3 us-da-disabled-button" disabled>
                            Test submissions cannot be published
                    </button>
                );
            }
        }

        if (this.state.published === 'publishing' && this.state.error !== 0) {
            errorMessage = (
                <UploadFabsFileError errorCode={this.state.error} type="error" message={this.state.error_message} />
            );
            validationButton = null;
            revalidateButton = (
                <button className="pull-right col-xs-3 us-da-button" onClick={this.startRevalidation}>
                        Revalidate
                </button>
            );
        }
        else if (this.state.published === 'unpublished' && this.state.error !== 0) {
            errorMessage = (
                <UploadFabsFileError errorCode={this.state.error} type="error" message={this.state.error_message} />
            );
            validationButton = null;
            revalidateButton = null;
        }

        return (
            <div>
                <UploadFabsFileHeader details={this.state.metadata} />
                <Banner type="fabs" />
                <div className="container">
                    <div className="col-xs-12 mt-60 mb-60">
                        <div className="validation-holder">
                            <TransitionGroup>
                                <CSSTransition
                                    classNames="usa-da-meta-fade"
                                    timeout={{ enter: 600, exit: 200 }}
                                    exit>
                                    {validationBox}
                                </CSSTransition>
                            </TransitionGroup>

                            {errorMessage}

                            <TransitionGroup>
                                <CSSTransition
                                    classNames="usa-da-meta-fade"
                                    timeout={{ enter: 600, exit: 200 }}
                                    exit>
                                    <>
                                        {validationButton}
                                        {revalidateButton}
                                        {downloadButton}
                                    </>
                                </CSSTransition>
                            </TransitionGroup>
                        </div>
                    </div>
                </div>
                <PublishModal
                    rows={this.state.fabs_meta}
                    submit={this.submitFabs}
                    submissionID={this.props.computedMatch.params.submissionID}
                    closeModal={this.closeModal}
                    isOpen={this.state.showPublish}
                    published={this.state.published} />
            </div>
        );
    }
}

UploadFabsFileValidation.propTypes = propTypes;
UploadFabsFileValidation.defaultProps = defaultProps;

export default connect((state) => ({ session: state.session }))(UploadFabsFileValidation);
