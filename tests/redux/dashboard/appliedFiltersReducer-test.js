/**
 * appliedFiltersReducer-test.js
 * Created by Lizzie Salita 10/3/19
 */


import { Set } from 'immutable';

import { appliedDashboardFiltersReducer, initialState } from 'redux/reducers/dashboard/appliedFiltersReducer';

describe('appliedDashboardFiltersReducer', () => {
    it('should return the initial state by default', () => {
        expect(
            appliedDashboardFiltersReducer(undefined, {})
        ).toEqual(initialState);
    });

    describe('APPLY_STAGED_FILTERS', () => {
        it('should set the filter object to the provided object', () => {
            const newFilters = Object.assign({}, initialState.filters, {
                fy: new Set(['1990'])
            });

            const action = {
                type: 'APPLY_STAGED_FILTERS',
                filters: newFilters
            };

            const newState = appliedDashboardFiltersReducer(undefined, action);
            expect(newState.filters.fy).toEqual(new Set(['1990']));
        });
    });

    describe('CLEAR_APPLIED_FILTERS', () => {
        it('should should return the initial state', () => {
            const newFilters = Object.assign({}, initialState.filters, {
                fy: new Set(['1990'])
            });

            const modifiedState = {
                filters: newFilters,
                _empty: false,
                _complete: false
            };

            expect(modifiedState).not.toEqual(initialState);

            const action = {
                type: 'CLEAR_APPLIED_FILTERS'
            };

            const restoredState = appliedDashboardFiltersReducer(modifiedState, action);
            expect(restoredState).toEqual(initialState);
        });
    });

    describe('SET_APPLIED_FILTER_EMPTINESS', () => {
        it('should set the _empty value', () => {
            let state = appliedDashboardFiltersReducer(undefined, {});
            expect(state._empty).toBeTruthy();

            const action = {
                type: 'SET_APPLIED_FILTER_EMPTINESS',
                empty: false
            };
            state = appliedDashboardFiltersReducer(state, action);
            expect(state._empty).toBeFalsy();
        });
    });

    describe('SET_APPLIED_FILTER_COMPLETION', () => {
        it('should set the _complete value', () => {
            let state = appliedDashboardFiltersReducer(undefined, {});
            expect(state._complete).toBeTruthy();

            const action = {
                type: 'SET_APPLIED_FILTER_COMPLETION',
                complete: false
            };
            state = appliedDashboardFiltersReducer(state, action);
            expect(state._complete).toBeFalsy();
        });
    });
});
