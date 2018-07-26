import Q from 'q';
import AWS from 'aws-sdk';
import Request from './sessionSuperagent';

import StoreSingleton from '../redux/storeSingleton';

import { kGlobalConstants } from '../GlobalConstants';
import * as uploadActions from '../redux/actions/uploadActions';


const uploadLocalFile = (file, type) => {
    const deferred = Q.defer();
    const formData = new window.FormData();
    formData.append('file', file);

    Request.post(kGlobalConstants.API + 'local_upload/')
        .send(formData)
        .end((err, res) => {
            if (err) {
                deferred.reject(err);
            }
            else {
                deferred.resolve([type, res.body.path]);
            }
        });

    return deferred.promise;
};

const finalizeUpload = (fileID) => {
    const deferred = Q.defer();

    Request.post(kGlobalConstants.API + 'finalize_job/')
        .send({ upload_id: fileID })
        .end((err, res) => {
            if (err) {
                console.error(err + JSON.stringify(res.body));
                deferred.reject();
            }
            else {
                deferred.resolve();
            }
        });

    return deferred.promise;
};

const finalizeMultipleUploads = (fileIds) => {
    const operations = [];

    fileIds.forEach((fileID) => {
        operations.push(finalizeUpload(fileID));
    });

    return Q.all(operations);
};

const prepareFilesNewSub = (fileDict) => {
    const deferred = Q.defer();

    Request.post(kGlobalConstants.API + 'submit_files/')
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

    Request.post(kGlobalConstants.API + 'submit_files/')
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

const uploadS3File = (file, fileID, key, credentials, fileType) => {
    const deferred = Q.defer();

    AWS.config.update({
        accessKeyId: credentials.AccessKeyId,
        secretAccessKey: credentials.SecretAccessKey,
        sessionToken: credentials.SessionToken,
        region: kGlobalConstants.AWS_REGION
    });

    const s3 = new AWS.S3();
    const s3params = {
        Bucket: kGlobalConstants.BUCKET_NAME,
        Key: key,
        Body: file
    };

    const store = new StoreSingleton().store;

    // notify the Redux store that the file has begun to upload
    store.dispatch(uploadActions.setUploadState({
        name: fileType,
        state: 'uploading'
    }));

    s3.upload(s3params)
        .on('httpUploadProgress', (evt) => {
            const progress = (evt.loaded / evt.total) * 100;

            // update Redux with the upload progress
            store.dispatch(uploadActions.setUploadProgress({
                name: fileType,
                progress
            }));
        })
        .send((error) => {
            if (error) {
                console.error(error);
                // update Redux with the upload state
                store.dispatch(uploadActions.setUploadState({
                    name: fileType,
                    state: 'failed'
                }));

                deferred.reject({
                    error,
                    file: fileType
                });
            }
            else {
                // update Redux with the upload state
                store.dispatch(uploadActions.setUploadState({
                    name: fileType,
                    state: 'success'
                }));
                deferred.resolve(fileID);
            }
        });

    return deferred.promise;
};

const uploadMultipleFiles = (submission, serverData) => {
    const operations = [];

    const credentials = serverData.credentials;

    for (const fileType in submission.files) {
        if (submission.files.hasOwnProperty(fileType)) {
            const file = submission.files[fileType].file;
            const fileID = serverData[fileType + '_id'];
            const fileKey = serverData[fileType + '_key'];

            operations.push(uploadS3File(file, fileID, fileKey, credentials, fileType));
        }
    }

    return Q.all(operations);
};

export const performRemoteUpload = (submission) => {
    const deferred = Q.defer();

    const store = new StoreSingleton().store;
    store.dispatch(uploadActions.setSubmissionState('uploading'));

    let request = {};

    for (const fileType in submission.files) {
        if (submission.files.hasOwnProperty(fileType)) {
            const file = submission.files[fileType].file;
            request[fileType] = file.name;
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
            const file = submission.files[fileType].file;
            request[fileType] = file.name;
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
