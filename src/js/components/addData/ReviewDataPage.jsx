/**
* ReviewDataPage.jsx
* Created by Katie Rose 1/4/16
**/

import React, { PropTypes } from 'react';
import { kGlobalConstants } from '../../GlobalConstants.js';
import Navbar from '../SharedComponents/navigation/NavigationComponent.jsx';
import Table from '../SharedComponents/table/TableComponent.jsx';
import SubmissionContainer from './AddDataComponents.jsx';
import Progress from '../SharedComponents/ProgressComponent.jsx';
import SubmitButton from '../SharedComponents/SubmitButton.jsx';
import Request from 'superagent';

const propTypes = {
    submissionId: PropTypes.string,
    subID: PropTypes.string,
    csv_url: PropTypes.array,
    link_array: PropTypes.array,
};

const defaultProps = {
    link_array: [null]
};

class SubmissionPageHeader extends React.Component {
    render() {
        return (
            <div className="usa-da-content-dark">
                <div className="container">
                    <div className="row">
                        <div className="col-md-6">
                            <h1>Review Data</h1>
                            <h3>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean euismod bibendum laoreet.
                                Proin gravida dolor sit amet lacus accumsan et viverra justo commodo. Proin sodales pulvinar
                                tempor. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.
                                Nam fermentum, nulla luctus pharetra vulputate, felis</h3>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

class SubmissionContent extends React.Component {
    render() {
        const files = [
            ['Appropriation', 'appropriation.csv', '85'],
            ['Award', 'award.csv', '60'],
            ['Award Financial', 'award_financial.csv', '80'],
            ['Program Activity', 'ObjectClass_Program.csv', '80']
        ];

        return (
            <div>
                <div className="usa-da-content-light-gray">
                    <div className="container center-block">
                        <div className="row">
                            <Progress totalSteps="4" currentStep="2"/>
                        </div>
                    </div>
                </div>
                <div>
                    <div className="container center-block">
                        <div className="row">
                            <SubmissionContainer files={files} />
                        </div>
                        <div className="text-center">
                            <SubmitButton className="usa-da-button-bigger" buttonText="Return to file upload" />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}


class GetErrors extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            response: false
        };
    }

    // onClick function for submit button
    onClick() {
        this.sendRequest(this.state.submissionId);
    }

    // Set submission id from text input
    setSubmissionId(element) {
        this.setState({ submissionId: element.target.value });
    }

    sendRequest(submissionID) {
        const file = Request.post(kGlobalConstants.API + 'submission_error_reports/')
                           .withCredentials()
                           .send({ 'submission_id': submissionID });
        file.end((errFile, res) => {
            if (errFile) {
                console.log(errFile + res);
            } else {
                this.setState({ response: true, csv_url: res.body });
            }
        });
    }

    render() {
        let hasLink = null;

        if (this.state.response === true) {
            hasLink = <DownloadLink link_array={this.state.csv_url} />;
        }

        return (
            <div className="container">
                <div className="row">
                    <div className="col-md-12 usa-da-table-holder">
                        <h2>Enter the Submission ID to download validation errors.</h2>
                        <form className="form-inline">
                            <div className="form-group">
                                <label htmlFor="submission-id" className="sr-only">Submission ID</label>
                                <input className="form-control" id="submission-id" name="submission-id" placeholder="Submission ID" onChange={this.setSubmissionId.bind(this)} />
                                    <a className="btn btn-default" onClick={this.onClick.bind(this, this.props.submissionId)}>Review Data</a>
                                {hasLink}
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

class ErrorContent extends React.Component {
    render() {
        const data = [
            ['AvailabilityTypeCode', 'Required field AvailabilityTypeCode is missing', '17'],
            ['AllocationTransferAgencyIdentifier', 'AllocationTransferAgencyIdentifier is missing', '38']
        ];

        const errorHeaders = ['Field Name', 'Error', 'Number of Occurrences'];

        return (
            <div className="container">
                <div className="row">
                    <div className="col-md-12 usa-da-table-holder">
                        <Table data={data} headers={errorHeaders} />
                    </div>
                </div>
            </div>
        );
    }
}

class DownloadLink extends React.Component {
    render() {
        // create array of download file links from request response data
        const dlLinks = [];

        for (const key in this.props.link_array) {
            dlLinks.push(<a href={this.props.link_array[key]} >Download Errors</a>);
        }

        return (
            <div>{dlLinks}</div>
        );
    }
}

class DownloadLinkSingle extends React.Component {
    render() {
        return (
            <div><a href={this.props.link} >Download Errors</a></div>
        );
    }
}


class UnknownIDComponent extends React.Component {
    render() {
        return (
            <GetErrors />
        );
    }
}

class KnownIDComponent extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            response: false,
            busy : false
        };
    }

    componentDidMount() {
        this.timer = setInterval(() => {
              this.sendRequest(this.props.subID);
        },
        20*1000
      );
      this.sendRequest(this.props.subID);
    }

    componentWillUnmount() {
        //ensures timer will unmount
        clearInterval(this.timer);
    }

    parseJSON(status) {
        const files = ['appropriations', 'award', 'award_financial', 'procurement'];
        const statusData = [];

        for (const itemKey in status) {
            status[itemKey].job_id = itemKey;
        }

        const arr = Object.keys(status).map((k) => { return status[k]; });
        let allFilesComplete = true;

        for (let i = 0; i < files.length; i++) {
            const info = [];
            const fileArr = arr.filter((el) => { return el.file_type === files[i]; });
            if (fileArr.length > 0) {
                info.push(files[i]);
                info.push(fileArr.filter((el) => { return el.job_type === 'file_upload'; })[0].status);
                const csvUploadJob = fileArr.filter((el) => { return el.job_type === 'csv_record_validation'; })[0];
                if( csvUploadJob.status === 'waiting' || csvUploadJob.status === 'running' || csvUploadJob.status === 'waiting') {
                  allFilesComplete = false;
                }
                if (csvUploadJob.status === 'finished') {
                    info.push(<DownloadLinkSingle link={this.state.csv_url['job_' + csvUploadJob.job_id + '_error_url']} />);
                    console.log(this.state.csv_url['job_' + csvUploadJob.job_id + '_error_url']);
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
            this.setState({ busy:true});
            const status = Request.post(kGlobalConstants.API + 'check_status/')
                               .withCredentials()
                               .send({ 'submission_id': this.props.subID });
            const file = Request.post(kGlobalConstants.API + 'submission_error_reports/')
                               .withCredentials()
                               .send({ 'submission_id': this.props.subID });
            status.end((errFile, res) => {
                if (errFile) {
                    console.log(errFile + res);
                    this.setState({ busy:false });
                } else {
                    this.setState({ status_response: true, csv_status: res.body });
                }
            });
            file.end((errFile, res) => {
                if (errFile) {
                    console.log(errFile + res);
                    this.setState({ busy:false });
                } else {
                    this.setState({ busy: false, file_response: true, csv_url: res.body });
                }
            });
        }
    }

    render() {
        if (this.state.status_response && this.state.file_response) {
            const statusData = this.parseJSON(this.state.csv_status);
            const errorHeaders = ['File', 'Upload Status', 'CSV Validations'];

            return (
                <div className="container">
                    <div className="row">
                        <div className="col-md-12 usa-da-table-holder">
                            <Table data={statusData} headers={errorHeaders} />
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


export default class SubmissionPage extends React.Component {
    render() {
        let currentComponent;

        if (!this.props.subID) {
            currentComponent = <UnknownIDComponent />;
        } else {
            currentComponent = <KnownIDComponent subID={this.props.subID} />;
        }

        return (
            <div>
                <Navbar activeTab="reviewData"/>
                <SubmissionPageHeader />
                {currentComponent}
            </div>
        );
    }
}
