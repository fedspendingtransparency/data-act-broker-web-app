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


        return (
            <div className="row center-block">
                <div className="col-md-10">
                    <div className="row usa-da-validate-item-header">
                        <div className="col-md-8">
                            <h4>Appropriation</h4>
                        </div>
                        <div className="col-md-2">
                            <p>File Size: 5.2MB</p>
                        </div>
                        <div className="col-md-2">
                            <p>Rows: 7514</p>
                        </div>
                    </div>
                    <div className="row usa-da-validate-item-body">
                        <div>Critical Error: Missing fields in header row</div>
                    </div>
                    <div className="row usa-da-validate-item-footer" onClick={this.showErrorReport.bind(this)}>
                        <div>View &amp; Download Header Error Report <span className="glyphicon glyphicon-chevron-down"></span></div>
                    </div>
                </div>

                <div className="col-md-2 usa-da-validate-item-file-section">
                    <div className="usa-da-validate-item-file-section-result">
                        <span className="glyphicon glyphicon-ok"></span>
                    </div>
                    <div>_appropriation.csv</div>
                    <div className="usa-da-validate-item-file-section-correct-button">
                        <button>Choose Corrected File</button>
                    </div>
                </div>
                {this.state.showError ? <ValidateDataErrorReport /> : null}
            </div>
        );
    }
}

//<DropZoneContainer requestName="Test" />

ValidateDataFileComponent.propTypes = propTypes;