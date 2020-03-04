import React from 'react';
import PropTypes from 'prop-types';

import Navbar from 'components/SharedComponents/navigation/NavigationComponent';
import Progress from 'components/SharedComponents/Progress';
import DABSFABSErrorMessage from 'components/SharedComponents/DABSFABSErrorMessage';
import ReviewLoading from 'components/reviewData/ReviewLoading';
// DABS components
import ValidateDataContainer from 'containers/validateData/ValidateDataContainer';
import GenerateFilesContainer from 'containers/generateFiles/GenerateFilesContainer';
import CrossFileContentContainer from 'containers/crossFile/CrossFileContentContainer';
import GenerateEFContainer from 'containers/generateEF/GenerateEFContainer';
import ReviewDataContainer from 'containers/review/ReviewDataContainer';

import SubmissionHeader from './SubmissionHeader';

const propTypes = {
    submissionID: PropTypes.string,
    errorFromStep: PropTypes.func,
    error: PropTypes.bool,
    errorMessage: PropTypes.string,
    loading: PropTypes.bool,
    submissionInfo: PropTypes.object,
    currentStep: PropTypes.number
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
            submissionID,
            currentStep
        } = this.props;
        let content;
        switch (currentStep) {
            case 1:
                content = <ValidateDataContainer submissionID={submissionID} errorFromStep={this.props.errorFromStep} />;
                break;
            case 2:
                content = <GenerateFilesContainer submissionID={submissionID} errorFromStep={this.props.errorFromStep} />;
                break;
            case 3:
                content = <CrossFileContentContainer submissionID={submissionID} errorFromStep={this.props.errorFromStep} />;
                break;
            case 4:
                content = <GenerateEFContainer submissionID={submissionID} errorFromStep={this.props.errorFromStep} />;
                break;
            case 5:
                content = <ReviewDataContainer submissionID={submissionID} errorFromStep={this.props.errorFromStep} />;
                break;
            default:
                content = null;
        }

        if (loading) content = this.loadingMessage();
        if (error) content = this.errorMessage();
        return (
            <div className="usa-da-submission-page">
                <Navbar activeTab="submissionGuide" type="dabs" />
                <SubmissionHeader {...this.props.submissionInfo} />
                <div className="usa-da-content-step-block" name="content-top">
                    <div className="container center-block">
                        <div className="row">
                            <Progress
                                currentStep={currentStep}
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
