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
import PublishedSubmissionWarningBanner from '../../components/SharedComponents/PublishedSubmissionWarningBanner.jsx';
import GTASBanner from '../../components/SharedComponents/GTASWarningBanner.jsx';

export default class ReviewDataPage extends React.Component {
    render() {
        let currentComponent;
        const submissionID = this.props.params.submissionID;

        if (!this.props.data.ready) {
            currentComponent = <ReviewLoading />;
        }
        else {
            currentComponent = <ReviewDataContent {...this.props} submissionID={submissionID} />;
        }

        let warningMessage = null;
        if(this.props.submission.publishStatus !== "unpublished") {
            warningMessage = <PublishedSubmissionWarningBanner />;
        }

        let gtasWarning = null;
        if(this.props.data.gtas) {
            gtasWarning = <GTASBanner data={this.props.data.gtas}/>
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
                                    <Progress currentStep={5} id={this.props.params.submissionID} />
                                </div>
                            </div>
                        </div>
                        {warningMessage}
                        {gtasWarning}
                        {currentComponent}
                    </div>
                </div>
                <Footer />
            </div>
        );
    }
}
