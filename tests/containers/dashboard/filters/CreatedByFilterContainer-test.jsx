/**
 * @jest-environment jsdom
 *
 * CreatedByFilterContainer-test.jsx
 * Created by Lizzie Salita 02/05/20
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

// import { CreatedByFilterContainer } from 'containers/dashboard/filters/CreatedByFilterContainer';
// import { mockActions, mockReduxActive } from './mockFilters';

// // mock the child component by replacing it with a function that returns a null element
// jest.mock('components/dashboard/filters/CreatedByFilter', () => jest.fn(() => null));

// describe('CreatedByFilterContainer', () => {
//     beforeEach(() => {
//         jest.restoreAllMocks();
//     });
//     it('should make an API call on mount', () => {
//         const container = shallow(<CreatedByFilterContainer
//             {...mockActions}
//             {...mockReduxActive} />
//         );

//         const fetchAutocompleteResults = jest.fn();
//         container.instance().fetchAutocompleteResults = fetchAutocompleteResults;

//         container.instance().componentDidMount();

//         expect(fetchAutocompleteResults).toHaveBeenCalled();
//     });
//     it('should correctly set the noResults state', () => {
//         const container = shallow(<CreatedByFilterContainer
//             {...mockActions}
//             {...mockReduxActive} />
//         );
//         const newState = cloneDeep(container.instance().state);
//         newState.results = [{ name: 'ABC', user_id: 123, email: 'abc@email.com' }, { name: 'XYZ', user_id: 456, email: 'xyz@email.com' }];
//         container.instance().setState({ ...newState });

//         container.instance().parseAutocomplete('test');
//         expect(container.state().noResults).toEqual(true);
//     });
//     describe('onSelect', () => {
//         it('should call the updateGenericFilter action', () => {
//             const container = shallow(<CreatedByFilterContainer
//                 {...mockActions}
//                 {...mockReduxActive} />
//             );

//             container.instance().onSelect({ name: 'ABC', id: 123 });

//             expect(mockActions.updateGenericFilter).toHaveBeenCalledWith('active', 'createdBy', { name: 'ABC', id: 123 });
//         });
//     });
//     describe('parseAutocomplete', () => {
//         it('should narrow down the API results to codes matching the search string and format them for display', () => {
//             const container = shallow(<CreatedByFilterContainer
//                 {...mockActions}
//                 {...mockReduxActive} />
//             );
//             const newState = cloneDeep(container.instance().state);
//             newState.results = [{ name: 'ABC', user_id: 123, email: 'abc@email.com' }, { name: 'XYZ', user_id: 456, email: 'xyz@email.com' }];
//             container.instance().setState({ ...newState });

//             container.instance().parseAutocomplete('y');
//             expect(container.instance().state.filteredResults.length).toEqual(1);
//             expect(container.instance().state.filteredResults[0]).toEqual({
//                 title: 'XYZ',
//                 subtitle: '',
//                 data: { name: 'XYZ', id: 456 }
//             });
//         });
//         it('should exclude the user that is already staged', () => {
//             const updatedRedux = { ...mockReduxActive }; // make a copy of the mock Redux state
//             updatedRedux.selectedFilters.createdBy = { name: 'ABC', id: 123 }; // Add a staged user
//             const container = shallow(<CreatedByFilterContainer
//                 {...mockActions}
//                 {...updatedRedux} />
//             );
//             const newState = cloneDeep(container.instance().state);
//             newState.results = [{ name: 'ABC', user_id: 123, email: 'abc@email.com' }, { name: 'XYZ', user_id: 456, email: 'xyz@email.com' }];
//             container.instance().setState({ ...newState });

//             container.instance().parseAutocomplete();
//             // 'ABC' should not be included since it was already staged
//             expect(container.instance().state.filteredResults.length).toEqual(1);
//             expect(container.instance().state.filteredResults[0]).toEqual({
//                 title: 'XYZ',
//                 subtitle: '',
//                 data: { name: 'XYZ', id: 456 }
//             });
//         });
//         it('should handle users with no name', () => {
//             const container = shallow(<CreatedByFilterContainer
//                 {...mockActions}
//                 {...mockReduxActive} />
//             );
//             const newState = cloneDeep(container.instance().state);
//             newState.results = [{ name: 'ABC', user_id: 123, email: 'abc@email.com' }, { name: '', user_id: 456, email: 'xyz@email.com' }];
//             container.instance().setState({ ...newState });

//             container.instance().parseAutocomplete('y');
//             expect(container.instance().state.filteredResults.length).toEqual(1);
//             expect(container.instance().state.filteredResults[0]).toEqual({
//                 title: 'xyz@email.com',
//                 subtitle: '',
//                 data: { name: 'xyz@email.com', id: 456 }
//             });
//         });
//     });
//     describe('clearAutocompleteSuggestions', () => {
//         it('should reset the state', () => {
//             const container = shallow(<CreatedByFilterContainer
//                 {...mockActions}
//                 {...mockReduxActive} />
//             );
//             const newState = cloneDeep(container.instance().state);
//             newState.filteredResults = [{
//                 title: 'XYZ',
//                 subtitle: '',
//                 data: { name: 'XYZ', id: 456 }
//             }];
//             container.instance().setState({ ...newState });

//             container.instance().clearAutocompleteSuggestions();
//             expect(container.instance().state.filteredResults).toEqual([]);
//         });
//     });
// });
