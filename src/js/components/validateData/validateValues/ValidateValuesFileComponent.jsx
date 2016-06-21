/**
 * ValidateValuesFileComponent.jsx
 * Created by Kevin Li 4/4/2016
 **/

import React, { PropTypes } from 'react';
import { kGlobalConstants } from '../../../GlobalConstants.js';
import DropZone from '../../addData/DropZone.jsx';
import DropZoneContainer from '../../../containers/addData/DropZoneContainer.jsx';
import Navbar from '../../SharedComponents/navigation/NavigationComponent.jsx';
import AddDataHeader from './../../addData/AddDataHeader.jsx';
import Progress from '../../SharedComponents/ProgressComponent.jsx';
import SubmitButton from '../../SharedComponents/SubmitButton.jsx';
import FileProgress from '../../SharedComponents/FileProgress.jsx';
import MetaData from '../../addData/AddDataMetaDisplay.jsx';
import FileComponent from '../../addData/FileComponent.jsx';
import ValidateDataUploadButton from './../ValidateDataUploadButton.jsx';
import ValidateValuesErrorReport from './ValidateValuesErrorReport.jsx';
import * as Icons from '../../SharedComponents/icons/Icons.jsx';

const propTypes = {

};

export default class ValidateDataFileComponent extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            showWarning: false,
            showError: false,
            hasErrors: false
        };
    }

    componentDidMount() {
        this.determineErrors(this.props.item);
    }

    componentWillReceiveProps(nextProps) {
        this.determineErrors(nextProps.item);

        if ((this.props.submission.state == 'uploading' || this.props.submission.state == 'prepare') && nextProps.submission.state == 'review') {
            // we've finished uploading files, close any open error reports
            if (this.state.showError) {
                this.setState({
                    showError: false,
                    showWarning: false
                });
            }
        }
    }

    toggleWarningReport(){
        this.setState({ showWarning: !this.state.showWarning });
    }

    toggleErrorReport(){
        this.setState({ showError: !this.state.showError });
    }

    isFileReady() {
        if (this.props.item.file_status != '' && this.props.item.file_status != 'waiting') {
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

        let hasErrors = false;
        if (item.error_data.length > 0) {
            hasErrors = true;
        }
        
        this.setState({
            hasErrors: hasErrors
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
        let icon = <Icons.CheckCircle />;

        if (this.state.hasErrors) {
            icon = <Icons.ExclamationCircle />;
        }

        if (this.isReplacingFile()) {
            icon = <Icons.CloudUpload />;
        }
        
        return icon;
    }

    render() {

        let showWarning = '';
        let warningDirection = < Icons.AngleDown / >;
        let showError = '';
        let errorDirection = < Icons.AngleDown / >;
        if (this.state.showError) {
            errorDirection = < Icons.AngleUp / >;
        }


        let footerStatus = '';
        if (this.state.showError) {
            footerStatus = 'active';
        }

        let warningCount = '--';
        let noWarnings = ' none';

        let noErrors = ' none';

        showWarning = ' hide';
        if (!this.state.hasErrors) {
            showError = ' hide';
        }
        else {
            noErrors = '';
        }

        let optionalUpload = false;
        let uploadText = 'Choose Corrected File';
        if (!this.state.hasErrors) {
            optionalUpload = true;
            uploadText = 'Overwrite File';
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
            <div className="row center-block usa-da-validate-item" data-testid={"validate-wrapper-" + this.props.type.requestName}>
                    <div className="col-md-12">
                        <div className="row usa-da-validate-item-top-section">
                            <div className="col-md-9 usa-da-validate-item-status-section">
                                <div className="row usa-da-validate-item-header">
                                    <div className="col-md-8">
                                        <h4>{this.props.type.fileTitle}</h4>
                                    </div>
                                    <div className="col-md-2 text-right">
                                        <p>File Size: {this.displayFileMeta().size}</p>
                                    </div>
                                    <div className="col-md-2 text-right">
                                        <p>Rows: {this.displayFileMeta().rows}</p>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-6 usa-da-validate-item-warning">
                                        <div className="row usa-da-validate-item-body">
                                            <div className='usa-da-validate-txt-wrap'>
                                                <span className="usa-da-validate-item-message-label">Warnings:</span>
                                                <span className={"usa-da-validate-item-message-count" + noWarnings}>&nbsp;{warningCount}</span>
                                            </div>
                                        </div>
                                        <div className="row usa-da-validate-item-footer-wrapper">
                                            <div className={"usa-da-validate-item-footer usa-da-header-error" + showWarning +" "+footerStatus} onClick={this.toggleWarningReport.bind(this)}>
                                                <div>View &amp; Download Warnings Report <span className={"usa-da-icon"}>{warningDirection}</span></div>
                                            </div>
                                        </div>
                                    </div>
        
                                    <div className="col-md-6 usa-da-validate-item-critical">
                                        <div className="row usa-da-validate-item-body">
                                            <div className='usa-da-validate-txt-wrap'>
                                                <span className="usa-da-validate-item-message-label">Critical Errors:</span>
                                                <span className={"usa-da-validate-item-message-count" + noErrors}>&nbsp;{this.props.item.error_count}</span>
                                            </div>
                                        </div>
                                        <div className="row usa-da-validate-item-footer-wrapper">
                                            <div className={"usa-da-validate-item-footer usa-da-header-error" + showError +" "+footerStatus} onClick={this.toggleErrorReport.bind(this)}>
                                                <div>View &amp; Download Critical Errors Report <span className={"usa-da-icon"}>{errorDirection}</span></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
        
                            <div className="col-md-3 usa-da-validate-item-file-section">
                                        <div className="usa-da-validate-item-file-section-result">
                                            <div className="usa-da-icon" data-testid="validate-icon">
                                                {this.displayIcon()}
                                            </div>
                                        </div>
                                <div className="row usa-da-validate-item-file-name">{fileName}</div>
                                {uploadProgress}
                                <div className="row usa-da-validate-item-file-section-correct-button" data-testid="validate-upload">
                                    <ValidateDataUploadButton optional={optionalUpload} onDrop={this.props.onFileChange} text={uploadText} />
                                </div>
                            </div>
                        </div>
                        {this.state.showWarning ? <ValidateValuesErrorReport link={this.props.item.report} data={this.props.item} name="Warning" /> : null}
                        {this.state.showError ? <ValidateValuesErrorReport link={this.props.item.report} data={this.props.item} name="Critical Error" /> : null}
                    </div>
                </div>
        );
    }
}

ValidateDataFileComponent.propTypes = propTypes;