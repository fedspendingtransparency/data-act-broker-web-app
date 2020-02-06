/**
 * SubmissionContainer.jsx
 * Created by Minahm Kim 6/29/17
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import * as SubmissionGuideHelper from 'helpers/submissionGuideHelper';
import SubmissionPage from 'components/submission/SubmissionPage';
import { routes } from 'dataMapping/dabs/submission';

const propTypes = {
    computedMatch: PropTypes.object
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
            completedSteps: [
                false,
                false,
                false,
                false
            ],
            goToRoute: false
        };

        this.setStep = this.setStep.bind(this);
        this.errorFromStep = this.errorFromStep.bind(this);
    }

    componentDidMount() {
        const { type } = this.props.computedMatch.params;
        this.getSubmission(type);
    }

    componentDidUpdate(prevProps) {
        // check for ID change
        if (prevProps.computedMatch.params.submissionID !== this.props.computedMatch.params.submissionID) {
            this.getSubmission();
        }
        // check for route change
        const { type } = this.props.computedMatch.params;
        if (type !== prevProps.computedMatch.params.type) {
            const stepNumber = this.validateCurrentStepAndRouteType();
            this.setStep(stepNumber);
        }
    }

    setStep(step) {
        this.setState({
            step
        });
    }

    getSubmission(useCurrentStep = false) {
        this.setState({ isLoading: true, isError: false, errorMessage: '' });
        const params = this.props.computedMatch.params;
        SubmissionGuideHelper.getSubmissionPage(params.submissionID)
            .then((res) => {
                let stepNumber = parseInt(res.step, 10);
                // Convert to zero-indexed step
                stepNumber -= 1;
                if (useCurrentStep) {
                    const step = routes.indexOf(params.type);
                    return this.setState({
                        isLoading: false,
                        isError: false,
                        step,
                        originalStep: stepNumber
                    });
                }
                // Initial load of this submission, update the route to match the last completed step
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

    // since users can navigate via the url eg. /validateCrossFile
    // we need to verify a user's submission has completed a step
    validateCurrentStepAndRouteType() {
        const currentStepNumber = this.state.step;
        // FABs dont check anything
        if (currentStepNumber === 5) return currentStepNumber;
        // get submission step we're tyring to access via url change
        const routeTypeParam = this.props.computedMatch.params.type;
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
                if (this.state.completedSteps[newRouteIndex]) return newRouteIndex;
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

    updateRoute() {
        this.setState({
            goToRoute: true
        });
    }

    render() {
        const params = this.props.computedMatch.params;
        if (this.state.goToRoute) {
            return <Redirect to={`/submission/${params.submissionID}/${this.currentRoute()}`} />;
        }
        const {
            isLoading,
            isError,
            errorMessage,
            step
        } = this.state;
        return (
            <SubmissionPage
                submissionID={params.submissionID}
                step={step}
                isLoading={isLoading}
                isError={isError}
                errorMessage={errorMessage}
                setStep={this.setStep} />
        );
    }
}

SubmissionContainer.propTypes = propTypes;

export default connect(
    (state) => ({ session: state.session })
)(SubmissionContainer);
