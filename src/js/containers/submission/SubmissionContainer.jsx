/**
 * SubmissionContainer.jsx
 * Created by Minahm Kim 6/29/17
 */

import React, { PropTypes } from 'react';
import { hashHistory } from 'react-router';
import { connect } from 'react-redux';
import { reduce } from 'lodash';

import * as SubmissionGuideHelper from '../../helpers/submissionGuideHelper';
import SubmissionPage from '../../components/submission/SubmissionPage';
import { routes } from '../../dataMapping/dabs/submission';

const propTypes = {
    params: PropTypes.object,
    routeParams: PropTypes.object
};

const defaultProps = {
    params: {},
    routeParams: {}
};
// by using completedSteps we allow users to
// transition from one step to another while in
// this container without have to make a call
// on every next step
export class SubmissionContainer extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isLoading: true,
            isError: false,
            errorMessage: '',
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
        this.errorFromStep = this.errorFromStep.bind(this);
        this.nextStep = this.nextStep.bind(this);
    }

    componentDidMount() {
        this.getSubmission();
    }

    componentDidUpdate(prevProps) {
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
                    originalStep: stepNumber
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
        const currentStepRouteType = this.currentRoute();
        // route param type
        if (routeTypeParam !== currentStepRouteType) {
            // get route type step number
            const newRouteIndex = routes.indexOf(routeTypeParam);
            // verify user is not navigating too far
            if (newRouteIndex > this.state.originalStep) {
                // verify this step has been completed
                // which we will then allow the user to navigate to that step
                if (this.state.completedSteps[newRouteIndex.toString()]) return newRouteIndex;
                return this.state.originalStep;
            }
            if (newRouteIndex !== -1) return newRouteIndex;
        }
        return currentStepNumber;
    }

    // any errors we were just logging from
    // step containers will set error
    errorFromStep(message) {
        this.setState({ isError: true, errorMessage: message });
    }

    // current route name
    currentRoute() {
        return routes[this.state.step];
    }
    // update route
    updateRoute() {
        const { submissionID } = this.props.params;
        return hashHistory.replace(`/submission/${submissionID}/${this.currentRoute()}`);
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
        const {
            isLoading,
            isError,
            errorMessage,
            step
        } = this.state;
        return (
            <SubmissionPage
                submissionID={this.props.params.submissionID}
                step={step}
                isLoading={isLoading}
                isError={isError}
                errorMessage={errorMessage}
                nextStep={this.nextStep}
                setStep={this.setStep}
                setStepAndRoute={this.setStepAndRoute} />
        );
    }
}

SubmissionContainer.propTypes = propTypes;
SubmissionContainer.defaultProps = defaultProps;

export default connect(
    (state) => ({ session: state.session })
)(SubmissionContainer);
