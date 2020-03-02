/**
 * submissionActions.js
 * Created by Lizzie Salita 2/20/20
 */

export const updateStep = (step) => ({
    type: 'UPDATE_STEP',
    step
});

export const updateOriginalStep = (step) => ({
    type: 'UPDATE_ORIGINAL_STEP',
    step
});

export const updateLastCompletedStep = (step) => ({
    type: 'UPDATE_LAST_COMPLETED_STEP',
    step
});

export const clearSubmission = () => ({
    type: 'CLEAR_SUBMISSION'
});
