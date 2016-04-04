/**
 * ValidateValuesContent.jsx
 * Created by Kevin Li 4/4/2016
 **/

import React, { PropTypes } from 'react';
import { kGlobalConstants } from '../../../GlobalConstants.js';

import { fileTypes } from '../../../containers/addData/fileTypes.js';

import ValidateValuesFileComponent from './ValidateValuesFileComponent.jsx';

const propTypes = {
    submissionID: PropTypes.string
};

export default class ValidateValuesContent extends React.Component {
    constructor(props) {
        super(props);
    }


    render() {

        let items = fileTypes.map((type, index) => {

            const validation = this.props.submission.validation;

            if (validation[type.requestName]) {
                return <ValidateValuesFileComponent data={validation} type={type} key={index} />;
            }

        });

        return (
            <div className="container">
                <div className="row center-block usa-da-submission-items with-overlay">
                    <div className="usa-da-validate-items">
                        {items}
                    </div>
                </div>
                
            </div>
        );
    }
}

ValidateValuesContent.propTypes = propTypes;
