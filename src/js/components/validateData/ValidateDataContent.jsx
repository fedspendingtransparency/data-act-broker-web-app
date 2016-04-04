/**
 * ValidateDataContent.jsx
 * Created by Mike Bray 3/28/16
 **/

import React, { PropTypes } from 'react';
import { kGlobalConstants } from '../../GlobalConstants.js';
import ValidateDataFileComponent from './ValidateDataFileComponent.jsx';
import SubmitButton from '../SharedComponents/SubmitButton.jsx';
import MetaData from '../addData/AddDataMetaDisplay.jsx';
import FileComponent from '../addData/FileComponent.jsx';
import ValidateDataOverlay from './ValidateDataOverlay.jsx';
import ValidateDataFileContainer from '../../containers/validateData/ValidateDataFileContainer.jsx';

import { fileTypes } from '../../containers/addData/fileTypes.js';

const propTypes = {
    submissionID: PropTypes.string
};

export default class ValidateDataContent extends React.Component {
    constructor(props) {
        super(props);
    }


    render() {

        if (Object.keys(this.props.submission.validation).length > 0) {
            
            let allValid = true;
            let errorCount = 0;
            let items = fileTypes.map((type, index) => {
                const validationStatus = this.props.submission.validation[type.requestName];

                if (validationStatus.job_status == 'invalid' && validationStatus.file_status != 'complete') {
                    allValid = false;
                    errorCount++;
                }
                return <ValidateDataFileContainer key={index} type={type} data={this.props.submission.validation} />;
            });

            let overlay = ''
            let displayOverlay = '';
            if (!allValid) {
                // we'll need extra padding at the bottom of the page if the overlay is present
                displayOverlay = ' with-overlay';
                const overlayMessage = 'You must fix the Critical Errors found in ' + errorCount + ' of the .CSV files before on to the next step. View and download individual reports above.';

                let disabled = true;
                if (Object.keys(this.props.submission.files).length == errorCount) {
                    disabled = false;
                }

                overlay = <ValidateDataOverlay message={overlayMessage} disabled={disabled} />;
            }
            
            return (
                <div className="container">
                    <div className={"row center-block usa-da-submission-items" + displayOverlay}>
                        <div className="usa-da-validate-items">
                            {items}
                        </div>
                    </div>
                    {overlay}
                </div>
            );
        } else {
            return (
                <div>
                    <h4>Gathering data...</h4>
                </div>
            );
        }
    }
}

ValidateDataContent.propTypes = propTypes;
