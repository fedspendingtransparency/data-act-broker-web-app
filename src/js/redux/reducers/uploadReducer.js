const initialUploadState = {
    state: 'empty',
    id: null,
    meta: {
        agency: '',
        startDate: null,
        endDate: null
    },
    files: {},
    validation: {},
    crossFile: {
        errors: {},
        warnings: {}
    },
    crossFileOrder: [],
    crossFileStaging: {},
    publishStatus: ''
};

const setUploadItem = (state, action) => {
    const newFile = {
        [action.name]: {
            state: action.state,
            file: action.file,
            progress: 0
        }
    };

    const files = Object.assign({}, state.files, newFile);

    return files;
};

const removeUploadItem = (state, action) => {
    const stateTemp = state;
    if (action.name && stateTemp.files[action.name]) {
        delete stateTemp.files[action.name];
    }

    return stateTemp.files;
};

const setUploadProgress = (state, action) => {
    const file = Object.assign({}, state.files[action.name]);
    file.progress = action.progress;

    const newFile = {
        [action.name]: file
    };

    const files = Object.assign({}, state.files, newFile);

    return files;
};

const setUploadState = (state, action) => {
    const file = Object.assign({}, state.files[action.name]);
    file.state = action.state;

    const newFile = {
        [action.name]: file
    };

    const files = Object.assign({}, state.files, newFile);

    return files;
};

export const uploadReducer = (state = initialUploadState, action) => {
    switch (action.type) {
        case 'SET_UPLOAD_ITEM':
            return Object.assign({}, state, {
                files: setUploadItem(state, action)
            });

        case 'REMOVE_UPLOAD_ITEM':
            return Object.assign({}, state, {
                files: removeUploadItem(state, action)
            });

        case 'SET_UPLOAD_PROGRESS':
            return Object.assign({}, state, {
                files: setUploadProgress(state, action)
            });

        case 'SET_UPLOAD_STATE':
            return Object.assign({}, state, {
                files: setUploadState(state, action)
            });

        case 'SET_SUBMISSION_STATE':
            return Object.assign({}, state, {
                state: action.state
            });

        case 'SET_META':
            return Object.assign({}, state, {
                meta: action.state
            });

        case 'SET_SUBMISSION_ID':
            return Object.assign({}, state, {
                id: action.state
            });

        case 'SET_SUBMISSION_PUBLISH_STATUS':
            return Object.assign({}, state, {
                publishStatus: action.state
            });

        case 'RESET_SUBMISSION':
            return Object.assign({}, initialUploadState);

        case 'SET_VALIDATION':
            // receiving validation should also wipe out the files state
            // we'll be storing the updated file changes in the file state at this stage
            return Object.assign({}, state, {
                validation: action.state,
                files: {}
            });

        case 'SET_CROSS_FILE':
            // receiving data on cross-file validation
            return Object.assign({}, state, {
                crossFile: action.state
            });
        case 'SET_EXPECTED_CROSS_PAIRS':
            // calculate and set the cross file pairs we expect to see
            return Object.assign({}, state, {
                crossFileOrder: action.state
            });
        case 'SET_CROSS_FILE_STAGE':
            // user has staged a file for upload in the cross file validation screen, note the origin pair
            return Object.assign({}, state, {
                crossFileStaging: action.state
            });

        default:
            return state;
    }
};
