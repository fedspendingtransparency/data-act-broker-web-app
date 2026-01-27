/**
* UploadFabsFileBox.jsx
* Created by Michael Hess
*/

import PropTypes from 'prop-types';
import FileComponent from '../addData/FileComponent';
import LoadingBauble from '../SharedComponents/overlays/LoadingBauble';
import { validUploadFileChecker } from '../../helpers/util';

const propTypes = {
    uploadFile: PropTypes.func,
    fabs: PropTypes.object,
    submission: PropTypes.object
};

const UploadFabsFileBox = ({uploadFile = () => {}, fabs = {}, submission = {}}) => {
    const clickedUpload = () => {
        uploadFile();
    };

    let d2Text = "Upload FABS File";
    let loadingD2 = null;
    if (fabs.status === "uploading") {
        d2Text = "Uploading";
        loadingD2 = <LoadingBauble />;
    }

    const fileStateReady = submission.files && submission.files.fabs && submission.files.fabs.state === 'ready' &&
        validUploadFileChecker(submission.files.fabs);
    const disabled = !fileStateReady || (fabs.status === "uploading");
    return (
        <div className="usa-da-upload-fabs-file-box dashed-border-top">
            <FileComponent
                fileTitle="Financial Assistance Broker Submission (FABS) File"
                requestName="fabs" />
            <div className="right-align-box">
                <button
                    className="usa-da-button btn-default"
                    disabled={disabled}
                    onClick={clickedUpload}>
                    {loadingD2}{d2Text}
                </button>
            </div>
        </div>
    );
};

UploadFabsFileBox.propTypes = propTypes;
export default UploadFabsFileBox;
