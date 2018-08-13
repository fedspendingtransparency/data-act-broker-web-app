/**
 * dashboardFilterReducer.js
 * Created by Lizzie Salita 8/10/18
 **/

export const initialState = {
    dabs: {
        active: {
            agencies: [],
            fileNames: [],
            submissionIds: [],
            createdBy: [],
            lastModified: {
                startDate: '',
                endDate: ''
            }
        },
        certified: {
            agencies: [],
            fileNames: [],
            submissionIds: [],
            createdBy: [],
            lastModified: {
                startDate: '',
                endDate: ''
            }
        }
    },
    fabs: {
        active: {
            agencies: [],
            fileNames: [],
            submissionIds: [],
            createdBy: [],
            lastModified: {
                startDate: '',
                endDate: ''
            }
        },
        published: {
            agencies: [],
            fileNames: [],
            submissionIds: [],
            createdBy: [],
            lastModified: {
                startDate: '',
                endDate: ''
            }
        }
    }
};

export const dashboardFilterReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'UPDATE_DASHBOARD_FILTER': {
            const table = Object.assign({}, state[action.dashboard][action.table], {
                [action.filter]: action.value
            });

            const dashboard = Object.assign({}, state[action.dashboard], {
                [action.table]: table
            });

            return Object.assign({}, state, {
                [action.dashboard]: dashboard
            });
        }
        case 'UPDATE_DASHBOARD_FILTER_LIST': {
            // make a copy of the existing list
            const list = state[action.dashboard][action.table][action.filter].slice();
            // append the new value
            list.push(action.value);

            const table = Object.assign({}, state[action.dashboard][action.table], {
                [action.filter]: list
            });

            const dashboard = Object.assign({}, state[action.dashboard], {
                [action.table]: table
            });

            return Object.assign({}, state, {
                [action.dashboard]: dashboard
            });
        }
        case 'RESET_DASHBOARD_FILTERS': {
            const dashboard = Object.assign({}, state[action.dashboard], {
                [action.table]: initialState[action.dashboard][action.table]
            });

            return Object.assign({}, state, {
                [action.dashboard]: dashboard
            });
        }
        default:
            return state;
    }
};
