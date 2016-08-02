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
        let hasWarnings = false;
        if (item.error_data.length > 0) {
            hasErrors = true;
        }
        if (item.warning_data.length > 0) {
            hasWarnings = true;
        }
        
        this.setState({
            hasErrors: hasErrors,
            hasWarnings: hasWarnings
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
        else if (this.state.hasWarnings) {
            icon = <div className="usa-da-warning-icon"><Icons.ExclamationCircle /></div>;
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

        if (!this.state.hasErrors && !this.state.hasWarnings) {
            optionalUpload = true;
            uploadText = 'Overwrite File';
            correctButtonOverlay = <CorrectButtonOverlay isReplacingFile={this.isReplacingFile()} fileKey={this.props.type.requestName} onDrop={this.props.onFileChange} fileName={fileName}/>
            validationElement = <p className='usa-da-success-txt'>File successfully validated</p>;
        }
        else if (!this.state.hasErrors && this.state.hasWarnings) {
            optionalUpload = true;
            uploadText = 'Overwrite File';
            correctButtonOverlay = <CorrectButtonOverlay isReplacingFile={this.isReplacingFile()} fileKey={this.props.type.requestName} onDrop={this.props.onFileChange} fileName={fileName}/>
            validationElement = <p className='usa-da-warning-txt'>File validated with warnings</p>;
        }
        else {
            validationElement = <div className="row usa-da-validate-item-file-section-correct-button" data-testid="validate-upload"><div className="col-md-12">
                <ValidateDataUploadButton optional={optionalUpload} onDrop={this.props.onFileChange} text={uploadText} />
                </div>
            </div>;
        }

        const warningBaseColors = {
            base: '#fdb81e',
            active: '#FF6F00',
            activeBorder: '#BF360C'
        };

        const errorBaseColors = {
            base: '#5d87bb',
            active: '#02bfe7',
            activeBorder: '#046b99'
        };

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
                                <FileDetailBox styleClass="usa-da-validate-item-warning" label="Warnings" count={this.props.item.warning_count} expandedReport={this.state.showWarning} onClick={this.toggleWarningReport.bind(this)} />
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
                    {this.state.showWarning ? <ValidateValuesErrorReport link={this.props.item.warning_report} data={this.props.item} dataKey="warning_data" name="Warning" colors={warningBaseColors} /> : null}
                    {this.state.showError ? <ValidateValuesErrorReport link={this.props.item.report} data={this.props.item} dataKey="error_data" name="Critical Error" colors={errorBaseColors} /> : null}
                </div>
            </div>
        );
    }
}

ValidateDataFileComponent.propTypes = propTypes;