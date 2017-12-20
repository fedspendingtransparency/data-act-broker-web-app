const initialState = {
    subTierAgencies: []
};

export const subTierAgencyReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_SUB_TIER_AGENCY_LIST':
            return Object.assign({}, state, {
                subTierAgencies: action.subTierAgencies
            });
        default:
            return state;
    }
};
