/**
 * dashboardFiltersReducer.js
 * Created by Lizzie Salita 10/02/19
 **/

import { Set } from 'immutable';

export const initialState = {
    quarters: new Set(),
    fy: new Set(),
    file: '',
    rules: new Set()
};

export const dashboardFiltersReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'UPDATE_FILTER_SET': {
            let updatedSet = state[action.filterType];

            const value = action.filterValue;

            if (updatedSet.has(value)) {
                updatedSet = updatedSet.delete(value);
            }
            else {
                // adds the value to the set if it does not already exist
                updatedSet = updatedSet.add(value);
            }
            return Object.assign({}, state, {
                [action.filterType]: updatedSet
            });
        }

        case 'UPDATE_FILE_FILTER': {
            return Object.assign({}, state, {
                file: action.file
            });
        }

        case 'CLEAR_FILTER_SET': {
            return Object.assign({}, state, {
                [action.filterType]: initialState[action.filterType]
            });
        }

        case 'CLEAR_DASHBOARD_FILTERS': {
            return Object.assign({}, initialState);
        }

        default:
            return state;
    }
};

