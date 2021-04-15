import React from 'react';
import PropTypes from 'prop-types';

import Banner from 'components/SharedComponents/Banner';
import Navbar from 'components/SharedComponents/navigation/NavigationComponent';
import Progress from 'components/SharedComponents/Progress';
import DABSFABSErrorMessage from 'components/SharedComponents/DABSFABSErrorMessage';
import ReviewLoading from 'components/reviewData/ReviewLoading';
// DABS components
import ValidateDataContainer from 'containers/validateData/ValidateDataContainer';
import GenerateFilesContainer from 'containers/generateFiles/GenerateFilesContainer';
import CrossFileContentContainer from 'containers/crossFile/CrossFileContentContainer';
import GenerateEFContainer from 'containers/generateEF/GenerateEFContainer';
import ReviewDataContainer from 'containers/reviewData/ReviewDataContainer';

import SubmissionWarningBanner from 'components/SharedComponents/SubmissionWarningBanner';
import SubmissionHeader from './SubmissionHeader';

const propTypes = {
    submissionID: PropTypes.string,
    errorFromStep: PropTypes.func,
    error: PropTypes.bool,
    errorMessage: PropTypes.string,
    loading: PropTypes.bool,
    submissionInfo: PropTypes.object,
    currentStep: PropTypes.number,
    revertSubmission: PropTypes.func,
    reverting: PropTypes.bool
};

const defaultProps = {
    error: false,
    errorMessage: '',
    loading: true,
    submissionInfo: {},
    currentStep: 0,
    reverting: false
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
                content = (
                    <ValidateDataContainer
                        submissionID={submissionID}
                        errorFromStep={this.props.errorFromStep} />
                );
                break;
            case 2:
                content = (
                    <GenerateFilesContainer
                        submissionID={submissionID}
                        errorFromStep={this.props.errorFromStep} />
                );
                break;
            case 3:
                content = (
                    <CrossFileContentContainer
                        submissionID={submissionID}
                        errorFromStep={this.props.errorFromStep}
                        publishStatus={submissionInfo.publish_status} />
                );
                break;
            case 4:
                content = <GenerateEFContainer submissionID={submissionID} errorFromStep={this.props.errorFromStep} />;
                break;
            case 5:
                content = (<ReviewDataContainer
                    submissionID={submissionID}
                    errorFromStep={this.props.errorFromStep}
                    testSubmission={submissionInfo.test_submission} />);
                break;
            default:
                content = null;
        }
        const subStatusBanner = (<SubmissionWarningBanner
            submissionInfo={this.props.submissionInfo}
            revertSubmission={this.props.revertSubmission}
            reverting={this.props.reverting} />);
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
                    {subStatusBanner}
                    <Banner type="dabs" />
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
