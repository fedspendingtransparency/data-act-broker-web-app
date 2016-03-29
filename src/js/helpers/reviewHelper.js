import Request from 'superagent';
import Q from 'q';
import AWS from 'aws-sdk';
import { dispatch } from 'redux';

import StoreSingleton from '../redux/storeSingleton.js';

import { kGlobalConstants } from '../GlobalConstants.js';
import * as uploadActions from '../redux/actions/uploadActions.js';

import { fileTypes } from '../containers/addData/fileTypes.js';


const fetchStatus = (submissionId) => {
	const deferred = Q.defer();

	Request.post(kGlobalConstants.API + 'check_status/')
	        .withCredentials()
	        .send({'submission_id': submissionId})
	        .end((errFile, res) => {

	        	if (errFile) {
	        		deferred.reject(errFile);
	        	}
	        	else {
	        		deferred.resolve(res.body);
	        	}

	        });

	return deferred.promise;
}

export const fetchErrorReports = (submissionId) => {
	const deferred = Q.defer();

	Request.post(kGlobalConstants.API + 'submission_error_reports/')
			.withCredentials()
			.send({'submission_id': submissionId})
			.end((errFile, res) => {

				if (errFile) {
					deferred.reject(errFile);
				}
				else {
					deferred.resolve(res.body);
				}

			});

	return deferred.promise;
}

const getFileStates = (status) => {
	let output = {};

	Object.keys(status).forEach((key) => {

		const item = status[key];

		if (item.job_type == 'csv_record_validation') {
			output[item.file_type] = item;
			output[item.file_type].id = key;
			output[item.file_type].report = null;
		}
	});

	return output;
}


const getFileReports = (status, reports) => {

	for (let key in status) {
		let item = status[key];
		item.report = reports['job_' + item.id + '_error_url'];
	}

	return status;
}

export const validateSubmission  = (submissionId) => {

	const deferred = Q.defer();

	let status;

	fetchStatus(submissionId)
		.then((statusRes) => {
			status = getFileStates(statusRes);
			return fetchErrorReports(submissionId);
		})
		.then((reports) => {
			getFileReports(status, reports);
			deferred.resolve(status);
		})
		.catch((err) => {
			deferred.reject(err);
		});

	return deferred.promise;

}
