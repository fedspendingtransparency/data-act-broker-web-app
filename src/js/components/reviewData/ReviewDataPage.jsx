/**
 * ReviewDataPage.jsx
 * Created by Mike Bray 3/31/16
 */

import React from 'react';
import PropTypes from 'prop-types';
import Banner from 'components/SharedComponents/Banner';
import Footer from 'components/SharedComponents/FooterComponent';
import PublishedSubmissionWarningBanner from 'components/SharedComponents/PublishedSubmissionWarningBanner';
import ReviewDataContent from './ReviewDataContent';
import ReviewLoading from './ReviewLoading';

const propTypes = {
    data: PropTypes.object,
    submissionID: PropTypes.string,
    submission: PropTypes.object,
    testSubmission: PropTypes.bool
};

const defaultProps = {
    data: null,
    submission: null,
    testSubmission: false
};

export default class ReviewDataPage extends React.Component {
    render() {
        let currentComponent;
        const { submissionID } = this.props;

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
            <div className="review-data-page">
                {warningMessage}
                <Banner type="dabs" />
                {currentComponent}
                <Footer />
            </div>
        );
    }
}

ReviewDataPage.propTypes = propTypes;
ReviewDataPage.defaultProps = defaultProps;
