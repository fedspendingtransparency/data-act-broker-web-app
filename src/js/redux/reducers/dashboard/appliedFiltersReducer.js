/**
 * appliedFiltersReducer.js
 * Created by Lizzie Salita 10/02/19
 */

import { initialState as defaultFilters } from './dashboardFiltersReducer';

export const initialState = {
    filters: defaultFilters,
    _historicalEmpty: true,
    _activeEmpty: true
};

export const appliedDashboardFiltersReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'APPLY_STAGED_FILTERS': {
            const filters = Object.assign({}, state.filters, {
                [action.dashboardType]: action.filters
            });

            return Object.assign({}, state, {
                filters
            });
        }
        case 'CLEAR_APPLIED_FILTERS': {
            const dashboard = Object.assign({}, initialState.filters[action.dashboardType]);
            const filters = Object.assign({}, initialState.filters, {
                [action.dashboardType]: dashboard
            });
            return Object.assign({}, state, {
                filters
            });
        }
        case 'SET_APPLIED_FILTER_EMPTINESS': {
            const empty = `_${action.dashboardType}Empty`;
            return Object.assign({}, state, {
                [empty]: action.empty
            });
        }
        default:
            return state;
    }
};
