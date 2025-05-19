import { apiRequest } from './apiRequest';

import StoreSingleton from '../redux/storeSingleton';

import * as uploadActions from '../redux/actions/uploadActions';


export const prepareFileValidationStates = (stagedFiles) => {
    const store = new StoreSingleton().store;
    const validationStates = Object.assign({}, store.getState().submission.validation);
    if (stagedFiles.appropriations) {
        validationStates.appropriations = {
            job_status: "running",
            file_status: "incomplete"
        };
    }
    if (stagedFiles.program_activity) {
        validationStates.program_activity = {
            job_status: "running",
            file_status: "incomplete"
        };
    }
    if (stagedFiles.award_financial) {
        validationStates.award_financial = {
            job_status: "running",
            file_status: "incomplete"
        };
    }
    store.dispatch(uploadActions.setValidation(validationStates));
};

export const prepareMetadata = (metadata, request) => {
    const tmpRequest = Object.assign({}, request);
    // add the metadata to the request
    tmpRequest.cgac_code = metadata.codeType === 'cgac_code' ? metadata.agency : null;
    tmpRequest.frec_code = metadata.codeType === 'frec_code' ? metadata.agency : null;
    tmpRequest.reporting_period_start_date = metadata.startDate;
    tmpRequest.reporting_period_end_date = metadata.endDate;
    tmpRequest.is_quarter = false;
    if (metadata.dateType === "quarter") {
        tmpRequest.is_quarter = true;
    }
    tmpRequest.test_submission = metadata.testSubmission;

    return tmpRequest;
};

export const submitFabs = (data) => {
    const req = apiRequest({
        url: 'publish_fabs_file/',
        method: 'post',
        data
    });

    return req.promise;
};

const prepareFabsFile = (fileDict) => {
    let fieldType = '';

    if (Object.prototype.hasOwnProperty.call(fileDict, 'agency_code')) {
        fieldType = 'agency_code';
    }
    else if (Object.prototype.hasOwnProperty.call(fileDict, 'existing_submission_id')) {
        fieldType = 'existing_submission_id';
    }

    const data = {
        'fabs': fileDict.fabs,
        [fieldType]: fileDict[fieldType],
        'test_submission': fileDict.test_submission || false
    };

    const req = apiRequest({
        url: 'upload_fabs_file/',
        method: 'post',
        headers: { 'Content-Type': 'multipart/form-data' },
        data
    });

    return req.promise;
};

export const performDabsUpload = (submission) => {
    const store = new StoreSingleton().store;
    store.dispatch(uploadActions.setSubmissionState('uploading'));

    let fileDict = prepareMetadata(submission.meta, {});

    for (const fileType in submission.files) {
        if (Object.prototype.hasOwnProperty.call(submission.files, fileType)) {
            fileDict[fileType] = submission.files[fileType].file;
        }
    }

    const req = apiRequest({
        url: 'upload_dabs_files/',
        method: 'post',
        headers: { 'Content-Type': 'multipart/form-data' },
        data: {
            'appropriations': fileDict.appropriations,
            'program_activity': fileDict.program_activity,
            'award_financial': fileDict.award_financial,
            'cgac_code': fileDict.cgac_code || '',
            'frec_code': fileDict.frec_code || '',
            'reporting_period_start_date': fileDict.reporting_period_start_date,
            'reporting_period_end_date': fileDict.reporting_period_end_date,
            'is_quarter': fileDict.is_quarter,
            'test_submission': fileDict.test_submission
        }
    });

    return req.promise;
};

export const performDabsCorrectedUpload = (submission) => {
    const store = new StoreSingleton().store;
    store.dispatch(uploadActions.setSubmissionState('uploading'));

    const fileDict = {
        existing_submission_id: submission.id
    };
    for (const fileType in submission.files) {
        if (Object.prototype.hasOwnProperty.call(submission.files, fileType)) {
            fileDict[fileType] = submission.files[fileType].file;
        }
    }

    const data = {
        'existing_submission_id': fileDict.existing_submission_id
    };

    if (fileDict.appropriations) {
        data.appropriations = fileDict.appropriations;
    }
    if (fileDict.program_activity) {
        data.program_activity = fileDict.program_activity;
    }
    if (fileDict.award_financial) {
        data.award_financial = fileDict.award_financial;
    }

    const req = apiRequest({
        url: 'upload_dabs_files/',
        method: 'post',
        headers: { 'Content-Type': 'multipart/form-data' },
        data
    });

    return req.promise;
};

export const performFabsFileUpload = (submission) => {
    const request = {
        'agency_code': submission.meta.subTierAgency,
        'test_submission': submission.meta.testSubmission
    };

    const store = new StoreSingleton().store;
    store.dispatch(uploadActions.setSubmissionState('uploading'));

    if (Object.prototype.hasOwnProperty.call(submission.files, 'fabs')) {
        request.fabs = submission.files.fabs.file;
    }

    return prepareFabsFile(request);
};

export const performFabsFileCorrectedUpload = (submission) => {
    const request = {
        'existing_submission_id': submission.id
    };

    const store = new StoreSingleton().store;
    store.dispatch(uploadActions.setSubmissionState('uploading'));

    if (Object.prototype.hasOwnProperty.call(submission.files, 'fabs')) {
        request.fabs = submission.files.fabs.file;
    }

    return prepareFabsFile(request);
};
