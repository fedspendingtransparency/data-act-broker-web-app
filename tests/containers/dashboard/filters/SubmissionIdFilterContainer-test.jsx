/**
 * @jest-environment jsdom
 *
 * SubmissionIdFilterContainer-test.jsx
 * Created by Lizzie Salita 02/13/20
 */

// TODO: Replace with non-enzyme tests or delete
describe('passing test', () => {
    it('this just needs a passing test until we rework it', () => {
        expect(true).toEqual(true);
    });
});
// import React from 'react';
// import { shallow } from 'enzyme';

// import { SubmissionIdFilterContainer } from 'containers/dashboard/filters/SubmissionIdFilterContainer';
// import { mockActions, mockReduxActive } from './mockFilters';

// // mock the child component by replacing it with a function that returns a null element
// jest.mock('components/dashboard/filters/SubmissionIdFilter', () => jest.fn(() => null));

// describe('SubmissionIdFilterContainer', () => {
//     beforeEach(() => {
//         jest.restoreAllMocks();
//     });
//     describe('updateFilter', () => {
//         it('should call the updateGenericFilter action with the correct parameters', () => {
//             const container = shallow(<SubmissionIdFilterContainer
//                 {...mockActions}
//                 {...mockReduxActive} />
//             );

//             container.instance().updateFilter(1234);

//             expect(mockActions.updateGenericFilter).toHaveBeenCalledWith('active', 'submissionId', 1234);
//         });
//     });
//     describe('clearFilter', () => {
//         it('should call the clearFilter action with the correct parameters', () => {
//             const container = shallow(<SubmissionIdFilterContainer
//                 {...mockActions}
//                 {...mockReduxActive} />
//             );

//             container.instance().clearFilter();

//             expect(mockActions.clearFilter).toHaveBeenCalledWith('active', 'submissionId');
//         });
//     });
// });
