/**
 * SubmissionStepsContainer.jsx
 * Created by Lizzie Salita 2/27/20
 */

import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { useParams, useNavigate } from 'react-router';

import * as uploadActions from 'redux/actions/uploadActions';
import * as SubmissionGuideHelper from 'helpers/submissionGuideHelper';
import * as ReviewHelper from 'helpers/reviewHelper';
import SubmissionPage from 'components/submission/SubmissionPage';
import { routes, steps } from 'dataMapping/dabs/submission';

const propTypes = {
    submissionInfo: PropTypes.object,
    setInfo: PropTypes.func
};

const SubmissionStepsContainer = (props) => {
    const [stepLoading, setStepLoading] = useState(true);
    const [metadataLoading, setMetadataLoading] = useState(true);
    const [hasError, setHasError] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [currentStep, setCurrentStep] = useState(0);
    const [reverting, setReverting] = useState(false);
    const params = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        getSubmissionInfo();
        getOriginalStep(steps[params.step]);
    }, []);

    // if submission ID changes, get the submission info again
    useEffect(() => {
        getSubmissionInfo();
    }, [params.submissionID]);

    // if the step changes, get the new step
    useEffect(() => {
        const stepNumber = steps[params.step];
        if (stepNumber) {
            getOriginalStep(stepNumber);
        }
        else {
            navigate('/404');
        }
    }, [params.step]);

    // if the "highest" step available in the submission is lower than the step in the url, replace the url
    useEffect(() => {
        if (currentStep > 0 && steps[params.step] > currentStep) {
            navigate(`/submission/${params.submissionID}/${routes[currentStep - 1]}`);
        }
    }, [currentStep]);

    const getSubmissionInfo = () => {
        setMetadataLoading(true);
        ReviewHelper.fetchSubmissionMetadata(params.submissionID)
            .then((res) => {
                props.setSubmissionPublishStatus(res.data.publish_status);
                props.setInfo(res.data);
                setMetadataLoading(false);
            })
            .catch((error) => {
                console.error(error);
            });
    };

    const getOriginalStep = (stepNumber) => {
        setStepLoading(true);
        SubmissionGuideHelper.getSubmissionPage(params.submissionID)
            .then((res) => {
                const originalStep = parseInt(res.data.step, 10);
                if (originalStep === 6) {
                    setStepLoading(false);
                    setHasError(true);
                    setErrorMessage('This is a FABS ID. Please navigate to FABS.');
                }
                else {
                    let currStep = originalStep;
                    if (stepNumber && stepNumber <= originalStep) {
                        currStep = stepNumber;
                    }
                    setStepLoading(false);
                    setHasError(false);
                    setErrorMessage('');
                    setCurrentStep(currStep);
                }
            })
            .catch((err) => {
                setStepLoading(false);
                setHasError(true);
                setErrorMessage(err.response.data.messag);
                setCurrentStep(0);
            });
    };

    const errorFromStep = (errorMessage) => {
        setHasError(true);
        setErrorMessage(errorMessage);
    };

    const revertSubmission = (e) => {
        e.preventDefault();
        const savedStep = currentStep;
        setCurrentStep(0);
        setReverting(true);
        ReviewHelper.revertToCertified(params.submissionID)
            .then(() => {
                getSubmissionInfo();
                setCurrentStep(savedStep);
                setReverting(false);
            })
            .catch((err) => {
                setHasError(true);
                setErrorMessage(err.response.data);
                setCurrentStep(savedStep);
                setReverting(false);
            });
    };

    return (
        <SubmissionPage
            submissionID={params.submissionID}
            errorFromStep={errorFromStep}
            error={hasError}
            errorMessage={errorMessage}
            loading={metadataLoading || stepLoading}
            submissionInfo={props.submissionInfo}
            currentStep={currentStep}
            revertSubmission={revertSubmission}
            reverting={reverting} />
    );
};

SubmissionStepsContainer.propTypes = propTypes;

export default connect(
    (state) => ({
        session: state.session,
        submissionInfo: state.submission.info
    }),
    (dispatch) => bindActionCreators(uploadActions, dispatch)
)(SubmissionStepsContainer);
