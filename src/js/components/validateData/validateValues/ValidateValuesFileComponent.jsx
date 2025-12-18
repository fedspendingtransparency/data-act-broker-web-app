/**
 * ValidateValuesFileComponent.jsx
 * Created by Kevin Li 4/4/2016
 */

import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as GenerateFilesHelper from 'helpers/generateFilesHelper';
import * as PermissionsHelper from 'helpers/permissionsHelper';
import { createOnKeyDownHandler, convertToLocalDate } from 'helpers/util';
import FileProgress from 'components/SharedComponents/FileProgress';
import ValidateDataUploadButton from './../ValidateDataUploadButton';
import ValidateValuesErrorReport from './ValidateValuesErrorReport';
import FileDetailBox from './ValidateValuesFileDetailBox';
import CorrectButtonOverlay from '../CorrectButtonOverlay';
import UploadFabsFileError from '../../uploadFabsFile/UploadFabsFileError';

const propTypes = {
    onFileChange: PropTypes.func,
    removeFile: PropTypes.func,
    item: PropTypes.object,
    session: PropTypes.object,
    submission: PropTypes.object,
    type: PropTypes.object,
    agencyName: PropTypes.string,
    published: PropTypes.string
};

const warningBaseColors = {
    base: '#fdb81e',
    active: '#ff580a',
    activeBorder: '#cd2026',
    text: '#000000',
    activeText: '#000000'
};
const errorBaseColors = {
    base: '#07648d',
    active: '#02bfe7',
    activeBorder: '#046b99',
    text: '#FFFFFF',
    activeText: '#000000'
};

const ValidateValuesFileComponent = ({
    onFileChange = () => {},
    removeFile = () => {},
    item = null,
    session = null,
    submission = null,
    type = null,
    agencyName = '',
    published = ''
}) => {
    const [showWarning, setShowWarning] = useState(false);
    const [showError, setShowError] = useState(false);
    const [hasErrors, setHasErrors] = useState(false);
    const [hasWarnings, setHasWarnings] = useState(false);
    const [signedUrl, setSignedUrl] = useState('');
    const [signInProgress, setSignInProgress] = useState(false);
    const [error, setError] = useState(null);
    const [permission, setPermission] = useState(false);

    useEffect(() => {
        determineErrors();
        setUserPermission();
    }, []);

    useEffect(() => {
        determineErrors();
    }, [item]);

    useEffect(() => {
        setUserPermission(item);
    }, [type.requestName]);

    useEffect(() => {
        if (signedUrl) {
            openReport();
        }
    }, [signedUrl]);

    useEffect(() => {
        if (signInProgress) {
            signReport();
        }
    }, [signInProgress]);

    const setUserPermission = () => {
        let permission;
        if (type.requestName === 'fabs') {
            permission = PermissionsHelper.checkFabsAgencyPermissions(session, agencyName);
        }
        else {
            permission = PermissionsHelper.checkAgencyPermissions(session, agencyName);
        }
        setPermission(permission);
    };

    const toggleWarningReport = () => {
        setShowWarning(!showWarning);
        setShowError(false);
    };

    const toggleErrorReport = () => {
        setShowError(!showError);
        setShowWarning(false);
    };

    const isReplacingFile = () => {
        // check if the user is trying to replace a file
        let stagedFile = false;

        if (Object.prototype.hasOwnProperty.call(submission.files, type.requestName)) {
            stagedFile = true;
        }
        return stagedFile;
    };

    const signReport = () => {
        let type = null;
        switch (item.file_type) {
            case 'appropriations':
                type = 'A';
                break;
            case 'program_activity':
                type = 'B';
                break;
            case 'award_financial':
                type = 'C';
                break;
            case 'fabs':
                type = 'FABS';
                break;
            default:
                break;
        }
        if (type) {
            GenerateFilesHelper.fetchFile(type, submission.id)
                .then((result) => {
                    setSignInProgress(false);
                    setSignedUrl(result.data.url);
                })
                .catch(() => {
                    setSignInProgress(false);
                    setError({
                        header: `Invalid File Type Selected ${item.file_type}`,
                        body: ''
                    });
                });
        }
        else {
            setSignInProgress(false);
            setError({
                header: `Invalid File Type Selected ${item.file_type}`,
                body: ''
            });
        }
    };

    const openReport = () => {
        window.open(signedUrl);
    };

    const clickedReport = () => {
        // if it's not already signing the link, check whether it's already signed
        if (!signInProgress) {
            if (signedUrl !== '') {
            // it is signed, open immediately
                openReport();
            }
            else {
                // not signed yet, sign
                setSignInProgress(true);
            }
        }
    };

    const determineErrors = () => {
        if (!item) {
            return;
        }
        setHasErrors(item.error_data.length > 0);
        setHasWarnings(item.warning_data.length > 0);
    };

    const displayFileMeta = () => {
        let size = '--';
        const rows = item.number_of_rows ? item.number_of_rows : 0;

        if (item.file_size) {
            size = `${(item.file_size / 1000000).toFixed(2)} MB`;
            if (item.file_size < 100000) {
                size = `${(item.file_size / 1000).toFixed(2)} KB`;
            }
        }

        const lastValidated = convertToLocalDate(item.last_validated, true, '/');

        return {
            size,
            rows,
            lastValidated
        };
    };

    const displayIcon = () => {
        let icon = <FontAwesomeIcon icon="circle-check" className="check-circle-icon" />;
        if (isReplacingFile()) {
            icon = <FontAwesomeIcon icon="cloud-arrow-up" className="cloud-upload-icon" />;
        }
        else if (hasErrors) {
            icon = <FontAwesomeIcon icon="circle-exclamation" className="exclamation-circle-icon" />;
        }
        else if (hasWarnings) {
            icon = (
                <div className="usa-da-warning-icon">
                    <FontAwesomeIcon icon="circle-exclamation" className="exclamation-circle-icon" />
                </div>
            );
        }
        return icon;
    };

    const onKeyDownHandler = createOnKeyDownHandler(clickedReport);
    // override data if a new file is dropped in
    let uploadProgress = '';
    let fileName = item.filename;
    if (isReplacingFile()) {
        // also display the new file name
        const newFile = submission.files[type.requestName];
        fileName = newFile.file.name;
        if (newFile.state === 'uploading') {
            uploadProgress = <FileProgress fileStatus={newFile.progress} />;
        }
    }

    let buttonOverlay = '';
    let validationElement = '';
    let isOptional = false;
    let uploadText = 'Choose Corrected File';
    const blockedStatuses = ['reverting', 'publishing'];
    if ((published === 'unpublished' || !published) && permission
        && blockedStatuses.indexOf(submission.publishStatus) === -1) {
        // user has permissions and submission is not published (second part only relevant for FABS submissions)
        if (hasErrors) {
            // has errors
            validationElement = (
                <div
                    className="row usa-da-validate-item-file-section-correct-button"
                    data-testid="validate-upload">
                    <div className="col-md-12">
                        <ValidateDataUploadButton
                            optional={isOptional}
                            onDrop={onFileChange}
                            text={uploadText} />
                    </div>
                </div>
            );
        }
        else if (hasWarnings) {
            // has warnings
            isOptional = true;
            uploadText = 'Overwrite File';
            buttonOverlay = (<CorrectButtonOverlay
                isReplacingFile={isReplacingFile()}
                fileKey={type.requestName}
                onDrop={onFileChange}
                removeFile={removeFile}
                fileName={fileName} />);
            validationElement = <p className="usa-da-warning-txt">File validated with warnings</p>;
        }
        else {
            // no errors, no warnings
            isOptional = true;
            uploadText = 'Overwrite File';
            buttonOverlay = (<CorrectButtonOverlay
                isReplacingFile={isReplacingFile()}
                fileKey={type.requestName}
                onDrop={onFileChange}
                removeFile={removeFile}
                fileName={fileName} />);
            validationElement = <p className="usa-da-success-txt">File successfully validated</p>;
        }
    }

    const errorMessage = error ? <UploadFabsFileError error={error} /> : null;
    let warningSection = null;
    let errorSection = null;
    if (showWarning) {
        warningSection = (<ValidateValuesErrorReport
            submissionId={submission.id}
            publishStatus={submission.publishStatus}
            fileType={item.file_type}
            reportType="warning"
            data={item}
            dataKey="warning_data"
            name="Warning"
            colors={warningBaseColors} />);
    }
    if (showError) {
        errorSection = (<ValidateValuesErrorReport
            submissionId={submission.id}
            publishStatus={submission.publishStatus}
            fileType={item.file_type}
            reportType="error"
            data={item}
            dataKey="error_data"
            name="Critical Error"
            colors={errorBaseColors} />);
    }

    let downloadClick = (
        <div
            role="button"
            tabIndex={0}
            className="file-download"
            onKeyDown={onKeyDownHandler}
            onClick={clickedReport}
            download={fileName}
            rel="noopener noreferrer">
            <p className="file-text-header">Original Submitted File:</p>
            {fileName}
        </div>
    );
    if (blockedStatuses.indexOf(submission.publishStatus) > -1) {
        downloadClick = <div>{fileName}</div>;
    }

    const { size, rows, lastValidated } = displayFileMeta();

    return (
        <div
            className="row center-block usa-da-validate-item"
            data-testid={`validate-wrapper-${type.requestName}`}>
            <div className="col-md-12">
                {errorMessage}
                <div className="row usa-da-validate-item-top-section">
                    <div className="col-md-9 usa-da-validate-item-status-section">
                        <div className="row usa-da-validate-item-header">
                            <div className="validate-item-header-half left">
                                <div className="file-title">
                                    <h4>{type.fileTitle}</h4>
                                </div>
                                <div className="last-validated">
                                    <p>Last Validated: {lastValidated}</p>
                                </div>
                            </div>
                            <div className="validate-item-header-half right">
                                <div className="file-size">
                                    <p>File Size: {size}</p>
                                </div>
                                <div className="data-rows">
                                    <p>Data Rows in File (excludes header): {rows}</p>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <FileDetailBox
                                styleClass="usa-da-validate-item-warning"
                                label="Warnings"
                                count={item.warning_count}
                                expandedReport={showWarning}
                                onClick={toggleWarningReport} />
                            <FileDetailBox
                                styleClass="usa-da-validate-item-critical"
                                label="Critical Errors"
                                count={item.error_count}
                                expandedReport={showError}
                                onClick={toggleErrorReport} />
                        </div>
                    </div>

                    <div className="col-md-3 usa-da-validate-item-file-section">
                        {buttonOverlay}
                        <div className="usa-da-validate-item-file-section-result">
                            <div
                                className="usa-da-icon"
                                data-testid="validate-icon">
                                {displayIcon()}
                            </div>
                        </div>
                        <div className="row usa-da-validate-item-file-name">
                            {downloadClick}
                        </div>
                        {uploadProgress}
                        {validationElement}
                    </div>
                </div>
                {warningSection}
                {errorSection}
            </div>
        </div>
    );
};

ValidateValuesFileComponent.propTypes = propTypes;
export default ValidateValuesFileComponent;
