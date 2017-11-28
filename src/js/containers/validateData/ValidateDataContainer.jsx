/**
* ValidateDataContainer.jsx
* Created by Kevin Li 3/29/16
*/

import React, { PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as uploadActions from '../../redux/actions/uploadActions.js';

import ValidationContent from '../../components/validateData/ValidationContent.jsx';
import ValidateNotYours from '../../components/validateData/ValidateNotYours.jsx';
import ValidateLoadingScreen from '../../components/validateData/ValidateLoadingScreen.jsx';
import PublishedSubmissionWarningBanner from '../../components/SharedComponents/PublishedSubmissionWarningBanner.jsx';
import Banner from '../../components/SharedComponents/Banner.jsx';

import * as ReviewHelper from '../../helpers/reviewHelper.js';

const propTypes = {
    resetSubmission: PropTypes.func,
    setSubmissionState: PropTypes.func,
    setValidation: PropTypes.func,
    submission: PropTypes.object,
    submissionID: PropTypes.string
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

        this.isCancelled = false;
    }


    componentDidMount() {
        this.isCancelled = false;
        this.validateSubmission();
    }

    componentDidUpdate(prevProps) {
        // check if the submission state changed, indicating a re-upload
        if (prevProps.submission.state !== this.props.submission.state) {
            if (this.props.submission.state === "prepare") {
                this.validateSubmission();
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
        this.isCancelled = true;
        if (statusTimer) {
            clearTimeout(statusTimer);
            statusTimer = null;
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
        ReviewHelper.validateSubmission(this.props.submissionID)
            .then((data) => {
                if (this.isCancelled) {
                    // the component has been unmounted, so don't bother with updating the state
                    // (it doesn't exist anymore anyway)
                    return;
                }

                this.setState({
                    finishedPageLoad: true,
                    agencyName: data.agencyName
                });
                this.props.setSubmissionState('review');
                this.props.setValidation(data.file);

                // review the validation data for failures, header errors, and completion state
                this.processData(() => {
                    if (!this.state.validationFinished && !this.state.validationFailed) {
                        // keep reloading if the validation hasn't finished yet and nothing has failed
                        statusTimer = setTimeout(() => {
                            this.validateSubmission();
                        }, timerDuration * 1000);
                    }
                });
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
        let validationContent = (<ValidationContent {...this.props} hasFinished={this.state.validationFinished}
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

export default connect(
    (state) => ({
        submission: state.submission,
        session: state.session
    }),
    (dispatch) => bindActionCreators(uploadActions, dispatch)
)(ValidateDataContainer);
