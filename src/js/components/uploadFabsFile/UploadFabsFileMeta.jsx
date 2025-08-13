/**
* UploadFabsFileMeta.jsx
* Created by Minahm Kim
*/

import { CSSTransition, TransitionGroup } from 'react-transition-group';

import React from 'react';
import PropTypes from 'prop-types';
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

const defaultProps = {
    setSubmissionId: () => {},
    setSubmissionState: () => {},
    validate: () => {},
    submission: {}
};

const timerDuration = 5;

export default class UploadFabsFileMeta extends React.Component {
    constructor(props) {
        super(props);

        this.isUnmounted = false;

        this.state = {
            agency: "",
            agencyError: false,
            showUploadFilesBox: false,
            showSubmissionType: false,
            submissionType: '',
            fabs: {
                error: {
                    show: false,
                    header: '',
                    description: ''
                },
                valid: false,
                status: ""
            },
            jobResults: { fabs: {} },
            notAllowed: false,
            errorMessage: "",
            headerErrors: false,
            validationFinished: false,
            published: false
        };

        this.uploadFile = this.uploadFile.bind(this);
        this.handleSubmissionTypeChange = this.handleSubmissionTypeChange.bind(this);
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
            showSubmissionType: isValid,
            showUploadFilesBox: isValid && this.state.submissionType !== ''
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

    uploadFile() {
        // upload specified file
        this.props.setSubmissionState('uploading');
        const submission = this.props.submission;
        submission.meta.subTierAgency = this.state.agency;
        submission.meta.testSubmission = this.state.submissionType === 'test';

        UploadHelper.performFabsFileUpload(submission)
            .then((res) => {
                const submissionID = res.data.submission_id;
                this.props.setSubmissionId(submissionID);
                this.checkFileStatus(submissionID);
                this.props.validate(submissionID);
            })
            .catch((err) => {
                const errorMessage = err.response.data.message || err.message || '';
                this.setState({
                    notAllowed: err.httpStatus === 403,
                    errorMessage,
                    fabs: {
                        error: {
                            show: true,
                            header: 'Upload Error',
                            description: errorMessage
                        }
                    }
                });
            });
    }

    checkFileStatus(submissionID) {
        // callback to check file status
        ReviewHelper.fetchSubmissionData(submissionID)
            .then((response) => {
                if (this.isUnmounted) {
                    return;
                }
                this.setState({
                    showUploadFilesBox: false,
                    jobResults: { fabs: response.data.jobs[0] }
                }, () => {
                    this.parseJobStates(response.data);
                });
            })
            .catch((err) => {
                if (err.status === 400) {
                    this.setState({ error: 2, submit: false });
                }
            });
    }

    validateSubmission(submissionID) {
        ReviewHelper.validateFabsSubmission(submissionID)
            .then((res) => {
                const fileStates = ReviewHelper.getFileStates(res.data);
                this.setState({
                    fabs: fileStates.item,
                    validationFinished: true,
                    headerErrors: false,
                    jobResults: fileStates
                });
            });
    }

    parseJobStates(data) {
        let runCheck = true;

        if (data.jobs[0].job_status === 'failed' || data.jobs[0].job_status === 'invalid') {
            // don't run the check again if it failed
            runCheck = false;

            // make a clone of the file's react state
            const item = Object.assign({}, this.state.fabs);
            item.status = "failed";

            if (data.jobs[0].error_type === "header_errors") {
                this.setState({
                    fabs: item,
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
            const item = Object.assign({}, this.state.fabs);
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

    handleSubmissionTypeChange(submissionType) {
        this.setState({
            submissionType,
            showUploadFilesBox: true
        }, this.checkComplete);
    }

    // ERRORS
    // 1: Submission is already published
    // 2: Fetching file metadata failed
    // 3: File already has been submitted in another submission

    render() {
        let subTierAgencyClass = '';
        if (this.state.agencyError) {
            subTierAgencyClass = ' error usa-da-form-icon';
        }

        let errorMessage = null;
        if (this.state.fabs.error.show) {
            errorMessage = <UploadFabsFileError error={this.state.fabs.error} />;
        }

        let warning = null;
        if (this.props.submission.state === 'uploading') {
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
                                                onSelect={this.handleChange.bind(this)}
                                                customClass={subTierAgencyClass}
                                                internalValue={['agency_code']} />
                                            <div className={`usa-da-icon usa-da-form-icon${subTierAgencyClass}`}>
                                                <FontAwesomeIcon icon={['far', 'building']} />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                {this.state.showSubmissionType &&
                                <TransitionGroup>
                                    <CSSTransition
                                        classNames="usa-da-meta-fade"
                                        timeout={{ enter: 600, exit: 200 }}
                                        exit>
                                        <SubmissionTypeField
                                            onChange={this.handleSubmissionTypeChange}
                                            value={this.state.submissionType}
                                            isDabs={false}
                                            selectedAgency={this.state.agency} />
                                    </CSSTransition>
                                </TransitionGroup>
                                }

                                {this.state.showUploadFilesBox &&
                                <TransitionGroup>
                                    <CSSTransition
                                        classNames="usa-da-meta-fade"
                                        timeout={{ enter: 600, exit: 200 }}
                                        exit>
                                        <UploadFabsFileBox
                                            {...this.state}
                                            submission={this.props.submission}
                                            uploadFile={this.uploadFile} />
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
    }
}

UploadFabsFileMeta.propTypes = propTypes;
UploadFabsFileMeta.defaultProps = defaultProps;
