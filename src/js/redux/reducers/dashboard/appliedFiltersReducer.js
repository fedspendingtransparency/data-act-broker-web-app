/**
 * appliedFiltersReducer.js
 * Created by Lizzie Salita 10/02/19
 */

import { initialState as defaultFilters } from './dashboardFiltersReducer';

export const initialState = {
    filters: defaultFilters,
    _empty: true
};

export const appliedDashboardFiltersReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'APPLY_STAGED_FILTERS':
            return Object.assign({}, state, {
                filters: action.filters
            });
        case 'CLEAR_APPLIED_FILTERS':
            return Object.assign({}, initialState);
        case 'SET_APPLIED_FILTER_EMPTINESS':
            return Object.assign({}, state, {
                _empty: action.empty
            });
        default:
            return state;
    }
};
