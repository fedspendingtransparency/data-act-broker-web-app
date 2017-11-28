/**
* AddDataContent.jsx
* Created by Kyle Fox 2/19/16
*/

import React, { PropTypes } from 'react';
import SubmissionComponent from './SubmissionComponent.jsx';
import SubmitButton from '../SharedComponents/SubmitButton.jsx';
import * as Icons from '../../components/SharedComponents/icons/Icons.jsx';
import * as ReviewHelper from '../../helpers/reviewHelper.js';

const propTypes = {
    performUpload: PropTypes.func,
    metaData: PropTypes.object,
    submission: PropTypes.object,
    fileTypes: PropTypes.array
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

    componentWillUnmount() {
        if ((this.props.submission.state === 'uploading' || this.props.submission.state === 'failed') &&
            this.props.submission.id !== null) {
            ReviewHelper.failUpload(this.props.submission.id);
        }
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
            subID = 'Review Submission: ' + this.state.submissionID;
            subLink = '#/validateData/' + this.state.submissionID;
        }

        let actionArea = "";
        const submissionState = this.props.submission.state;
        if (submissionState === 'ready' || submissionState === 'failed') {
            actionArea = (<SubmitButton onClick={this.startUpload.bind(this)}
                className="usa-da-button-bigger btn-primary" buttonText="Upload & Validate files"
                testId="upload" buttonDisabled={false} />);
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
                        <span className="usa-da-icon error-icon"><Icons.ExclamationCircle /></span>
                        <div className="alert-header-text">Your upload has failed</div>
                        <p>Please try again. If the problem persists, contact the service desk.</p>
                    </div>
                </div>
            );
        }
        else if (this.state.upload) {
            warning = (
                <div className="container short">
                    <div className="alert alert-error text-left" role="alert">
                        <span className="usa-da-icon error-icon"><Icons.ExclamationCircle /></span>
                        <div className="alert-header-text">Your files are uploading</div>
                        <p>
                            Please stay on this page until they're complete or your submission may not be created
                            properly.
                        </p>
                    </div>
                </div>
            );
        }


        return (
            <div>
                {warning}
                <div className="container center-block">
                    <div className="row">
                        <SubmissionComponent files={this.props.fileTypes} />
                    </div>
                    <div className="row text-center">
                        <div className="col-md-offset-3 col-md-6">
                            {actionArea}
                            {
                                this.state.submissionID !== 0 ?
                                    <a className="usa-da-submit-review" href={subLink}>
                                        {subID}
                                    </a>
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
