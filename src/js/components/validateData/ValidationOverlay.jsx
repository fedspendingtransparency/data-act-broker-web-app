/**
 * ValidationOverlay.jsx
 * Created by Kevin Li 3/31/2016
 */

import PropTypes from 'prop-types';
import RevalidateContainer from 'containers/SharedContainers/RevalidateContainer';
import * as Icons from '../SharedComponents/icons/Icons';
import CommonOverlay from '../SharedComponents/overlays/CommonOverlay';
import NextButton from '../submission/NextButton';
import { checkValidFileList } from '../../helpers/util';

const propTypes = {
    uploadFiles: PropTypes.func,
    uploadApiCallError: PropTypes.string,
    submission: PropTypes.object,
    errors: PropTypes.array,
    warnings: PropTypes.array,
    allowUpload: PropTypes.bool,
    notAllowed: PropTypes.bool,
    submissionID: PropTypes.string
};

const ValidationOverlay = ({
    allowUpload = false,
    uploadApiCallError = '',
    uploadFiles = () => {},
    submission = {},
    errors = [],
    warnings = [],
    notAllowed = false,
    ...props
}) => {
    const isUploadingFiles = () => {
        return (Object.keys(submission.files).length > 0);
    };

    let icon = <Icons.ExclamationCircle />;
    let iconClass = 'usa-da-errorRed';
    let uploadButtonClass = '-disabled';
    let uploadButtonDisabled = true;
    let nextButtonClass = ' hide';
    let nextButtonDisabled = true;
    let revalidateButtonDisabled = false;
    if (allowUpload) {
        uploadButtonDisabled = false;
        uploadButtonClass = ' btn-primary';
    }

    let header = `You must fix the Critical Errors found in ${errors.length} of the files before moving on to the ` +
        `next step. View and download individual reports above.`;
    let detail = '';

    if (errors.length === 0) {
        icon = <Icons.CheckCircle />;
        iconClass = 'usa-da-successGreen';
        header = 'No Critical Errors were found in the files. Click Next to generate your D1 and D2 files.';
        uploadButtonDisabled = true;
        uploadButtonClass = '-disabled';
        nextButtonClass = ' btn-primary';
        nextButtonDisabled = false;

        if (warnings.length > 0) {
            // there are warnings
            icon = <Icons.ExclamationCircle />;
            iconClass = 'usa-da-warningYellow';
            header = `There are warnings in ${warnings.length} of the files uploaded in this submission.`;
            detail = 'You can correct the files or click Next to generate your D1 and D2 files as-is.';
        }

        if (isUploadingFiles()) {
            uploadButtonDisabled = false;
            uploadButtonClass = ' btn-primary';
            nextButtonClass = '-disabled';
            nextButtonDisabled = true;
        }
    }

    let buttonText = 'Upload Corrected Files';
    if (submission.state === 'uploading') {
        uploadButtonDisabled = true;
        uploadButtonClass = '-disabled';
        revalidateButtonDisabled = true;
        buttonText = 'Uploading files...';

        if (errors.length === 0) {
            nextButtonClass = '-disabled';
            nextButtonDisabled = true;
        }
    }
    else if (submission.state === 'prepare') {
        uploadButtonDisabled = true;
        uploadButtonClass = '-disabled';
        buttonText = 'Gathering data...';

        if (errors.length === 0) {
            nextButtonClass = '-disabled';
            nextButtonDisabled = true;
        }
    }
    else if (!checkValidFileList(submission.files)) {
        uploadButtonDisabled = true;
        uploadButtonClass = '-disabled';
        buttonText = 'Invalid File Types';

        nextButtonClass = '-disabled';
        nextButtonDisabled = true;
    }

    if (notAllowed) {
        header = "You are not authorized to perform the requested task. Please contact your administrator.";
        icon = <Icons.ExclamationCircle />;
        iconClass = 'usa-da-errorRed';
    }

    if (uploadApiCallError) {
        header = uploadApiCallError;
    }

    return (
        <CommonOverlay
            header={header}
            detail={detail}
            icon={icon}
            iconClass={iconClass}>
            <div className="usa-da-btn-bg">
                <RevalidateContainer disabled={revalidateButtonDisabled} refreshPage />
                <button
                    className={`usa-da-button${uploadButtonClass}`}
                    disabled={uploadButtonDisabled}
                    onClick={uploadFiles}
                    data-testid="validate-overlay-upload-button">
                    {buttonText}
                </button>
                <NextButton
                    disabled={nextButtonDisabled}
                    nextButtonClass={nextButtonClass}
                    submissionID={props.submissionID}
                    step="generateFiles" />
            </div>
        </CommonOverlay>
    );
};

ValidationOverlay.propTypes = propTypes;
export default ValidationOverlay;
