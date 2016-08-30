/**
 * ReviewDataPage.jsx
 * Created by Mike Bray 3/31/16
 **/

import React, { PropTypes } from 'react';
import Navbar from '../SharedComponents/navigation/NavigationComponent.jsx';
import AddDataHeader from './../addData/AddDataHeader.jsx';
import Progress from '../SharedComponents/ProgressComponent.jsx';
import Footer from '../SharedComponents/FooterComponent.jsx';

import ReviewDataContent from './ReviewDataContent.jsx';
import ReviewLoading from './ReviewLoading.jsx';

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
        } 
        else if (!this.props.data.ready) {
            currentComponent = <ReviewLoading />;
        }
        else {
            currentComponent = <ReviewDataContent {...this.props} submissionID={submissionID} />;
        }

        return (
            <div className="usa-da-review-data-page">
                <div className="usa-da-site_wrap">
                    <div className="usa-da-page-content">
                        <Navbar activeTab="submissionGuide"/>
                        <AddDataHeader submissionID={submissionID} />
                        <div className="usa-da-content-step-block" name="content-top">
                            <div className="container center-block">
                                <div className="row">
                                    <Progress totalSteps={4} currentStep={4} />
                                </div>
                            </div>
                        </div>
                        {currentComponent}
                    </div>
                </div>
                <Footer />
            </div>
        );
    }
}
