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
import MetaData from '../../addData/AddDataMetaDisplay.jsx';
import FileComponent from '../../addData/FileComponent.jsx';
import ValidateDataUploadButton from './../ValidateDataUploadButton.jsx';
import ValidateValuesErrorReport from './ValidateValuesErrorReport.jsx';

const propTypes = {

};

export default class ValidateDataFileComponent extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            showWarning: false,
            showError: false
        };
    }

    toggleWarningReport(){
        this.setState({ showWarning: !this.state.showWarning });
    }

    toggleErrorReport(){
        this.setState({ showError: !this.state.showError });
    }

    parseErrors(data) {
        
    }


    render() {

        const status = this.props.data[this.props.type.requestName];
        const numRows = status.number_of_rows;

        let fileSize = (status.file_size / 1000000).toFixed(2) + ' MB';
        if (status.file_size < 100000) {
            fileSize = (status.file_size / 1000).toFixed(2) + ' KB';
        }

        let showWarning = '';
        let warningDirection = 'down';
        let showError = '';
        let errorDirection = 'down';
        if (this.state.showError) {
            errorDirection = 'up';
        }

        let warningCount = '--';
        let noWarnings = ' none';
        let errorCount = status.error_data.length;
        let noErrors = ' none';

        showWarning = ' hide';
        if (errorCount == '--' || errorCount == 0) {
            showError = ' hide';
        }
        else {
            noErrors = '';
        }

        return (
            <div className="row center-block usa-da-validate-item">
                <div className="row usa-da-validate-item-top-section">
                    <div className="col-md-10 usa-da-validate-item-status-section">
                        <div className="row usa-da-validate-item-header">
                            <div className="col-md-6">
                                <h4>{this.props.type.fileTitle}</h4>
                            </div>
                            <div className="col-md-3 text-right">
                                <p>File Size: {fileSize}</p>
                            </div>
                            <div className="col-md-3 text-right">
                                <p>Rows: {numRows}</p>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-6 usa-da-validate-item-warning">
                                <div className="row usa-da-validate-item-body">
                                    <span className="usa-da-validate-item-message-label">Warnings: </span>
                                    <span className={"usa-da-validate-item-message-count" + noWarnings}>{warningCount}</span>
                                </div>
                                <div className="row usa-da-validate-item-footer-wrapper">
                                    <div className={"usa-da-validate-item-footer" + showWarning} onClick={this.toggleWarningReport.bind(this)}>
                                        <div>View &amp; Download Warnings Report <span className={"glyphicon glyphicon-chevron-" + warningDirection}></span></div>
                                    </div>
                                </div>
                            </div>

                            <div className="col-md-6 usa-da-validate-item-critical">
                                <div className="row usa-da-validate-item-body">
                                    <span className="usa-da-validate-item-message-label">Critical Errors: </span>
                                    <span className={"usa-da-validate-item-message-count" + noErrors}>{errorCount}</span>
                                </div>
                                <div className="row usa-da-validate-item-footer-wrapper">
                                    <div className={"usa-da-validate-item-footer" + showError} onClick={this.toggleErrorReport.bind(this)}>
                                        <div>View &amp; Download Critical Errors Report <span className={"glyphicon glyphicon-chevron-" + errorDirection}></span></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="col-md-2 usa-da-validate-item-file-section">
                        <div className="usa-da-validate-item-file-section-result">
                            <span className="glyphicon"></span>
                        </div>
                        <div className="usa-da-validate-item-file-name">{status.filename}</div>
                        <div className="usa-da-validate-item-file-section-correct-button">
                            <ValidateDataUploadButton onDrop={this.props.onFileChange} />
                        </div>
                    </div>
                </div>
                {this.state.showWarning ? <ValidateValuesErrorReport link={status.report} data={status} name="Warning" /> : null}
                {this.state.showError ? <ValidateValuesErrorReport link={status.report} data={status} name="Critical Error" /> : null}
            </div>
        );
    }
}

ValidateDataFileComponent.propTypes = propTypes;