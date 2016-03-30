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
import Request from 'superagent';

import { fileTypes } from '../../containers/addData/fileTypes.js';

const propTypes = {
    submissionID: PropTypes.string
};


class DownloadLinkSingle extends React.Component {
    render() {
        return (
            <div><a href={this.props.link}>Download Errors</a></div>
        );
    }
}

export default class ValidateDataContent extends React.Component {
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

    componentDidMount() {
        // this.timer = setInterval(() => {
        //     this.sendRequest(this.props.submissionID);
        // }, 1000 * 20);

        // this.sendRequest(this.props.submissionID);
    }

    // componentWillUnmount() {
    //     clearInterval(this.timer);
    // }



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

ValidateDataContent.propTypes = propTypes;
