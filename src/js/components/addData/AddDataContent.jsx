/**
* AddDataContent.jsx
* Created by Kyle Fox 2/19/16
**/

import React, { PropTypes } from 'react';
import { kGlobalConstants } from '../../GlobalConstants.js';
import SubmissionComponent from './SubmissionComponent.jsx';
import SubmitButton from '../SharedComponents/SubmitButton.jsx';

const propTypes = {
    metaData: PropTypes.object
};

export default class AddDataContent extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            fileHolder: [],
            submissionID: 0,
            progress: 0
        };
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
        if (submissionState == 'ready' || submissionState == 'failed') {
            actionArea = <SubmitButton onClick={this.props.performUpload} className="usa-da-button-bigger btn-primary" buttonText="Upload & Validate CSV files" testId="upload" />;
        }
        else if (submissionState == 'uploading') {
            actionArea = <SubmitButton className="usa-da-button-bigger" buttonText="Uploading files..." buttonDisabled={true} />;
        }
        else {
            actionArea = <SubmitButton className="usa-da-button-bigger" buttonText="Upload & Validate CSV files" buttonDisabled={true} />;
        }

        return (
            <div>
                <div className="container center-block">
                    <div className="row">
                        <SubmissionComponent files={this.props.fileTypes} />
                    </div>
                    <div className="row text-center">
                        <div className="col-md-offset-3 col-md-6">
                            {actionArea}
                            {this.state.submissionID !== 0 ? <a className="usa-da-submit-review" href={subLink}>{subID}</a> : null }
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

AddDataContent.propTypes = propTypes;