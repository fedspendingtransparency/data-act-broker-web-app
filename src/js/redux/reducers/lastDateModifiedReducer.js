const initialState = {
    lastDateModified: []
};

export const lastDateModifiedReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_LAST_DATE_MODIFIED_LIST':
            return Object.assign({}, state, {
                lastDateModified: action.lastDateModified
            });
        default:
            return state;
    }
};
