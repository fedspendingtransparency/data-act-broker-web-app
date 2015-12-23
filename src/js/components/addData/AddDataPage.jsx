/**
* AddDataPage.jsx
* Created by Katie Rose 12/7/15
**/

import React from 'react';
import Navbar from '../NavigationComponents.jsx';
import Submission from './AddDataComponents.jsx';
import Table from '../SharedComponents/TableComponent.jsx';

class SubmissionContent extends React.Component {
    render() {
        return (
            <div className="usa-da-content">
                <h1>Please select a file.</h1>
                <div>
                    <Submission/>
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
            <div className="usa-da-content">
                <Table data={data} headers={errorHeaders} />
            </div>
        );
    }
}

export default class SubmissionPage extends React.Component {
    render() {
        return (
            <div>
                <Navbar />
                <SubmissionContent />
                <ErrorContent />
            </div>
        );
    }
}
