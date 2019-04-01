import { SET_LOADING } from "../types";

const initialState = {
    loading: false
    // other possible use cases for this would be setting errors / notifications
};

const uiReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_LOADING: {
            return Object.assign(state, {
                loading: action.payload
            });
        }
        default: {
            return state;
        }
    }
};

export default uiReducer;
