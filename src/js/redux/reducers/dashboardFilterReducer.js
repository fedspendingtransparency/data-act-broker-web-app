/**
 * dashboardFilterReducer.js
 * Created by Lizzie Salita 8/10/18
 **/

export const initialState = {
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
};

export const dashboardFilterReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'UPDATE_DASHBOARD_FILTER': {
            const table = Object.assign({}, state[action.table], {
                [action.filter]: action.value
            });

            return Object.assign({}, state, {
                [action.table]: table
            });
        }
        case 'UPDATE_DASHBOARD_FILTER_LIST': {
            // make a copy of the existing list
            const list = state[action.table][action.filter].slice();
            // append the new value
            list.push(action.value);

            const table = Object.assign({}, state[action.table], {
                [action.filter]: list
            });

            return Object.assign({}, state, {
                [action.table]: table
            });
        }
        case 'RESET_DASHBOARD_FILTERS': {
            const table = Object.assign({}, state[action.table], {
                [action.table]: initialState[action.table]
            });

            return Object.assign({}, state, {
                [action.table]: table
            });
        }
        default:
            return state;
    }
};
