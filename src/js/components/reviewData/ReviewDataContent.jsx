/**
 * ReviewDataContent.jsx
 * Created by Mike Bray 3/28/16
 **/

import React, { PropTypes } from 'react';
import { kGlobalConstants } from '../../GlobalConstants.js';
import SubmitButton from '../SharedComponents/SubmitButton.jsx';
import Request from 'superagent';

const propTypes = {
    submissionID: PropTypes.string
};

export default class ReviewDataContent extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            response: false,
            busy: false,
            status_response: null,
            file_response: null,
            csv_status: null
        };
    }

    render() {
        if (Object.keys(this.props.submission.validation).length > 0) {

            let items = fileTypes.map((type, index) => {
                return <ValidateDataFileComponent key={index} type={type} data={this.props.submission.validation} />;
            })

            const errorHeaders = ['File', 'Upload Status', 'CSV Validations'];
            return (
                <div className="container">
                    <div className="row center-block usa-da-submission-items">
                        <div className="usa-da-validate-items">
                            {items}
                        </div>
                    </div>
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

ReviewDataContent.propTypes = propTypes;
