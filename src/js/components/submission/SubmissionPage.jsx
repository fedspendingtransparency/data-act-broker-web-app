import React from 'react';
import PropTypes from 'prop-types';

import Navbar from 'components/SharedComponents/navigation/NavigationComponent';
import Progress from 'components/SharedComponents/Progress';
import DABSFABSErrorMessage from 'components/SharedComponents/DABSFABSErrorMessage';
import ReviewLoading from 'components/reviewData/ReviewLoading';
import SubmissionHeader from './SubmissionHeader';

const propTypes = {
    submissionID: PropTypes.string,
    setStep: PropTypes.func,
    errorFromStep: PropTypes.func,
    step: PropTypes.number,
    error: PropTypes.bool,
    errorMessage: PropTypes.string,
    loading: PropTypes.bool,
    submissionInfo: PropTypes.object
};

export default class SubmissionPage extends React.Component {
    loadingMessage() {
        return this.props.loading ? (
            <ReviewLoading />
        ) : null;
    }

    errorMessage() {
        const { errorMessage, error } = this.props;
        return error ? (<DABSFABSErrorMessage message={errorMessage} />) : null;
    }

    render() {
        const {
            loading,
            error,
            submissionID
        } = this.props;
        let content = "Content based on step";
        if (loading) content = this.loadingMessage();
        if (error) content = this.errorMessage();
        const step = this.props.step + 1;
        return (
            <div className="usa-da-submission-page">
                <Navbar activeTab="submissionGuide" type="dabs" />
                <SubmissionHeader {...this.props.submissionInfo} />
                <div className="usa-da-content-step-block" name="content-top">
                    <div className="container center-block">
                        <div className="row">
                            <Progress
                                currentStep={step}
                                id={submissionID} />
                        </div>
                    </div>
                </div>
                {content}
            </div>
        );
    }
}

SubmissionPage.propTypes = propTypes;
