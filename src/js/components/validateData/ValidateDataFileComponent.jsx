/**
 * ValidateDataContent.jsx
 * Created by Mike Bray 3/28/16
 **/

import React, { PropTypes } from 'react';
import { kGlobalConstants } from '../../GlobalConstants.js';
import DropZone from '../addData/DropZone.jsx';
import DropZoneContainer from '../../containers/addData/DropZoneContainer.jsx';
import Navbar from '../SharedComponents/navigation/NavigationComponent.jsx';
import AddDataHeader from './../addData/AddDataHeader.jsx';
import Progress from '../SharedComponents/ProgressComponent.jsx';
import SubmitButton from '../SharedComponents/SubmitButton.jsx';
import FileProgress from '../SharedComponents/FileProgress.jsx';
import MetaData from '../addData/AddDataMetaDisplay.jsx';
import FileComponent from '../addData/FileComponent.jsx';
import ValidateDataErrorReport from './ValidateDataErrorReport.jsx';
import ValidateDataUploadButton from './ValidateDataUploadButton.jsx';
import * as Icons from '../SharedComponents/icons/Icons.jsx';

const propTypes = {

};

export default class ValidateDataFileComponent extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            showError: false,
            headerTitle: 'Validating...',
            errorReports: [],
            hasErrorReport: false,
            isError: false
        };
    }

    componentDidMount() {
        this.determineErrors(this.props.item);
    }

    componentWillReceiveProps(nextProps) {
        this.determineErrors(nextProps.item);

        if (this.props.submission.state == 'uploading' && nextProps.submission.state == 'review') {
            // we've finished uploading files, close any open error reports
            if (this.state.showError) {
                this.setState({
                    showError: false
                });
            }
        }
    }

    toggleErrorReport(){
        this.setState({ showError: !this.state.showError });
    }

    isFileReady() {
        if (this.props.item.job_status == 'finished' || this.props.item.job_status == 'invalid') {
            return true;
        }
        return false;
    }

    isReplacingFile() {
        // check if the user is trying to replace a file
        let stagedFile = false;
        if (this.props.submission.files.hasOwnProperty(this.props.type.requestName)) {
            stagedFile = true;
        }
        return stagedFile;
    }

    determineErrors(item) {
        if (!item) {
            return;
        }

        let headerTitle = 'Validating...';
        let hasErrorReport = false;
        let isError = false;
        const errorKeys = [];
        let errorData = [];

        if (item.missing_headers.length > 0) {
            errorKeys.push('missing_headers');
            hasErrorReport = true;
            isError = true;
            headerTitle = 'Critical Error: Missing fields in header row';
        }
        if (item.duplicated_headers.length > 0) {
            errorKeys.push('duplicated_headers');
            hasErrorReport = true;
            isError = true;
            headerTitle = 'Critical Error: Duplicate fields in header row';
        }

        if (errorKeys.length == 2) {
            headerTitle = 'Critical Errors: Missing fields in header row & duplicate fields in header row';
        }

        if (item.file_status == 'single_row_error') {
            headerTitle = 'Critical Error: CSV file must have a header row and at least one record';
            hasErrorReport = false;
            isError = true;
        }
        else if (item.file_status == 'complete') {
            headerTitle = '';
            hasErrorReport = false;
            isError = false;
        }
        
        if (errorKeys.length > 0) {
            errorKeys.forEach((key) => {
                let tableTitle = '';
                if (key == 'missing_headers') {
                    tableTitle = 'Missing Headers: Field Name';
                }
                else if (key == 'duplicated_headers') {
                    tableTitle = 'Duplicate Headers: Field Name';
                }

                errorData.push({
                    header: tableTitle,
                    data: item[key]
                });

            });
        }


        if (item.file_status == 'incomplete' || !this.isFileReady()) {
            headerTitle = 'Validating...';
            errorData = [];
            hasErrorReport = false;
            isError = false;
        }

        this.setState({
            headerTitle: headerTitle,
            errorReports: errorData,
            hasErrorReport: hasErrorReport,
            isError: isError
        });
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
        if (this.isFileReady()) {
            if (this.props.item.file_status == 'complete') {
                icon = <Icons.CheckCircle />;
            }
            else {
                icon = <Icons.ExclamationCircle />;
            }
        }

        // user is attempting to replace a file
        if (this.isReplacingFile()) {
            icon = <Icons.CloudUpload />;
        }

        return icon;
    }

    render() {
       
        
        let successfulFade = '';
        let disabledCorrect = '';
        if (!this.state.isError && this.isFileReady()) {
            successfulFade = ' successful';
            disabledCorrect = ' hide';
        }
        else if (!this.isFileReady()) {
            successfulFade = '';
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

        return (
            <div className={"row center-block usa-da-validate-item" + successfulFade}>
            <div className="col-md-12">
                <div className="row usa-da-validate-item-top-section">
                    <div className="col-md-9 usa-da-validate-item-status-section">
                        <div className="row usa-da-validate-item-header">
                            <div className="col-md-6">
                                <h4>{this.props.type.fileTitle}</h4>
                            </div>
                            <div className="col-md-3">
                                <p>File Size: {this.displayFileMeta().size}</p>
                            </div>
                            <div className="col-md-3">
                                <p className="pr-20">Rows: {this.displayFileMeta().rows}</p>
                            </div>
                        </div>
                        <div className="row usa-da-validate-item-body">
                            <div className="col-md-12 usa-da-validate-item-message usa-da-validate-txt-wrap">{this.state.headerTitle}</div>
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
                                    <div className="usa-da-icon">
                                        {this.displayIcon()}
                                    </div>
                                </div>
                                {uploadProgress}
                                <div className="usa-da-validate-item-file-name">{fileName}</div>
                                <div className={"usa-da-validate-item-file-section-correct-button" + disabledCorrect}>
                                    <ValidateDataUploadButton onDrop={this.props.onFileChange} />
                                </div>
                            </div>
                        </div>
                    </div>
                {this.state.showError ? <ValidateDataErrorReport link={this.props.item.report} data={this.state.errorReports} /> : null}
                </div>
            </div>
        );
    }
}

ValidateDataFileComponent.propTypes = propTypes;