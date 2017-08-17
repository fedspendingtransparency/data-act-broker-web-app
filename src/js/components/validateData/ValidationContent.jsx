/**
 * ValidationContent.jsx
 * Created by Mike Hess 8/15/17
 **/

import React, { PropTypes } from 'react';

import { kGlobalConstants } from '../../GlobalConstants.js';
import ValidationOverlayContainer from '../../containers/validateData/ValidationOverlayContainer.jsx';
import ValidateDataFileContainer from '../../containers/validateData/ValidateDataFileContainer.jsx';
import ValidateValuesFileContainer from '../../containers/validateData/ValidateValuesFileContainer.jsx';
import ValidateDataInProgressOverlay from './ValidateDataInProgressOverlay.jsx';

import { fileTypes } from '../../containers/addData/fileTypes.js';

const propTypes = {
    submissionID: PropTypes.string
};

export default class ValidationContent extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        let errors = [], warnings = [];
        let items = fileTypes.map((type, index) => {
            const data = this.props.submission.validation;
            const fileData = data[type.requestName];

            if (fileData) {
                let status = fileData.job_status;
                if (!this.props.hasFinished || this.props.hasFailed || (status == 'invalid' && fileData.file_status != 'complete')) {
                    errors.push(type.requestName);
                    return <ValidateDataFileContainer key={index} type={type} data={data} />;
                }
                else {
                    if (fileData.error_data.length > 0) {
                        errors.push(type.requestName);
                    }
                    if (fileData.warning_data.length > 0) {
                        warnings.push(type.requestName);
                    }
                    return <ValidateValuesFileContainer key={index} type={type} data={data} 
                                                        session={this.props.session} />;
                }
            }
        });

        let overlay = '';
        let displayOverlay = '';
        if (!this.props.hasFinished || this.props.hasFailed) {
            // still loading or validating
            overlay = <ValidateDataInProgressOverlay hasFailed={this.props.hasFailed} />;
        }
        else {
            overlay = <ValidationOverlayContainer warnings={warnings} errors={errors} />;
        }

        return (
            <div className="container">
                <div className="row center-block usa-da-submission-items with-overlay">
                    <div className="usa-da-validate-items">
                        {items}
                    </div>
                </div>
                {overlay}
            </div>
        );
    }
}

ValidationContent.propTypes = propTypes;
