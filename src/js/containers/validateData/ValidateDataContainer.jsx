/**
* ValidateDataContainer.jsx
* Created by Kevin Li 3/29/16
*/

import React, { PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as uploadActions from '../../redux/actions/uploadActions';

import ValidationContent from '../../components/validateData/ValidationContent';
import ValidateNotYours from '../../components/validateData/ValidateNotYours';
import ValidateLoadingScreen from '../../components/validateData/ValidateLoadingScreen';
import PublishedSubmissionWarningBanner from '../../components/SharedComponents/PublishedSubmissionWarningBanner';
import Banner from '../../components/SharedComponents/Banner';

import * as ReviewHelper from '../../helpers/reviewHelper';

const propTypes = {
    resetSubmission: PropTypes.func,
    setSubmissionState: PropTypes.func,
    setValidation: PropTypes.func,
    submission: PropTypes.object,
    submissionID: PropTypes.string
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

class ValidateDataContainer extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            finishedPageLoad: false,
            validationFailed: false,
            validationFinished: false,
            notYours: false,
            serverError: null,
            agencyName: null
        };

        this.isUnmounted = false;
    }


    componentDidMount() {
        this.isUnmounted = false;
        this.setAgencyName(this.props);
        this.validateSubmission();
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.submissionID !== nextProps.submissionID) {
            this.setAgencyName(nextProps);
        }
    }

    componentDidUpdate(prevProps) {
        // check if the submission state changed, indicating a re-upload
        if (prevProps.submission.state !== this.props.submission.state) {
            if (this.props.submission.state === "prepare") {
                this.setState({
                    validationFinished: false,
                    validationFailed: false
                }, () => {
                    // setTimeout(() => {
                        this.validateSubmission();
                    // }, timerDuration * 100);
                });
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
            ReviewHelper.fetchSubmissionMetadata(givenProps.submissionID)
                .then((data) => {
                    if (!this.isUnmounted) {
                        this.setState({ agencyName: data.agency_name });
                    }
                })
                .catch((error) => {
                    console.error(error);
                });
        }
    }

    reset() {
        this.setState({
            finishedPageLoad: false,
            validationFailed: false,
            validationFinished: false,
            notYours: false,
            serverError: null
        }, () => {
            this.validateSubmission();
        });
    }

    processData(callback) {
        let isFinished = true;
        let hasFailed = false;

        // iterate through the data to look for header errors, validation failures, and incomplete validations
        for (const key of singleFileValidations) {
            if (!this.props.submission.validation.hasOwnProperty(key)) {
                // required files don't exist, fail
                this.setState({
                    validationFinished: false
                });
                return;
            }

            const item = this.props.submission.validation[key];
            if (item.job_status === 'failed') {
                hasFailed = true;
            }
            if ((item.job_status !== 'finished' && item.job_status !== 'invalid')
                || item.file_status === 'incomplete') {
                isFinished = false;
            }
        }

        this.setState({
            validationFailed: hasFailed,
            validationFinished: isFinished
        }, callback);
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

                // see if there are any validations still running.
                let allDone = true;
                singleFileValidations.forEach((fileType) => {
                    if (data[fileType].status === 'running' || data[fileType].status === 'uploading') {
                        allDone = false;
                    }
                });

                this.setState({ finishedPageLoad: true });
                this.props.setSubmissionState('review');

                const tmpValidationFiles = this.props.submission.validation;
                let hasFailed = false;
                singleFileValidations.forEach((fileType) => {
                    if (!allDone) {
                        tmpValidationFiles[fileType] = {
                            job_status: 'running',
                            file_status: 'incomplete',
                            error_data: [],
                            warning_data: []
                        };
                    }
                    else {
                        if (data[fileType]['status'] === 'failed') {
                            hasFailed = true;
                        }
                    }
                });

                if (allDone) {
                    this.setState({
                        validationFinished: true,
                        validationFailed: hasFailed
                    });

                    ReviewHelper.fetchSubmissionData(this.props.submissionID)
                        .then((response) => {
                            this.props.setValidation(ReviewHelper.getFileStates(response));
                        });
                }
                else {
                    this.props.setValidation(tmpValidationFiles);
                    statusTimer = setTimeout(() => {
                        this.validateSubmission();
                    }, timerDuration * 1000);
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
            agencyName={this.state.agencyName} />);

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

        let warningMessage = null;
        if (!this.state.notYours && !this.state.serverError && this.props.submission.publishStatus !== "unpublished") {
            warningMessage = <PublishedSubmissionWarningBanner />;
        }

        return (
            <div>
                {warningMessage}
                <Banner type="dabs" />
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
