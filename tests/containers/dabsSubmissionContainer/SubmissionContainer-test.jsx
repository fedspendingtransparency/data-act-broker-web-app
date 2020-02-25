/**
 * SubmissionContainer-test.jsx
 * Created by Jonathan Hill 08/16/19
 */

import React from 'react';
import { shallow } from 'enzyme';

import { SubmissionContainer } from 'containers/submission/SubmissionContainer';
import { mockProps, originalState } from './mockData';

jest.mock('helpers/submissionGuideHelper', () => require('./mockSubmissionGuideHelper'));

describe('SubmissionContainer', () => {
    let container;
    beforeEach(() => {
        jest.clearAllMocks();
        container = shallow(<SubmissionContainer {...mockProps} />);
    });
    describe('componentDidMount', () => {
        it('should call getSubmission on mount', async () => {
            const getSubmission = jest.fn();
            container.instance().getSubmission = getSubmission;
            await container.instance().componentDidMount();
            expect(getSubmission).toHaveBeenCalled();
            expect(getSubmission).toHaveBeenCalledWith(undefined);
        });
        it('should pass a truthy value to getSubmission when a step is specified in the url', () => {
            const getSubmission = jest.fn();
            container.instance().getSubmission = getSubmission;
            const newProps = { ...container.instance().props };
            newProps.computedMatch.params.type = 'generateEF';
            container.setProps({ ...newProps });
            container.instance().componentDidMount();
            expect(getSubmission).toHaveBeenCalledWith('generateEF');
        });
    });
    describe('componentDidUpdate', () => {
        it('should call getSubmission if ID is updated', () => {
            const getSubmission = jest.fn();
            container.instance().getSubmission = getSubmission;
            const newProps = {
                computedMatch: {
                    params: {
                        submissionID: "20"
                    }
                }
            };
            container.instance().componentDidUpdate(newProps);
            expect(getSubmission).toHaveBeenCalled();
        });

        it('should call setStepAndRoute if route type is updated', () => {
            const validateCurrentStepAndRouteType = jest.fn();
            const setStepAndRoute = jest.fn();
            container.instance().validateCurrentStepAndRouteType = validateCurrentStepAndRouteType;
            container.instance().setStepAndRoute = setStepAndRoute;
            const newProps = {
                computedMatch: {
                    params: {
                        submissionID: "2054",
                        type: 'generateFiles'
                    }
                }
            };
            container.instance().componentDidUpdate(newProps);
            expect(validateCurrentStepAndRouteType).toHaveBeenCalled();
            expect(setStepAndRoute).toHaveBeenCalled();
        });
    });

    it('getSubmission, should update state', async () => {
        await container.instance().getSubmission();
        const {
            isLoading,
            isError,
            step,
            originalStep
        } = container.instance().state;
        expect(isLoading).toEqual(false);
        expect(isError).toEqual(false);
        expect(step).toEqual(4);
        expect(originalStep).toEqual(4);
    });

    describe('ValidateCurrentStepAndRouteType', () => {
        it('should return 5, the fabs step', () => {
            const fabs = container.instance().validateCurrentStepAndRouteType(5);
            expect(fabs).toEqual(5);
        });
        it('should allow a user to navigate to a step greater than its current step', () => {
            const newState = { ...originalState }; // make a copy of the original state
            newState.completedSteps[0] = true;
            container.instance().setState(newState);
            const newProps = { ...container.instance().props };
            newProps.computedMatch.params.type = 'validateData';
            container.setProps({ ...newProps });
            const allow = container.instance().validateCurrentStepAndRouteType(1);
            expect(allow).toEqual(1);
        });
        it('should not allow a user to navigate to a greater step', () => {
            const newState = { ...originalState }; // make a copy of the original state
            newState.completedSteps[0] = true;
            const newProps = { ...container.instance().props };
            newProps.computedMatch.params.type = 'generateEF';
            container.instance().setState(newState);
            container.setProps({ ...newProps });
            const doNotAllow = container.instance().validateCurrentStepAndRouteType(0);
            expect(doNotAllow).toEqual(0);
        });
        it('should allow a user to navigate to a previous step', () => {
            const newState = { ...originalState }; // make a copy of the original state
            newState.step = 4;
            newState.originalStep = 4;
            container.instance().setState({ ...newState });
            const newProps = { ...container.instance().props };
            newProps.computedMatch.params.type = 'generateEF';
            container.setProps({ ...newProps });
            const newIndex = container.instance().validateCurrentStepAndRouteType(4);
            expect(newIndex).toEqual(3);
        });
        it('should just return the current step number if routes are the same', () => {
            const newProps = { ...container.instance().props };
            const newState = { ...container.instance().state };
            newProps.computedMatch.params.type = 'generateEF';
            newState.step = 3;
            newState.originalStep = 3;
            container.instance().setState({ ...newState });
            container.setProps({ ...newProps });
            const sameRoute = container.instance().validateCurrentStepAndRouteType(3);
            expect(sameRoute).toEqual(3);
        });
    });
    describe('errorFromStep', () => {
        it('should update state with message', () => {
            const falseStatement = 'Dallas Cowboys are a great team';
            container.instance().errorFromStep(falseStatement);
            const { isError, errorMessage } = container.instance().state;
            expect(isError).toEqual(true);
            expect(errorMessage).toEqual(falseStatement);
        });
    });
    describe('currentRoute', () => {
        it('should return the current states step route', () => {
            const currentRoute = container.instance().currentRoute();
            expect(currentRoute).toEqual('validateData');
        });
    });

    it('updateRoute, should update the state', async () => {
        container.instance().updateRoute();
        expect(mockProps.history.push).toHaveBeenCalled();
    });
    describe('nextStep', () => {
        it('should update state and call update route', () => {
            const updateRoute = jest.fn();
            container.instance().updateRoute = updateRoute;
            container.instance().nextStep();
            const { step, completedSteps } = container.instance().state;
            expect(step).toEqual(1);
            expect(completedSteps[1]).toEqual(true);
            expect(updateRoute).toHaveBeenCalled();
        });
    });
});
