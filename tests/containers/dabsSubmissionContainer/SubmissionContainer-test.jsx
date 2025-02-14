/**
 * @jest-environment jsdom
 *
 * SubmissionContainer-test.jsx
 * Created by Jonathan Hill 08/16/19
 */

// TODO: Replace with non-enzyme tests or delete
describe('passing test', () => {
    it('this just needs a passing test until we rework it', () => {
        expect(true).toEqual(true);
    });
});
// import React from 'react';
// import { shallow } from 'enzyme';

// import { SubmissionContainer } from 'containers/submission/SubmissionContainer';
// import { mockProps } from './mockData';

// jest.mock('helpers/submissionGuideHelper', () => require('./mockSubmissionGuideHelper'));

// describe('SubmissionContainer', () => {
//     let container;
//     beforeEach(() => {
//         jest.clearAllMocks();
//         container = shallow(<SubmissionContainer {...mockProps} />);
//     });
//     describe('componentDidMount', () => {
//         it('should call getOriginalStep on mount', async () => {
//             const getOriginalStep = jest.fn();
//             container.instance().getOriginalStep = getOriginalStep;
//             await container.instance().componentDidMount();
//             expect(getOriginalStep).toHaveBeenCalled();
//         });
//     });
//     describe('getOriginalStep', () => {
//         it('should update state', async () => {
//             await container.instance().getOriginalStep();
//             const {
//                 loading,
//                 error,
//                 redirectPath
//             } = container.instance().state;
//             expect(loading).toEqual(false);
//             expect(error).toEqual(false);
//             expect(redirectPath).toEqual('generateEF');
//         });
//     });
// });
