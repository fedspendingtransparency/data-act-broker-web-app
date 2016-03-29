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
import Request from 'superagent';

const propTypes = {

};

export default class ValidateDataFileComponent extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            showError: false
        };
    }

    showErrorReport(){
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
            disabledCorrect = ' disabled';
        }
        else {
            validationType = 'remove';
        }

        let title = 'Validating...';

        if (status.file_status != '' && status.file_status != 'waiting') {
            if (status.missing_headers.length > 0) {
                title = 'Critical Error: Missing Headers';
            }
            else if (status.duplicated_headers.length > 0) {
                title = 'Critical Error: Duplicated Headers';
            }
            else {
                title = 'Complete';
            }
        }


        return (
            <div className="row center-block usa-da-validate-item">
                <div className="col-md-10">
                    <div className="row usa-da-validate-item-header">
                        <div className="col-md-8">
                            <h4>{this.props.type.fileTitle}</h4>
                        </div>
                        <div className="col-md-2">
                            <p>File Size: -- MB</p>
                        </div>
                        <div className="col-md-2">
                            <p>Rows: --</p>
                        </div>
                    </div>
                    <div className="row usa-da-validate-item-body">
                        <div>{title}</div>
                    </div>
                    <div className="row usa-da-validate-item-footer" onClick={this.showErrorReport.bind(this)}>
                        <div>View &amp; Download Header Error Report <span className="glyphicon glyphicon-chevron-down"></span></div>
                    </div>
                </div>

                <div className="col-md-2 usa-da-validate-item-file-section">
                    <div className="usa-da-validate-item-file-section-result">
                        <span className={"glyphicon glyphicon-" + validationType}></span>
                    </div>
                    <div className="usa-da-validate-item-file-name">{status.filename}</div>
                    <div className={"usa-da-validate-item-file-section-correct-button" + disabledCorrect}>
                        <button>Choose Corrected File</button>
                    </div>
                </div>
                {this.state.showError ? <ValidateDataErrorReport link={status.report} /> : null}
            </div>
        );
    }
}

//<DropZoneContainer requestName="Test" />

ValidateDataFileComponent.propTypes = propTypes;