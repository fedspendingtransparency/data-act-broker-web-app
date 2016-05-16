import Request from './sessionSuperagent.js';
import Q from 'q';
import AWS from 'aws-sdk';
import { dispatch } from 'redux';
import moment from 'moment';

import StoreSingleton from '../redux/storeSingleton.js';

import { kGlobalConstants } from '../GlobalConstants.js';
import * as uploadActions from '../redux/actions/uploadActions.js';


const uploadLocalFile = (file, type) => {
    const deferred = Q.defer();
    let formData = new FormData();
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
}

export const performLocalUpload = (submission) => {

	const deferred = Q.defer();

	const request = {};
    let successfulUploads = {};

    const store = new StoreSingleton().store;
	store.dispatch(uploadActions.setSubmissionState('uploading'));

    // add the metadata to the request
    request.agency_name = submission.meta.agency;
    request.reporting_period_start_date = submission.meta.startDate.format('MM/DD/YYYY');
    request.reporting_period_end_date = submission.meta.endDate.format('MM/DD/YYYY');

    let i = 0;

    const uploadOperations = [];
    const types = [];
    let submissionID = null;

    for (let fileType in submission.files) {
		const file = submission.files[fileType].file;
        uploadOperations.push(uploadLocalFile(file, fileType));
        types.push(fileType);
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
}

const prepareFiles = (fileDict) => {

	const deferred = Q.defer();

	Request.post(kGlobalConstants.API + 'submit_files/')
		.send(fileDict)
		.end((err, res) => {
			if (err) {
				deferred.reject(err);
			}
			else {
				deferred.resolve(res);
			}
		});

	return deferred.promise;
}

const uploadS3File = (file, fileID, key, credentials, fileType) => {
	const deferred = Q.defer();

	AWS.config.update({
            'accessKeyId': credentials.AccessKeyId,
            'secretAccessKey': credentials.SecretAccessKey,
            'sessionToken': credentials.SessionToken,
            'region': kGlobalConstants.AWS_REGION
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
        .on('httpUploadProgress', evt => {

        	const progress = (evt.loaded / evt.total) * 100;

        	// update Redux with the upload progress
        	store.dispatch(uploadActions.setUploadProgress({
        		name: fileType,
        		progress: progress
        	}));

        })
        .send(error => {
            if (error) {
                // update Redux with the upload state
                store.dispatch(uploadActions.setUploadState({
                    name: fileType,
                    state: 'failed'
                }));

                deferred.reject({
                    error: error,
                    file: fileType
                });
            } else {
                // update Redux with the upload state
                store.dispatch(uploadActions.setUploadState({
                    name: fileType,
                    state: 'success'
                }));
            	deferred.resolve(fileID);
            }
        });

    return deferred.promise;
}

const uploadMultipleFiles = (submission, serverData) => {
	let operations = [];

	const credentials = serverData.credentials;

	for (let fileType in submission.files) {
		const file = submission.files[fileType].file;
		const fileID = serverData[fileType + '_id'];
		const fileKey = serverData[fileType + '_key'];

		operations.push(uploadS3File(file, fileID, fileKey, credentials, fileType));
	}

	return Q.all(operations);
}

const finalizeUpload = (fileID) => {
    
    const deferred = Q.defer();

	Request.post(kGlobalConstants.API + 'finalize_job/')
               .send({ 'upload_id': fileID })
               .end((err, res) => {
                   if (err) {
                       console.log(err + JSON.stringify(res.body));
                       deferred.reject();
                   } else {
                       deferred.resolve();
                   }
               });

    return deferred.promise;
}

const finalizeMultipleUploads = (fileIds) => {
	let operations = [];

	fileIds.forEach((fileID) => {
		operations.push(finalizeUpload(fileID));
	});

	return Q.all(operations);
}

export const performRemoteUpload = (submission) => {

	const deferred = Q.defer();

	const store = new StoreSingleton().store;
	store.dispatch(uploadActions.setSubmissionState('uploading'));

	let request = {};

	for (let fileType in submission.files) {
		const file = submission.files[fileType].file;
		request[fileType] = file.name;
	}

    // add the metadata to the request
    request.agency_name = submission.meta.agency;
    request.reporting_period_start_date = submission.meta.startDate.format('MM/DD/YYYY');
    request.reporting_period_end_date = submission.meta.endDate.format('MM/DD/YYYY');

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
}

export const performRemoteCorrectedUpload = (submission) => {
    const deferred = Q.defer();

    const store = new StoreSingleton().store;
    store.dispatch(uploadActions.setSubmissionState('uploading'));

    let request = {
        existing_submission_id: submission.id
    };
    for (let fileType in submission.files) {
        const file = submission.files[fileType].file;
        request[fileType] = file.name;
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
}

export const performLocalCorrectedUpload = (submission) => {
    const deferred = Q.defer();

    const store = new StoreSingleton().store;
    store.dispatch(uploadActions.setSubmissionState('uploading'));

    const request = {
        existing_submission_id: submission.id
    };

    const uploadOperations = [];
    const types = [];
    let submissionID = null;

    for (let fileType in submission.files) {
        const file = submission.files[fileType].file;
        uploadOperations.push(uploadLocalFile(file, fileType));
        types.push(fileType);
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
}