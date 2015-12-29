/**
* AddDataPage.jsx
* Created by Katie Rose 12/7/15
**/

import React from 'react';
import Navbar from '../NavigationComponents.jsx';
import SubmissionComponent from './AddDataComponents.jsx';
import Table from '../SharedComponents/TableComponent.jsx';
import DiscreteProgressBarComponent from '../SharedComponents/DiscreteProgressBarComponent.jsx';
import SubmitButton from '../SharedComponents/SubmitButton.jsx';

class SubmissionContent extends React.Component {
    render() {

        const files = [
            ['Appropriation', 'appropriation.csv', 'notUploaded'],
            ['Award', 'award.csv', 'notUploaded'],
            ['Award Financial', 'award_financial.csv', 'notUploaded'],
            ['Object Class Program Activity', 'ObjectClass_Program.csv', 'notUploaded']
        ];

        return (
            <div className="usa-da-content">
                <div>
                    <h1>Add New Data</h1>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean euismod bibendum laoreet. Proin gravida dolor sit amet lacus accumsan et viverra justo commodo. Proin sodales pulvinar tempor. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Nam fermentum, nulla luctus pharetra vulputate, felis tellus mollis orci, sed rhoncus sapien nunc eget odio.</p>
                </div>
                <div>
                    <SubmissionComponent files={files} />
                <SubmitButton buttonText="Upload & Validate CSV files" />
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
