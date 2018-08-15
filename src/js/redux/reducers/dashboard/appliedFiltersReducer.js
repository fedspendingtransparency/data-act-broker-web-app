/**
 * appliedFiltersReducer.js
 * Created by Lizzie Salita 8/14/18
 */

import { initialState as defaultFilters } from './dashboardFilterReducer';

export const initialState = {
    dabs: {
        active: {
            filters: defaultFilters.dabs.active,
            _empty: true,
            _complete: true
        },
        certified: {
            filters: defaultFilters.dabs.certified,
            _empty: true,
            _complete: true
        }
    },
    fabs: {
        active: {
            filters: defaultFilters.fabs.active,
            _empty: true,
            _complete: true
        },
        published: {
            filters: defaultFilters.fabs.published,
            _empty: true,
            _complete: true
        }
    }
};

export const appliedFiltersReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'APPLY_STAGED_FILTERS': {
            const table = Object.assign({}, state[action.dashboard][action.table], {
                filters: action.filters
            });

            const dashboard = Object.assign({}, state[action.dashboard], {
                [action.table]: table
            });

            return Object.assign({}, state, {
                [action.dashboard]: dashboard
            });
        }
        case 'CLEAR_APPLIED_FILTERS': {
            const table = Object.assign({}, initialState[action.dashboard][action.table]);

            const dashboard = Object.assign({}, state[action.dashboard], {
                [action.table]: table
            });

            return Object.assign({}, state, {
                [action.dashboard]: dashboard
            });
        }
        case 'SET_APPLIED_FILTER_EMPTINESS': {
            const table = Object.assign({}, state[action.dashboard][action.table], {
                _empty: action.empty
            });

            const dashboard = Object.assign({}, state[action.dashboard], {
                [action.table]: table
            });

            return Object.assign({}, state, {
                [action.dashboard]: dashboard
            });
        }
        case 'SET_APPLIED_FILTER_COMPLETION': {
            const table = Object.assign({}, state[action.dashboard][action.table], {
                _complete: action.complete
            });

            const dashboard = Object.assign({}, state[action.dashboard], {
                [action.table]: table
            });

            return Object.assign({}, state, {
                [action.dashboard]: dashboard
            });
        }
        default:
            return state;
    }
};
