/**
 * dashboardFiltersReducer.js
 * Created by Lizzie Salita 10/02/19
 **/

import { Set } from 'immutable';

export const initialState = {
    quarters: Set,
    fy: Set,
    file: 'A',
    rules: Set
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

        case 'CLEAR_SEARCH_FILTER_ALL': {
            return Object.assign({}, initialState);
        }

        default:
            return state;
    }
};

