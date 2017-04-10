/**
* ValidateDataPage.jsx
* Created by Katie Rose 1/4/16
**/

import React, { PropTypes } from 'react';
import { kGlobalConstants } from '../../GlobalConstants.js';
import Navbar from '../SharedComponents/navigation/NavigationComponent.jsx';
import Table from '../SharedComponents/table/TableComponent.jsx';
import SubmissionComponent from './../addData/SubmissionComponent.jsx';
import AddDataHeader from './../addData/AddDataHeader.jsx';
import Progress from '../SharedComponents/ProgressComponent.jsx';
import SubmitButton from '../SharedComponents/SubmitButton.jsx';
import MetaData from '../addData/AddDataMetaDisplay.jsx';
import FileComponent from '../addData/FileComponent.jsx';
import ValidateDataContent from './ValidateDataContent.jsx';

import ValidateDataContainer from '../../containers/validateData/ValidateDataContainer.jsx';

import * as ReviewHelper from '../../helpers/reviewHelper.js';

const propTypes = {
    submissionId: PropTypes.string,
    subID: PropTypes.string,
    csv_url: PropTypes.array,
    link_array: PropTypes.array
};

const defaultProps = {
    link_array: [null],
    subID: null
};

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
        ReviewHelper.fetchErrorReports(submissionID)
            .then((data) => {
                this.setState({ response: true, csv_url: data });
            })
            .catch((err) => {
                console.log(err + res);
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

class UnknownIDComponent extends React.Component {
    render() {
        return (
            <GetErrors />
        );
    }
}

export default class ValidateDataPage extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        let currentComponent;
        const submissionID = this.props.params.submissionID;

        if (!this.props.params.submissionID) {
            currentComponent = <UnknownIDComponent />;
        } else {
            currentComponent = <ValidateDataContainer submissionID={submissionID} />;
        }

        return (
            <div className="usa-da-validate-data-page">
                <Navbar activeTab="submissionGuide"/>
                <AddDataHeader submissionID={submissionID} />
                <div className="usa-da-content-step-block" name="content-top">
                    <div className="container center-block">
                        <div className="row">
                            <Progress currentStep={1} id={this.props.params.submissionID} />
                        </div>
                    </div>
                </div>
                {currentComponent}
            </div>
        );
    }
}
