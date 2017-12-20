/**
* UploadDetachedFileMeta.jsx
* Created by Minahm Kim
*/

import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

import React, { PropTypes } from 'react';

import SubTierAgencyListContainer from '../../containers/SharedContainers/SubTierAgencyListContainer';
import UploadDetachedFilesBox from './UploadDetachedFilesBox';
import UploadDetachedFilesError from './UploadDetachedFilesError';
import Banner from '../SharedComponents/Banner';

import * as Icons from '../SharedComponents/icons/Icons';

import * as UploadHelper from '../../helpers/uploadHelper';
import * as GenerateFilesHelper from '../../helpers/generateFilesHelper';
import * as ReviewHelper from '../../helpers/reviewHelper';
import { kGlobalConstants } from '../../GlobalConstants';

const propTypes = {
    setSubmissionId: PropTypes.func,
    setSubmissionState: PropTypes.func,
    validate: PropTypes.func,
    submission: PropTypes.object
};

const defaultProps = {
    setSubmissionId: () => {},
    setSubmissionState: () => {},
    validate: () => {},
    submission: {}
};

const timerDuration = 5;

export default class UploadDetachedFileMeta extends React.Component {
    constructor(props) {
        super(props);

        this.isUnmounted = false;

        this.state = {
            agency: "",
            agencyError: false,
            showUploadFilesBox: false,
            detachedAward: {
                error: {
                    show: false,
                    header: '',
                    description: ''
                },
                valid: false,
                status: ""
            },
            jobResults: { detached_award: {} },
            notAllowed: false,
            errorMessage: "",
            headerErrors: false,
            validationFinished: false,
            published: false
        };
    }

    componentDidMount() {
        this.isUnmounted = false;
    }

    componentWillUnmount() {
        this.isUnmounted = true;
    }

    handleChange(agency, isValid) {
        // set Sub-Tier Agency and update validity
        this.setState({
            agency,
            agencyError: !isValid,
            showUploadFilesBox: isValid
        });
    }

    updateError(file, header = '', description = '') {
        // Show any error that occurs at any point during file upload
        const state = Object.assign({}, this.state[file], {
            error: {
                show: header !== '' && description !== '',
                header,
                description
            }
        });

        this.setState({
            [file]: state
        });
    }

    uploadFileHelper(local, submission) {
        if (local) {
            return UploadHelper.performDetachedLocalUpload(submission);
        }
        return UploadHelper.performDetachedFileUpload(submission);
    }

    uploadFile() {
        // upload specified file
        this.props.setSubmissionState('uploading');
        const submission = this.props.submission;
        submission.meta.subTierAgency = this.state.agency;

        this.uploadFileHelper(kGlobalConstants.LOCAL === true && !this.isUnmounted, submission)
            .then((submissionID) => {
                this.props.setSubmissionId(submissionID);
                this.checkFileStatus(submissionID);
                this.props.validate(submissionID);
            })
            .catch((err) => {
                this.setState({
                    notAllowed: err.httpStatus === 403,
                    errorMessage: err.httpStatus === 403 ? err.message : err.body.message
                });
            });
    }

    checkFileStatus(submissionID) {
        // callback to check file status
        GenerateFilesHelper.fetchSubmissionMetadata(submissionID)
            .then((response) => {
                if (this.isUnmounted) {
                    return;
                }
                const job = Object.assign({}, this.state.jobResults);
                job.detached_award = response.jobs[0];
                this.setState({
                    showUploadFilesBox: false,
                    jobResults: job
                }, () => {
                    this.parseJobStates(response);
                });
            })
            .catch((err) => {
                if (err.status === 400) {
                    this.setState({ error: 2, submit: false });
                }
            });
    }

    validateSubmission(submissionID) {
        ReviewHelper.validateDetachedSubmission(submissionID)
            .then((response) => {
                this.setState({
                    detachedAward: response.item,
                    validationFinished: true,
                    headerErrors: false,
                    jobResults: response
                });
            });
    }

    parseJobStates(data) {
        let runCheck = true;

        if (data.jobs[0].job_status === 'failed' || data.jobs[0].job_status === 'invalid') {
            // don't run the check again if it failed
            runCheck = false;

            // make a clone of the file's react state
            const item = Object.assign({}, this.state.detachedAward);
            item.status = "failed";

            if (data.jobs[0].error_type === "header_errors") {
                this.setState({
                    detachedAward: item,
                    validationFinished: true,
                    headerErrors: true
                });
            }
            else {
                this.validateSubmission(this.props.submission.id);
            }
        }
        else if (data.jobs[0].job_status === 'finished') {
            // don't run the check again if it's done
            runCheck = false;

            // display dowload buttons
            // make a clone of the file's react state
            const item = Object.assign({}, this.state.detachedAward);
            item.status = "done";

            this.validateSubmission(this.props.submission.id);
        }

        if (this.isUnmounted) {
            return;
        }

        if (runCheck && !this.isUnmounted) {
            // wait 5 seconds and check the file status again
            window.setTimeout(() => {
                this.checkFileStatus(this.props.submission.id);
            }, timerDuration * 1000);
        }
    }

    // ERRORS
    // 1: Submission is already published
    // 2: Fetching file metadata failed
    // 3: File already has been submitted in another submission

    render() {
        let subTierAgencyClass = '';
        let uploadFilesBox = null;

        if (this.state.agencyError) {
            subTierAgencyClass = ' error usa-da-form-icon';
        }

        if (this.state.showUploadFilesBox) {
            uploadFilesBox = (<UploadDetachedFilesBox
                {...this.state}
                submission={this.props.submission}
                uploadFile={this.uploadFile.bind(this)} />);
        }

        let errorMessage = null;

        if (this.state.detachedAward.error.show) {
            errorMessage = <UploadDetachedFilesError error={this.state.detachedAward.error} />;
        }

        return (
            <div>
                <div className="usa-da-content-teal">
                    <div className="container">
                        <div className="row usa-da-page-title">
                            <div className="col-md-10 mt-40 mb-20">
                                <div className="display-2">
                                    Upload FABS Data
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <Banner type="fabs" />
                <div className="container center-block">
                    <div className="row usa-da-select-agency">
                        <div className="col-lg-offset-2 col-lg-8 mt-60 mb-60">
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
                                                onSelect={this.handleChange.bind(this)}
                                                customClass={subTierAgencyClass}
                                                internalValue={['agency_code']} />
                                            <div className={"usa-da-icon usa-da-form-icon" + subTierAgencyClass}>
                                                <Icons.Building />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <ReactCSSTransitionGroup
                                    transitionName="usa-da-meta-fade"
                                    transitionEnterTimeout={600}
                                    transitionLeaveTimeout={200}>
                                    {uploadFilesBox}
                                </ReactCSSTransitionGroup>
                                {errorMessage}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

UploadDetachedFileMeta.propTypes = propTypes;
UploadDetachedFileMeta.defaultProps = defaultProps;
