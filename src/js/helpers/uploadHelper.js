import Q from 'q';
import Request from './sessionSuperagent';

import StoreSingleton from '../redux/storeSingleton';

import { kGlobalConstants } from '../GlobalConstants';
import * as uploadActions from '../redux/actions/uploadActions';


const prepareFilesNewSub = (fileDict) => {
    const deferred = Q.defer();

    Request.post(kGlobalConstants.API + 'upload_dabs_files/')
        .attach('appropriations', fileDict.appropriations)
        .attach('program_activity', fileDict.program_activity)
        .attach('award_financial', fileDict.award_financial)
        .field('cgac_code', fileDict.cgac_code)
        .field('frec_code', fileDict.frec_code)
        .field('reporting_period_start_date', fileDict.reporting_period_start_date)
        .field('reporting_period_end_date', fileDict.reporting_period_end_date)
        .field('is_quarter', fileDict.is_quarter)
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

    Request.post(kGlobalConstants.API + 'upload_dabs_files/')
        .attach('appropriations', fileDict.appropriations)
        .attach('program_activity', fileDict.program_activity)
        .attach('award_financial', fileDict.award_financial)
        .field('existing_submission_id', fileDict.existing_submission_id)
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

const prepareMetadata = (metadata, request) => {
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

    return tmpRequest;
};

export const submitFabs = (submissionId) => {
    const deferred = Q.defer();

    Request.post(kGlobalConstants.API + 'submit_detached_file/')
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

    if (fileDict.hasOwnProperty('agency_code')) {
        fieldType = 'agency_code';
    }
    else if (fileDict.hasOwnProperty('existing_submission_id')) {
        fieldType = 'existing_submission_id';
    }

    Request.post(kGlobalConstants.API + 'upload_detached_file/')
        .attach('fabs', fileDict.fabs)
        .field(fieldType, fileDict[fieldType])
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
        if (submission.files.hasOwnProperty(fileType)) {
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
        if (submission.files.hasOwnProperty(fileType)) {
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
        if (submission.files.hasOwnProperty(fileType)) {
            request[fileType] = submission.files[fileType].file;
        }
    }

    prepareFilesNewSub(request)
        .then((res) => {
            store.dispatch(uploadActions.setSubmissionState('prepare'));
            deferred.resolve(res.body.submission_id);
        })
        .catch(() => {
            store.dispatch(uploadActions.setSubmissionState('failed'));
            deferred.reject();
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
        if (submission.files.hasOwnProperty(fileType)) {
            request[fileType] = submission.files[fileType].file;
        }
    }

    prepareFilesExistingSub(request)
        .then(() => {
            store.dispatch(uploadActions.setSubmissionState('prepare'));
            deferred.resolve(submission.id);
        })
        .catch(() => {
            store.dispatch(uploadActions.setSubmissionState('failed'));
            deferred.reject();
        });

    return deferred.promise;
};

export const performFabsFileUpload = (submission) => {
    const deferred = Q.defer();

    const store = new StoreSingleton().store;
    store.dispatch(uploadActions.setSubmissionState('uploading'));

    const request = {
        agency_code: submission.meta.subTierAgency
    };

    if (submission.files.hasOwnProperty('fabs')) {
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

    if (submission.files.hasOwnProperty('fabs')) {
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
        agency_code: submission.meta.subTierAgency
    };

    const store = new StoreSingleton().store;
    store.dispatch(uploadActions.setSubmissionState('uploading'));

    if (submission.files.hasOwnProperty('fabs')) {
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

    if (submission.files.hasOwnProperty('fabs')) {
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
