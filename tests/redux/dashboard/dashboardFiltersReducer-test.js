/**
 * dashboardFiltersReducer-test.js
 * Created by Lizzie Salita 10/03/19
 */

import { dashboardFiltersReducer, initialState } from 'redux/reducers/dashboard/dashboardFiltersReducer';
import { Set } from 'immutable';
import { cloneDeep } from 'lodash';

describe('dashboardFiltersReducer', () => {
    describe('UPDATE_FILTER_SET', () => {
        const action = {
            type: 'UPDATE_FILTER_SET',
            dashboardType: 'historical',
            filterType: 'fy',
            filterValue: 2018
        };

        it('should add the value if it does not currently exist in the filter', () => {
            const updatedState = dashboardFiltersReducer(undefined, action);

            expect(updatedState.historical.fy).toEqual(new Set([2018]));
        });

        it('should remove the value if already exists in the filter', () => {
            const startingState = cloneDeep(initialState);
            startingState.historical.fy = new Set([2018]);

            const updatedState = dashboardFiltersReducer(startingState, action);
            expect(updatedState.historical.fy).toEqual(new Set());
        });
    });
    describe('UPDATE_GENERIC_FILTER', () => {
        const action = {
            type: 'UPDATE_GENERIC_FILTER',
            dashboardType: 'historical',
            filterType: 'agency',
            value: {
                code: '123',
                name: 'Test Agency'
            }
        };

        it('should change the given filter to the provided value', () => {
            let state = dashboardFiltersReducer(undefined, {});

            state = dashboardFiltersReducer(state, action);

            expect(state.historical.agency).toEqual({ code: '123', name: 'Test Agency' });
        });

        it('should remove the value if it is the value already selected', () => {
            const startingState = cloneDeep(initialState);
            startingState.historical.agency = { code: '123', name: 'Test Agency' };

            const updatedState = dashboardFiltersReducer(startingState, action);
            expect(updatedState.historical.agency).toEqual({ code: '', name: '' });
        });
    });
    describe('CLEAR_FILTER', () => {
        it('should reset the specified filter to its initial state', () => {
            const state = cloneDeep(initialState);
            state.historical = {
                period: 'Q1',
                fy: new Set([2018, 2019]),
                file: 'A',
                rules: new Set(['X12', 'X34'])
            };

            // Reset the filter
            const resetAction = {
                type: 'CLEAR_FILTER',
                dashboardType: 'historical',
                filterType: 'rules'
            };

            const restoredState = dashboardFiltersReducer(state, resetAction);

            expect(restoredState.historical.rules).toEqual(initialState.historical.rules);
            expect(restoredState.historical.file).toEqual('A');
            expect(restoredState.historical.period).toEqual('Q1');
        });
    });
    describe('CLEAR_DASHBOARD_FILTERS', () => {
        it('should reset the dashboard filters to their initial state', () => {
            const state = cloneDeep(initialState);
            state.historical = {
                period: 'Q2',
                fy: new Set([2018, 2019]),
                file: 'A',
                rules: new Set(['X12', 'X34'])
            };

            // Reset the filters
            const resetAction = {
                type: 'CLEAR_DASHBOARD_FILTERS',
                dashboardType: 'historical'
            };

            const restoredState = dashboardFiltersReducer(state, resetAction);

            expect(restoredState.historical).toEqual(initialState.historical);
        });
    });
});
