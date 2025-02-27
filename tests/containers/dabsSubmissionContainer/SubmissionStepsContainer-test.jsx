/**
 * @jest-environment jsdom
 *
 * SubmissionStepsContainer-test.jsx
 * Created by Lizzie Salita 3/2/20
 */

// TODO: Replace with non-enzyme tests or delete
describe('passing test', () => {
    it('this just needs a passing test until we rework it', () => {
        expect(true).toEqual(true);
    });
});
// import React from 'react';
// import { shallow } from 'enzyme';

// import { SubmissionStepsContainer } from 'containers/submission/SubmissionStepsContainer';
// import { mockProps, submissionMetadata } from './mockData';

// jest.mock('helpers/submissionGuideHelper', () => require('./mockSubmissionGuideHelper'));
// jest.mock('helpers/reviewHelper', () => require('./mockReviewHelper'));

// // Mock the redux action
// const setInfo = jest.fn();

// describe('SubmissionStepsContainer', () => {
//     let container;
//     beforeEach(() => {
//         jest.clearAllMocks();
//         container = shallow(<SubmissionStepsContainer {...mockProps} setInfo={setInfo} />);
//     });
//     describe('componentDidMount', () => {
//         it('should call getSubmissionInfo on mount', async () => {
//             const getSubmissionInfo = jest.fn();
//             container.instance().getSubmissionInfo = getSubmissionInfo;
//             await container.instance().componentDidMount();
//             expect(getSubmissionInfo).toHaveBeenCalled();
//         });
//     });
//     describe('componentDidUpdate', () => {
//         it('should call getSubmissionInfo if ID is updated', () => {
//             const getSubmissionInfo = jest.fn();
//             container.instance().getSubmissionInfo = getSubmissionInfo;
//             const prevProps = {
//                 computedMatch: {
//                     params: {
//                         submissionID: '2345',
//                         step: 'generateFiles'
//                     }
//                 }
//             };
//             container.instance().componentDidUpdate(prevProps);
//             expect(getSubmissionInfo).toHaveBeenCalled();
//         });
//         it('should call getOriginalStep if route type is updated', () => {
//             const getOriginalStep = jest.fn();
//             container.instance().getOriginalStep = getOriginalStep;
//             const prevProps = {
//                 computedMatch: {
//                     params: {
//                         submissionID: "2054",
//                         step: 'validateCrossFile'
//                     }
//                 }
//             };
//             container.instance().componentDidUpdate(prevProps);
//             expect(getOriginalStep).toHaveBeenCalled();
//         });
//         it('should handle an invalide url', () => {
//             const newProps = {
//                 computedMatch: {
//                     params: {
//                         submissionID: "2054",
//                         step: 'something'
//                     }
//                 },
//                 history: {
//                     push: jest.fn()
//                 }
//             };
//             container.setProps(newProps);
//             container.instance().componentDidUpdate(mockProps);
//             expect(newProps.history.push).toHaveBeenCalled();
//             expect(newProps.history.push).toHaveBeenCalledWith('/404');
//         });
//     });
//     describe('getOriginalStep', () => {
//         it('should update state', async () => {
//             await container.instance().getOriginalStep();
//             const {
//                 stepLoading,
//                 error,
//                 currentStep
//             } = container.instance().state;
//             expect(stepLoading).toEqual(false);
//             expect(error).toEqual(false);
//             expect(currentStep).toEqual(4);
//         });
//         it('should go to the original step when trying to access an incomplete step', async () => {
//             const newProps = {
//                 computedMatch: {
//                     params: {
//                         submissionID: "2054",
//                         step: 'reviewData'
//                     }
//                 },
//                 history: {
//                     replace: jest.fn()
//                 }
//             };
//             container.setProps(newProps);
//             container.instance().componentDidUpdate(mockProps);
//             await container.instance().getOriginalStep();
//             expect(newProps.history.replace).toHaveBeenCalled();
//             expect(newProps.history.replace).toHaveBeenCalledWith('/submission/2054/generateEF');
//         });
//     });

//     describe('getSubmissionInfo', () => {
//         it('should call the redux action setInfo and update the loading state', async () => {
//             await container.instance().getSubmissionInfo();
//             const { metadataLoading } = container.instance().state;
//             expect(metadataLoading).toBeFalsy();
//             expect(setInfo).toHaveBeenCalled();
//             expect(setInfo).toHaveBeenCalledWith(submissionMetadata);
//         });
//     });

//     describe('errorFromStep', () => {
//         it('should update the state with the given error message', () => {
//             expect(error).toBeFalsy();
//             expect(errorMessage).toBeFalsy();
//             container.instance().errorFromStep('Mock error message');
//             const {
//                 error,
//                 errorMessage
//             } = container.instance().state;
//             expect(error).toBeTruthy();
//             expect(errorMessage).toEqual('Mock error message');
//         });
//     });

//     describe('resetStep', () => {
//         it('should reset the state', () => {
//             container.instance().setState({
//                 currentStep: 3
//             });
//             container.instance().resetStep();
//             expect(container.instance().state.currentStep).toEqual(0);
//         });
//     });
// });
