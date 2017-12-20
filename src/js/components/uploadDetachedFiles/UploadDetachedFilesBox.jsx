/**
* UploadDetachedFilesBox.jsx
* Created by Michael Hess
*/

import React, { PropTypes } from 'react';
import FileComponent from '../addData/FileComponent';
import LoadingBauble from '../SharedComponents/overlays/LoadingBauble';

const propTypes = {
    uploadFile: PropTypes.func,
    detachedAward: PropTypes.object,
    submission: PropTypes.object
};

const defaultProps = {
    uploadFile: () => {},
    detachedAward: {},
    submission: {}
};

export default class UploadDetachedFilesBox extends React.Component {
    uploadFile(file) {
        this.props.uploadFile(file);
    }

    render() {
        let d2Text = "Upload FABS File";
        let loadingD2 = null;
        if (this.props.detachedAward.status === "uploading") {
            d2Text = "Uploading";
            loadingD2 = <LoadingBauble />;
        }

        const fileStateReady = this.props.submission.files && this.props.submission.files.detached_award &&
            this.props.submission.files.detached_award.state === 'ready';
        const disabled = !fileStateReady || (this.props.detachedAward.status === "uploading");
        return (
            <div className="usa-da-upload-detached-files-box dashed-border-top">
                <FileComponent
                    fileTitle="Financial Assistance Broker Submission (FABS) File"
                    fileTemplateName="award.csv"
                    requestName="detached_award" />
                <div className="right-align-box">
                    <button
                        className="usa-da-button btn-default"
                        disabled={disabled}
                        onClick={this.props.uploadFile.bind(this, "award")}>
                        {loadingD2}{d2Text}
                    </button>
                </div>
            </div>
        );
    }
}

UploadDetachedFilesBox.propTypes = propTypes;
UploadDetachedFilesBox.defaultProps = defaultProps;
