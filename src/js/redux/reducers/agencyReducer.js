const initialState = {
    agencies: []
};

export const agencyReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_AGENCY_LIST':
            return Object.assign({}, state, {
                agencies: action.agencies
            });
        default:
            return state;
    }
};
export { agencyReducer as default };
