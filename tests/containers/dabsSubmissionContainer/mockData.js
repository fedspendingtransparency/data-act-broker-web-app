export const mockProps = {
    computedMatch: {
        params: {
            submissionID: "2054"
        }
    },
    history: {
        push: jest.fn()
    }
};

export const originalState = {
    isLoading: true,
    isError: false,
    errorMessage: '',
    step: 0,
    originalStep: 0,
    completedSteps: {
        0: false,
        1: false,
        2: false,
        3: false
    }
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
