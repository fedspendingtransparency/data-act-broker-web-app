/**
 * dashboardFilterReducer.js
 * Created by Lizzie Salita 8/10/18
 **/

export const initialState = {
    agency: {
        code: '',
        codeType: ''
    },
    fileName: '',
    submissionId: '',
    createdBy: '',
    lastModified: {
        startDate: '',
        endDate: ''
    }
};

export const dashboardFilterReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'UPDATE_DASHBOARD_FILTER': {
            return Object.assign({}, state, {
                [action.filter]: action.value
            });
        }
        case 'RESET_DASHBOARD_FILTERS': {
            return Object.assign({}, initialState);
        }
        default:
            return state;
    }
};
