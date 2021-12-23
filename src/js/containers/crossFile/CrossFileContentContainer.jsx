/**
* CrossFileContentContainer.jsx
* Created by Kevin Li 6/14/16
*/

import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import * as uploadActions from 'redux/actions/uploadActions';
import * as UploadHelper from 'helpers/uploadHelper';
import * as ReviewHelper from 'helpers/reviewHelper';
import CrossFileContent from 'components/crossFile/CrossFileContent';
import { kGlobalConstants } from '../../GlobalConstants';

const propTypes = {
    resetSubmission: PropTypes.func,
    setCrossFile: PropTypes.func,
    setSubmissionState: PropTypes.func,
    errorFromStep: PropTypes.func,
    submission: PropTypes.object,
    submissionID: PropTypes.string,
    publishStatus: PropTypes.string
};

const defaultProps = {
    resetSubmission: () => {},
    setCrossFile: () => {},
    setSubmissionState: () => {},
    submission: {},
    submissionID: '',
    publishStatus: ''
};

const timerDuration = 10;

class CrossFileContentContainer extends React.Component {
    constructor(props) {
        super(props);

        this.dataTimer = null;
        this.isUnmounted = false;

        this.state = {
            agencyName: '',
            toValidateData: false,
            toGenerateFiles: false,
            progress: 0
        };

        this.uploadFiles = this.uploadFiles.bind(this);
        this.reloadData = this.reloadData.bind(this);
    }

    componentDidMount() {
        this.isUnmounted = false;
        this.setAgencyName(this.props);
        this.loadData();
        this.startTimer();
    }

    componentDidUpdate(prevProps) {
        if (this.props.submissionID !== prevProps.submissionID) {
            this.setAgencyName(this.props);
        }
    }

    componentWillUnmount() {
        this.isUnmounted = true;
        // stop the timer
        if (this.dataTimer) {
            window.clearInterval(this.dataTimer);
            this.dataTimer = null;
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

    uploadFiles() {
        if (kGlobalConstants.LOCAL === true) {
            UploadHelper.performLocalCorrectedUpload(this.props.submission)
                .then(() => {
                    this.props.resetSubmission();
                    // reload the data
                    this.loadData();
                    this.startTimer();
                });
        }
        else {
            UploadHelper.performRemoteCorrectedUpload(this.props.submission)
                .then(() => {
                    this.props.resetSubmission();
                    // reload the data
                    this.loadData();
                    this.startTimer();
                });
        }
    }

    hasEarlierErrors(data) {
        let errors = '';
        if (data.appropriations.has_errors || data.program_activity.has_errors || data.award_financial.has_errors) {
            errors = 'validation';
        }
        else if (data.award_procurement.has_errors || data.award.has_errors) {
            errors = 'generation';
        }
        return errors;
    }

    loadData() {
        this.props.setSubmissionState('empty');
        ReviewHelper.fetchStatus(this.props.submissionID)
            .then((data) => {
                const crossInfo = data.cross;
                if (crossInfo.status === 'ready') {
                    const earlierErrors = this.hasEarlierErrors(data);
                    if (earlierErrors) {
                        if (this.dataTimer) {
                            window.clearInterval(this.dataTimer);
                            this.dataTimer = null;
                        }

                        if (earlierErrors === 'validation') {
                            this.setState({
                                toValidateData: true
                            });
                        }
                        else {
                            this.setState({
                                toGenerateFiles: true
                            });
                        }
                    }
                }
                // individual files are done and valid
                if (crossInfo.status === 'finished' || crossInfo.status === 'failed') {
                    // stop the timer once the validations are complete
                    ReviewHelper.fetchSubmissionData(this.props.submissionID, 'cross')
                        .then((response) => {
                            // there is only ever one job returned when the type is specified, simply use that one
                            const crossFile = {
                                errors: ReviewHelper.getCrossFileData(response.jobs[0], 'errors'),
                                warnings: ReviewHelper.getCrossFileData(response.jobs[0], 'warnings')
                            };
                            this.props.setSubmissionState(crossInfo.status);
                            this.props.setCrossFile(crossFile);
                        });

                    if (this.dataTimer) {
                        window.clearInterval(this.dataTimer);
                        this.dataTimer = null;
                    }
                }
                // cross-file still running
                if (crossInfo.status === 'running') {
                    this.setState({ progress: crossInfo.validation_progress });
                }
            })
            .catch((err) => {
                // check if the error has an associated user-displayable message
                if (Object.prototype.hasOwnProperty.call(err, 'detail') && err.detail !== '') {
                    if (!this.isUnmounted) {
                        this.props.errorFromStep(err.detail);
                    }
                }
                else {
                    console.error(err);
                    this.props.errorFromStep(err.message);
                }

                // stop the timer
                if (this.dataTimer) {
                    window.clearInterval(this.dataTimer);
                    this.dataTimer = null;
                }
            });
    }

    startTimer() {
        // keep checking the data every 5 seconds until it has finished loaded;
        this.dataTimer = window.setInterval(() => {
            this.loadData();
        }, timerDuration * 1000);
    }

    reloadData() {
        this.props.resetSubmission();
        this.loadData();
        this.startTimer();
    }

    render() {
        if (this.state.toValidateData) {
            return <Redirect to={`/submission/${this.props.submissionID}/validateData/`} />;
        }

        else if (this.state.toGenerateFiles) {
            return <Redirect to={`/submission/${this.props.submissionID}/generateFiles/`} />;
        }

        return (
            <div className="cross-file-page">
                <CrossFileContent
                    {...this.props}
                    uploadFiles={this.uploadFiles}
                    reloadData={this.reloadData}
                    agencyName={this.state.agencyName}
                    progress={this.state.progress} />
            </div>
        );
    }
}

CrossFileContentContainer.propTypes = propTypes;
CrossFileContentContainer.defaultProps = defaultProps;

export default connect(
    (state) => ({
        submission: state.submission,
        session: state.session
    }),
    (dispatch) => bindActionCreators(uploadActions, dispatch)
)(CrossFileContentContainer);
