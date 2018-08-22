/**
 * appliedFiltersReducer.js
 * Created by Lizzie Salita 8/14/18
 */

import { initialState as defaultFilters } from './dashboardFilterReducer';

export const initialState = {
    dabs: {
        active: defaultFilters.dabs.active,
        certified: defaultFilters.dabs.certified
    },
    fabs: {
        active: defaultFilters.fabs.active,
        published: defaultFilters.fabs.published
    }
};

export const appliedFiltersReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'APPLY_STAGED_FILTERS': {
            const dashboard = Object.assign({}, state[action.dashboard], {
                [action.table]: action.filters
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
        default:
            return state;
    }
};
