/**
* ReviewDataPage.jsx
* Created by Katie Rose 1/4/16
**/

import React, { PropTypes } from 'react';
import Navbar from '../SharedComponents/NavigationComponent.jsx';
import Table from '../SharedComponents/TableComponent.jsx';
import SubmissionContainer from './AddDataComponents.jsx';
import Progress from '../SharedComponents/ProgressComponent.jsx';
import SubmitButton from '../SharedComponents/SubmitButton.jsx';
import TextInputComponent from '../SharedComponents/TextInputComponent.jsx';;
import Request from 'superagent';

const propTypes = {
    submissionId: PropTypes.string,
    csv_url: PropTypes.array,
    link_array: PropTypes.array
};

const defaultProps = {
    link_array: [null]
};


const API_URL = 'http://ec2-54-173-199-34.compute-1.amazonaws.com:80/v1/';

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
    onClick(element,submissionId) {
        const self = this;
        self.sendRequest(self.state.submissionId);
    }

    // Set submission id from text input 
    setSubmissionId(element) {
        const self = this;
        self.setState({submissionId: element.target.value});
    }

    sendRequest(submission_id) {
        const self = this;
        const file = Request.post(API_URL + 'submission_error_reports/')
                           .withCredentials()
                           .send({ 'submission_id': submission_id });
                           console.log(file);                           
        file.end(function handleFileResponse(errFile, res) {
            if (errFile) {
                console.log(errFile + res);
            } else {
                self.setState({response: true, csv_url: res.body});
            }
        });

    }

    render () {
        let has_link
        if (this.state.response == true) { has_link = <DownloadLink link_array={this.state.csv_url} /> }
        else { has_link = null; }

        return(
            <div className="container">
                <div className="row">
                    <div className="col-md-12 usa-da-table-holder">
                        <h2>Enter the Submission ID to download validation errors.</h2>
                        <form className="form-inline">
                            <div className="form-group">
                                <label htmlFor="submission-id" className="sr-only">Submission ID</label>
                                <input className="form-control" id="submission-id" name="submission-id" placeholder="Submission ID" onChange={this.setSubmissionId.bind(this)} />
                                    <a className="btn btn-default" onClick={this.onClick.bind(this, this.props.submissionId)}>Review Data</a>
                                {has_link}
                            </div>
                        </form>
                    </div>
                </div>
            </div>

        )
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
    constructor(props) {
        super(props);

    }

    render() {
        // create array of download file links from request response data
        const dl_links = [];
        for (var key in this.props.link_array) {
            dl_links.push(<a href={this.props.link_array[key]} >Download Errors</a>);
        }
        return (
            <div>{dl_links}</div>
        );
    }

}

export default class SubmissionPage extends React.Component {
    render() {
        return (
            <div>
                <Navbar activeTab="addData"/>
                <SubmissionPageHeader />
                <GetErrors />
            </div>
        );
    }
}
