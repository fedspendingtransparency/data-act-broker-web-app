/**
 * @jest-environment jsdom
 *
 * RulesFilterContainer-test.jsx
 * Created by Lizzie Salita 11/5/19
 */

// TODO: Replace with non-enzyme tests or delete
describe('passing test', () => {
    it('this just needs a passing test until we rework it', () => {
        expect(true).toEqual(true);
    });
});
// import React from 'react';
// import { shallow } from 'enzyme';
// import { cloneDeep } from 'lodash';

// import { RulesFilterContainer } from 'containers/dashboard/filters/RulesFilterContainer';
// import { mockActions, mockReduxHistorical } from './mockFilters';

// // mock the child component by replacing it with a function that returns a null element
// jest.mock('components/dashboard/filters/RulesFilter', () => jest.fn(() => null));

// describe('RulesFilterContainer', () => {
//     beforeEach(() => {
//         jest.restoreAllMocks();
//     });
//     describe('parseAutocomplete', () => {
//         it('should exclude rules that are already staged', () => {
//             const updatedRedux = { ...mockReduxHistorical }; // make a copy of the mock Redux state
//             updatedRedux.selectedFilters.rules = new Set(['X1']); // Add a staged rule filter
//             const container = shallow(<RulesFilterContainer
//                 {...mockActions}
//                 {...updatedRedux} />
//             );
//             const newState = cloneDeep(container.instance().state);
//             newState.results = ['X1', 'Y2', 'Z3'];
//             container.instance().setState({ ...newState });

//             container.instance().parseAutocomplete();
//             // 'X1' should not be included since it was already staged
//             expect(container.instance().state.filteredResults.length).toEqual(2);
//             expect(container.instance().state.filteredResults[0]).toEqual({
//                 title: 'Y2',
//                 subtitle: '',
//                 data: { code: 'Y2' }
//             });
//         });
//     });
// });
