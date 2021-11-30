/**
* ValidateDataContainer.jsx
* Created by Kevin Li 3/29/16
*/

import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as uploadActions from '../../redux/actions/uploadActions';

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

const defaultProps = {
    resetSubmission: () => {},
    setSubmissionState: () => {},
    setValidation: () => {},
    submission: {},
    submissionID: ''
};

let statusTimer;
const timerDuration = 10;

const singleFileValidations = ['appropriations', 'program_activity', 'award_financial'];

export class ValidateDataContainer extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            finishedPageLoad: false,
            validationFailed: false,
            validationFinished: false,
            notYours: false,
            serverError: null,
            agencyName: null,
            fileValidationsDone: [false, false, false],
            progressMeta: {
                appropriations: { progress: 0, name: '' },
                program_activity: { progress: 0, name: '' },
                award_financial: { progress: 0, name: '' }
            }
        };

        this.isUnmounted = false;
    }


    componentDidMount() {
        this.isUnmounted = false;
        this.setAgencyName(this.props);
        this.validateSubmission();
    }

    componentDidUpdate(prevProps) {
        if (this.props.submissionID !== prevProps.submissionID) {
            this.setAgencyName(this.props);
        }
        // check if the submission state changed, indicating a re-upload
        if (prevProps.submission.state !== this.props.submission.state) {
            if (this.props.submission.state === "prepare") {
                this.clearValidationState();
            }
        }

        // additionally, restart the process if the submission ID changes
        if (prevProps.submissionID !== this.props.submissionID) {
            this.props.resetSubmission();
            this.reset();
        }
    }

    componentWillUnmount() {
        // remove any timers
        this.isUnmounted = true;
        if (statusTimer) {
            clearTimeout(statusTimer);
            statusTimer = null;
        }
    }

    setAgencyName(givenProps) {
        if (givenProps.submissionID !== null) {
            ReviewHelper.fetchSubmissionMetadata(givenProps.submissionID, 'dabs')
                .then((data) => {
                    if (!this.isUnmounted) {
                        this.setState({ agencyName: data.agency_name });
                    }
                })
                .catch((error) => {
                    console.error(error);
                    this.props.errorFromStep(error.body.message);
                });
        }
    }

    clearValidationState() {
        this.setState({
            validationFinished: false,
            validationFailed: false,
            fileValidationsDone: [false, false, false],
            progressMeta: {
                appropriations: { progress: 0, name: '' },
                program_activity: { progress: 0, name: '' },
                award_financial: { progress: 0, name: '' }
            }
        }, () => {
            this.validateSubmission();
        });
    }

    reset() {
        this.setState({
            finishedPageLoad: false,
            validationFailed: false,
            validationFinished: false,
            notYours: false,
            serverError: null,
            fileValidationsDone: [false, false, false],
            progressMeta: {
                appropriations: { progress: 0, name: '' },
                program_activity: { progress: 0, name: '' },
                award_financial: { progress: 0, name: '' }
            }
        }, () => {
            this.validateSubmission();
        });
    }

    checkFinished(fileStatuses, data, progressMeta) {
        let hasFailed = false;
        // if any file status is false, that means we need to check again because we aren't done
        if (fileStatuses.includes(false)) {
            this.setState({
                progressMeta
            });
            statusTimer = setTimeout(() => {
                this.validateSubmission();
            }, timerDuration * 1000);
        }
        else {
            // if any of the statuses are "failed" then the submission has failed for some reason
            singleFileValidations.forEach((fileType) => {
                if (data[fileType].status === 'failed') {
                    hasFailed = true;
                }
            });
            this.setState({
                validationFinished: true,
                validationFailed: hasFailed,
                progressMeta
            });
        }
    }

    validateSubmission() {
        if (this.props.submissionID === "") {
            return;
        }
        ReviewHelper.fetchStatus(this.props.submissionID)
            .then((data) => {
                if (this.isUnmounted) {
                    // the component has been unmounted, so don't bother with updating the state
                    // (it doesn't exist anymore anyway)
                    return;
                }

                // this.setState({ finishedPageLoad: true });
                this.props.setSubmissionState('review');

                // see if there are any validations still running.
                let fileStatusChanged = false;
                const fileStatuses = this.state.fileValidationsDone.slice();
                const progress = this.state.progressMeta;
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
                    ReviewHelper.fetchSubmissionData(this.props.submissionID)
                        .then((response) => {
                            const fileStates = ReviewHelper.getFileStates(response);
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
                            this.props.setValidation(fileStates);
                            this.setState({
                                fileValidationsDone: fileStatuses,
                                finishedPageLoad: true
                            }, () => {
                                this.checkFinished(fileStatuses, data, progress);
                            });
                        });
                }
                else {
                    this.checkFinished(fileStatuses, data, progress);
                }
            })
            .catch((err) => {
                if (err.reason === 400) {
                    this.setState({
                        notYours: true
                    });
                }
                else if (err.detail !== '') {
                    this.setState({
                        serverError: err.detail
                    });
                }
                else {
                    statusTimer = setTimeout(() => {
                        this.validateSubmission();
                    }, timerDuration * 1000);
                }
            });
    }

    render() {
        let validationContent = (<ValidationContent
            {...this.props}
            hasFinished={this.state.validationFinished}
            hasFailed={this.state.validationFailed}
            submissionID={this.props.submissionID}
            agencyName={this.state.agencyName}
            progressMeta={this.state.progressMeta} />);

        if (!this.state.finishedPageLoad) {
            validationContent = <ValidateLoadingScreen />;
        }
        if (this.state.notYours) {
            validationContent = (<ValidateNotYours message={"You cannot view or modify this submission because you " +
                                                            "are not the original submitter."} />);
        }
        if (this.state.serverError) {
            validationContent = (<ValidateNotYours message={"This is not a valid submission. Check your validation " +
                                                            "URL and try again."} />);
        }

        return (
            <div className="validate-data-page">
                {validationContent}
            </div>
        );
    }
}

ValidateDataContainer.propTypes = propTypes;
ValidateDataContainer.defaultProps = defaultProps;

export default connect(
    (state) => ({
        submission: state.submission,
        session: state.session
    }),
    (dispatch) => bindActionCreators(uploadActions, dispatch)
)(ValidateDataContainer);
