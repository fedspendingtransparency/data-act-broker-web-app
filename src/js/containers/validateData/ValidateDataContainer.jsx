/**
* ValidateDataContainer.jsx
* Created by Kevin Li 3/29/16
*/

import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as uploadActions from 'redux/actions/uploadActions';
import * as sessionActions from 'redux/actions/sessionActions';

import ValidationContent from '../../components/validateData/ValidationContent';
import ValidateNotYours from '../../components/validateData/ValidateNotYours';
import ValidateLoadingScreen from '../../components/validateData/ValidateLoadingScreen';

import * as ReviewHelper from '../../helpers/reviewHelper';

const propTypes = {
    resetSubmission: PropTypes.func,
    setSubmissionState: PropTypes.func,
    setValidation: PropTypes.func,
    submission: PropTypes.object,
    submissionID: PropTypes.string,
    errorFromStep: PropTypes.func
};

const ValidateDataContainer = ({
    resetSubmission = () => {},
    setSubmissionState = () => {},
    setValidation = () => {},
    submission = {},
    submissionID = '',
    ...props
}) => {
    const timerDuration = 10;
    const singleFileValidations = ['appropriations', 'program_activity', 'award_financial'];
    const [finishedPageLoad, setFinishedPageLoad] = useState(false);
    const [validationFailed, setValidationFailed] = useState(false);
    const [validationFinished, setValidationFinished] = useState(false);
    const [notYours, setNotYours] = useState(false);
    const [serverError, setServerError] = useState(null);
    const [agencyName, setAgencyName] = useState(null);
    const [stateReset, setStateReset] = useState(false);
    const [checkFinishedUpdated, setCheckFinishedUpdated] = useState(false);
    const [fileValidationsDone, setFileValidationsDone] = useState([false, false, false]);
    const [stateFileStatuses, setStateFileStatuses] = useState({});
    const [stateProgressMeta, setStateProgressMeta] = useState({
        appropriations: { progress: 0, name: '' },
        program_activity: { progress: 0, name: '' },
        award_financial: { progress: 0, name: '' }
    });
    const [isUnmounted, setIsUnMounted] = useState(false);

    useEffect(() => {
        setIsUnMounted(false);
        updateAgencyName(submissionID);
        validateSubmission();

        return () => {
            setIsUnMounted(true);
        };
    }, []);

    useEffect(() => {
        updateAgencyName(submissionID);

        // restart the process if the submission ID changes
        resetSubmission();
        reset();
    }, [submissionID]);

    // check if the submission state changed, indicating a re-upload
    useEffect(() => {
        if (submission.state === "prepare") {
            clearValidationState();
        }
    }, [submission.state]);

    useEffect(() => {
        if (stateReset) {
            setStateReset(false);
            validateSubmission();
        }
    }, [stateReset]);

    useEffect(() => {
        if (checkFinishedUpdated) {
            setCheckFinishedUpdated(false);
            checkFinished();
        }
    }, [checkFinishedUpdated]);

    const updateAgencyName = (subID) => {
        if (subID !== null) {
            ReviewHelper.fetchSubmissionMetadata(subID)
                .then((res) => {
                    if (!isUnmounted) {
                        props.setSubmissionPublishStatus(res.data.publish_status);
                        setAgencyName(res.data.agency_name);
                    }
                })
                .catch((error) => {
                    console.error(error);
                    props.errorFromStep(error.response.data.message);
                });
        }
    };

    const clearValidationState = () => {
        setValidationFinished(false);
        setValidationFailed(false);
        setFileValidationsDone([false, false, false]);
        setStateProgressMeta({
            appropriations: { progress: 0, name: '' },
            program_activity: { progress: 0, name: '' },
            award_financial: { progress: 0, name: '' }
        });
        setStateReset(true);
    };

    const reset = () => {
        setValidationFinished(false);
        setValidationFailed(false);
        setFinishedPageLoad(false);
        setNotYours(false);
        setServerError(null);
        setFileValidationsDone([false, false, false]);
        setStateProgressMeta({
            appropriations: { progress: 0, name: '' },
            program_activity: { progress: 0, name: '' },
            award_financial: { progress: 0, name: '' }
        });
        setStateReset(true);
    };

    const resetProgress = () => {
        const progressMeta = stateProgressMeta;
        for (const fileType in submission.files) {
            if (Object.prototype.hasOwnProperty.call(submission.files, fileType)) {
                progressMeta[fileType] = { progress: 0, name: submission.files[fileType].file.name };
            }
        }
        setStateProgressMeta(progressMeta);
    };

    const checkFinished = () => {
        let hasFailed = false;
        // if any file status is false, that means we need to check again because we aren't done
        if (fileValidationsDone.includes(false)) {
            window.setTimeout(() => {
                validateSubmission();
            }, timerDuration * 1000);
        }
        else {
            // if any of the statuses are "failed" then the submission has failed for some reason
            singleFileValidations.forEach((fileType) => {
                if (stateFileStatuses[fileType].status === 'failed') {
                    hasFailed = true;
                }
            });
            setValidationFinished(true);
            setValidationFailed(hasFailed);
        }
    };

    const validateSubmission = () => {
        if (submissionID === "") {
            return;
        }
        const startTime = new Date().getTime();
        ReviewHelper.fetchStatus(submissionID)
            .then((res) => {
                if (isUnmounted) {
                    // the component has been unmounted, so don't bother with updating the state
                    // (it doesn't exist anymore anyway)
                    return;
                }
                const endTime = new Date().getTime();
                const duration = endTime - startTime;
                // log the API call duration
                props.setApiMeta({
                    time: duration
                });

                const data = res.data;

                // setFinishedPageLoad(true);
                setSubmissionState('review');

                // see if there are any validations still running.
                let fileStatusChanged = false;
                const fileStatuses = fileValidationsDone.slice();
                const progress = stateProgressMeta;
                for (let i = 0; i < singleFileValidations.length; i++) {
                    const currFile = data[singleFileValidations[i]];
                    // if a file wasn't done last time this check ran but is this time, the status has "changed"
                    if (!fileStatuses[i] && currFile.status !== 'running' && currFile.status !== 'uploading') {
                        fileStatusChanged = true;
                        fileStatuses[i] = true;
                    }
                    progress[singleFileValidations[i]].progress = currFile.validation_progress;
                    progress[singleFileValidations[i]].name = currFile.file_name;
                }

                // if there were any changes, we want to get all the new job statuses
                if (fileStatusChanged) {
                    ReviewHelper.fetchSubmissionData(submissionID)
                        .then((response) => {
                            const fileStates = ReviewHelper.getFileStates(response.data);
                            // sometimes the delay between checking status and getting the jobs gives the jobs time
                            // to finish when we think they're still running, this is to make sure the jobs we think
                            // are still running show as such so there is no visual discrepancy
                            for (let i = 0; i < fileStatuses.length; i++) {
                                if (!fileStatuses[i]) {
                                    fileStates[singleFileValidations[i]] = {
                                        job_status: "running",
                                        file_status: "incomplete"
                                    };
                                }
                            }
                            setValidation(fileStates);
                            setFileValidationsDone(fileStatuses);
                            setFinishedPageLoad(true);
                            setStateProgressMeta(progress);
                            setStateFileStatuses(data);
                            setCheckFinishedUpdated(true);
                        });
                }
                else {
                    setFileValidationsDone(fileStatuses);
                    setStateProgressMeta(progress);
                    setStateFileStatuses(data);
                    setCheckFinishedUpdated(true);
                }
            })
            .catch((err) => {
                if (err.reason === 400) {
                    setNotYours(true);
                }
                else if (err.detail !== '') {
                    setServerError(err.detail);
                }
                else {
                    window.setTimeout(() => {
                        validateSubmission();
                    }, timerDuration * 1000);
                }
            });
    };

    let validationContent = (<ValidationContent
        {...props}
        hasFinished={validationFinished}
        hasFailed={validationFailed}
        submission={submission}
        submissionID={submissionID}
        agencyName={agencyName}
        progressMeta={stateProgressMeta}
        resetProgress={resetProgress} />);

    if (!finishedPageLoad) {
        validationContent = <ValidateLoadingScreen />;
    }
    if (notYours) {
        validationContent = (<ValidateNotYours message={"You cannot view or modify this submission because you " +
                                                        "are not the original submitter."} />);
    }
    if (serverError) {
        validationContent = (<ValidateNotYours message={"This is not a valid submission. Check your validation " +
                                                        "URL and try again."} />);
    }

    return (
        <div className="validate-data-page">
            {validationContent}
        </div>
    );
};

ValidateDataContainer.propTypes = propTypes;

export default connect(
    (state) => ({
        submission: state.submission,
        session: state.session
    }),
    (dispatch) => bindActionCreators(Object.assign({}, uploadActions, sessionActions), dispatch)
)(ValidateDataContainer);
