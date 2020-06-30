/**
 * appliedFiltersReducer.js
 * Created by Lizzie Salita 8/14/18
 */

import { initialState as defaultFilters } from './submissionsTableFiltersReducer';

export const initialState = {
    dabs: {
        active: defaultFilters.dabs.active,
        published: defaultFilters.dabs.published
    },
    fabs: {
        active: defaultFilters.fabs.active,
        published: defaultFilters.fabs.published
    }
};

export const appliedSubmissionsTableFiltersReducer = (state = initialState, action) => {
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
            if (action.table) {
                // Just reset one table
                const dashboard = Object.assign({}, state[action.dashboard], {
                    [action.table]: initialState[action.dashboard][action.table]
                });

                return Object.assign({}, state, {
                    [action.dashboard]: dashboard
                });
            }
            // Reset the either all dabs or all fabs filters
            return Object.assign({}, state, {
                [action.dashboard]: initialState[action.dashboard]
            });
        }
        default:
            return state;
    }
};
