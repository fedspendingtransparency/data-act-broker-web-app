/**
 * ValidateValuesFileComponent.jsx
 * Created by Kevin Li 4/4/2016
 */

import React from 'react';
import PropTypes from 'prop-types';
import { isEqual } from 'lodash';
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

const defaultProps = {
    onFileChange: null,
    removeFile: null,
    item: null,
    session: null,
    submission: null,
    type: null,
    agencyName: "",
    published: ""
};

const warningBaseColors = { base: '#fdb81e', active: '#FF6F00', activeBorder: '#BF360C' };
const errorBaseColors = { base: '#5d87bb', active: '#02bfe7', activeBorder: '#046b99' };

export default class ValidateValuesFileComponent extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            showWarning: false,
            showError: false,
            hasErrors: false,
            hasWarnings: false,
            signedUrl: '',
            signInProgress: false,
            error: null,
            permission: false
        };

        this.clickedReport = this.clickedReport.bind(this);
        this.toggleWarningReport = this.toggleWarningReport.bind(this);
        this.toggleErrorReport = this.toggleErrorReport.bind(this);
    }

    componentDidMount() {
        this.determineErrors(this.props.item);
        this.setPermission();
    }

    componentDidUpdate(prevProps) {
        if (!isEqual(prevProps.item, this.props.item)) {
            this.determineErrors(this.props.item);
        }
        if (!isEqual(prevProps.type.requestName, this.props.type.requestName)) {
            this.setPermission();
        }
    }

    setPermission() {
        let permission;
        if (this.props.type.requestName === 'fabs') {
            permission = PermissionsHelper.checkFabsAgencyPermissions(this.props.session, this.props.agencyName);
        }
        else {
            permission = PermissionsHelper.checkAgencyPermissions(this.props.session, this.props.agencyName);
        }
        this.setState({
            permission
        });
    }

    toggleWarningReport() {
        this.setState({
            showWarning: !this.state.showWarning,
            showError: false
        });
    }

    toggleErrorReport() {
        this.setState({
            showError: !this.state.showError,
            showWarning: false
        });
    }

    isReplacingFile() {
        // check if the user is trying to replace a file
        let stagedFile = false;

        if (Object.prototype.hasOwnProperty.call(this.props.submission.files, this.props.type.requestName)) {
            stagedFile = true;
        }
        return stagedFile;
    }

    signReport(item) {
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
            GenerateFilesHelper.fetchFile(type, this.props.submission.id)
                .then((result) => {
                    this.setState({
                        signInProgress: false,
                        signedUrl: result.url
                    }, () => {
                        this.openReport();
                    });
                })
                .catch(() => {
                    this.setState({
                        signInProgress: false,
                        error: {
                            header: `Invalid File Type Selected ${item.file_type}`,
                            body: ''
                        }
                    });
                });
        }
        else {
            this.setState({
                signInProgress: false,
                error: {
                    header: `Invalid File Type Selected ${item.file_type}`,
                    body: ''
                }
            });
        }
    }

    openReport() {
        window.open(this.state.signedUrl);
    }

    clickedReport() {
        // check if the link is already signed
        if (this.state.signInProgress) {
            // sign is in progress, do nothing

        }
        else if (this.state.signedUrl !== '') {
            // it is signed, open immediately
            this.openReport();
        }
        else {
            // not signed yet, sign
            this.setState({
                signInProgress: true
            }, () => {
                this.signReport(this.props.item);
            });
        }
    }

    determineErrors(item) {
        if (!item) {
            return;
        }
        this.setState({
            hasErrors: item.error_data.length > 0,
            hasWarnings: item.warning_data.length > 0
        });
    }

    displayFileMeta() {
        let size = '--';
        const rows = this.props.item.number_of_rows ? this.props.item.number_of_rows : 0;

        if (this.props.item.file_size) {
            size = `${(this.props.item.file_size / 1000000).toFixed(2)} MB`;
            if (this.props.item.file_size < 100000) {
                size = `${(this.props.item.file_size / 1000).toFixed(2)} KB`;
            }
        }

        const lastValidated = convertToLocalDate(this.props.item.last_validated, true, '/');

        return {
            size,
            rows,
            lastValidated
        };
    }

    displayIcon() {
        let icon = <FontAwesomeIcon icon="check-circle" />;
        if (this.isReplacingFile()) {
            icon = <FontAwesomeIcon icon="cloud-upload-alt" />;
        }
        else if (this.state.hasErrors) {
            icon = <FontAwesomeIcon icon="exclamation-circle" />;
        }
        else if (this.state.hasWarnings) {
            icon = <div className="usa-da-warning-icon">
                <FontAwesomeIcon icon="exclamation-circle" />
            </div>;
        }
        return icon;
    }

    render() {
        // TODO Reduce # of lines inside render before the return, almost 100 lines!
        const onKeyDownHandler = createOnKeyDownHandler(this.clickedReport);
        // override data if a new file is dropped in
        let uploadProgress = '';
        let fileName = this.props.item.filename;
        if (this.isReplacingFile()) {
            // also display the new file name
            const newFile = this.props.submission.files[this.props.type.requestName];
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
        if ((this.props.published === 'unpublished' || !this.props.published) && this.state.permission
            && blockedStatuses.indexOf(this.props.submission.publishStatus) === -1) {
            // user has permissions and submission is not published (second part only relevant for FABS submissions)
            if (this.state.hasErrors) {
                // has errors
                validationElement = (
                    <div
                        className="row usa-da-validate-item-file-section-correct-button"
                        data-testid="validate-upload">
                        <div className="col-md-12">
                            <ValidateDataUploadButton
                                optional={isOptional}
                                onDrop={this.props.onFileChange}
                                text={uploadText} />
                        </div>
                    </div>
                );
            }
            else if (this.state.hasWarnings) {
                // has warnings
                isOptional = true;
                uploadText = 'Overwrite File';
                buttonOverlay = (<CorrectButtonOverlay
                    isReplacingFile={this.isReplacingFile()}
                    fileKey={this.props.type.requestName}
                    onDrop={this.props.onFileChange}
                    removeFile={this.props.removeFile}
                    fileName={fileName} />);
                validationElement = <p className="usa-da-warning-txt">File validated with warnings</p>;
            }
            else {
                // no errors, no warnings
                isOptional = true;
                uploadText = 'Overwrite File';
                buttonOverlay = (<CorrectButtonOverlay
                    isReplacingFile={this.isReplacingFile()}
                    fileKey={this.props.type.requestName}
                    onDrop={this.props.onFileChange}
                    removeFile={this.props.removeFile}
                    fileName={fileName} />);
                validationElement = <p className="usa-da-success-txt">File successfully validated</p>;
            }
        }

        const errorMessage = this.state.error ? <UploadFabsFileError error={this.state.error} /> : null;
        let warningSection = null;
        let errorSection = null;
        if (this.state.showWarning) {
            warningSection = (<ValidateValuesErrorReport
                submissionId={this.props.submission.id}
                publishStatus={this.props.submission.publishStatus}
                fileType={this.props.item.file_type}
                reportType="warning"
                data={this.props.item}
                dataKey="warning_data"
                name="Warning"
                colors={warningBaseColors} />);
        }
        if (this.state.showError) {
            errorSection = (<ValidateValuesErrorReport
                submissionId={this.props.submission.id}
                publishStatus={this.props.submission.publishStatus}
                fileType={this.props.item.file_type}
                reportType="error"
                data={this.props.item}
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
                onClick={this.clickedReport}
                download={fileName}
                rel="noopener noreferrer">
                <p className="file-text-header">Original Submitted File:</p>
                {fileName}
            </div>
        );
        if (blockedStatuses.indexOf(this.props.submission.publishStatus) > -1) {
            downloadClick = <div>{fileName}</div>;
        }

        const { size, rows, lastValidated } = this.displayFileMeta();

        return (
            <div
                className="row center-block usa-da-validate-item"
                data-testid={`validate-wrapper-${this.props.type.requestName}`}>
                <div className="col-md-12">
                    {errorMessage}
                    <div className="row usa-da-validate-item-top-section">
                        <div className="col-md-9 usa-da-validate-item-status-section">
                            <div className="row usa-da-validate-item-header">
                                <div className="validate-item-header-half left">
                                    <div className="file-title">
                                        <h4>{this.props.type.fileTitle}</h4>
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
                                    count={this.props.item.warning_count}
                                    expandedReport={this.state.showWarning}
                                    onClick={this.toggleWarningReport} />
                                <FileDetailBox
                                    styleClass="usa-da-validate-item-critical"
                                    label="Critical Errors"
                                    count={this.props.item.error_count}
                                    expandedReport={this.state.showError}
                                    onClick={this.toggleErrorReport} />
                            </div>
                        </div>

                        <div className="col-md-3 usa-da-validate-item-file-section">
                            {buttonOverlay}
                            <div className="usa-da-validate-item-file-section-result">
                                <div
                                    className="usa-da-icon"
                                    data-testid="validate-icon">
                                    {this.displayIcon()}
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
    }
}

ValidateValuesFileComponent.propTypes = propTypes;
ValidateValuesFileComponent.defaultProps = defaultProps;
