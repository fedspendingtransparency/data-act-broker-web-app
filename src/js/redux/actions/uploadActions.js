export const setUploadItem = (state) => ({
    type: 'SET_UPLOAD_ITEM',
    name: state.name,
    file: state.file,
    state: state.state
});

export const removeUploadItem = (state) => ({
    type: 'REMOVE_UPLOAD_ITEM',
    name: state.name,
    state: state.state
});

export const setUploadProgress = (state) => ({
    type: 'SET_UPLOAD_PROGRESS',
    name: state.name,
    progress: state.progress
});

export const setUploadState = (state) => ({
    type: 'SET_UPLOAD_STATE',
    name: state.name,
    state: state.state
});

export const setSubmissionState = (state) => ({
    type: 'SET_SUBMISSION_STATE',
    state: state
});

export const setMeta = (state) => ({
    type: 'SET_META',
    state: {
        agency: state.agency,
        codeType: state.codeType,
        startDate: state.startDate,
        endDate: state.endDate,
        dateType: state.dateType
    }
});

export const setSubmissionId = (state) => ({
    type: 'SET_SUBMISSION_ID',
    state: state
});

export const setSubmissionPublishStatus = (state) => ({
    type: 'SET_SUBMISSION_PUBLISH_STATUS',
    state: state
});

export const resetSubmission = () => ({
    type: 'RESET_SUBMISSION'
});

export const setValidation = (state) => ({
    type: 'SET_VALIDATION',
    state: state
});

export const setCrossFile = (state) => ({
    type: 'SET_CROSS_FILE',
    state: state
});

export const setExpectedCrossPairs = (state) => ({
    type: 'SET_EXPECTED_CROSS_PAIRS',
    state: state
});

export const setCrossFileStage = (state) => ({
    type: 'SET_CROSS_FILE_STAGE',
    state: state
});
