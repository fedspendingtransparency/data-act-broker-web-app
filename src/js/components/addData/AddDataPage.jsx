/**
* AddDataPage.jsx
* Created by Katie Rose 12/7/15
**/

import React from 'react';
import Navbar from '../SharedComponents/NavigationComponent.jsx';
import TypeSelector from './AddDataTypeSelector.jsx';
import Table from '../SharedComponents/TableComponent.jsx';
import SubmissionContainer from './AddDataComponents.jsx';
import Progress from '../SharedComponents/ProgressComponent.jsx';
import SubmitButton from '../SharedComponents/SubmitButton.jsx';

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

        const files = [
            ['Appropriation', 'appropriation.csv', '0'],
            ['Award', 'award.csv', '0'],
            ['Award Financial', 'award_financial.csv', '0'],
            ['Object Class Program Activity', 'ObjectClass_Program.csv', '0']
        ];

        return (
            <div>
            <div className="usa-da-content-light-gray">
                <div className="container center-block">
                    <div className="row">
                        <TypeSelector />
                        <Progress totalSteps='4' currentStep='1'/>
                    </div>
                </div>
            </div>
            <div>
                <div className="container center-block">
                    <div className="row">
                        <SubmissionContainer files={files} />
                    </div>
                    <div className="text-center">
                        <SubmitButton className="usa-da-button-bigger" buttonText="Upload & Validate CSV files" />
                    </div>
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

            </div>
        );
    }
}
