/**
 * dashboardFiltersReducer-test.js
 * Created by Lizzie Salita 10/03/19
 */

import { dashboardFiltersReducer, initialState } from 'redux/reducers/dashboard/dashboardFiltersReducer';
import { Set } from 'immutable';

describe('dashboardFiltersReducer', () => {
    describe('UPDATE_FILTER_SET', () => {
        const action = {
            type: 'UPDATE_FILTER_SET',
            filterType: 'quarters',
            filterValue: 2
        };

        it('should add the value if it does not currently exist in the filter', () => {
            const updatedState = dashboardFiltersReducer(undefined, action);

            expect(updatedState.quarters).toEqual(new Set([2]));
        });

        it('should remove the value if already exists in the filter', () => {
            const startingState = Object.assign({}, initialState, {
                quarters: new Set([2])
            });

            const updatedState = dashboardFiltersReducer(startingState, action);
            expect(updatedState.quarters).toEqual(new Set());
        });
    });
    describe('UPDATE_FILE_FILTER', () => {
        it('should update file filter state to the provided value', () => {
            let state = dashboardFiltersReducer(undefined, {});

            const action = {
                type: 'UPDATE_FILE_FILTER',
                file: 'B'
            };

            state = dashboardFiltersReducer(state, action);

            expect(state.file).toEqual('B');
        });
    });
    describe('CLEAR_FILTER_SET', () => {
        it('should reset the specified filter to its initial state', () => {
            let state = {
                quarters: new Set([1, 3]),
                fy: new Set([2018, 2019]),
                file: 'A',
                rules: new Set(['X12', 'X34'])
            };

            // Reset the filter
            const resetAction = {
                type: 'CLEAR_FILTER_SET',
                filterType: 'rules'
            };

            state = dashboardFiltersReducer(state, resetAction);

            expect(state.rules).toEqual(initialState.rules);
            expect(state.file).toEqual('A');
            expect(state.quarters).toEqual(new Set([1, 3]));
        });
    });
    describe('CLEAR_DASHBOARD_FILTERS', () => {
        it('should reset the dashboard filters to their initial state', () => {
            let state = {
                quarters: new Set([1, 3]),
                fy: new Set([2018, 2019]),
                file: 'A',
                rules: new Set(['X12', 'X34'])
            };

            // Reset the filters
            const resetAction = {
                type: 'CLEAR_DASHBOARD_FILTERS'
            };

            state = dashboardFiltersReducer(state, resetAction);

            expect(state).toEqual(initialState);
        });
    });
});
