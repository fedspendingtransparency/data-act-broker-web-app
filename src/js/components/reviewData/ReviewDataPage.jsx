/**
 * ReviewDataPage.jsx
 * Created by Mike Bray 3/31/16
 */

import React from 'react'; 
import PropTypes from 'prop-types';
import Footer from '../SharedComponents/FooterComponent';

import ReviewDataContent from './ReviewDataContent';
import ReviewLoading from './ReviewLoading';
import PublishedSubmissionWarningBanner from '../../components/SharedComponents/PublishedSubmissionWarningBanner';

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
                {warningMessage}
                {currentComponent}
                <Footer />
            </div>
        );
    }
}

ReviewDataPage.propTypes = propTypes;
ReviewDataPage.defaultProps = defaultProps;
