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
import FileDetailBox from './ValidateValuesFileDetailBox.jsx';
import CorrectButtonOverlay from '../CorrectButtonOverlay.jsx';
import * as Icons from '../../SharedComponents/icons/Icons.jsx';

const propTypes = {

};

export default class ValidateDataFileComponent extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            showWarning: false,
            showError: false,
            hasErrors: false,
            hasWarnings: false
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
        this.setState({ 
            showWarning: !this.state.showWarning,
            showError: false
        });
    }

    toggleErrorReport(){
        this.setState({ 
            showError: !this.state.showError,
            showWarning: false
        });
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
            hasErrors: hasErrors,
            hasWarnings: true
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
        let correctButtonOverlay = '';

        let optionalUpload = false;
        let uploadText = 'Choose Corrected File';
        let validationElement = '';

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

        if (!this.state.hasErrors) {
            optionalUpload = true;
            uploadText = 'Overwrite File';
            correctButtonOverlay = <CorrectButtonOverlay isReplacingFile={this.isReplacingFile()} fileKey={this.props.type.requestName} onDrop={this.props.onFileChange} fileName={fileName}/>
            validationElement = <p>File successfully validated</p>;
        } else {
            validationElement = <div className="row usa-da-validate-item-file-section-correct-button" data-testid="validate-upload">
                <ValidateDataUploadButton optional={optionalUpload} onDrop={this.props.onFileChange} text={uploadText} />
            </div>;
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
                                <FileDetailBox styleClass="usa-da-validate-item-warning" label="Warnings" count={1} expandedReport={this.state.showWarning} onClick={this.toggleWarningReport.bind(this)} />
                                <FileDetailBox styleClass="usa-da-validate-item-critical" label="Critical Errors" count={this.props.item.error_count} expandedReport={this.state.showError} onClick={this.toggleErrorReport.bind(this)} />
                            </div>
                        </div>

                        <div className="col-md-3 usa-da-validate-item-file-section">
                            {correctButtonOverlay}
                            <div className="usa-da-validate-item-file-section-result">
                                <div className="usa-da-icon" data-testid="validate-icon">
                                    {this.displayIcon()}
                                </div>
                            </div>
                            <div className="row usa-da-validate-item-file-name">{fileName}</div>
                            {uploadProgress}
                            {validationElement}
                        </div>
                    </div>
                    {this.state.showWarning ? <ValidateValuesErrorReport link={this.props.item.report} data={this.props.item} name="Warning" color="#fdb81e" /> : null}
                    {this.state.showError ? <ValidateValuesErrorReport link={this.props.item.report} data={this.props.item} name="Critical Error" color="#5d87bb" /> : null}
                </div>
            </div>
        );
    }
}

ValidateDataFileComponent.propTypes = propTypes;