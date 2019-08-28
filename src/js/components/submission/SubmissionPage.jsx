import React from 'react'; 
import PropTypes from 'prop-types';
import Navbar from '../SharedComponents/navigation/NavigationComponent';
import AddDataHeader from './../addData/AddDataHeader';
import Progress from '../SharedComponents/Progress';
import DABSFABSErrorMessage from '../../components/SharedComponents/DABSFABSErrorMessage';
import ReviewLoading from '../../components/reviewData/ReviewLoading';
import { classNames } from '../../dataMapping/dabs/submission';
// DABs components
import ValidateDataContainer from '../../containers/validateData/ValidateDataContainer';
import GenerateFilesContainer from '../../containers/generateFiles/GenerateFilesContainer';
import CrossFileContentContainer from '../../containers/crossFile/CrossFileContentContainer';
import GenerateEFContainer from '../../containers/generateEF/GenerateEFContainer';
import ReviewDataContainer from '../../containers/review/ReviewDataContainer';

const propTypes = {
    submissionID: PropTypes.string,
    nextStep: PropTypes.func,
    setStep: PropTypes.func,
    setStepAndRoute: PropTypes.func,
    errorFromStep: PropTypes.func,
    step: PropTypes.number,
    isError: PropTypes.bool,
    errorMessage: PropTypes.string,
    isLoading: PropTypes.bool
};

export default class SubmissionPage extends React.Component {
    // all possible components DABS and FABS
    components() {
        const submissionID = this.props.submissionID;
        const { nextStep, setStep, errorFromStep } = this.props;
        return [
            (<ValidateDataContainer
                submissionID={submissionID}
                nextStep={nextStep}
                errorFromStep={errorFromStep} />),
            (<GenerateFilesContainer
                submissionID={submissionID}
                nextStep={nextStep}
                errorFromStep={errorFromStep} />),
            (<CrossFileContentContainer
                submissionID={submissionID}
                nextStep={nextStep}
                errorFromStep={errorFromStep} />),
            (<GenerateEFContainer
                submissionID={submissionID}
                nextStep={nextStep}
                errorFromStep={errorFromStep} />),
            (<ReviewDataContainer
                {...this.props}
                params={{ submissionID }}
                setStep={setStep}
                errorFromStep={errorFromStep} />)
        ];
    }
    // get current component className
    whichClassName() {
        return classNames[this.props.step];
    }
    // current step component
    whichComponent() {
        return this.components()[this.props.step];
    }

    loadingMessage() {
        if (!this.props.isLoading) return null;
        return (
            <ReviewLoading />
        );
    }

    errorMessage() {
        const { errorMessage, isError } = this.props;
        if (!isError) return null;
        return (<DABSFABSErrorMessage message={errorMessage} />);
    }

    render() {
        const {
            isLoading,
            isError,
            setStepAndRoute,
            submissionID
        } = this.props;
        let content = this.whichComponent();
        if (isLoading) content = this.loadingMessage();
        if (isError) content = this.errorMessage();
        const step = this.props.step + 1;
        const className = this.whichClassName();
        return (
            <div className={className}>
                <Navbar activeTab="submissionGuide" type="dabs" />
                <AddDataHeader submissionID={submissionID} />
                <div className="usa-da-content-step-block" name="content-top">
                    <div className="container center-block">
                        <div className="row">
                            <Progress
                                currentStep={step}
                                id={submissionID}
                                setStep={setStepAndRoute} />
                        </div>
                    </div>
                </div>
                {content}
            </div>
        );
    }
}

SubmissionPage.propTypes = propTypes;
