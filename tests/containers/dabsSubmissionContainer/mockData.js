export const mockProps = {
    computedMatch: {
        params: {
            submissionID: '2054',
            step: 'generateFiles'
        }
    },
    history: {
        push: jest.fn()
    }
};

export const originalState = {
    loading: true,
    error: false,
    errorMessage: '',
    submissionInfo: {},
    originalStep: 0,
    currentStep: 0,
    lastCompletedStep: 0
};

export const routes = [
    'validateData',
    'generateFiles',
    'validateCrossFile',
    'generateEF',
    'reviewData'
];

export const response = {
    message: 'The current progress of this submission ID is on /v1/reviewData/ page.',
    step: '5'
};

export const submissionMetadata = {
    reporting_period: '12/2020',
    agency_name: 'Department of the Treasury (TREAS)',
    last_updated: '2020-02-06T22:04:25'
};
