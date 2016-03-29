import Request from 'superagent';
import Q from 'q';
import AWS from 'aws-sdk';
import { dispatch } from 'redux';

import StoreSingleton from '../redux/storeSingleton.js';

import { kGlobalConstants } from '../GlobalConstants.js';
import * as uploadActions from '../redux/actions/uploadActions.js';

export const performLocalUpload = (submission) => {

	const deferred = Q.defer();

	const request = {};
    let successfulUploads = {};

    const store = new StoreSingleton().store;
	store.dispatch(uploadActions.setSubmissionState('uploading'));

    let i = 0;

    for (let fileType in submission.files) {
		const file = submission.files[fileType].file;
		let formData = new FormData();

        formData.append('file', file);

        Request.post(kGlobalConstants.API + 'local_upload/')
            .withCredentials()
            .send(formData)
            .end((err, res) => {
                if (err) {
                    console.log(err + JSON.stringify(res.body));
                    store.dispatch(uploadActions.setSubmissionState('ready'));
                    deferred.reject(err);
                } else {
                    request[fileType] = res.body.path;

                    if (i === Object.keys(submission.files).length-1) {
                        const req = Request.post(kGlobalConstants.API + 'submit_files/')
                            .withCredentials()
                            .send(request)
                            .end((err, res) => {
                                if (err) {
                                    console.log(err + res);
                                    store.dispatch(uploadActions.setSubmissionState('ready'));
                                    deferred.reject(err);
                                } else {

                                	const fileID = res.body[fileType + '_id'];
                                	const submissionID = res.body.submission_id;
                                	finalizeUpload(fileID)
                                		.then(() => {
                                			store.dispatch(uploadActions.setSubmissionState('review'));
                                			deferred.resolve(submissionID);
                                		})
                                		.catch(() => {
                                			store.dispatch(uploadActions.setSubmissionState('ready'));
                                			deferred.reject();
                                		});
                                }
                        });
                    }
                }
            });
    }

    return deferred.promise;
}

const prepareFiles = (fileDict) => {

	const deferred = Q.defer();

	Request.post(kGlobalConstants.API + 'submit_files/')
		.withCredentials()
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
            'sessionToken': credentials.SessionToken
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
	Request.post(kGlobalConstants.API + 'finalize_job/')
               .withCredentials()
               .send({ 'upload_id': fileID })
               .end((err, res) => {
                   if (err) {
                       console.log(err + JSON.stringify(res.body));
                   } else {
                       
                   }
               });
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
			store.dispatch(uploadActions.setSubmissionState('review'));
			deferred.resolve(submissionID);
		})
		.catch((err) => {
			store.dispatch(uploadActions.setSubmissionState('failed'));
			deferred.reject(err);
		});

	return deferred.promise;
}