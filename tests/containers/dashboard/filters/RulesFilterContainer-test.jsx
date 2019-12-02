/**
 * RulesFilterContainer-test.jsx
 * Created by Lizzie Salita 11/5/19
 */

import React from 'react';
import { shallow } from 'enzyme';
import { cloneDeep } from 'lodash';

import { RulesFilterContainer } from 'containers/dashboard/filters/RulesFilterContainer';
import { mockActions, mockRedux } from './mockFilters';

// mock the child component by replacing it with a function that returns a null element
jest.mock('components/dashboard/filters/RulesFilter', () => jest.fn(() => null));

describe('RulesFilterContainer', () => {
    beforeEach(() => {
        jest.restoreAllMocks();
    });
    it('should make an API call when the selected file changes', () => {
        const newRedux = { ...mockRedux };
        newRedux.selectedFilters.file = 'B';

        const container = shallow(<RulesFilterContainer
            {...mockActions}
            {...newRedux} />
        );

        const fetchAutocompleteResults = jest.fn();
        container.instance().fetchAutocompleteResults = fetchAutocompleteResults;

        container.instance().componentDidUpdate({ selectedFilters: { file: 'C' } });

        expect(fetchAutocompleteResults).toHaveBeenCalled();
    });
    it('should clear the selected rules when the file changes', () => {
        const newRedux = { ...mockRedux };
        newRedux.selectedFilters.file = 'B';

        const container = shallow(<RulesFilterContainer
            {...mockActions}
            {...newRedux} />
        );
        const fetchAutocompleteResults = jest.fn();
        container.instance().fetchAutocompleteResults = fetchAutocompleteResults;

        container.instance().componentDidUpdate({ selectedFilters: { file: 'C' } });

        expect(mockActions.clearGenericFilter).toHaveBeenCalled();
    });
    it('should correctly set the noResults state', () => {
        const container = shallow(<RulesFilterContainer
            {...mockActions}
            {...mockRedux} />
        );
        const newState = cloneDeep(container.instance().state);
        newState.results = ['X1', 'Y2', 'Z3'];
        container.instance().setState({ ...newState });

        container.instance().parseAutocomplete('test');
        expect(container.state().noResults).toEqual(true);
    });
    describe('onSelect', () => {
        it('should call the updateGenericFilter action', () => {
            const container = shallow(<RulesFilterContainer
                {...mockActions}
                {...mockRedux} />
            );

            container.instance().onSelect({ code: 'X123' });

            expect(mockActions.updateGenericFilter).toHaveBeenCalledWith('rules', 'X123');
        });
    });
    describe('parseAutocomplete', () => {
        it('should narrow down the API results to codes matching the search string and format them for display', () => {
            const container = shallow(<RulesFilterContainer
                {...mockActions}
                {...mockRedux} />
            );
            const newState = cloneDeep(container.instance().state);
            newState.results = ['X1', 'Y2', 'Z3'];
            container.instance().setState({ ...newState });

            container.instance().parseAutocomplete('y');
            expect(container.instance().state.filteredResults.length).toEqual(1);
            expect(container.instance().state.filteredResults[0]).toEqual({
                title: 'Y2',
                subtitle: '',
                data: { code: 'Y2' }
            });
        });
        it('should exclude rules that are already staged', () => {
            const updatedRedux = { ...mockRedux }; // make a copy of the mock Redux state
            updatedRedux.selectedFilters.rules = new Set(['X1']); // Add a staged rule filter
            const container = shallow(<RulesFilterContainer
                {...mockActions}
                {...updatedRedux} />
            );
            const newState = cloneDeep(container.instance().state);
            newState.results = ['X1', 'Y2', 'Z3'];
            container.instance().setState({ ...newState });

            container.instance().parseAutocomplete();
            // 'X1' should not be included since it was already staged
            expect(container.instance().state.filteredResults.length).toEqual(2);
            expect(container.instance().state.filteredResults[0]).toEqual({
                title: 'Y2',
                subtitle: '',
                data: { code: 'Y2' }
            });
        });
    });
    describe('clearAutocompleteSuggestions', () => {
        it('should reset the state', () => {
            const container = shallow(<RulesFilterContainer
                {...mockActions}
                {...mockRedux} />
            );
            const newState = cloneDeep(container.instance().state);
            newState.filteredResults = [{
                title: 'Y2',
                subtitle: '',
                data: { code: 'Y2' }
            }];
            container.instance().setState({ ...newState });

            container.instance().clearAutocompleteSuggestions();
            expect(container.instance().state.filteredResults).toEqual([]);
        });
    });
});
