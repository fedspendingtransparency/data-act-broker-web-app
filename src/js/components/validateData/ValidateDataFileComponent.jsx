/**
 * ValidateDataFileComponent.jsx
 * Created by Mike Bray 3/28/16
 **/

import React, { PropTypes } from 'react';
import { kGlobalConstants } from '../../GlobalConstants.js';
import FileProgress from '../SharedComponents/FileProgress.jsx';
import ValidateDataErrorReport from './ValidateDataErrorReport.jsx';
import ValidateDataUploadButton from './ValidateDataUploadButton.jsx';
import * as Icons from '../SharedComponents/icons/Icons.jsx';
import * as ReviewHelper from '../../helpers/reviewHelper.js';
import * as PermissionsHelper from '../../helpers/permissionsHelper.js';
import * as GenerateFilesHelper from '../../helpers/generateFilesHelper.js';

import UploadDetachedFilesError from '../uploadDetachedFiles/UploadDetachedFilesError.jsx';

const propTypes = {

};

export default class ValidateDataFileComponent extends React.Component {
    constructor(props) {
        super(props);

        this.isUnmounted = false;

        this.state = {
            showError: false,
            headerTitle: 'Validating...',
            errorReports: [],
            hasErrorReport: false,
            isError: false,
            signedUrl: '',
            signInProgress: false,
            error: null,
            canDownload: false
        };
    }

    componentDidMount() {
        this.isUnmounted = false;
        this.determineErrors(this.props.item);
        if (this.props.submission.id != null) {
            ReviewHelper.fetchStatus(this.props.submission.id)
                .then((data) => {
                    data.ready = true;
                    if (!this.isUnmounted) {
                        this.setState(data);
                    }
                })
                .catch((error) => {
                    console.log(error);
                });
        }
    }

    componentWillUnmount(){
        this.isUnmounted = true;
    }

    componentWillReceiveProps(nextProps) {
        this.determineErrors(nextProps.item);

        if ((this.props.submission.state == 'uploading' || this.props.submission.state == 'prepare') && nextProps.submission.state == 'review') {
            // we've finished uploading files, close any open error reports
            if (this.state.showError && !this.isUnmounted) {
                this.setState({
                    showError: false
                });
            }
        }
    }

    toggleErrorReport(){
        if(!this.isUnmounted){
            this.setState({ showError: !this.state.showError });
        }
    }

    isFileReady() {
        return (this.props.item.job_status == 'finished' || this.props.item.job_status == 'invalid');
    }

    isReplacingFile() {
        // check if the user is trying to replace a file
        return (this.props.submission.files.hasOwnProperty(this.props.type.requestName));
    }

    determineErrors(item) {
        if (!item) {
            return;
        }

        let headerTitle = 'Validating...';
        let isError = false, hasErrorReport = false, canDownload = true;
        let errorData = [];
        const errorKeys = [];

        // check if file is still validating
        if (item.file_status == 'incomplete' || !this.isFileReady) {
            this.setState({
                canDownload: false
            });
            return;
        }

        // handle header errors
        let missingHeaders = item.missing_headers ? item.missing_headers.length : 0;
        let duplicatedHeaders = item.duplicated_headers ? item.duplicated_headers.length : 0;
        if (missingHeaders > 0 || duplicatedHeaders > 0) {
            isError = true;
            hasErrorReport = true;
            if (missingHeaders > 0) {
                headerTitle = 'Critical Error: Missing fields in header row';
                errorKeys.push('missing_headers');
            }
            if (duplicatedHeaders > 0) {
                headerTitle = 'Critical Error: Duplicate fields in header row';
                errorKeys.push('duplicated_headers');
            }
            if (errorKeys.length > 0) {
                if (errorKeys.length == 2) {
                    headerTitle = 'Critical Errors: Missing fields in header row & duplicate fields in header row';
                }
                let titleDict = {
                    'missing_headers': 'Missing Headers: Field Name',
                    'duplicated_headers': 'Duplicate Headers: Field Name'
                };
                errorKeys.forEach((key) => {
                    errorData.push({
                        header: titleDict[key],
                        data: item[key]
                    });
                });
            }
        }
        else if (item.error_type == 'header_errors') {
            // special case where the header rows could not be read
            headerTitle = 'Critical Error: The header row could not be parsed.';
            canDownload = false;
            isError = true;
        }

        // handle file-level errors
        if (item.file_status != 'complete') {
            hasErrorReport = false;
            isError = true;

            switch(item.file_status) {
                case 'single_row_error':
                    headerTitle = 'Critical Error: CSV file must have a header row and at least one record';
                    break;
                case 'encoding_error':
                    headerTitle = 'Critical Error: File contains invalid characters that could not be parsed';
                    canDownload = false;
                    break;
                case 'row_count_error':
                    headerTitle = 'Critical Error: Raw file row count does not match the number of rows validated';
                    break;
                case 'unknown_error':
                    isError = false;
                    break;
                default:
                    break;
            }
        }

        // handle failed job
        if (item.job_status == 'failed' || (item.job_status == 'invalid' && !isError)) {
            headerTitle = 'An error occurred while validating this file. Contact the Service Desk for assistance.';
            errorData = [];
            hasErrorReport = false;
            isError = false;
        }

        if (!this.isUnmounted) {
            this.setState({
                headerTitle: headerTitle,
                errorReports: errorData,
                hasErrorReport: hasErrorReport,
                isError: isError,
                canDownload: canDownload
            });
        }
    }

    displayFileMeta() {
        let size = '--';
        let rows = '--';

        if (this.isFileReady()) {
            if (this.props.item.number_of_rows) {
                rows = this.props.item.number_of_rows;
            }
            if (this.props.item.file_size) {
                size = (this.props.item.file_size / 1000000).toFixed(2) + ' MB';
                if (this.props.item.file_size < 100000) {
                    size = (this.props.item.file_size / 1000).toFixed(2) + ' KB';
                }
            }
        }

        return {
            size: size,
            rows: rows
        };
    }

    displayIcon() {
        let icon = '';
        if (this.isReplacingFile()) {
            // user is attempting to replace a file
            icon = <Icons.CloudUpload />;
        }
        else if (this.isFileReady()) {
            if (this.props.item.file_status == 'complete') {
                icon = <Icons.CheckCircle />;
            }
            else {
                icon = <Icons.ExclamationCircle />;
            }
        }
        return icon;
    }

    signReport(item){
        let type = null;
        switch(item.file_type) {
            case 'appropriations':
                type = 'A';
                break;
            case 'program_activity':
                type = 'B';
                break;
            case 'award_financial':
                type = 'C';
                break;
            case 'detached_award':
                type = 'D2_detached';
                break;
            default:
                break;
        }
        if (type) {
            GenerateFilesHelper.fetchFile(type, this.props.submission.id)
            .then((result)=>{
                this.setState({
                    signInProgress: false,
                    signedUrl: result.url
                }, () => {
                    this.openReport();
                });
            })
            .catch((err) => {
                this.setState({
                    signInProgress: false,
                    error: {
                        header: 'Invalid File Type Selected '+item.file_type,
                        body: ''
                    }
                });
            });    
        }
        else {
            this.setState({
                    signInProgress: false,
                    error: {
                        header: 'Invalid File Type Selected '+item.file_type,
                        body: ''
                    }
                });
        }
    }

    openReport() {
        window.open(this.state.signedUrl);
    }

    clickedReport(item) {
        // check if the link is already signed
        if (this.state.signInProgress) {
            // sign is in progress, do nothing
            return;
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
                this.signReport(item);
            });
        }
    }

    render() {
        let disabledCorrect = '';
        let messageClass = ' usa-da-validate-item-message';
        if (!this.state.isError && this.isFileReady()) {
            messageClass = '';
            disabledCorrect = ' hide';
        }
        else if (!this.isFileReady()) {
            messageClass = '';
            disabledCorrect = ' hide';
        }

        let showFooter = ' hide';
        if (this.state.hasErrorReport) {
            showFooter = '';
        }

        let chevronDirection = <Icons.AngleDown />;
        if (this.state.showError) {
            chevronDirection = <Icons.AngleUp />;
        }

        let footerStatus = '';
        if (this.state.showError) {
            footerStatus = 'active';
        }

        // override this data if a new file is dropped in
        let uploadProgress = '';
        let fileName = this.props.item.filename;

        if (this.isReplacingFile()) {
            // also display the new file name
            const newFile = this.props.submission.files[this.props.type.requestName];
            fileName = newFile.file.name;

            if (newFile.state == 'uploading') {
                uploadProgress = <FileProgress fileStatus={newFile.progress} />;
            }
        }

        if (this.props.type.requestName === 'detached_award') {
            if (!PermissionsHelper.checkFabsAgencyPermissions(this.props.session, this.state.agency_name)){
                disabledCorrect = ' hide';
            }
        }
        else {
            if (!PermissionsHelper.checkAgencyPermissions(this.props.session, this.state.agency_name)){
                disabledCorrect = ' hide';
            }
        }

        let errorMessage = null;
        if(this.state.error) {
            errorMessage = <UploadDetachedFilesError error={this.state.error} />
        }

        let clickDownload = this.state.canDownload ? this.clickedReport.bind(this, this.props.item) : null;
        let clickDownloadClass = this.state.canDownload ? 'file-download' : '';

        return (
            <div className="row center-block usa-da-validate-item" data-testid={"validate-wrapper-" + this.props.type.requestName}>
                <div className="col-md-12">
                    {errorMessage}
                    <div className="row usa-da-validate-item-top-section">
                        <div className="col-md-9 usa-da-validate-item-status-section">
                            <div className="row usa-da-validate-item-header">
                                <div className="col-md-8">
                                    <h4>{this.props.type.fileTitle}</h4>
                                </div>
                                <div className="col-md-2">
                                    <p>File Size: {this.displayFileMeta().size}</p>
                                </div>
                                <div className="col-md-2">
                                    <p className="pr-20">Rows: {this.displayFileMeta().rows}</p>
                                </div>
                            </div>
                            <div className="row usa-da-validate-item-body">
                                <div className={"col-md-12 usa-da-validate-txt-wrap" + messageClass} data-testid="validate-message">{this.state.headerTitle}</div>
                            </div>
                            <div className="row usa-da-validate-item-footer-wrapper">
                                <div className={"usa-da-validate-item-footer usa-da-header-error" + showFooter +" "+footerStatus} onClick={this.toggleErrorReport.bind(this)}>
                                    <div>View &amp; Download Header Error Report <span className={"usa-da-icon"}>{chevronDirection}</span></div>
                                </div>
                            </div>
                        </div>

                        <div className="col-md-3">
                            <div className="usa-da-validate-item-file-section">
                                <div className="usa-da-validate-item-file-section-result">
                                    <div className="usa-da-icon" data-testid="validate-icon">
                                        {this.displayIcon()}
                                    </div>
                                </div>
                                {uploadProgress}
                                <div className="row usa-da-validate-item-file-name">
                                    <div className={clickDownloadClass} onClick={clickDownload} download={fileName} rel="noopener noreferrer">
                                        {fileName}
                                    </div>
                                </div>
                                <div className={"usa-da-validate-item-file-section-correct-button" + disabledCorrect} data-testid="validate-upload">
                                    <div className="row">
                                        <div className='col-md-12'>
                                            <ValidateDataUploadButton onDrop={this.props.onFileChange} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {this.state.showError ? <ValidateDataErrorReport submission={this.props.submission.id}
                                                                     type={this.props.item.file_type}
                                                                     data={this.state.errorReports} /> : null}
                </div>
            </div>
        );
    }
}

ValidateDataFileComponent.propTypes = propTypes;
