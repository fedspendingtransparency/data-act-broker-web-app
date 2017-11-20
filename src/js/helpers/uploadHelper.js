import Request from './sessionSuperagent.js';
import Q from 'q';
import AWS from 'aws-sdk';

import StoreSingleton from '../redux/storeSingleton.js';

import { kGlobalConstants } from '../GlobalConstants.js';
import * as uploadActions from '../redux/actions/uploadActions.js';


const uploadLocalFile = (file, type) => {
    const deferred = Q.defer();
    const formData = new FormData();
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
                       console.log(err + JSON.stringify(res.body));
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

const prepareFiles = (fileDict) => {
    const deferred = Q.defer();

    Request.post(kGlobalConstants.API + 'submit_files/')
        .send(fileDict)
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

export const performLocalUpload = (submission) => {
    const deferred = Q.defer();

    let request = {};

    const store = new StoreSingleton().store;
    store.dispatch(uploadActions.setSubmissionState('uploading'));

    request = prepareMetadata(submission.meta, request);

    const uploadOperations = [];
    const types = [];
    let submissionID = null;

    for (const fileType in submission.files) {
        if (submission.files.hasOwnProperty(fileType)) {
            const file = submission.files[fileType].file;
            uploadOperations.push(uploadLocalFile(file, fileType));
            types.push(fileType);
        }
    }

    Q.all(uploadOperations)
        .then((uploads) => {
            // prepare the request
            uploads.forEach((upload) => {
                request[upload[0]] = upload[1];
            });

            // submit the files
            return prepareFiles(request);
        })
        .then((res) => {
            submissionID = res.body.submission_id;

            // get all the file IDs
            const fileIds = [];
            types.forEach((type) => {
                const key = type + '_id';
                fileIds.push(res.body[key]);
            });

            // finalize all the files
            return finalizeMultipleUploads(fileIds);
        })
        .then(() => {
            store.dispatch(uploadActions.setSubmissionState('prepare'));
            deferred.resolve(submissionID);
        })
        .catch(() => {
            store.dispatch(uploadActions.setSubmissionState('failed'));
            deferred.reject();
        });

    return deferred.promise;
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

const prepareDetachedFiles = (fileDict) => {
    const deferred = Q.defer();

    Request.post(kGlobalConstants.API + 'upload_detached_file/')
        .send(fileDict)
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
                progress: progress
            }));
        })
        .send((error) => {
            if (error) {
                console.log(error);
                // update Redux with the upload state
                store.dispatch(uploadActions.setUploadState({
                    name: fileType,
                    state: 'failed'
                }));

                deferred.reject({
                    error: error,
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

    // submit it to the API to set up S3
    let submissionID;

    prepareFiles(request)
        .then((res) => {
            // now do the actual uploading
            submissionID = res.body.submission_id;
            return uploadMultipleFiles(submission, res.body);
        })
        .then((fileIds) => {
            // upload complete, finalize with the API
            return finalizeMultipleUploads(fileIds);
        })
        .then(() => {
            store.dispatch(uploadActions.setSubmissionState('prepare'));
            deferred.resolve(submissionID);
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

    prepareFiles(request)
        .then((res) => {
            // now do the actual uploading
            return uploadMultipleFiles(submission, res.body);
        })
        .then((fileIds) => {
            // upload complete, finalize with the API
            return finalizeMultipleUploads(fileIds);
        })
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

export const performLocalCorrectedUpload = (submission) => {
    const deferred = Q.defer();

    const store = new StoreSingleton().store;
    store.dispatch(uploadActions.setSubmissionState('uploading'));

    const request = {
        existing_submission_id: submission.id
    };

    const uploadOperations = [];
    const types = [];

    for (const fileType in submission.files) {
        if (submission.files.hasOwnProperty(fileType)) {
            const file = submission.files[fileType].file;
            uploadOperations.push(uploadLocalFile(file, fileType));
            types.push(fileType);
        }
    }

    Q.all(uploadOperations)
        .then((uploads) => {
           // prepare the request
            uploads.forEach((upload) => {
                request[upload[0]] = upload[1];
            });

            // submit the files
            return prepareFiles(request);
        })
        .then((res) => {
            // get all the file IDs
            const fileIds = [];
            types.forEach((type) => {
                const key = type + '_id';
                fileIds.push(res.body[key]);
            });

            // finalize all the files
            return finalizeMultipleUploads(fileIds);
        })
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

export const performDetachedFileUpload = (submission) => {
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
    request.agency_code = submission.meta.subTierAgency;

    // submit it to the API to set up S3
    let submissionID;

    prepareDetachedFiles(request)
        .then((res) => {
            // now do the actual uploading
            submissionID = res.body.submission_id;
            return uploadMultipleFiles(submission, res.body);
        })
        .then((fileIds) => {
            // upload complete, finalize with the API
            return finalizeMultipleUploads(fileIds);
        })
        .then(() => {
            store.dispatch(uploadActions.setSubmissionState('prepare'));
            deferred.resolve(submissionID);
        })
        .catch((err) => {
            store.dispatch(uploadActions.setSubmissionState('failed'));
            deferred.reject(err);
        });

    return deferred.promise;
};

export const performDetachedFileCorrectedUpload = (submission) => {
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

    // submit it to the API to set up S3
    let submissionID;

    prepareDetachedFiles(request)
        .then((res) => {
            // now do the actual uploading
            submissionID = res.body.submission_id;
            return uploadMultipleFiles(submission, res.body);
        })
        .then((fileIds) => {
            // upload complete, finalize with the API
            return finalizeMultipleUploads(fileIds);
        })
        .then(() => {
            store.dispatch(uploadActions.setSubmissionState('prepare'));
            deferred.resolve(submissionID);
        })
        .catch((err) => {
            store.dispatch(uploadActions.setSubmissionState('failed'));
            deferred.reject(err);
        });

    return deferred.promise;
};

export const performDetachedLocalUpload = (submission) => {
    const deferred = Q.defer();

    let request = {};

    const store = new StoreSingleton().store;
    store.dispatch(uploadActions.setSubmissionState('uploading'));

    request = prepareMetadata(submission.meta, request);
    request.agency_code = submission.meta.subTierAgency;

    const uploadOperations = [];
    const types = [];
    let submissionID = null;

    for (const fileType in submission.files) {
        if (submission.files.hasOwnProperty(fileType)) {
            const file = submission.files[fileType].file;
            uploadOperations.push(uploadLocalFile(file, fileType));
            types.push(fileType);
        }
    }

    Q.all(uploadOperations)
        .then((uploads) => {
            // prepare the request
            uploads.forEach((upload) => {
                request[upload[0]] = upload[1];
            });

            // submit the files
            return prepareDetachedFiles(request);
        })
        .then((res) => {
            submissionID = res.body.submission_id;

            // get all the file IDs
            const fileIds = [];
            types.forEach((type) => {
                const key = type + '_id';
                fileIds.push(res.body[key]);
            });

            // finalize all the files
            return finalizeMultipleUploads(fileIds);
        })
        .then(() => {
            store.dispatch(uploadActions.setSubmissionState('prepare'));
            deferred.resolve(submissionID);
        })
        .catch((err) => {
            store.dispatch(uploadActions.setSubmissionState('failed'));
            deferred.reject(err);
        });

    return deferred.promise;
};

export const performDetachedLocalCorrectedUpload = (submission) => {
    const deferred = Q.defer();

    const request = {
        existing_submission_id: submission.id
    };

    const store = new StoreSingleton().store;
    store.dispatch(uploadActions.setSubmissionState('uploading'));

    const uploadOperations = [];
    const types = [];
    let submissionID = null;

    for (const fileType in submission.files) {
        if (submission.files.hasOwnProperty(fileType)) {
            const file = submission.files[fileType].file;
            uploadOperations.push(uploadLocalFile(file, fileType));
            types.push(fileType);
        }
    }

    Q.all(uploadOperations)
        .then((uploads) => {
            // prepare the request
            uploads.forEach((upload) => {
                request[upload[0]] = upload[1];
            });

            // submit the files
            return prepareDetachedFiles(request);
        })
        .then((res) => {
            submissionID = res.body.submission_id;

            // get all the file IDs
            const fileIds = [];
            types.forEach((type) => {
                const key = type + '_id';
                fileIds.push(res.body[key]);
            });

            // finalize all the files
            return finalizeMultipleUploads(fileIds);
        })
        .then(() => {
            store.dispatch(uploadActions.setSubmissionState('prepare'));
            deferred.resolve(submissionID);
        })
        .catch((err) => {
            store.dispatch(uploadActions.setSubmissionState('failed'));
            deferred.reject(err);
        });

    return deferred.promise;
};
