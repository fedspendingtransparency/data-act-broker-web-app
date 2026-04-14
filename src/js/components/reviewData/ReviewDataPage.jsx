/**
 * ReviewDataPage.jsx
 * Created by Mike Bray 3/31/16
 */

import PropTypes from 'prop-types';
import Footer from 'components/SharedComponents/FooterComponent';
import ReviewDataContent from './ReviewDataContent';
import ReviewLoading from './ReviewLoading';

const propTypes = {
    data: PropTypes.object,
    submissionID: PropTypes.string,
    submission: PropTypes.object,
    testSubmission: PropTypes.bool,
    loadData: PropTypes.func
};

const ReviewDataPage = ({data = null, submission = null, testSubmission = false, ...props}) => {
    let currentComponent;
    if (!data.ready) {
        currentComponent = <ReviewLoading />;
    }
    else {
        currentComponent = (
            <ReviewDataContent
                data={data}
                submission={submission}
                testSubmission={testSubmission}
                {...props} />
        );
    }

    return (
        <div className="review-data-page">
            {currentComponent}
            <Footer />
        </div>
    );
};

ReviewDataPage.propTypes = propTypes;
export default ReviewDataPage;
