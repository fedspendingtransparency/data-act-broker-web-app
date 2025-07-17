/**
 * UploadFabsFileValidation.jsx
 * Created by Minahm Kim
 */

import { CSSTransition, TransitionGroup } from 'react-transition-group';

import { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { useParams } from 'react-router';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import moment from 'moment';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import * as uploadActions from 'redux/actions/uploadActions';
import * as sessionActions from 'redux/actions/sessionActions';

import * as UploadHelper from 'helpers/uploadHelper';
import * as GenerateFilesHelper from 'helpers/generateFilesHelper';
import * as PermissionsHelper from 'helpers/permissionsHelper';
import * as ReviewHelper from 'helpers/reviewHelper';
import ValidateValuesFileContainer from 'containers/validateData/ValidateValuesFileContainer';
import ValidateDataFileContainer from 'containers/validateData/ValidateDataFileContainer';
import Banner from 'components/SharedComponents/Banner';
import DABSFABSErrorMessage from 'components/SharedComponents/DABSFABSErrorMessage';
import PublishModal from './PublishModal';
import UploadFabsFileError from './UploadFabsFileError';
import UploadFabsFileHeader from './UploadFabsFileHeader';


const propTypes = {
    setSubmissionState: PropTypes.func,
    resetSubmission: PropTypes.func,
    item: PropTypes.object,
    session: PropTypes.object,
    submission: PropTypes.object
};

const defaultProps = {
    setSubmissionState: () => {},
    item: {},
    session: {},
    submission: {}
};

const UploadFabsFileValidation = (props) => {
    const timerDuration = 5;
    const [agency, setAgency] = useState('');
    const [jobResults, setJobResults] = useState({ fabs: {} });
    const [validationFinished, setValidationFinished] = useState(false);
    const [error, setError] = useState(0);
    const [published, setPublished] = useState('unpublished');
    const [showPublish, setShowPublish] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [fabsMeta, setFabsMeta] = useState({ valid_rows: 0, total_rows: 0, publish_date: null });
    const [metadata, setMetadata] = useState({});
    const [signedUrl, setSignedUrl] = useState('');
    const [signInProgress, setSignInProgress] = useState(false);
    const [inFlight, setInFlight] = useState(true);
    const [submissionErrorMessage, setSubmissionErrorMessage] = useState('');
    const [progressMeta, setProgressMeta] = useState({ progress: 0, name: '' });
    const [runRevalidate, setRunRevalidate] = useState(false);
    const [runPublish, setRunPublish] = useState(false);
    const params = useParams();
    const [isUnmounted, setIsUnMounted] = useState(false);
    const dataTimer = useRef();

    useEffect(() => {
        setIsUnMounted(false);
        if (params.submissionID) {
            setSubmissionMetadata(params.submissionID);
            checkFileStatus(params.submissionID);
        }

        return () => {
            props.resetSubmission();
            setIsUnMounted(true);
        };
    }, []);

    useEffect(() => {
        setSubmissionMetadata(params.submissionID);
        checkFileStatus(params.submissionID);
        setSubmissionErrorMessage('');
    }, [params.submissionID]);

    useEffect(() => {
        if (runRevalidate) {
            setRunRevalidate(false);
            ReviewHelper.revalidateSubmission(params.submissionID, true)
                .then(() => {
                    checkFileStatus(params.submissionID);
                })
                .catch((error) => {
                    const errMsg =
                        error.response.data.message ||
                        'An error occurred while attempting to revalidate the submission. ' +
                            'Please contact the Service Desk.';

                    setError(4);
                    setErrorMessage(errMsg);
                });
        }
    }, [runRevalidate]);

    useEffect(() => {
        if (runPublish) {
            setRunPublish(false);
            UploadHelper.submitFabs({ submission_id: props.submission.id })
                .then(() => {
                    checkFile(props.submission.id);
                })
                .catch((error) => {
                    if (error.status === 500) {
                        setError(4);
                    }
                    else {
                        setError(1);
                    }
                    setErrorMessage(error.response.data.message);
                    setPublished('unpublished');
                });
        }
    }, [runPublish]);

    useEffect(() => {
        if (signedUrl !== '') {
            openReport();
        }
    }, [signedUrl]);

    useEffect(() => {
        if (signInProgress) {
            GenerateFilesHelper.getFabsMeta(props.submission.id)
                .then((result) => {
                    setSignedUrl(result.data.published_file);
                    setSignInProgress(false);
                })
                .catch(() => {
                    setError(1);
                    setErrorMessage(`Invalid File Type Selected ${props.item.file_type}`);
                    setSignInProgress(false);
                });
        }
    }, [signInProgress]);

    useEffect(() => {
        return () => window.clearInterval(dataTimer.current);
    }, []);

    const setSubmissionMetadata = (submissionID) => {
        setInFlight(true);
        ReviewHelper.fetchSubmissionMetadata(submissionID)
            .then((response) => {
                setInFlight(false);
                if (!response.data.fabs_meta) {
                    setSubmissionErrorMessage('This is a DABS ID. Please navigate to DABS.');
                    return;
                }

                props.setSubmissionPublishStatus(response.data.publish_status);
                setMetadata(response.data);
                setAgency(response.data.agency_name);
                setPublished(response.data.publish_status);
                setFabsMeta(response.data.fabs_meta);
            })
            .catch((err) => {
                console.error(err);
                setInFlight(false);
                setSubmissionErrorMessage(err.response.data.message);
            });
    };

    const openModal = () => {
        setShowPublish(true);
    };

    const closeModal = () => {
        setShowPublish(false);
    };

    const startRevalidation = () => {
        setValidationFinished(false);
        setPublished('unpublished');
        setProgressMeta({ progress: 0, name: progressMeta.name });
        setRunRevalidate(true);
    };

    const checkFileStatus = (submissionID) => {
        // callback to check file status
        ReviewHelper.fetchStatus(submissionID)
            .then((response) => {
                if (isUnmounted) {
                    return;
                }

                const fabsData = response.data.fabs;
                if (fabsData.status !== 'uploading' && fabsData.status !== 'running') {
                    let success = false;
                    if (dataTimer.current) {
                        window.clearInterval(dataTimer.current);
                        dataTimer.current = null;
                        success = true;
                    }

                    ReviewHelper.fetchSubmissionMetadata(submissionID).then((metadataResponse) => {
                        props.setSubmissionPublishStatus(metadataResponse.data.publish_status);

                        ReviewHelper.fetchSubmissionData(submissionID).then((dataResponse) => {
                            const fabsJob = ReviewHelper.getFileStates(dataResponse.data).fabs;
                            setJobResults({ fabs: fabsJob });
                            setError(0);
                            setShowSuccess(success);
                            setPublished(metadataResponse.data.publish_status);
                            setFabsMeta(metadataResponse.data.fabs_meta);
                            setValidationFinished(true);
                            setProgressMeta({ progress: 100, name: fabsJob.filename });
                        });
                    });
                }
                else {
                    setProgressMeta({
                        progress: response.data.fabs.validation_progress,
                        name: response.data.fabs.file_name
                    });

                    if (!dataTimer.current) {
                        window.setTimeout(() => {
                            if (submissionID) {
                                checkFileStatus(submissionID);
                            }
                        }, timerDuration * 1000);
                    }
                }
            })
            .catch((err) => {
                if (err.status === 400) {
                    setError(2);
                }
            });
    };

    const checkFile = (submissionID) => {
        dataTimer.current = window.setInterval(() => {
            if (published !== 'published') {
                checkFileStatus(submissionID);
            }
        }, timerDuration * 1000);
    };

    const openReport = () => {
        window.open(signedUrl);
    };

    const clickedReport = () => {
        // check if the link is already signed
        if (!signInProgress) {
            if (signedUrl !== '') {
                // it is signed, open immediately
                openReport();
            }
            else {
                // not signed yet, sign
                setSignInProgress(true);
            }
        }
    };

    const submitFabs = () => {
        setPublished('publishing');
        setShowPublish(false);
        setRunPublish(true);
    };

    // ERRORS
    // 1: Submission is already published
    // 2: Fetching file metadata failed
    // 3: File already has been submitted in another submission
    const uploadFile = (item) => {
        if (isUnmounted) {
            return;
        }

        // upload specified file
        props.setSubmissionState('uploading');
        const submission = props.submission;
        submission.meta.testSubmission = '';
        submission.files.fabs = {};
        submission.files.fabs.file = item;

        // reset file and job status
        const currentResults = jobResults;
        currentResults.fabs.file_status = '';
        currentResults.fabs.job_status = '';
        setJobResults(currentResults);
        setProgressMeta({ progress: 0, name: '' });

        UploadHelper.performFabsFileCorrectedUpload(submission)
            .then((res) => {
                props.setSubmissionState('prepare');
                setValidationFinished(false);
                setTimeout(() => {
                    checkFileStatus(res.data.submission_id);
                }, 2000);
            })
            .catch((err) => {
                props.setSubmissionState('failed');
                setValidationFinished(false);
                setError(4);
                setErrorMessage(err.response.data === undefined ? err.message : err.response.data.message);
            });
    };

    if (inFlight) {
        return (
            <div className="alert alert-info text-center" role="alert">
                <p>Loading...</p>
            </div>
        );
    }
    else if (submissionErrorMessage) {
        return (
            <React.Fragment>
                <UploadFabsFileHeader />
                <DABSFABSErrorMessage message={submissionErrorMessage} />
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

    const fileData = jobResults[type.requestName];
    const status = fileData.job_status;
    let errorMessageDisplay = null;
    validationBox = (
        <ValidateDataFileContainer
            type={type}
            data={jobResults}
            setUploadItem={uploadFile}
            updateItem={uploadFile}
            publishing={published === 'publishing'}
            agencyName={agency}
            progress={progressMeta.progress}
            fileName={progressMeta.name} />
    );

    if (fileData.file_status === 'complete' && validationFinished && published !== 'publishing') {
        if (status !== 'invalid' || fileData.file_status === 'complete') {
            validationBox = (
                <ValidateValuesFileContainer
                    type={type}
                    data={jobResults}
                    setUploadItem={uploadFile}
                    updateItem={uploadFile}
                    published={published}
                    agencyName={agency} />
            );
        }

        if (showSuccess) {
            errorMessageDisplay = (
                <UploadFabsFileError
                    errorCode={error}
                    type="success"
                    message={errorMessage} />
            );
        }
        if (published === 'published') {
            // This submission is already published and cannot be republished
            let parsedDate = fabsMeta.publish_date;
            parsedDate = moment.utc(parsedDate).local().format('h:mmA [on] MM/DD/YYYY');
            if (fabsMeta.published_file === null) {
                validationButton = (
                    <div className="col-xs-12">
                        <div className="row">
                            <div className="col-xs-8 button-text-container text-right">
                                <FontAwesomeIcon icon="check-circle" />
                                    File Published: {fabsMeta.valid_rows} row(s) of data&nbsp;
                                    (excluding header) published at {parsedDate}
                                <span
                                    className="tooltip-popover-container"
                                    role="contentinfo"
                                    aria-label="information">
                                    <FontAwesomeIcon icon="info-circle" />
                                    <span className="tooltip-popover above">
                                        <span>
                                                The published file differs from the submitted file in four ways:
                                        </span>
                                        <span>
                                                1) It contains derivations based on agency data, as described in the
                                                GSDM Practices and Procedures document;
                                        </span>

                                        <span>
                                                2) Any rows in the submitted file with unresolved critical errors
                                                will not be published.
                                        </span>

                                        <span>
                                                3) Its order matches the header order in GSDM-IDD-D2, rather than
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
                                <FontAwesomeIcon icon="check-circle" />
                                    File Published: {fabsMeta.valid_rows} row(s) of data&nbsp;
                                    (excluding header) published at {parsedDate}
                                <span
                                    className="tooltip-popover-container"
                                    role="contentinfo"
                                    aria-label="information">
                                    <FontAwesomeIcon icon="info-circle" />
                                    <span className="tooltip-popover above">
                                        <span>
                                                The published file differs from the submitted file in four ways:
                                        </span>
                                        <span>
                                                1) It contains derivations based on agency data, as described in the
                                                GSDM Practices and Procedures document;
                                        </span>

                                        <span>
                                                2) Any rows in the submitted file with unresolved critical errors
                                                will not be published.
                                        </span>

                                        <span>
                                                3) Its order matches the header order in GSDM-IDD-D2, rather than
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
                                onClick={clickedReport}
                                download={fabsMeta.published_file}
                                rel="noopener noreferrer">
                                    Download Published File
                            </button>
                        </div>
                    </div>
                );
            }
        }
        else if (PermissionsHelper.checkFabsPublishPermissions(props.session)) {
            const disabled = status !== "finished";
            const disabledClass = disabled ? ' us-da-disabled-button' : '';
            // User has permissions to publish this unpublished submission
            validationButton = (
                <button
                    className={`pull-right col-xs-3 us-da-button${disabledClass}`}
                    onClick={openModal}
                    disabled={disabled}>
                        Publish
                </button>
            );
            revalidateButton = (
                <button
                    className="pull-right col-xs-3 us-da-button revalidate-button"
                    onClick={startRevalidation}>
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
        if (metadata.test_submission) {
            validationButton = (
                <button className="pull-right col-xs-3 us-da-disabled-button" disabled>
                        Test submissions cannot be published
                </button>
            );
        }
    }

    if (published === 'publishing' && error !== 0) {
        errorMessageDisplay = (
            <UploadFabsFileError errorCode={error} type="error" message={errorMessage} />
        );
        validationButton = null;
        revalidateButton = (
            <button className="pull-right col-xs-3 us-da-button" onClick={startRevalidation}>
                    Revalidate
            </button>
        );
    }
    else if (published === 'unpublished' && error !== 0) {
        errorMessageDisplay = (
            <UploadFabsFileError errorCode={error} type="error" message={errorMessage} />
        );
        validationButton = null;
        revalidateButton = null;
    }

    return (
        <div>
            <UploadFabsFileHeader details={metadata} />
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

                        {errorMessageDisplay}

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
                rows={fabsMeta}
                submit={submitFabs}
                submissionID={params.submissionID}
                closeModal={closeModal}
                isOpen={showPublish}
                published={published} />
        </div>
    );
};

UploadFabsFileValidation.propTypes = propTypes;
UploadFabsFileValidation.defaultProps = defaultProps;

export default connect(
    (state) => ({ session: state.session }),
    (dispatch) => bindActionCreators(Object.assign({}, uploadActions, sessionActions), dispatch)
)(UploadFabsFileValidation);
