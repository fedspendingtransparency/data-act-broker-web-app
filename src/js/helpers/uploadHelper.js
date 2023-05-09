import Q from 'q';
import Request from './sessionSuperagent';

import StoreSingleton from '../redux/storeSingleton';

import { kGlobalConstants } from '../GlobalConstants';
import * as uploadActions from '../redux/actions/uploadActions';


const prepareFilesNewSub = (fileDict) => {
    const deferred = Q.defer();

    Request.post(`${kGlobalConstants.API}upload_dabs_files/`)
        .attach('appropriations', fileDict.appropriations)
        .attach('program_activity', fileDict.program_activity)
        .attach('award_financial', fileDict.award_financial)
        .field('cgac_code', fileDict.cgac_code || '')
        .field('frec_code', fileDict.frec_code || '')
        .field('reporting_period_start_date', fileDict.reporting_period_start_date)
        .field('reporting_period_end_date', fileDict.reporting_period_end_date)
        .field('is_quarter', fileDict.is_quarter)
        .field('test_submission', fileDict.test_submission)
        .end((err, res) => {
            if (err) {
                const response = Object.assign({}, res.body);
                response.httpStatus = res.status;
                deferred.reject(response);
            }
            else {
                deferred.resolve(res);
            }
        });

    return deferred.promise;
};

const prepareFilesExistingSub = (fileDict) => {
    const deferred = Q.defer();
    const store = new StoreSingleton().store;
    // need to update the validation states to make sure the validation boxes get updated
    const validationStates = Object.assign({}, store.getState().submission.validation);

    const req = Request.post(`${kGlobalConstants.API}upload_dabs_files/`);
    if (fileDict.appropriations) {
        req.attach('appropriations', fileDict.appropriations);
        validationStates.appropriations = {
            job_status: "running",
            file_status: "incomplete"
        };
    }
    if (fileDict.program_activity) {
        req.attach('program_activity', fileDict.program_activity);
        validationStates.program_activity = {
            job_status: "running",
            file_status: "incomplete"
        };
    }
    if (fileDict.award_financial) {
        req.attach('award_financial', fileDict.award_financial);
        validationStates.award_financial = {
            job_status: "running",
            file_status: "incomplete"
        };
    }
    req.field('existing_submission_id', fileDict.existing_submission_id)
        .end((err, res) => {
            if (err) {
                const response = Object.assign({}, res.body);
                response.httpStatus = res.status;
                deferred.reject(response);
            }
            else {
                store.dispatch(uploadActions.setValidation(validationStates));
                deferred.resolve(res);
            }
        });

    return deferred.promise;
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

export const submitFabs = (submissionId) => {
    const deferred = Q.defer();

    Request.post(`${kGlobalConstants.API}publish_fabs_file/`)
        .send(submissionId)
        .end((err, res) => {
            if (err) {
                const response = Object.assign({}, res.body);
                response.httpStatus = res.status;
                deferred.reject(response);
            }
            else {
                deferred.resolve(res);
            }
        });

    return deferred.promise;
};

const prepareFabsFile = (fileDict) => {
    const deferred = Q.defer();

    let fieldType = '';

    if (Object.prototype.hasOwnProperty.call(fileDict, 'agency_code')) {
        fieldType = 'agency_code';
    }
    else if (Object.prototype.hasOwnProperty.call(fileDict, 'existing_submission_id')) {
        fieldType = 'existing_submission_id';
    }

    Request.post(`${kGlobalConstants.API}upload_fabs_file/`)
        .attach('fabs', fileDict.fabs)
        .field(fieldType, fileDict[fieldType])
        .field('test_submission', fileDict.test_submission || false)
        .end((err, res) => {
            if (err) {
                const response = Object.assign({}, res.body);
                response.httpStatus = res.status;
                deferred.reject(response);
            }
            else {
                deferred.resolve(res);
            }
        });

    return deferred.promise;
};

export const performRemoteUpload = (submission) => {
    const deferred = Q.defer();

    const store = new StoreSingleton().store;
    store.dispatch(uploadActions.setSubmissionState('uploading'));

    let request = {};

    for (const fileType in submission.files) {
        if (Object.prototype.hasOwnProperty.call(submission.files, fileType)) {
            request[fileType] = submission.files[fileType].file;
        }
    }

    request = prepareMetadata(submission.meta, request);

    prepareFilesNewSub(request)
        .then((res) => {
            store.dispatch(uploadActions.setSubmissionState('prepare'));
            deferred.resolve(res.body.submission_id);
        })
        .catch((err) => {
            store.dispatch(uploadActions.setSubmissionState('failed'));
            deferred.reject(err);
        });

    return deferred.promise;
};

export const performRemoteCorrectedUpload = (submission) => {
    const deferred = Q.defer();

    const store = new StoreSingleton().store;
    store.dispatch(uploadActions.setSubmissionState('uploading'));

    const request = {
        existing_submission_id: submission.id
    };
    for (const fileType in submission.files) {
        if (Object.prototype.hasOwnProperty.call(submission.files, fileType)) {
            request[fileType] = submission.files[fileType].file;
        }
    }

    prepareFilesExistingSub(request)
        .then(() => {
            store.dispatch(uploadActions.setSubmissionState('prepare'));
            deferred.resolve(submission.id);
        })
        .catch((err) => {
            store.dispatch(uploadActions.setSubmissionState('failed'));
            deferred.reject(err);
        });

    return deferred.promise;
};

export const performLocalUpload = (submission) => {
    const deferred = Q.defer();

    let request = {};

    const store = new StoreSingleton().store;
    store.dispatch(uploadActions.setSubmissionState('uploading'));

    request = prepareMetadata(submission.meta, request);

    for (const fileType in submission.files) {
        if (Object.prototype.hasOwnProperty.call(submission.files, fileType)) {
            request[fileType] = submission.files[fileType].file;
        }
    }

    prepareFilesNewSub(request)
        .then((res) => {
            store.dispatch(uploadActions.setSubmissionState('prepare'));
            deferred.resolve(res.body.submission_id);
        })
        .catch((err) => {
            store.dispatch(uploadActions.setSubmissionState('failed'));
            deferred.reject(err);
        });

    return deferred.promise;
};

export const performLocalCorrectedUpload = (submission) => {
    const deferred = Q.defer();

    const store = new StoreSingleton().store;
    store.dispatch(uploadActions.setSubmissionState('uploading'));

    const request = {
        existing_submission_id: submission.id
    };

    for (const fileType in submission.files) {
        if (Object.prototype.hasOwnProperty.call(submission.files, fileType)) {
            request[fileType] = submission.files[fileType].file;
        }
    }

    prepareFilesExistingSub(request)
        .then(() => {
            store.dispatch(uploadActions.setSubmissionState('prepare'));
            deferred.resolve(submission.id);
        })
        .catch((err) => {
            store.dispatch(uploadActions.setSubmissionState('failed'));
            deferred.reject(err);
        });

    return deferred.promise;
};

export const performFabsFileUpload = (submission) => {
    const deferred = Q.defer();

    const store = new StoreSingleton().store;
    store.dispatch(uploadActions.setSubmissionState('uploading'));

    const request = {
        agency_code: submission.meta.subTierAgency,
        test_submission: submission.meta.testSubmission
    };

    if (Object.prototype.hasOwnProperty.call(submission.files, 'fabs')) {
        request.fabs = submission.files.fabs.file;
    }


    prepareFabsFile(request)
        .then((res) => {
            store.dispatch(uploadActions.setSubmissionState('prepare'));
            deferred.resolve(res.body.submission_id);
        })
        .catch((err) => {
            store.dispatch(uploadActions.setSubmissionState('failed'));
            deferred.reject(err);
        });

    return deferred.promise;
};

export const performFabsFileCorrectedUpload = (submission) => {
    const deferred = Q.defer();

    const store = new StoreSingleton().store;
    store.dispatch(uploadActions.setSubmissionState('uploading'));

    const request = {
        existing_submission_id: submission.id
    };

    if (Object.prototype.hasOwnProperty.call(submission.files, 'fabs')) {
        request.fabs = submission.files.fabs.file;
    }

    prepareFabsFile(request)
        .then((res) => {
            store.dispatch(uploadActions.setSubmissionState('prepare'));
            deferred.resolve(res.body.submission_id);
        })
        .catch((err) => {
            store.dispatch(uploadActions.setSubmissionState('failed'));
            deferred.reject(err);
        });

    return deferred.promise;
};

export const performFabsLocalUpload = (submission) => {
    const deferred = Q.defer();

    const request = {
        agency_code: submission.meta.subTierAgency,
        test_submission: submission.meta.testSubmission
    };

    const store = new StoreSingleton().store;
    store.dispatch(uploadActions.setSubmissionState('uploading'));

    if (Object.prototype.hasOwnProperty.call(submission.files, 'fabs')) {
        request.fabs = submission.files.fabs.file;
    }

    prepareFabsFile(request)
        .then((res) => {
            store.dispatch(uploadActions.setSubmissionState('prepare'));
            deferred.resolve(res.body.submission_id);
        })
        .catch((err) => {
            store.dispatch(uploadActions.setSubmissionState('failed'));
            deferred.reject(err);
        });

    return deferred.promise;
};

export const performFabsLocalCorrectedUpload = (submission) => {
    const deferred = Q.defer();

    const request = {
        existing_submission_id: submission.id
    };

    const store = new StoreSingleton().store;
    store.dispatch(uploadActions.setSubmissionState('uploading'));

    if (Object.prototype.hasOwnProperty.call(submission.files, 'fabs')) {
        request.fabs = submission.files.fabs.file;
    }

    prepareFabsFile(request)
        .then((res) => {
            store.dispatch(uploadActions.setSubmissionState('prepare'));
            deferred.resolve(res.body.submission_id);
        })
        .catch((err) => {
            store.dispatch(uploadActions.setSubmissionState('failed'));
            deferred.reject(err);
        });

    return deferred.promise;
};
