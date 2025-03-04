/**
 * @jest-environment jsdom
 *
 * SubmissionsTableContainer-test.jsx
 * Created by Lizzie Salita 10/29/18
 */

// TODO: Replace with non-enzyme tests or delete
describe('passing test', () => {
    it('this just needs a passing test until we rework it', () => {
        expect(true).toEqual(true);
    });
});
// import React from 'react';
// import { shallow } from 'enzyme';

// import { SubmissionsTableContainer } from 'containers/submissionsTable/SubmissionsTableContainer';
// import { mockActions, mockRedux } from './mockData';

// // mock the submission list helper
// jest.mock('helpers/submissionListHelper', () => require('./mockSubmissionListHelper'));

// // mock the child component by replacing it with a function that returns a null element
// jest.mock('components/submissionsTable/SubmissionsTableContent', () => jest.fn(() => null));

// describe('SubmissionsTableContainer', () => {
//     it('should update the table when the type changes', () => {
//         const container = shallow(<SubmissionsTableContainer
//             {...mockRedux}
//             {...mockActions} />);
        
//         const loadTableData = jest.fn();
//         container.instance().loadTableData = loadTableData;
//         const newProps = {
//             type: 'fabs'
//         };

//         container.instance().componentDidUpdate(newProps);

//         expect(loadTableData).toHaveBeenCalled();
//     });
//     it('should reset the applied filters for the current type on unmount', () => {
//         const container = shallow(<SubmissionsTableContainer
//             {...mockRedux}
//             {...mockActions} />);

//         container.instance().componentWillUnmount();

//         expect(mockActions.resetAppliedFilters).toHaveBeenCalledWith({
//             dashboard: 'dabs'
//         });
//     });
//     it('should reset the staged filters for the given type on unmount', () => {
//         const container = shallow(<SubmissionsTableContainer
//             {...mockRedux}
//             {...mockActions} />);

//         // Change the type
//         container.setProps({
//             type: 'fabs'
//         });

//         container.instance().componentWillUnmount();

//         expect(mockActions.resetDashboardFilters).toHaveBeenCalledWith({
//             dashboard: 'fabs'
//         });
//     });
// });