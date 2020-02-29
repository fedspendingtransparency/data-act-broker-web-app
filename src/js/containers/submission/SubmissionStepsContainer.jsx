/**
 * SubmissionStepsContainer.jsx
 * Created by Lizzie Salita 2/27/20
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import * as SubmissionGuideHelper from 'helpers/submissionGuideHelper';
import * as ReviewHelper from 'helpers/reviewHelper';
import SubmissionPage from 'components/submission/SubmissionPage';
import { routes, steps } from 'dataMapping/dabs/submission';

const propTypes = {
    computedMatch: PropTypes.object,
    history: PropTypes.object
};

export class SubmissionStepsContainer extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            loading: true,
            error: false,
            errorMessage: '',
            submissionInfo: {},
            originalStep: 0,
            currentStep: 0,
            lastCompletedStep: 0
        };

        this.setStep = this.setStep.bind(this);
    }

    componentDidMount() {
        const { step } = this.props.computedMatch.params;
        this.getSubmission();
        const stepNumber = steps[step];
        this.getOriginalStep(stepNumber);
    }

    componentDidUpdate(prevProps) {
        const { submissionID, step } = this.props.computedMatch.params;
        const stepNumber = steps[step];
        // check for ID change
        if (prevProps.computedMatch.params.submissionID !== submissionID) {
            this.getSubmission();
            this.getOriginalStep(stepNumber);
        }
        else if (prevProps.computedMatch.params.step !== step) {
            // A new step has been specified via URL
            this.validateStep(stepNumber);
        }
    }

    componentWillUnmount() {
        this.resetSteps();
    }

    getSubmission() {
        this.setState({ isLoading: true, isError: false, errorMessage: '' });
        const { submissionID } = this.props.computedMatch.params;
        ReviewHelper.fetchSubmissionMetadata(submissionID, 'dabs')
            .then((data) => {
                this.setState({
                    submissionInfo: data
                });
            })
            .catch((error) => {
                console.error(error);
            });
    }

    getOriginalStep(stepNumber) {
        const params = this.props.computedMatch.params;
        SubmissionGuideHelper.getSubmissionPage(params.submissionID)
            .then((res) => {
                const originalStep = parseInt(res.step, 10);
                let currentStep = originalStep;
                if (stepNumber && stepNumber <= originalStep) {
                    currentStep = stepNumber;
                }
                this.setState({
                    loading: false,
                    error: false,
                    errorMessage: '',
                    originalStep,
                    lastCompletedStep: currentStep,
                    currentStep
                }, () => {
                    if (!stepNumber || stepNumber > originalStep) {
                        const route = routes[originalStep - 1];
                        this.props.history.push(`/submission/${params.submissionID}/${route}`);
                    }
                });
            })
            .catch((err) => {
                const { message } = err.body;
                this.setState({
                    loading: false,
                    error: true,
                    errorMessage: message
                });
            });
    }

    setStep(step) {
        if (step <= this.state.lastCompletedStep && step !== this.state.currentStep) {
            this.setState({
                currentStep: step,
                lastCompletedStep: step
            });
        }
    }

    resetSteps() {
        this.setState({
            originalStep: 0,
            currentStep: 0,
            lastCompletedStep: 0
        });
    }

    validateStep(step) {
        const { submissionID } = this.props.computedMatch.params;
        if (step > this.state.lastCompletedStep) {
            const route = routes[this.state.lastCompletedStep - 1];
            this.props.history.push(`/submission/${submissionID}/${route}`);
        }
        else {
            this.setStep(step);
        }
    }

    render() {
        const { submissionID } = this.props.computedMatch.params;
        return (
            <SubmissionPage
                submissionID={submissionID}
                {...this.state} />
        );
    }
}

SubmissionStepsContainer.propTypes = propTypes;

export default connect(
    (state) => ({
        session: state.session
    }),
)(SubmissionStepsContainer);
