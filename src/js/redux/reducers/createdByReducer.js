const initialState = {
    createdBy: []
};

export const createdByReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_CREATEDBY_LIST':
            return Object.assign({}, state, {
                createdBy: action.createdBy
            });
        default:
            return state;
    }
};
