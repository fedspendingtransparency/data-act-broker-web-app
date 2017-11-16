/**
 * ValidationOverlay.jsx
 * Created by Kevin Li 3/31/2016
 */

import React from 'react';
import { hashHistory } from 'react-router';
import * as Icons from '../SharedComponents/icons/Icons.jsx';
import CommonOverlay from '../SharedComponents/overlays/CommonOverlay.jsx';

const defaultProps = {
    allowUpload: false
};

export default class ValidationOverlay extends React.Component {
    constructor(props) {
        super(props);
    }

    pressedNext(e) {
        hashHistory.push('/generateFiles/' + this.props.submission.id);
    }

    isUploadingFiles() {
        return (Object.keys(this.props.submission.files).length > 0);
    }

    render() {
        let icon = <Icons.ExclamationCircle />;
        let iconClass = 'usa-da-errorRed';
        let uploadButtonClass = '-disabled';
        let uploadButtonDisabled = true;
        let nextButtonClass = ' hide';
        let nextButtonDisabled = true;
        if (this.props.allowUpload) {
            uploadButtonDisabled = false;
            uploadButtonClass = ' btn-primary';
        }

        let header = 'You must fix the Critical Errors found in ' + this.props.errors.length +
        ' of the files before moving on to the next step. View and download individual reports above.';
        let detail = '';

        if (this.props.errors.length === 0) {
            icon = <Icons.CheckCircle />;
            iconClass = 'usa-da-successGreen';
            header = 'No Critical Errors were found in the files. Click Next to generate your D1 and D2 files.';
            uploadButtonDisabled = true;
            uploadButtonClass = '-disabled';
            nextButtonClass = ' btn-primary';
            nextButtonDisabled = false;

            if (this.props.warnings.length > 0) {
                // there are warnings
                icon = <Icons.ExclamationCircle />;
                iconClass = 'usa-da-warningYellow';
                header = 'There are warnings in ' + this.props.warnings.length +
                ' of the files uploaded in this submission.';
                detail = 'You can correct the files or click Next to generate your D1 and D2 files as-is.';
            }

            if (this.isUploadingFiles()) {
                uploadButtonDisabled = false;
                uploadButtonClass = ' btn-primary';
                nextButtonClass = '-disabled';
                nextButtonDisabled = true;
            }
        }

        let buttonText = 'Upload Corrected Files';
        if (this.props.submission.state === 'uploading') {
            uploadButtonDisabled = true;
            uploadButtonClass = '-disabled';
            buttonText = 'Uploading files...';

            if (this.props.errors.length === 0) {
                nextButtonClass = '-disabled';
                nextButtonDisabled = true;
            }
        }
        else if (this.props.submission.state === 'prepare') {
            uploadButtonDisabled = true;
            uploadButtonDisabled = '-disabled';
            buttonText = 'Gathering data...';

            if (this.props.errors.length === 0) {
                nextButtonClass = '-disabled';
                nextButtonDisabled = true;
            }
        }

        if (this.props.notAllowed) {
            header = "You are not authorized to perform the requested task. Please contact your administrator.";
            icon = <Icons.ExclamationCircle />;
            iconClass = 'usa-da-errorRed';
        }

        return (
            <CommonOverlay
                header={header}
                detail={detail}
                showIcon={true}
                icon={icon}
                iconClass={iconClass}
                showButtons={true}>

                <div className="usa-da-btn-bg">
                    <button className={"usa-da-button" + uploadButtonClass} disabled={uploadButtonDisabled}
                        onClick={this.props.uploadFiles} data-testid="validate-overlay-upload-button">
                        {buttonText}
                    </button>
                    <button className={"usa-da-validation-overlay-review usa-da-button" + nextButtonClass}
                        disabled={nextButtonDisabled} onClick={this.pressedNext.bind(this)}
                        data-testid="validate-overlay-review-button">
                        Next
                    </button>
                </div>

            </CommonOverlay>
        );
    }
}

ValidationOverlay.defaultProps = defaultProps;
