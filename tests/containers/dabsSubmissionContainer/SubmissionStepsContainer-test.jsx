/**
 * SubmissionStepsContainer-test.jsx
 * Created by Lizzie Salita 3/2/20
 */

import React from 'react';
import { shallow } from 'enzyme';

import { SubmissionStepsContainer } from 'containers/submission/SubmissionStepsContainer';
import { mockProps, submissionMetadata } from './mockData';

jest.mock('helpers/submissionGuideHelper', () => require('./mockSubmissionGuideHelper'));
jest.mock('helpers/reviewHelper', () => require('./mockReviewHelper'));

describe('SubmissionStepsContainer', () => {
    let container;
    beforeEach(() => {
        jest.clearAllMocks();
        container = shallow(<SubmissionStepsContainer {...mockProps} />);
    });
    describe('componentDidMount', () => {
        it('should call getSubmission on mount', async () => {
            const getSubmission = jest.fn();
            container.instance().getSubmission = getSubmission;
            await container.instance().componentDidMount();
            expect(getSubmission).toHaveBeenCalled();
        });
    });
    describe('componentDidUpdate', () => {
        it('should call getSubmission if ID is updated', () => {
            const getSubmission = jest.fn();
            container.instance().getSubmission = getSubmission;
            const prevProps = {
                computedMatch: {
                    params: {
                        submissionID: '2345',
                        step: 'generateFiles'
                    }
                }
            };
            container.instance().componentDidUpdate(prevProps);
            expect(getSubmission).toHaveBeenCalled();
        });
        it('should call validateStep if route type is updated', () => {
            const validateCurrentStepAndRouteType = jest.fn();
            const validateStep = jest.fn();
            container.instance().validateCurrentStepAndRouteType = validateCurrentStepAndRouteType;
            container.instance().validateStep = validateStep;
            const prevProps = {
                computedMatch: {
                    params: {
                        submissionID: "2054",
                        step: 'validateCrossFile'
                    }
                }
            };
            container.instance().componentDidUpdate(prevProps);
            expect(validateStep).toHaveBeenCalled();
        });
        it('should handle an invalide url', () => {
            const newProps = {
                computedMatch: {
                    params: {
                        submissionID: "2054",
                        step: 'something'
                    }
                },
                history: {
                    push: jest.fn()
                }
            };
            container.setProps(newProps);
            container.instance().componentDidUpdate(mockProps);
            expect(newProps.history.push).toHaveBeenCalled();
            expect(newProps.history.push).toHaveBeenCalledWith('/404');
        });
    });
    describe('getOriginalStep', () => {
        it('should update state', async () => {
            await container.instance().getOriginalStep();
            const {
                loading,
                error,
                originalStep,
                currentStep,
                lastCompletedStep
            } = container.instance().state;
            expect(loading).toEqual(false);
            expect(error).toEqual(false);
            expect(currentStep).toEqual(5);
            expect(originalStep).toEqual(5);
            expect(lastCompletedStep).toEqual(4);
        });
    });

    describe('getSubmission', () => {
        it('should update the state based on the result', async () => {
            await container.instance().getSubmission();
            const {
                submissionInfo
            } = container.instance().state;
            expect(submissionInfo).toEqual(submissionMetadata);
        });
    });

    describe('setStep', () => {
        it('should leave lastCompletedStep as-is if it matches the step we are going to', () => {
            container.instance().setState({
                originalStep: 5,
                currentStep: 3,
                lastCompletedStep: 4
            });
            container.instance().setStep(4);
            expect(container.instance().state.lastCompletedStep).toEqual(4);
        });
        it('should otherwise update lastCompletedStep to the previous step', () => {
            container.instance().setState({
                originalStep: 5,
                currentStep: 3,
                lastCompletedStep: 4
            });
            container.instance().setStep(2);
            expect(container.instance().state.lastCompletedStep).toEqual(1);
        });
    });

    describe('completedStep', () => {
        it('should update the state', () => {
            container.instance().completedStep(1);
            expect(container.instance().state.lastCompletedStep).toEqual(1);
        });
    });

    describe('resetSteps', () => {
        it('should reset the state', () => {
            container.instance().setState({
                originalStep: 5,
                currentStep: 3,
                lastCompletedStep: 4
            });
            container.instance().resetSteps();
            expect(container.instance().state.originalStep).toEqual(0);
            expect(container.instance().state.currentStep).toEqual(0);
            expect(container.instance().state.lastCompletedStep).toEqual(0);
        });
    });

    describe('validateStep', () => {
        it('not allow users to navigate past one step ahead of the last completed step', () => {
            container.instance().setState({
                originalStep: 5,
                currentStep: 3,
                lastCompletedStep: 2
            });
            container.instance().validateStep(4);
            expect(mockProps.history.push).toHaveBeenCalled();
            expect(mockProps.history.push).toHaveBeenCalledWith('/submission/2054/validateCrossFile');
        });
        it('should call setStep to allow a user to navigate to a previous step', () => {
            const setStep = jest.fn();
            container.instance().setStep = setStep;
            container.instance().setState({
                originalStep: 5,
                currentStep: 3,
                lastCompletedStep: 2
            });
            container.instance().validateStep(2);
            expect(setStep).toHaveBeenCalled();
            expect(setStep).toHaveBeenCalledWith(2);
        });
    });
});
