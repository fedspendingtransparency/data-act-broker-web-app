import React from 'react';
import PropTypes from 'prop-types';
import Navbar from '../SharedComponents/navigation/NavigationComponent';
import Progress from '../SharedComponents/Progress';
import DABSFABSErrorMessage from '../../components/SharedComponents/DABSFABSErrorMessage';
import ReviewLoading from '../../components/reviewData/ReviewLoading';
// DABs components
import ValidateDataContainer from '../../containers/validateData/ValidateDataContainer';
import GenerateFilesContainer from '../../containers/generateFiles/GenerateFilesContainer';
import CrossFileContentContainer from '../../containers/crossFile/CrossFileContentContainer';
import GenerateEFContainer from '../../containers/generateEF/GenerateEFContainer';
import ReviewDataContainer from '../../containers/review/ReviewDataContainer';
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
    // all possible components DABS and FABS
    components() {
        const submissionID = this.props.submissionID;
        const { setStep, errorFromStep } = this.props;
        return [
            (<ValidateDataContainer
                submissionID={submissionID}
                errorFromStep={errorFromStep} />),
            (<GenerateFilesContainer
                submissionID={submissionID}
                errorFromStep={errorFromStep} />),
            (<CrossFileContentContainer
                submissionID={submissionID}
                errorFromStep={errorFromStep} />),
            (<GenerateEFContainer
                submissionID={submissionID}
                errorFromStep={errorFromStep} />),
            (<ReviewDataContainer
                {...this.props}
                params={{ submissionID }}
                setStep={setStep}
                errorFromStep={errorFromStep} />)
        ];
    }
    // current step component
    whichComponent() {
        return this.components()[this.props.step];
    }

    loadingMessage() {
        if (!this.props.loading) return null;
        return (
            <ReviewLoading />
        );
    }

    errorMessage() {
        const { errorMessage, error } = this.props;
        if (!error) return null;
        return (<DABSFABSErrorMessage message={errorMessage} />);
    }

    render() {
        const {
            loading,
            error,
            submissionID
        } = this.props;
        let content = this.whichComponent();
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
