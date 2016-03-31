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
            
            let items = fileTypes.map((type, index) => {
                return <ValidateDataFileComponent key={index} type={type} data={this.props.submission.validation} />;
            });

            let overlay = ''
            let displayOverlay = '';
            if (this.props.overlay) {
                // we'll need extra padding at the bottom of the page if the overlay is present
                displayOverlay = ' with-overlay';
                overlay = <ValidateDataOverlay />;
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
