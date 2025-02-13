/**
 * @jest-environment jsdom
 *
 * appliedFiltersReducer-test.js
 * Created by Lizzie Salita 10/3/19
 */


import { Set } from 'immutable';
import { cloneDeep } from 'lodash';

import { appliedDashboardFiltersReducer, initialState } from 'redux/reducers/dashboard/appliedFiltersReducer';

describe('appliedDashboardFiltersReducer', () => {
    it('should return the initial state by default', () => {
        expect(
            appliedDashboardFiltersReducer(undefined, {})
        ).toEqual(initialState);
    });

    describe('APPLY_STAGED_FILTERS', () => {
        it('should set the filter object for the given dashboard type to the provided object', () => {
            const newFilters = cloneDeep(initialState.filters.historical);
            newFilters.fy = new Set(['1990']);

            const action = {
                type: 'APPLY_STAGED_FILTERS',
                dashboardType: 'historical',
                filters: newFilters
            };

            const newState = appliedDashboardFiltersReducer(undefined, action);
            expect(newState.filters.historical.fy).toEqual(new Set(['1990']));
        });
    });

    describe('CLEAR_APPLIED_FILTERS', () => {
        it('should should return the initial state for the given dashboard type', () => {
            const modifiedState = cloneDeep(initialState);
            modifiedState.filters.historical.fy = new Set(['1990']);

            expect(modifiedState).not.toEqual(initialState);

            const action = {
                type: 'CLEAR_APPLIED_FILTERS'
            };

            const restoredState = appliedDashboardFiltersReducer(modifiedState, action);
            expect(restoredState.filters.historical).toEqual(initialState.filters.historical);
        });
    });

    describe('SET_APPLIED_FILTER_EMPTINESS', () => {
        it('should set the _empty value', () => {
            let state = appliedDashboardFiltersReducer(undefined, {});
            expect(state._historicalEmpty).toBeTruthy();

            const action = {
                type: 'SET_APPLIED_FILTER_EMPTINESS',
                dashboardType: 'historical',
                empty: false
            };
            state = appliedDashboardFiltersReducer(state, action);
            expect(state._historicalEmpty).toBeFalsy();
        });
    });
});
