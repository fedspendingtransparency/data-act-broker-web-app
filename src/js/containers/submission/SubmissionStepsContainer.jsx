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
            stepLoading: true,
            metadataLoading: true,
            error: false,
            errorMessage: '',
            submissionInfo: {},
            currentStep: 0
        };

        this.errorFromStep = this.errorFromStep.bind(this);
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
        if (stepNumber) {
            // check for ID change
            if (prevProps.computedMatch.params.submissionID !== submissionID) {
                this.getSubmission();
                this.getOriginalStep(stepNumber);
            }
            else if (prevProps.computedMatch.params.step !== step) {
                // A new step has been specified via URL
                this.getOriginalStep(stepNumber);
            }
        }
        else {
            // invalid url
            this.props.history.push('/404');
        }
    }

    componentWillUnmount() {
        this.resetStep();
    }

    getSubmission() {
        this.setState({
            metadataLoading: true
        });
        const { submissionID } = this.props.computedMatch.params;
        ReviewHelper.fetchSubmissionMetadata(submissionID, 'dabs')
            .then((data) => {
                this.setState({
                    submissionInfo: data,
                    metadataLoading: false
                });
            })
            .catch((error) => {
                console.error(error);
            });
    }

    getOriginalStep(stepNumber) {
        this.setState({
            stepLoading: true
        });
        const params = this.props.computedMatch.params;
        SubmissionGuideHelper.getSubmissionPage(params.submissionID)
            .then((res) => {
                const originalStep = parseInt(res.step, 10);
                let currentStep = originalStep;
                if (stepNumber && stepNumber <= originalStep) {
                    currentStep = stepNumber;
                }
                this.setState(
                    {
                        stepLoading: false,
                        error: false,
                        errorMessage: '',
                        currentStep
                    },
                    () => {
                        if (!stepNumber || stepNumber > originalStep) {
                            const route = routes[originalStep - 1];
                            this.props.history.replace(`/submission/${params.submissionID}/${route}`);
                        }
                    }
                );
            })
            .catch((err) => {
                const { message } = err.body;
                this.setState({
                    stepLoading: false,
                    error: true,
                    errorMessage: message,
                    currentStep: 0
                });
            });
    }

    errorFromStep(errorMessage) {
        this.setState({
            error: true,
            errorMessage
        });
    }

    resetStep() {
        this.setState({
            currentStep: 0
        });
    }

    render() {
        const { submissionID } = this.props.computedMatch.params;
        return (
            <SubmissionPage
                submissionID={submissionID}
                {...this.state}
                errorFromStep={this.errorFromStep}
                loading={this.state.metadataLoading || this.state.stepLoading} />
        );
    }
}

SubmissionStepsContainer.propTypes = propTypes;

export default connect((state) => ({
    session: state.session
}))(SubmissionStepsContainer);
