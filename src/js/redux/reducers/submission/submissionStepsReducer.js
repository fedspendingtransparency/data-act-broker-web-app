/**
 * submissionStepsReducer.js
 * Created by Lizzie Salita 2/20/20
 **/

export const initialState = {
    submissionID: '',
    currentStep: 0,
    originalStep: 0,
    lastCompletedStep: 0
};

export const submissionStepsReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'UPDATE_STEP': {
            return Object.assign({}, state, {
                currentStep: action.step
            });
        }

        case 'UPDATE_ORIGINAL_STEP': {
            return Object.assign({}, state, {
                originalStep: action.step
            });
        }

        case 'UPDATE_LAST_COMPLETED_STEP': {
            return Object.assign({}, state, {
                lastCompletedStep: action.step
            });
        }

        case 'UPDATE_SUBMISSION_ID': {
            return Object.assign({}, state, {
                submissionID: action.submissionID
            });
        }

        case 'CLEAR_SUBMISSION': {
            return initialState;
        }

        default:
            return state;
    }
};

