export const mockProps = {
    computedMatch: {
        params: {
            submissionID: "2054"
        }
    }
};

export const originalState = {
    isLoading: true,
    isError: false,
    errorMessage: '',
    step: 0,
    originalStep: 0,
    completedSteps: [
        false,
        false,
        false,
        false
    ],
    goToRoute: false
};

export const routes = [
    'validateData',
    'generateFiles',
    'validateCrossFile',
    'generateEF',
    'reviewData'
];

export const response = {
    message: "The current progress of this submission ID is on /v1/reviewData/ page.",
    step: "5"
};
