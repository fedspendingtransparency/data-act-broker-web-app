/**
 * ReviewDataPage.jsx
 * Created by Mike Bray 3/31/16
 **/

import React, { PropTypes } from 'react';
import { kGlobalConstants } from '../../GlobalConstants.js';
import Navbar from '../SharedComponents/navigation/NavigationComponent.jsx';
import Table from '../SharedComponents/table/TableComponent.jsx';
import AddDataHeader from './../addData/AddDataHeader.jsx';
import Progress from '../SharedComponents/ProgressComponent.jsx';
import SubmitButton from '../SharedComponents/SubmitButton.jsx';
import Footer from '../SharedComponents/FooterComponent.jsx';

import ReviewDataContent from './ReviewDataContent.jsx';

class ReviewDataContentInvalid extends React.Component {
    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-md-12 usa-da-table-holder">
                        <h2>Enter the Submission ID to download validation errors.</h2>
                        <form className="form-inline">
                            <div className="form-group">
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

export default class ReviewDataPage extends React.Component {
    render() {
        let currentComponent;
        const submissionID = this.props.params.submissionID;

        if (!this.props.params.submissionID) {
            currentComponent = <ReviewDataContentInvalid />;
        } else {
            currentComponent = <ReviewDataContent submissionID={submissionID} />;
        }

        return (
            <div>
                <div className="usa-da-page-content">
                    <Navbar activeTab="addData"/>
                    <AddDataHeader />
                    <div className="usa-da-content-step-block" name="content-top">
                        <div className="container center-block">
                            <div className="row">
                                <Progress totalSteps={3} currentStep={3} />
                            </div>
                        </div>
                    </div>
                    {currentComponent}
                </div>
                <Footer />
            </div>
        );
    }
}
