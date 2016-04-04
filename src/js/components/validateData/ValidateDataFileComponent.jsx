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
import MetaData from '../addData/AddDataMetaDisplay.jsx';
import FileComponent from '../addData/FileComponent.jsx';
import ValidateDataErrorReport from './ValidateDataErrorReport.jsx';
import ValidateDataUploadButton from './ValidateDataUploadButton.jsx';

const propTypes = {

};

export default class ValidateDataFileComponent extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            showError: false,
        };
    }

    toggleErrorReport(){
        this.setState({ showError: !this.state.showError });
    }




    render() {

        const status = this.props.data[this.props.type.requestName];
        
        let disabledCorrect = '';
        let validationType = 'time';
        if (status.file_status == 'complete') {
            validationType = 'ok';
        }
        else if (status.file_status == '' || status.file_status == 'waiting') {
            validationType = 'time';
            disabledCorrect = ' hide';
        }
        else {
            validationType = 'remove';
        }

        let title = 'Validating...';
        let numRows = '--';
        let fileSize = '--';
        let hasError = false;
        let errorData = []
        let successfulFade = '';
        if (status.file_status != '' && status.file_status != 'waiting') {

            numRows = status.number_of_rows;

            fileSize = (status.file_size / 1000000).toFixed(2) + ' MB';
            if (status.file_size < 100000) {
                fileSize = (status.file_size / 1000).toFixed(2) + ' KB';
            }

            if (status.missing_headers.length > 0 && status.duplicated_headers.length > 0) {
                title = 'Critical Errors: Missing fields in header row & duplicate fields in header row';
                errorData = ['missing_headers', 'duplicated_headers'];
                hasError = true;
            }
            else if (status.missing_headers.length > 0) {
                title = 'Critical Error: Missing fields in header row';
                errorData = ['missing_headers'];
                hasError = true;
            }
            else if (status.duplicated_headers.length > 0) {
                title = 'Critical Error: Duplicate fields in header row';
                errorData = ['duplicated_headers'];
                hasError = true;
            }
            else if (status.file_status == 'single_row_error') {
                title = 'Critical Error: CSV file must have a header row and at least one record';
                errorData = [];
                hasError = false;
            }
            else if (status.file_status == 'complete') {
                title = ' ';
                disabledCorrect = ' hide';
                hasError = false;
                successfulFade = ' successful';
            }
            else {
                title = 'Critical Error: An unknown error has occurred with this file';
                errorData = [];
                hasError = false;
            }
        }

        let showFooter = ' hide';
        if (hasError) {
            showFooter = '';
        }


        let errorReports = [];
        let chevronDirection = 'down';
        if (this.state.showError) {
            chevronDirection = 'up';
            errorData.forEach((errorKey) => {
                let headerTitle = '';
                if (errorKey == 'missing_headers') {
                    headerTitle = 'Missing Headers: Field Name';
                }
                else if (errorKey == 'duplicated_headers') {
                    headerTitle = 'Duplicate Headers: Field Name';
                }

                errorReports.push({
                    header: headerTitle,
                    data: status[errorKey]
                });
            });
        }

        // override this data if a new file is dropped in
        if (this.props.submission.files.hasOwnProperty(this.props.type.requestName)) {
            validationType = 'file';
        }


        return (
            <div className={"row center-block usa-da-validate-item" + successfulFade}>
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
                        <div className="row usa-da-validate-item-body">
                            <div className="usa-da-validate-item-message">{title}</div>
                        </div>
                        <div className="row usa-da-validate-item-footer-wrapper">
                            <div className={"usa-da-validate-item-footer header-error " + showFooter} onClick={this.toggleErrorReport.bind(this)}>
                                <div>View &amp; Download Header Error Report <span className={"glyphicon glyphicon-chevron-" + chevronDirection}></span></div>
                            </div>
                        </div>
                    </div>

                    <div className="col-md-2 usa-da-validate-item-file-section">
                        <div className="usa-da-validate-item-file-section-result">
                            <span className={"glyphicon glyphicon-" + validationType}></span>
                        </div>
                        <div className="usa-da-validate-item-file-name">{status.filename}</div>
                        <div className={"usa-da-validate-item-file-section-correct-button" + disabledCorrect}>
                            <ValidateDataUploadButton onDrop={this.props.onFileChange} />
                        </div>
                    </div>
                </div>
                {this.state.showError ? <ValidateDataErrorReport link={status.report} data={errorReports} /> : null}
            </div>
        );
    }
}

ValidateDataFileComponent.propTypes = propTypes;