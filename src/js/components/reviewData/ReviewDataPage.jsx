/**
 * ReviewDataPage.jsx
 * Created by Mike Bray 3/31/16
 */

import React, { PropTypes } from 'react';
import Navbar from '../SharedComponents/navigation/NavigationComponent';
import AddDataHeader from './../addData/AddDataHeader';
import Progress from '../SharedComponents/ProgressComponent';
import Footer from '../SharedComponents/FooterComponent';

import ReviewDataContent from './ReviewDataContent';
import ReviewLoading from './ReviewLoading';
import PublishedSubmissionWarningBanner from '../../components/SharedComponents/PublishedSubmissionWarningBanner';
import Banner from '../../components/SharedComponents/Banner';

const propTypes = {
    data: PropTypes.object,
    params: PropTypes.object,
    route: PropTypes.object,
    submission: PropTypes.object
};

const defaultProps = {
    data: null,
    params: null,
    route: null,
    submission: null
};

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
        if (this.props.submission.publishStatus !== "unpublished") {
            warningMessage = <PublishedSubmissionWarningBanner />;
        }

        return (
            <div className="usa-da-review-data-page">
                <div className="usa-da-site_wrap">
                    <div className="usa-da-page-content">
                        <Navbar activeTab="submissionGuide" type={this.props.route.type} />
                        <AddDataHeader submissionID={submissionID} />
                        <div className="usa-da-content-step-block" name="content-top">
                            <div className="container center-block">
                                <div className="row">
                                    <Progress currentStep={5} id={this.props.params.submissionID} />
                                </div>
                            </div>
                        </div>
                        {warningMessage}
                        <Banner type="dabs" />
                        {currentComponent}
                    </div>
                </div>
                <Footer />
            </div>
        );
    }
}

ReviewDataPage.propTypes = propTypes;
ReviewDataPage.defaultProps = defaultProps;
