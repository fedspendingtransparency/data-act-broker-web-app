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

const propTypes = {
    submissionID: PropTypes.string
};

const defaultProps = {
    submissionID: 0
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
        this.timer = setInterval(() => {
            this.sendRequest(this.props.submissionID);
        }, 1000 * 20);

        this.sendRequest(this.props.submissionID);
    }

    componentWillUnmount() {
        clearInterval(this.timer);
    }

    parseJSON(status) {
        const files = ['appropriations', 'award', 'award_financial', 'program_activity'];
        const statusData = [];

        for (const itemKey in status) {
            status[itemKey].job_id = itemKey;
        }

        const arr = Object.keys(status).map((k) => {
            return status[k];
        });

        let allFilesComplete = true;

        for (let i = 0; i < files.length; i++) {
            const info = [];
            const fileArr = arr.filter((el) => {
                return el.file_type === files[i];
            });

            if (fileArr.length > 0) {
                info.push(files[i]);
                info.push(fileArr.filter((el) => {
                    return el.job_type === 'file_upload';
                })[0].status);

                const csvUploadJob = fileArr.filter((el) => {
                    return el.job_type === 'csv_record_validation';
                })[0];

                if (csvUploadJob.status === 'waiting' || csvUploadJob.status === 'running') {
                    allFilesComplete = false;
                }

                if (csvUploadJob.status === 'finished') {
                    let header = "";

                    if (kGlobalConstants.LOCAL == true) {
                        header = kGlobalConstants.LOCAL_ROOT;
                    }

                    info.push(
                        <DownloadLinkSingle link={header + this.state.csv_url['job_' + csvUploadJob.job_id + '_error_url']}/>
                    );
                } else {
                    info.push(csvUploadJob.status);
                }
            }
            statusData.push(info);
        }

        if (allFilesComplete) {
            clearInterval(this.timer);
        }

        return (statusData);
    }

    sendRequest() {
        if (this.state.busy == false) {
            // Prevent this from being called if still processing data
            this.setState({busy: true});

            let context = this;
            const submissionID = this.props.submissionID;

            Request.post(kGlobalConstants.API + 'check_status/')
                .withCredentials()
                .send({'submission_id': submissionID})
                .end((errFile, res) => {
                    if (errFile) {
                        console.log(errFile + res);
                        context.setState({
                            busy: false
                        });
                    } else {
                        context.setState({
                            status_response: true,
                            csv_status: res.body
                        });

                        Request.post(kGlobalConstants.API + 'submission_error_reports/')
                            .withCredentials()
                            .send({'submission_id': submissionID})
                            .end((errFile, res) => {
                            if (errFile) {
                                console.log(errFile + res);
                                context.setState({
                                    busy: false
                                });
                            } else {
                                context.setState({
                                    busy: false,
                                    file_response: true,
                                    csv_url: res.body
                                });
                            }
                        });
                }
            });
        }
    }

    render() {
        if (this.state.status_response && this.state.file_response) {
            const statusData = this.parseJSON(this.state.csv_status);
            console.log(statusData);
            const errorHeaders = ['File', 'Upload Status', 'CSV Validations'];

            return (
                <div className="container">
                    <div className="row center-block usa-da-submission-items">
                        <div className="usa-da-validate-items">
                            <ValidateDataFileComponent />
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
ValidateDataContent.defaultProps = defaultProps;
