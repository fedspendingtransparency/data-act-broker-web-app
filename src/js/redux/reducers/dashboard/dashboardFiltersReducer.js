/**
 * dashboardFiltersReducer.js
 * Created by Lizzie Salita 10/02/19
 **/

import { Set } from 'immutable';
import { isEqual } from 'lodash';

export const initialState = {
    historical: {
        agency: {
            code: '',
            name: ''
        },
        period: null,
        fy: new Set(),
        file: '',
        rules: new Set()
    },
    active: {
        agency: {
            code: '',
            name: ''
        },
        createdBy: {
            name: '',
            id: null
        },
        lastModified: {
            start: '',
            end: ''
        },
        submissionId: '',
        file: ''
    }
};

export const dashboardFiltersReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'UPDATE_FILTER_SET': {
            let updatedSet = state[action.dashboardType][action.filterType];

            const value = action.filterValue;

            if (updatedSet.has(value)) {
                updatedSet = updatedSet.delete(value);
            }
            else {
                // adds the value to the set if it does not already exist
                updatedSet = updatedSet.add(value);
            }
            const dashboard = Object.assign({}, state[action.dashboardType], {
                [action.filterType]: updatedSet
            });

            return Object.assign({}, state, {
                [action.dashboardType]: dashboard
            });
        }

        case 'UPDATE_GENERIC_FILTER': {
            if (isEqual(state[action.dashboardType][action.filterType], action.value)) {
                const dashboard = Object.assign({}, state[action.dashboardType], {
                    [action.filterType]: initialState[action.dashboardType][action.filterType]
                });
                return Object.assign({}, state, {
                    [action.dashboardType]: dashboard
                });
            }
            const updatedDashboard = Object.assign({}, state[action.dashboardType], {
                [action.filterType]: action.value
            });
            return Object.assign({}, state, {
                [action.dashboardType]: updatedDashboard
            });
        }

        case 'CLEAR_FILTER': {
            const dashboard = Object.assign({}, state[action.dashboardType], {
                [action.filterType]: initialState[action.dashboardType][action.filterType]
            });
            return Object.assign({}, state, {
                [action.dashboardType]: dashboard
            });
        }

        case 'CLEAR_DASHBOARD_FILTERS': {
            const dashboard = Object.assign({}, initialState[action.dashboardType]);
            return Object.assign({}, state, {
                [action.dashboardType]: dashboard
            });
        }

        default:
            return state;
    }
};

