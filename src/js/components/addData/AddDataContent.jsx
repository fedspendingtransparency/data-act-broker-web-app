/**
* AddDataContent.jsx
* Created by Kyle Fox 2/19/16
*/

import React from 'react';
import { Link } from 'react-router';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import SubmissionComponent from './SubmissionComponent';
import SubmitButton from '../SharedComponents/SubmitButton';

const propTypes = {
    performUpload: PropTypes.func,
    metaData: PropTypes.object,
    submission: PropTypes.object,
    fileTypes: PropTypes.array,
    errorMessage: PropTypes.string
};

const defaultProps = {
    performUpload: null,
    metaData: null,
    submission: null,
    fileTypes: [],
    errorMessage: null
};

export default class AddDataContent extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            fileHolder: [],
            submissionID: 0,
            progress: 0,
            upload: false
        };
    }

    startUpload() {
        this.setState({ upload: true });
        this.props.performUpload();
    }

    render() {
    // TODO: Remove this when this is eventually tied to user accounts
        let subID = null;
        let subLink = null;
        if (this.state.submissionID !== 0) {
            subID = `Review Submission: ${this.state.submissionID}`;
            subLink = `/submission/${this.state.submissionID}/validateData`;
        }

        let actionArea = '';
        const submissionState = this.props.submission.state;
        if (submissionState === 'ready' || submissionState === 'failed') {
            actionArea = (<SubmitButton
                onClick={this.startUpload.bind(this)}
                className="usa-da-button-bigger btn-primary"
                buttonText="Upload & Validate files"
                testId="upload"
                buttonDisabled={false} />);
        }
        else if (submissionState === 'uploading') {
            actionArea = <SubmitButton className="usa-da-button-bigger" buttonText="Uploading files..." />;
        }
        else {
            actionArea = <SubmitButton className="usa-da-button-bigger" buttonText="Upload & Validate files" />;
        }

        let warning = null;

        if (this.props.submission.state === 'failed') {
            warning = (
                <div className="container short">
                    <div className="alert alert-error text-left" role="alert">
                        <div className="usa-da-icon error-icon">
                            <FontAwesomeIcon icon="circle-exclamation" />
                        </div>
                        <div className="alert-text">
                            <div className="alert-header-text">Your upload has failed</div>
                            <p>
                                {
                                    this.props.errorMessage ||
                                'Please try again. If the problem persists, contact the service desk.'
                                }
                            </p>
                        </div>
                    </div>
                </div>
            );
        }
        else if (this.state.upload) {
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
                {warning}
                <div className="container center-block">
                    <div className="row">
                        <SubmissionComponent {...this.props} files={this.props.fileTypes} />
                    </div>
                    <div className="row text-center">
                        <div className="col-md-offset-3 col-md-6">
                            {actionArea}
                            {
                                this.state.submissionID !== 0 ?
                                    <Link className="usa-da-submit-review" to={subLink}>
                                        {subID}
                                    </Link>
                                    : null
                            }
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

AddDataContent.propTypes = propTypes;
AddDataContent.defaultProps = defaultProps;
