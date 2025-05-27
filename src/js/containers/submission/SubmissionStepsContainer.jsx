/**
 * SubmissionStepsContainer.jsx
 * Created by Lizzie Salita 2/27/20
 */

import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as uploadActions from 'redux/actions/uploadActions';
import * as SubmissionGuideHelper from 'helpers/submissionGuideHelper';
import * as ReviewHelper from 'helpers/reviewHelper';
import SubmissionPage from 'components/submission/SubmissionPage';
import { routes, steps } from 'dataMapping/dabs/submission';

const propTypes = {
    computedMatch: PropTypes.object,
    history: PropTypes.object,
    submissionInfo: PropTypes.object,
    setInfo: PropTypes.func
};

export class SubmissionStepsContainer extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            stepLoading: true,
            metadataLoading: true,
            error: false,
            errorMessage: '',
            currentStep: 0,
            reverting: false
        };

        this.errorFromStep = this.errorFromStep.bind(this);
        this.revertSubmission = this.revertSubmission.bind(this);
    }

    componentDidMount() {
        const { step } = this.props.computedMatch.params;
        this.getSubmissionInfo();
        const stepNumber = steps[step];
        this.getOriginalStep(stepNumber);
    }

    componentDidUpdate(prevProps) {
        const { submissionID, step } = this.props.computedMatch.params;
        const stepNumber = steps[step];
        if (stepNumber) {
            // check for ID change
            if (prevProps.computedMatch.params.submissionID !== submissionID) {
                this.getSubmissionInfo();
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

    getSubmissionInfo() {
        this.setState({
            metadataLoading: true
        });
        const { submissionID } = this.props.computedMatch.params;
        ReviewHelper.fetchSubmissionMetadata(submissionID)
            .then((res) => {
                this.props.setSubmissionPublishStatus(res.data.publish_status);
                this.props.setInfo(res.data);
                this.setState({
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
                const originalStep = parseInt(res.data.step, 10);
                if (originalStep === 6) {
                    this.setState({
                        stepLoading: false,
                        error: true,
                        errorMessage: 'This is a FABS ID. Please navigate to FABS.'
                    });
                }
                else {
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
                }
            })
            .catch((err) => {
                this.setState({
                    stepLoading: false,
                    error: true,
                    errorMessage: err.response.data.message,
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

    revertSubmission(e) {
        e.preventDefault();
        const savedStep = this.state.currentStep;
        this.setState({
            currentStep: 0,
            reverting: true
        });
        ReviewHelper.revertToCertified(this.props.computedMatch.params.submissionID)
            .then(() => {
                this.getSubmissionInfo();
                this.setState({
                    currentStep: savedStep,
                    reverting: false
                });
            })
            .catch((err) => {
                const { message } = err.response.data;
                this.setState({
                    error: true,
                    errorMessage: message,
                    currentStep: savedStep,
                    reverting: false
                });
            });
    }

    render() {
        const { submissionID } = this.props.computedMatch.params;
        return (
            <SubmissionPage
                submissionID={submissionID}
                {...this.state}
                errorFromStep={this.errorFromStep}
                loading={this.state.metadataLoading || this.state.stepLoading}
                submissionInfo={this.props.submissionInfo}
                revertSubmission={this.revertSubmission} />
        );
    }
}

SubmissionStepsContainer.propTypes = propTypes;

export default connect(
    (state) => ({
        session: state.session,
        submissionInfo: state.submission.info
    }),
    (dispatch) => bindActionCreators(uploadActions, dispatch)
)(SubmissionStepsContainer);
