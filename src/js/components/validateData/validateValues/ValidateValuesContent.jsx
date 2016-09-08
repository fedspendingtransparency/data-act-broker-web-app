/**
 * ValidateValuesContent.jsx
 * Created by Kevin Li 4/4/2016
 **/

import React, { PropTypes } from 'react';
import $ from 'jquery';

import { kGlobalConstants } from '../../../GlobalConstants.js';

import { fileTypes } from '../../../containers/addData/fileTypes.js';

import ValidateValuesFileContainer from '../../../containers/validateData/ValidateValuesFileContainer.jsx';
import ValidateValuesOverlayContainer from '../../../containers/validateData/ValidateValuesOverlayContainer.jsx';

const propTypes = {
    submissionID: PropTypes.string
};

export default class ValidateValuesContent extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const errors = [];
        const warnings = [];

        let items = fileTypes.map((type, index) => {
            const validation = this.props.submission.validation;
            if (validation[type.requestName]) {
                const item = validation[type.requestName];
                if (item.error_data.length > 0) {
                    errors.push(type.requestName);
                }
                if (item.warning_data.length > 0) {
                    warnings.push(type.requestName);
                }

                return <ValidateValuesFileContainer key={index} data={validation} type={type}  />;
            }

        });

        return (
            <div className="container">
                <div className="row center-block usa-da-submission-items with-overlay">
                    <div className="usa-da-validate-items">
                        {items}
                    </div>
                </div>
                <ValidateValuesOverlayContainer errors={errors} warnings={warnings} />
            </div>
        );
    }
}

ValidateValuesContent.propTypes = propTypes;
