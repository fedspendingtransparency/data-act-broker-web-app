/**
 * SubmissionContainer.jsx
 * Created by Minahm Kim 6/29/17
 */

import React, { PropTypes } from 'react';
import { hashHistory } from 'react-router';
import { connect } from 'react-redux';
import { reduce } from 'lodash';
import Navbar from '../../components/SharedComponents/navigation/NavigationComponent';
import Progress from '../../components/SharedComponents/ProgressComponent';
import AddDataHeader from './../../components/addData/AddDataHeader';
import * as SubmissionGuideHelper from '../../helpers/submissionGuideHelper';
import LoadingPage from '../../components/submission/SubmissionPage';
import DABSFABSErrorMessage from '../../components/SharedComponents/DABSFABSErrorMessage';
// DABs components
import ValidateDataContainer from '../../containers/validateData/ValidateDataContainer';
import GenerateFilesContainer from '../../containers/generateFiles/GenerateFilesContainer';
import CrossFileContentContainer from '../../containers/crossFile/CrossFileContentContainer';
import GenerateEFContainer from '../../containers/generateEF/GenerateEFContainer';
import ReviewDataContainer from '../../containers/review/ReviewDataContainer';

const propTypes = {
    params: PropTypes.object,
    route: PropTypes.object,
    routeParams: PropTypes.object
};

const defaultProps = {
    params: {},
    route: {},
    routeParams: {}
};
// by using completedSteps we allow users to
// transition from one step to another while in
// this container without have to make a call
// on every next step
class SubmissionContainer extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isLoading: true,
            isError: false,
            errorMessage: '',
            nextStep: false,
            step: 0,
            originalStep: 0,
            completedSteps: {
                0: false,
                1: false,
                2: false,
                3: false
            }
        };

        this.setStepAndRoute = this.setStepAndRoute.bind(this);
        this.setStep = this.setStep.bind(this);
        this.errorMessage = this.errorMessage.bind(this);
        this.errorFromStep = this.errorFromStep.bind(this);
        this.nextStep = this.nextStep.bind(this);
    }

    componentDidMount() {
        this.getSubmission();
    }

    componentDidUpdate(prevProps) {
        if (this.state.nextStep) return;
        // check for ID change
        if (prevProps.params.submissionID !== this.props.params.submissionID) {
            this.getSubmission();
        }
        // check for route change
        const { type } = this.props.routeParams;
        if (type !== prevProps.routeParams.type) {
            const stepNumber = this.validateCurrentStepAndRouteType(this.state.step);
            this.setStepAndRoute(stepNumber);
        }
    }

    setStep(step) {
        this.setState({
            step
        });
    }

    setStepAndRoute(step) {
        this.setState({
            step
        }, () => this.updateRoute());
    }


    getSubmission() {
        this.setState({ isLoading: true, isError: false, errorMessage: '' });
        SubmissionGuideHelper.getSubmissionPage(this.props.params.submissionID)
            .then((res) => {
                let stepNumber = parseInt(res.step, 10);
                stepNumber -= 1;
                // check for route :type param
                // since users can use a different type
                // than the submissions current step
                stepNumber = this.validateCurrentStepAndRouteType(stepNumber);
                return this.setState({
                    isLoading: false,
                    isError: false,
                    step: stepNumber,
                    originalStep: stepNumber,
                    nextStep: false
                }, () => this.updateRoute());
            })
            .catch((err) => {
                const { message } = err.body;
                this.setState({ isError: true, errorMessage: message });
            });
    }
    // validate a user did not send a different step
    // than the submission's current step
    validateCurrentStepAndRouteType(currentStepNumber) {
        // let theStep = currentStepNumber;
        // FABs dont check anything
        if (currentStepNumber === 5) return currentStepNumber;
        // get submission step from url
        const routeTypeParam = this.props.routeParams.type;
        // current route step name
        const currentStepRouteType = this.routes()[currentStepNumber];
        // route param type
        if (routeTypeParam !== currentStepRouteType) {
            // get route type step number
            const newRouteIndex = this.routes().indexOf(routeTypeParam);
            // verify user is not navigating too far
            if (newRouteIndex > this.state.originalStep) {
                if (this.state.completedSteps[newRouteIndex.toString()]) return newRouteIndex;
                return this.state.originalStep;
            }
            if (newRouteIndex !== -1) return newRouteIndex;
        }
        return currentStepNumber;
    }

    loadingMessage() {
        const { isLoading } = this.state;
        const { params } = this.props;
        if (!isLoading) return null;
        return (
            <LoadingPage
                {...this.props}
                submissionID={params.submissionID} />
        );
    }
    // any errors we were just logging from
    // step containers will set error
    errorFromStep(message) {
        this.setState({ isError: true, errorMessage: message });
    }

    errorMessage() {
        const { errorMessage, isError } = this.state;
        if (!isError) return null;
        return (<DABSFABSErrorMessage message={errorMessage} />);
    }
    // all possible routes DABS and FABS
    routes() {
        return [
            'validateData',
            'generateFiles',
            'validateCrossFile',
            'generateEF',
            'reviewData'
        ];
    }
    // all possible components DABS and FABS
    components() {
        const submissionID = this.props.params.submissionID;
        return [
            (<ValidateDataContainer
                submissionID={submissionID}
                nextStep={this.nextStep}
                errorFromStep={this.errorFromStep} />),
            (<GenerateFilesContainer
                submissionID={submissionID}
                nextStep={this.nextStep}
                errorFromStep={this.errorFromStep} />),
            (<CrossFileContentContainer
                submissionID={submissionID}
                nextStep={this.nextStep}
                errorFromStep={this.errorFromStep} />),
            (<GenerateEFContainer
                submissionID={submissionID}
                nextStep={this.nextStep}
                errorFromStep={this.errorFromStep} />),
            (<ReviewDataContainer
                {...this.props}
                params={{ submissionID }}
                setStep={this.setStep}
                errorFromStep={this.errorFromStep} />)
        ];
    }
    // component's classNames
    classNames() {
        return [
            "usa-da-validate-data-page",
            "usa-da-generate-files-page",
            "usa-da-cross-file-page",
            "usa-da-generate-ef-page",
            "usa-da-review-data-page"
        ];
    }
    // get current component className
    whichClassName() {
        return this.classNames()[this.state.step];
    }
    // current step component
    whichComponent() {
        return this.components()[this.state.step];
    }
    // current route name
    whichRoute() {
        return this.routes()[this.state.step];
    }
    // update route
    updateRoute() {
        const { submissionID } = this.props.params;
        return hashHistory.replace(`/submission/${submissionID}/${this.whichRoute()}`);
    }
    // clicked next button in child Overlay components
    // add 1 to step
    nextStep() {
        let step = this.state.step;
        step += 1;
        const completedSteps = reduce(this.state.completedSteps, (acc, value, key) => {
            if (step.toString() === key) acc[key] = true;
            return acc;
        }, this.state.completedSteps);
        this.setState({ step, completedSteps }, this.updateRoute);
    }

    render() {
        const { isLoading, isError } = this.state;
        let content = this.whichComponent();
        if (isLoading) content = this.loadingMessage();
        if (isError) content = this.errorMessage();
        const submissionID = this.props.params.submissionID;
        const step = this.state.step + 1;
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
                                setStep={this.setStepAndRoute} />
                        </div>
                    </div>
                </div>
                {content}
            </div>
        );
    }
}

SubmissionContainer.propTypes = propTypes;
SubmissionContainer.defaultProps = defaultProps;

export default connect(
    (state) => ({ session: state.session })
)(SubmissionContainer);
