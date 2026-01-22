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

const SubmissionPage = ({
    error = false, errorMessage = '', loading = true, submissionInfo = {}, currentStep = 0, reverting = false, ...props
}) => {
        let content;
        switch (currentStep) {
            case 1:
                content = (
                    <ValidateDataContainer
                        submissionID={props.submissionID}
                        errorFromStep={props.errorFromStep} />
                );
                break;
            case 2:
                content = (
                    <GenerateFilesContainer
                        submissionID={props.submissionID}
                        errorFromStep={props.errorFromStep} />
                );
                break;
            case 3:
                content = (
                    <CrossFileContentContainer
                        submissionID={props.submissionID}
                        errorFromStep={props.errorFromStep}
                        publishStatus={submissionInfo.publish_status} />
                );
                break;
            case 4:
                content = <GenerateEFContainer submissionID={props.submissionID} errorFromStep={props.errorFromStep} />;
                break;
            case 5:
                content = (<ReviewDataContainer
                    submissionID={props.submissionID}
                    errorFromStep={props.errorFromStep}
                    testSubmission={submissionInfo.test_submission} />);
                break;
            default:
                content = null;
        }
        const subStatusBanner = (<SubmissionWarningBanner
            submissionInfo={submissionInfo}
            revertSubmission={props.revertSubmission}
            reverting={reverting} />);
        return (
            <div className="usa-da-submission-page">
                <Navbar activeTab="submissionGuide" type="dabs" />
                <main>
                    <SubmissionHeader {...submissionInfo} />
                    <Banner type="dabs" />
                    <div className="usa-da-content-step-block" name="content-top">
                        <div className="container center-block">
                            <div className="row">
                                <Progress
                                    currentStep={currentStep}
                                    id={props.submissionID} />
                            </div>
                        </div>
                    </div>
                    {subStatusBanner}
                    {error ? (<DABSFABSErrorMessage message={errorMessage} />) : null}
                    {loading ? (<ReviewLoading />) : null}
                    {content}
                </main>
            </div>
        );
};

SubmissionPage.propTypes = propTypes;

export default SubmissionPage;
