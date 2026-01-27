/**
* UploadFabsFileMeta.jsx
* Created by Minahm Kim
*/

import { CSSTransition, TransitionGroup } from 'react-transition-group';

import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import SubmissionTypeField from 'components/addData/metadata/SubmissionTypeField';

import SubTierAgencyListContainer from '../../containers/SharedContainers/SubTierAgencyListContainer';
import UploadFabsFileBox from './UploadFabsFileBox';
import UploadFabsFileError from './UploadFabsFileError';
import UploadFabsFileHeader from "./UploadFabsFileHeader";
import Banner from '../SharedComponents/Banner';

import * as UploadHelper from '../../helpers/uploadHelper';
import * as ReviewHelper from '../../helpers/reviewHelper';

const propTypes = {
    setSubmissionId: PropTypes.func,
    setSubmissionState: PropTypes.func,
    validate: PropTypes.func,
    submission: PropTypes.object
};

const UploadFabsFileMeta = ({
    setSubmissionId = () => {}, setSubmissionState = () => {}, validate = () => {}, submission = {}
}) => {
    const timerDuration = 5;
    const [agency, setAgency] = useState('');
    const [agencyError, setAgencyError] = useState(false);
    const [showUploadFilesBox, setShowUploadFilesBox] = useState(false);
    const [showSubmissionType, setShowSubmissionType] = useState(false);
    const [submissionType, setSubmissionType] = useState('');
    const [jobResults, setJobResults] = useState({ fabs: {} });
    const [fileUpdated, setFileUpdated] = useState(false);
    const [fabs, setFabs] = useState(
        {
            error: {
                show: false,
                header: '',
                description: ''
            },
            valid: false,
            status: ""
        }
    );
    const [isUnmounted, setIsUnmounted] = useState(false);

    useEffect(() => {
        setIsUnmounted(false);

        return () => {
            setIsUnmounted(true);
        };
    }, []);

    useEffect(() => {
        if (fileUpdated) {
            setFileUpdated(false);
            parseJobStates();
        }
    }, [fileUpdated]);

    const handleChange = (newAgency, isValid) => {
        // set Sub-Tier Agency and update validity
        setAgency(newAgency);
        setAgencyError(!isValid);
        setShowSubmissionType(isValid);
        setShowUploadFilesBox(isValid && submissionType !== '');
    };

    const uploadFile = () => {
        // upload specified file
        setSubmissionState('uploading');
        const tmpSubmission = submission;
        tmpSubmission.meta.subTierAgency = agency;
        tmpSubmission.meta.testSubmission = submissionType === 'test';

        UploadHelper.performFabsFileUpload(tmpSubmission)
            .then((res) => {
                const submissionID = res.data.submission_id;
                setSubmissionId(submissionID);
                checkFileStatus(submissionID);
                validate(submissionID);
            })
            .catch((err) => {
                const tmpFabs = Object.assign({}, fabs);
                tmpFabs.error = {
                    show: true,
                    header: 'Upload Error',
                    description: err.response.data.message || err.message || ''
                };
                setFabs(tmpFabs);
            });
    };

    const checkFileStatus = (submissionID) => {
        // callback to check file status
        ReviewHelper.fetchSubmissionData(submissionID)
            .then((response) => {
                if (isUnmounted) {
                    return;
                }
                setShowUploadFilesBox(false);
                setFileUpdated(true);
                setJobResults(response.data);
            })
            .catch((err) => {
                const tmpFabs = Object.assign({}, fabs);
                tmpFabs.error = {
                    show: true,
                    header: 'File Error',
                    description: err.response.data.message || err.message || ''
                };
                setFabs(tmpFabs);
            });
    };

    const validateSubmission = () => {
        ReviewHelper.validateFabsSubmission(submission.id)
            .then((res) => {
                const fileStates = ReviewHelper.getFileStates(res.data);
                setFabs(fileStates.item);
            });
    };

    const parseJobStates = () => {
        let runCheck = true;

        if (jobResults.jobs[0].job_status === 'failed' || jobResults.jobs[0].job_status === 'invalid') {
            // don't run the check again if it failed
            runCheck = false;

            // make a clone of the file's react state
            const item = Object.assign({}, fabs);
            item.status = "failed";

            if (jobResults.jobs[0].error_type === "header_errors") {
                setFabs(item);
            }
            else {
                validateSubmission();
            }
        }
        else if (jobResults.jobs[0].job_status === 'finished') {
            // don't run the check again if it's done
            runCheck = false;

            // display dowload buttons
            // make a clone of the file's react state
            const item = Object.assign({}, fabs);
            item.status = "done";

            validateSubmission();
        }

        if (isUnmounted) {
            return;
        }

        if (runCheck && !isUnmounted) {
            // wait 5 seconds and check the file status again
            window.setTimeout(() => {
                checkFileStatus(submission.id);
            }, timerDuration * 1000);
        }
    };

    const handleSubmissionTypeChange = (newSubmissionType) => {
        setSubmissionType(newSubmissionType);
        setShowUploadFilesBox(true);
    };

    let subTierAgencyClass = '';
    if (agencyError) {
        subTierAgencyClass = ' error usa-da-form-icon';
    }

    let errorMessage = null;
    if (fabs.error.show) {
        errorMessage = <UploadFabsFileError error={fabs.error} />;
    }

    let warning = null;
    if (submission.state === 'uploading') {
        warning = (
            <div className="container short">
                <div className="alert alert-warning text-left" role="alert">
                    <div className="usa-da-icon usa-da-icon-file-upload">
                        <FontAwesomeIcon icon="file-arrow-up" />
                    </div>
                    <div className="alert-text">
                        <div className="alert-header-text">Please stay on this page while files upload</div>
                        <p>
                            Depending on your bandwidth, these may take longer than an hour to upload.
                            <br />
                            <b>If they have not uploaded in forty-five minutes</b>, please open a new tab
                            and navigate around Data Broker every forty-five minutes to prevent being logged out
                            and needing to restart the upload process.
                            <br />
                            Please stay on this page until they are complete or your submission may not be created
                            properly.
                        </p>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div>
            <UploadFabsFileHeader />
            <Banner type="fabs" />
            <div className="container center-block mt-20">
                {warning}
                <div className="row usa-da-select-agency">
                    <div className="col-lg-offset-2 col-lg-8 mb-60">
                        <h5>Please begin by telling us about files you would like to upload</h5>
                        <div className="select-agency-holder">
                            <div>
                                <div className="row usa-da-select-agency-label">
                                    The files will be used when submitting data for...
                                </div>
                                <div className="row">
                                    <div
                                        className="col-sm-12 col-md-12 typeahead-holder"
                                        data-testid="agencytypeahead">
                                        <SubTierAgencyListContainer
                                            placeholder="Enter the name of the reporting sub-tier agency"
                                            onSelect={handleChange}
                                            customClass={subTierAgencyClass}
                                            internalValue={['agency_code']} />
                                        <div className={`usa-da-icon usa-da-form-icon${subTierAgencyClass}`}>
                                            <FontAwesomeIcon icon={['far', 'building']} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {showSubmissionType &&
                            <TransitionGroup>
                                <CSSTransition
                                    classNames="usa-da-meta-fade"
                                    timeout={{ enter: 600, exit: 200 }}
                                    exit>
                                    <SubmissionTypeField
                                        onChange={handleSubmissionTypeChange}
                                        value={submissionType}
                                        isDabs={false}
                                        selectedAgency={agency} />
                                </CSSTransition>
                            </TransitionGroup>
                            }

                            {showUploadFilesBox &&
                            <TransitionGroup>
                                <CSSTransition
                                    classNames="usa-da-meta-fade"
                                    timeout={{ enter: 600, exit: 200 }}
                                    exit>
                                    <UploadFabsFileBox
                                        fabs={fabs}
                                        submission={submission}
                                        uploadFile={uploadFile} />
                                </CSSTransition>
                            </TransitionGroup>
                            }
                            {errorMessage}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

UploadFabsFileMeta.propTypes = propTypes;
export default UploadFabsFileMeta;
