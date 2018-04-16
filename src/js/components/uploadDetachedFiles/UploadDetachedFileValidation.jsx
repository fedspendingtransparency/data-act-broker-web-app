/**
* UploadDetachedFileValidation.jsx
* Created by Minahm Kim
*/

import ReactCSSTransitionGroup from "react-addons-css-transition-group";

import React, { PropTypes } from "react";
import moment from "moment";
import { connect } from "react-redux";

import ValidateValuesFileContainer from "../../containers/validateData/ValidateValuesFileContainer";
import ValidateDataFileContainer from "../../containers/validateData/ValidateDataFileContainer";
import PublishModal from "./PublishModal";
import Banner from "../SharedComponents/Banner";
import UploadDetachedFilesError from "./UploadDetachedFilesError";

import * as UploadHelper from "../../helpers/uploadHelper";
import * as GenerateFilesHelper from "../../helpers/generateFilesHelper";
import * as PermissionsHelper from "../../helpers/permissionsHelper";
import * as ReviewHelper from "../../helpers/reviewHelper";
import { kGlobalConstants } from "../../GlobalConstants";

const propTypes = {
    setSubmissionState: PropTypes.func,
    item: PropTypes.object,
    params: PropTypes.object,
    route: PropTypes.object,
    session: PropTypes.object,
    submission: PropTypes.object
};

const defaultProps = {
    setSubmissionState: () => {},
    item: {},
    params: {},
    route: {},
    session: {},
    submission: {}
};

const timerDuration = 5;

class UploadDetachedFileValidation extends React.Component {
    constructor(props) {
        super(props);

        this.isUnmounted = false;

        this.state = {
            agency: "",
            submissionID: this.props.params.submissionID ? this.props.params.submissionID : 0,
            detachedAward: {
                startDate: null,
                endDate: null,
                error: {
                    show: false,
                    header: "",
                    description: ""
                },
                valid: false,
                status: ""
            },
            cgac_code: "",
            jobResults: { fabs: {} },
            headerErrors: false,
            validationFinished: false,
            error: 0,
            rep_start: "",
            rep_end: "",
            published: "unpublished",
            submit: true,
            showPublish: false,
            modified_date: null,
            type: this.props.route.type,
            showSuccess: false,
            error_message: "",
            fabs_meta: { valid_rows: 0, total_rows: 0, publish_date: null },
            signedUrl: "",
            signInProgress: false
        };
    }

    componentDidMount() {
        this.isUnmounted = false;
        this.checkFileStatus(this.state.submissionID);
    }

    componentWillReceiveProps(nextProps) {
        if (this.state.agency === "" || nextProps.params.submissionID !== this.state.submissionID) {
            this.setState({
                submissionID: nextProps.params.submissionID
            });
            this.checkFileStatus(nextProps.params.submissionID);
        }
    }

    componentWillUnmount() {
        this.isUnmounted = true;
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
        this.setState({
            validationFinished: false,
            published: 'unpublished'
        }, this.revalidate());
    }

    revalidate() {
        ReviewHelper.revalidateSubmission(this.state.submissionID, true)
            .then(() => {
                this.checkFileStatus(this.state.submissionID);
            })
            .catch((error) => {
                let errMsg = "An error occurred while attempting to revalidate the submission. " +
                    "Please contact the Service Desk.";
                if (error.httpStatus === 400 || error.httpStatus === 403) {
                    errMsg = error.message;
                }

                this.setState({
                    error: 4,
                    error_message: errMsg
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
                job.fabs = response.jobs[0];

                let isSuccessful = false;
                if (response.publish_status !== "publishing" && this.dataTimer) {
                    window.clearInterval(this.dataTimer);
                    this.dataTimer = null;
                    isSuccessful = true;
                }
                else if (!this.dataTimer && response.publish_status === "publishing") {
                    this.checkFile(submissionID);
                    return;
                }
                this.setState({
                    jobResults: job,
                    agency: response.agency_name,
                    rep_start: response.reporting_period_start_date,
                    rep_end: response.reporting_period_end_date,
                    cgac_code: response.cgac_code,
                    published: response.publish_status,
                    modified_date: response.last_updated,
                    error: 0,
                    fabs_meta: response.fabs_meta,
                    showSuccess: isSuccessful
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

    checkFile(submissionID) {
        this.dataTimer = window.setInterval(() => {
            if (this.state.published !== "published") {
                this.checkFileStatus(submissionID);
            }
        }, timerDuration * 1000);
    }

    signReport(item) {
        GenerateFilesHelper.getFabsMeta(this.props.submission.id)
            .then((result) => {
                this.setState({
                    signedUrl: result.published_file,
                    signInProgress: false
                }, () => {
                    this.openReport();
                });
            })
            .catch(() => {
                this.setState({
                    error: 1,
                    error_message: "Invalid File Type Selected " + item.file_type,
                    signInProgress: false
                });
            });
    }

    openReport() {
        window.open(this.state.signedUrl);
    }

    clickedReport(item) {
        // check if the link is already signed
        if (this.state.signInProgress) {
            // sign is in progress, do nothing
            return;
        }
        else if (this.state.signedUrl !== "") {
            // it is signed, open immediately
            this.openReport();
        }
        else {
            // not signed yet, sign
            this.setState({
                signInProgress: true
            }, () => {
                this.signReport(item);
            });
        }
    }

    validateSubmission(item) {
        ReviewHelper.validateDetachedSubmission(this.props.params.submissionID)
            .then((response) => {
                this.setState({
                    detachedAward: item,
                    validationFinished: true,
                    headerErrors: false,
                    jobResults: response
                });
            });
    }

    parseJobStates(data) {
        let runCheck = true;

        if (data.jobs[0].job_status === "failed" || data.jobs[0].job_status === "invalid") {
            // don't run the check again if it failed
            runCheck = false;

            // make a clone of the file"s react state
            const item = Object.assign({ }, this.state.detachedAward);
            item.status = "failed";

            if (data.jobs[0].error_type && data.jobs[0].error_type === "header_errors") {
                this.setState({
                    detachedAward: item,
                    validationFinished: true,
                    headerErrors: true
                });
            }
            else {
                this.validateSubmission(item);
            }
        }
        else if (data.jobs[0].job_status === "finished") {
            // don't run the check again if it's done
            runCheck = false;

            // display dowload buttons
            // make a clone of the file's react state
            const item = Object.assign({}, this.state.detachedAward);
            item.status = "done";
            this.validateSubmission(item);
        }

        if (this.isUnmounted) {
            return;
        }

        if (runCheck && !this.isUnmounted) {
            // wait 5 seconds and check the file status again
            window.setTimeout(() => {
                if (this.props.params.submissionID) {
                    this.checkFileStatus(this.props.params.submissionID);
                }
            }, timerDuration * 1000);
        }
    }

    submitFabs() {
        this.setState({ submit: false, published: 'publishing', showPublish: false },
            () => {
                UploadHelper.submitFabs({ submission_id: this.props.submission.id })
                    .then(() => {
                        this.checkFile(this.props.submission.id);
                    })
                    .catch((error) => {
                        if (error.httpStatus === 400) {
                            this.setState({ error: 1, error_message: error.message, published: 'unpublished' });
                        }
                        else if (error.httpStatus === 500) {
                            this.setState({ error: 4, published: 'unpublished' });
                        }
                    });
            }
        );
    }

    // ERRORS
    // 1: Submission is already published
    // 2: Fetching file metadata failed
    // 3: File already has been submitted in another submission

    uploadFileHelper(local, submission) {
        if (local) {
            return UploadHelper.performDetachedLocalCorrectedUpload(submission);
        }
        return UploadHelper.performDetachedFileCorrectedUpload(submission);
    }

    uploadFile(item) {
        if (this.isUnmounted) {
            return;
        }

        // upload specified file
        this.props.setSubmissionState("uploading");
        const submission = this.props.submission;
        submission.files.fabs = this.state.detachedAward;
        submission.files.fabs.file = item;
        submission.sub = this.state.submissionID;
        submission.meta.startDate = this.state.rep_start;
        submission.meta.endDate = this.state.rep_end;
        submission.meta.subTierAgency = this.state.agency;

        // reset file and job status
        const currentResults = this.state.jobResults;
        currentResults.fabs.file_status = "";
        currentResults.fabs.job_status = "";
        this.setState({
            jobResults: currentResults
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
                    notAllowed: err.httpStatus === 403,
                    errorMessage: err.httpStatus === 403 ? err.message : err.body.message
                });
            });
    }

    render() {
        let validationButton = null;
        let revalidateButton = null;
        let downloadButton = null;
        let validationBox = null;
        let headerDate = null;
        let updated = null;

        if (this.state.modified_date) {
            updated = moment.utc(this.state.modified_date).local().format("MM/DD/YYYY h:mm a");
        }

        if (this.state.agency !== "" && this.state.rep_start !== "" && this.state.rep_end !== "") {
            headerDate = (
                <div className="col-md-2 ">
                    <div className="header-box">
                        <span>
                            Agency: {this.state.agency}
                        </span>
                        <br />
                        <span>
                            Last Modified: {updated}
                        </span>
                    </div>
                </div>);
        }

        const type = {
            fileTitle: "Upload",
            requestName: "fabs",
            progress: "0"
        };

        const fileData = this.state.jobResults[type.requestName];
        const status = fileData.job_status;
        let errorMessage = null;
        validationBox = (<ValidateDataFileContainer
            type={type}
            data={this.state.jobResults}
            setUploadItem={this.uploadFile.bind(this)}
            updateItem={this.uploadFile.bind(this)}
            publishing={this.state.published === "publishing"}
            agencyName={this.state.agency} />);
        if (fileData.file_status === "complete" && this.state.validationFinished &&
            this.state.published !== "publishing") {
            if (status !== "invalid" || fileData.file_status === "complete") {
                validationBox = (<ValidateValuesFileContainer
                    type={type}
                    data={this.state.jobResults}
                    setUploadItem={this.uploadFile.bind(this)}
                    updateItem={this.uploadFile.bind(this)}
                    published={this.state.published}
                    agencyName={this.state.agency} />);
            }

            if (this.state.showSuccess) {
                errorMessage = (<UploadDetachedFilesError
                    errorCode={this.state.error}
                    type="success"
                    message={this.state.error_message} />);
            }
            if (this.state.published === "published") {
                // This submission is already published and cannot be republished
                if (this.state.fabs_meta.published_file === null) {
                    validationButton = (
                        <button
                            className="pull-right col-xs-3 us-da-disabled-button"
                            disabled>File Published:
                            <span className="plain">
                                {this.state.fabs_meta.valid_rows} rows published at {this.state.fabs_meta.publish_date}
                            </span>
                        </button>);
                }
                else {
                    downloadButton = (
                        <button
                            className="pull-right col-xs-3 us-da-button"
                            onClick={this.clickedReport.bind(this, this.props.item)}
                            download={this.state.fabs_meta.published_file}
                            rel="noopener noreferrer">File Published:
                            <span className="plain">
                                {this.state.fabs_meta.valid_rows} rows published at {this.state.fabs_meta.publish_date}
                            </span>
                        </button>);
                }
            }
            else if (PermissionsHelper.checkFabsPermissions(this.props.session)) {
                // User has permissions to publish this unpublished submission
                validationButton = (
                    <button
                        className="pull-right col-xs-3 us-da-button"
                        onClick={this.openModal.bind(this)}>
                        Publish
                    </button>);
                revalidateButton = (
                    <button
                        className="pull-right col-xs-3 us-da-button revalidate-button"
                        onClick={this.startRevalidation.bind(this)}>
                        Revalidate
                    </button>);
            }
            else {
                // User does not have permissions to publish
                validationButton = (
                    <button
                        className="pull-right col-xs-3 us-da-disabled-button"
                        disabled>
                        You do not have permissions to publish
                    </button>);
            }
        }

        if (this.state.published === "publishing" && this.state.error !== 0) {
            errorMessage = (<UploadDetachedFilesError
                errorCode={this.state.error}
                type="error"
                message={this.state.error_message} />);
            validationButton = null;
            revalidateButton = (
                <button
                    className="pull-right col-xs-3 us-da-button"
                    onClick={this.startRevalidation.bind(this)}>
                    Revalidate
                </button>);
        }
        else if (this.state.published === "unpublished" && this.state.error !== 0) {
            errorMessage = (<UploadDetachedFilesError
                errorCode={this.state.error}
                type="error"
                message={this.state.error_message} />);
            validationButton = null;
            revalidateButton = null;
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
                            {headerDate}
                        </div>
                    </div>
                </div>
                <Banner type="fabs" />
                <div className="container">
                    <div className="col-xs-12 mt-60 mb-60">
                        <div className="validation-holder">

                            <ReactCSSTransitionGroup
                                transitionName="usa-da-meta-fade"
                                transitionEnterTimeout={600}
                                transitionLeaveTimeout={200}>
                                {validationBox}
                            </ReactCSSTransitionGroup>

                            {errorMessage}

                            <ReactCSSTransitionGroup
                                transitionName="usa-da-meta-fade"
                                transitionEnterTimeout={600}
                                transitionLeaveTimeout={200}>
                                {validationButton}
                                {revalidateButton}
                                {downloadButton}
                            </ReactCSSTransitionGroup>
                        </div>
                    </div>
                </div>
                <PublishModal
                    rows={this.state.fabs_meta}
                    submit={this.submitFabs.bind(this)}
                    submissionID={this.state.submissionID}
                    closeModal={this.closeModal.bind(this)}
                    isOpen={this.state.showPublish}
                    published={this.state.published} />
            </div>
        );
    }
}

UploadDetachedFileValidation.propTypes = propTypes;
UploadDetachedFileValidation.defaultProps = defaultProps;

export default connect(
    (state) => ({ session: state.session })
)(UploadDetachedFileValidation);
