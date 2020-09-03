const initialState = {
    submissionType: ''
};

export const submissionTypeFilterReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_SUBMISSION_TYPE_FILTER':
            return Object.assign({}, state, {
                submissionType: action.submissionType
            });
        default:
            return state;
    }
};
export { submissionTypeFilterReducer as default };
