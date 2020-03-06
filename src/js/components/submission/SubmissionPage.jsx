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
import BannerRow from '../SharedComponents/BannerRow';

const propTypes = {
    submissionID: PropTypes.string,
    errorFromStep: PropTypes.func,
    error: PropTypes.bool,
    errorMessage: PropTypes.string,
    loading: PropTypes.bool,
    submissionInfo: PropTypes.object,
    currentStep: PropTypes.number
};

const defaultProps = {
    error: false,
    errorMessage: '',
    loading: true,
    submissionInfo: {},
    currentStep: 0
};

export default class SubmissionPage extends React.Component {
    render() {
        const {
            loading,
            error,
            errorMessage,
            submissionID,
            currentStep,
            submissionInfo
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
        const testBanner = submissionInfo.certified_submission ? (
            <BannerRow
                type="warning"
                header="This is a test submission since one has already been certified for this fiscal quarter."
                message={`You will not be able to certify this submission. To view the certified submission, [click here](/#/submission/${submissionInfo.certified_submission}).`} />
        ) : null;
        return (
            <div className="usa-da-submission-page">
                <Navbar activeTab="submissionGuide" type="dabs" />
                <main>
                    <SubmissionHeader {...submissionInfo} />
                    <div className="usa-da-content-step-block" name="content-top">
                        <div className="container center-block">
                            <div className="row">
                                <Progress
                                    currentStep={currentStep}
                                    id={submissionID} />
                            </div>
                        </div>
                    </div>
                    {testBanner}
                    {error ? (<DABSFABSErrorMessage message={errorMessage} />) : null}
                    {loading ? (<ReviewLoading />) : null}
                    {content}
                </main>
            </div>
        );
    }
}

SubmissionPage.propTypes = propTypes;
SubmissionPage.defaultProps = defaultProps;
