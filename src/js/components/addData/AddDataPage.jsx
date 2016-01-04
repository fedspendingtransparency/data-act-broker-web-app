/**
* AddDataPage.jsx
* Created by Katie Rose 12/7/15
**/

import React from 'react';
import Navbar from '../SharedComponents/NavigationComponent.jsx';
import Table from '../SharedComponents/TableComponent.jsx';
import Submission from './AddDataComponents.jsx';

class SubmissionPageHeader extends React.Component {
    render() {
        return (
            <div className="usa-da-content-dark">
                <div className="container">
                    <div className="row">
                        <div className="col-md-6">
                            <h1>Add New Data</h1>
                            <h3>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean euismod bibendum laoreet.
                                Proin gravida dolor sit amet lacus accumsan et viverra justo commodo. Proin sodales pulvinar
                                tempor. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.
                                Nam fermentum, nulla luctus pharetra vulputate, felis</h3>
                        </div>
                        <div className="col-md-6">

                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

class SubmissionContent extends React.Component {
    render() {
        return (
            <div className="usa-da-content-light-gray">
                <div className="container">
                    <div className="row">
                        <div>
                            <Submission/>
                        </div>
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

export default class SubmissionPage extends React.Component {
    render() {
        return (
            <div>
                <Navbar activeTab='addData'/>
                <SubmissionPageHeader />
                <SubmissionContent />
                <ErrorContent />
            </div>
        );
    }
}
