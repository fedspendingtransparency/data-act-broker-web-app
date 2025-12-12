/**
 * ValidateDataFileComponent.jsx
 * Created by Mike Bray 3/28/16
 */

import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { validUploadFileChecker, createOnKeyDownHandler, convertToLocalDate } from 'helpers/util';
import * as GenerateFilesHelper from 'helpers/generateFilesHelper';
import FileProgress from 'components/SharedComponents/FileProgress';
import ProgressBar from 'components/SharedComponents/ProgressBar';
import * as PermissionsHelper from 'helpers/permissionsHelper';
import ValidateDataErrorReport from './ValidateDataErrorReport';
import ValidateDataUploadButton from './ValidateDataUploadButton';
import UploadFabsFileError from '../uploadFabsFile/UploadFabsFileError';


const propTypes = {
    onFileChange: PropTypes.func,
    item: PropTypes.object,
    session: PropTypes.object,
    submission: PropTypes.object,
    type: PropTypes.object,
    agencyName: PropTypes.string,
    publishing: PropTypes.bool,
    progress: PropTypes.number,
    fileName: PropTypes.string
};

const ValidateDataFileComponent = ({
    onFileChange = () => {},
    item = {},
    session = {},
    submission = {},
    type = {},
    agencyName = '',
    publishing = false,
    progress = 0,
    fileName = ''
}) => {
    const [showError, setShowError] = useState(false);
    const [headerTitle, setHeaderTitle] = useState(<ProgressBar progress={progress} fileName={fileName} />);
    const [errorReports, setErrorReports] = useState([]);
    const [hasErrorReport, setHasErrorReport] = useState(false);
    const [isError, setIsError] = useState(false);
    const [signedUrl, setSignedUrl] = useState('');
    const [signInProgress, setSignInProgress] = useState(false);
    const [error, setError] = useState(null);
    const [canDownload, setCanDownload] = useState(false);

    useEffect(() => {
        determineErrors();
    }, []);

    useEffect(() => {
        determineErrors();
    }, [item, progress]);

    useEffect(() => {
        if (submission.state === 'review' && showError) {
            clearError();
        }
    }, [submission.state]);

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

    const toggleErrorReport = () => {
        setShowError(!showError);
    };

    const isFileReady = () => {
        return (item.job_status === 'finished' || item.job_status === 'invalid');
    };

    const isReplacingFile = () => {
        // check if the user is trying to replace a file
        return (Object.prototype.hasOwnProperty.call(submission.files, type.requestName));
    };

    const clearError = () => {
        setShowError(false);
    };

    const determineErrors = () => {
        if (!item) {
            return;
        }

        let tmpHeaderTitle = <ProgressBar progress={progress} fileName={fileName} />;
        let tmpIsError = false;
        let tmpHasErrorReport = false;
        let tmpCanDownload = false;
        let errorData = [];

        // handle header errors
        const missingHeaders = item.missing_headers ? item.missing_headers.length : 0;
        const duplicatedHeaders = item.duplicated_headers ? item.duplicated_headers.length : 0;
        if (missingHeaders > 0 || duplicatedHeaders > 0) {
            let errorKeys = [];
            tmpIsError = true;
            tmpCanDownload = true;
            tmpHasErrorReport = true;
            if (missingHeaders > 0 && duplicatedHeaders > 0) {
                tmpHeaderTitle = 'Critical Errors: Missing fields in header row & duplicate fields in header row';
                errorKeys = ["missing_headers", "duplicated_headers"];
            }
            else if (missingHeaders > 0) {
                tmpHeaderTitle = 'Critical Error: Missing fields in header row';
                errorKeys = ["missing_headers"];
            }
            else {
                tmpHeaderTitle = 'Critical Error: Duplicate fields in header row';
                errorKeys = ["duplicated_headers"];
            }
            errorKeys.forEach((key) => {
                errorData.push({
                    header: (key === 'missing_headers') ? 'Missing Headers:' : 'Duplicate Headers:',
                    data: item[key]
                });
            });
        }
        else if (item.error_type === 'header_errors') {
            // special case where the header rows could not be read
            tmpHeaderTitle = 'Critical Error: The header row could not be parsed.';
            tmpIsError = true;
            tmpCanDownload = true;
        }

        // handle file-level errors
        if (item.file_status !== 'complete') {
            tmpHasErrorReport = item.file_status === 'header_error';
            tmpIsError = true;
            tmpCanDownload = true;

            switch (item.file_status) {
                case 'single_row_error':
                    tmpHeaderTitle = 'Critical Error: File must have a header row and at least one record';
                    break;
                case 'encoding_error':
                    tmpHeaderTitle = 'Critical Error: File contains invalid characters that could not be parsed';
                    break;
                case 'row_count_error':
                    tmpHeaderTitle = 'Critical Error: Raw file row count does not match the number of rows validated';
                    break;
                case 'file_type_error':
                    tmpHeaderTitle = 'Critical Error: Invalid file type. Valid file types include .csv and .txt';
                    tmpCanDownload = false;
                    break;
                case 'unknown_error':
                    tmpIsError = false;
                    break;
                default:
                    break;
            }
        }

        // handle failed job
        if (item.job_status === 'failed' || item.file_status === 'job_error' ||
            (item.job_status === 'invalid' && !tmpIsError)) {
            tmpHeaderTitle = 'An error occurred while validating this file. Contact the Service Desk for assistance.';
            errorData = [];
            tmpHasErrorReport = false;
            tmpCanDownload = true;
            tmpIsError = false;
        }

        // check if file is still validating
        if (item.file_status === 'incomplete' || !isFileReady()) {
            tmpHeaderTitle = <ProgressBar progress={progress} fileName={fileName} />;
            tmpHasErrorReport = false;
            tmpIsError = false;
            tmpCanDownload = false;
        }

        if (publishing) {
            tmpHeaderTitle = 'Publishing...';
        }

        setHeaderTitle(tmpHeaderTitle);
        setErrorReports(errorData);
        setHasErrorReport(tmpHasErrorReport);
        setIsError(tmpIsError);
        setCanDownload(tmpCanDownload);
    };

    const displayFileMeta = () => {
        let size = '--';
        let rows = 0;

        if (isFileReady()) {
            if (item.number_of_rows) {
                rows = item.number_of_rows;
            }
            if (item.file_size) {
                size = `${(item.file_size / 1000000).toFixed(2)} MB`;
                if (item.file_size < 100000) {
                    size = `${(item.file_size / 1000).toFixed(2)} KB`;
                }
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
        let icon = '';
        if (isReplacingFile()) {
            // user is attempting to replace a file
            icon = <FontAwesomeIcon icon="cloud-arrow-up" className="cloud-upload-icon" />;
        }
        else if (isFileReady()) {
            if (item.file_status === 'complete') {
                icon = <FontAwesomeIcon icon="circle-check" className="check-circle-icon" />;
            }
            else {
                icon = <FontAwesomeIcon icon="circle-exclamation" className="exclamation-circle-icon" />;
            }
        }
        return icon;
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
        if (canDownload && !signInProgress) {
            // check if the link is already signed
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

    const onKeyDownHandler = createOnKeyDownHandler(toggleErrorReport);

    let disabledCorrect = '';
    let isFileValid = 'unset';
    let messageClass = ' usa-da-validate-item-message';
    if (!isError && isFileReady()) {
        messageClass = '';
        disabledCorrect = ' hide';
    }
    else if (!isFileReady()) {
        messageClass = '';
        disabledCorrect = ' hide';
    }

    let showFooter = ' hide';
    if (hasErrorReport) {
        showFooter = '';
    }

    let chevronDirection = <FontAwesomeIcon icon="angle-down" />;
    if (showError) {
        chevronDirection = <FontAwesomeIcon icon="angle-up" className="angle-up-icon" />;
    }

    let footerStatus = '';
    if (showError) {
        footerStatus = 'active';
    }

    // override this data if a new file is dropped in
    let uploadProgress = '';
    let tmpFileName = item.filename;

    const clickDownloadOnKeyDownHandler = createOnKeyDownHandler(clickedReport);
    const clickDownloadClass = canDownload ? 'file-download' : '';


    if (isReplacingFile()) {
        // also display the new file name
        const newFile = submission.files[type.requestName];

        isFileValid = validUploadFileChecker(newFile);
        tmpFileName = newFile.file.name;

        if (newFile.state === 'uploading') {
            uploadProgress = <FileProgress fileStatus={newFile.progress} />;
        }
    }

    if (type.requestName === 'fabs') {
        if (!PermissionsHelper.checkFabsAgencyPermissions(session, agencyName)) {
            disabledCorrect = ' hide';
        }
    }
    else if (!PermissionsHelper.checkAgencyPermissions(session, agencyName)) {
        disabledCorrect = ' hide';
    }

    let downloadClick = (
        <div
            role="button"
            tabIndex={0}
            className={clickDownloadClass}
            onKeyDown={clickDownloadOnKeyDownHandler}
            onClick={clickedReport}
            download={tmpFileName}
            rel="noopener noreferrer"
            aria-label="Uploaded File">
            {tmpFileName}
        </div>
    );
    const blockedStatuses = ['reverting', 'publishing'];
    if (blockedStatuses.indexOf(submission.publishStatus) > -1) {
        disabledCorrect = ' hide';
        downloadClick = <div>{tmpFileName}</div>;
    }

    const errorMessage = error ? (<UploadFabsFileError error={error} />) : null;

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
                        <div className="row usa-da-validate-item-body">
                            <div
                                className={`col-md-12 usa-da-validate-txt-wrap${messageClass}`}
                                data-testid="validate-message">
                                {isFileValid ? headerTitle : `${tmpFileName} must be CSV or TXT format`}
                            </div>
                        </div>
                        <div className="row usa-da-validate-item-footer-wrapper">
                            <div
                                role="button"
                                tabIndex={0}
                                className={`usa-da-validate-item-footer usa-da-header-error${showFooter} ${
                                    footerStatus}`}
                                onKeyDown={onKeyDownHandler}
                                onClick={toggleErrorReport}>
                                <div>View &amp; Download Header Error Report
                                    <span className="usa-da-icon">{chevronDirection}</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="col-md-3 file-container">
                        <div className="usa-da-validate-item-file-section">
                            <div className="usa-da-validate-item-file-section-result">
                                <div
                                    className="usa-da-icon"
                                    data-testid="validate-icon">
                                    {isFileValid ?
                                        displayIcon() : (
                                            <FontAwesomeIcon
                                                icon="circle-exclamation"
                                                className="exclamation-circle-icon" />)}
                                </div>
                            </div>
                            {uploadProgress}
                            <div className="row usa-da-validate-item-file-name">
                                {downloadClick}
                            </div>
                            {isFileValid ? '' : `${tmpFileName} must be CSV or TXT format`}
                            <div
                                className={`
                                    usa-da-validate-item-file-section-correct-button
                                    ${isFileValid ? disabledCorrect : ''}
                                    `}
                                data-testid="validate-upload">
                                <div className="row">
                                    <div className="col-md-12">
                                        <ValidateDataUploadButton onDrop={onFileChange} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {showError ? <ValidateDataErrorReport
                    submissionId={submission.id}
                    publishStatus={submission.publishStatus}
                    type={item.file_type}
                    data={errorReports} /> : null}
            </div>
        </div>
    );
};

ValidateDataFileComponent.propTypes = propTypes;
export default ValidateDataFileComponent;
