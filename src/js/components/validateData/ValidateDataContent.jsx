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
import ValidateDataOverlayContainer from '../../containers/validateData/ValidateDataOverlayContainer.jsx';
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

        
        let allValid = true;
        let errors = [];
        let items = fileTypes.map((type, index) => {
            const validationStatus = this.props.submission.validation[type.requestName];

            if (validationStatus) {
                if (validationStatus.job_status == 'invalid' && validationStatus.file_status != 'complete') {
                    allValid = false;
                    errors.push(type.requestName);
                }

                return <ValidateDataFileContainer key={index} type={type} data={this.props.submission.validation} />;
            }
        });

        let overlay = '';
        let displayOverlay = '';
        if (!allValid) {
            // we'll need extra padding at the bottom of the page if the overlay is present
            displayOverlay = ' with-overlay';
            overlay = <ValidateDataOverlayContainer errors={errors} />;
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
    }
}

ValidateDataContent.propTypes = propTypes;
