/**
* UploadFabsFileBox.jsx
* Created by Michael Hess
*/

import React from 'react';
import PropTypes from 'prop-types';
import FileComponent from '../addData/FileComponent';
import LoadingBauble from '../SharedComponents/overlays/LoadingBauble';

const propTypes = {
    uploadFile: PropTypes.func,
    fabs: PropTypes.object,
    submission: PropTypes.object
};

const defaultProps = {
    uploadFile: () => {},
    fabs: {},
    submission: {}
};

export default class UploadFabsFileBox extends React.Component {
    uploadFile(file) {
        this.props.uploadFile(file);
    }

    render() {
        let d2Text = "Upload FABS File";
        let loadingD2 = null;
        if (this.props.fabs.status === "uploading") {
            d2Text = "Uploading";
            loadingD2 = <LoadingBauble />;
        }

        const fileStateReady = this.props.submission.files && this.props.submission.files.fabs &&
            this.props.submission.files.fabs.state === 'ready';
        const disabled = !fileStateReady || (this.props.fabs.status === "uploading");
        return (
            <div className="usa-da-upload-fabs-file-box dashed-border-top">
                <FileComponent
                    fileTitle="Financial Assistance Broker Submission (FABS) File"
                    requestName="fabs" />
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

UploadFabsFileBox.propTypes = propTypes;
UploadFabsFileBox.defaultProps = defaultProps;
