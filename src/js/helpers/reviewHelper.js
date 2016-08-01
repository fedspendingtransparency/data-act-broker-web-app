import Request from './sessionSuperagent.js';
import Q from 'q';
import { dispatch } from 'redux';
import _ from 'lodash';

import StoreSingleton from '../redux/storeSingleton.js';

import { kGlobalConstants } from '../GlobalConstants.js';
import * as uploadActions from '../redux/actions/uploadActions.js';

import { fileTypes } from '../containers/addData/fileTypes.js';
import * as AdminHelper from './adminHelper.js';

const availablePairs = ['appropriations-program_activity', 'award_financial-award'];
const globalFileKeys = ['appropriations', 'program_activity', 'award_financial', 'award'];
export const globalFileData = {
	appropriations: {
		name: 'Appropriations Account',
		letter: 'A'
	},
	program_activity: {
		name: 'Program Activity and Object Class Data',
		letter: 'B'
	},
	award_financial: {
		name: 'Award Financial',
		letter: 'C'
	},
	award: {
		name: 'Financial Assistance Award',
		letter: 'D2'
	}
};

const determineExpectedPairs = () => {
	const output = [];

	availablePairs.forEach((keyName) => {
		
		const firstKey = keyName.split('-')[0];
		const secondKey = keyName.split('-')[1];
		
		const item = {
			key: keyName,
			firstType: globalFileData[firstKey].letter,
			firstName: globalFileData[firstKey].name,
			firstKey: firstKey,
			secondType: globalFileData[secondKey].letter,
			secondName: globalFileData[secondKey].name,
			secondKey: secondKey
		};

		output.push(item);
		
	});

	return output;
}

export const fetchStatus = (submissionId) => {
	const deferred = Q.defer();

	Request.post(kGlobalConstants.API + 'check_status/')
	        .send({'submission_id': submissionId})
	        .end((errFile, res) => {

	        	if (errFile) {
	        		let detail = '';
	        		if (res.body != null && res.body.hasOwnProperty('message')) {
	        			detail = res.body.message;
	        		}

	        		deferred.reject({
	        			reason: res.statusCode,
	        			error: errFile,
	        			detail: detail
	        		});
	        	}
	        	else {
	        		// return only jobs related to CSV validation
	        		const response = Object.assign({}, res.body);
	        		const csvJobs = [];
	        		let crossFileJob;
	        		response.jobs.forEach((job) => {
	        			if (job.job_type == 'csv_record_validation') {
	        				csvJobs.push(job);
	        			}
	        			else if (job.job_type == 'validation') {
	        				crossFileJob = job;
	        			}
	        		});

	        		response.jobs = csvJobs;
	        		response.crossFile = crossFileJob;

	        		deferred.resolve(response);
	        	}

	        });

	return deferred.promise;
}

export const fetchErrorReports = (submissionId) => {
	const deferred = Q.defer();

	Request.post(kGlobalConstants.API + 'submission_error_reports/')
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
	const output = {};

	status.jobs.forEach((item) => {
		output[item.file_type] = item;
		output[item.file_type].report = null;
		output[item.file_type].error_count = 0;

		// force an error_data array if no field is passed back in the JSON
		if (!item.hasOwnProperty('error_data')) {
			output[item.file_type].error_data = [];
		}
		else {
			let count = 0;
			item.error_data.forEach((error) => {
				count += parseInt(error.occurrences);
			});

			output[item.file_type].error_count = count;
		}

	});

	return output;
}



const getCrossFileData = (data, validKeys) => {
	const output = {};

	// generate the file pair keys
	let i = 1;

	for (let index in data.crossFile.error_data) {
		// fetch the error object
		const item = data.crossFile.error_data[index];

		// generate possible key names for this pair of target/source files
		const keyNames = [item.target_file + '-' + item.source_file, item.source_file + '-' + item.target_file];
		// determine which is the correct name
		let key = keyNames[0];
		if (_.indexOf(validKeys, key) == -1) {
			key = keyNames[1];
		}

		// check if the key is a valid cross-file pairing we care about
		if (_.indexOf(validKeys, key) == -1) {
			// not a valid pair
			continue;
		}

		// check if we've already seen an error for this pairing
		if (output.hasOwnProperty(key)) {
			// this pair already exists, so append the error to the pair's array
			output[key].push(item);
		}
		else {
			// doesn't exist yet, so create an array with this error
			output[key] = [item];
		}
	}

	return output;
}


const getFileReports = (status, reports) => {

	for (let key in status) {
		let item = status[key];
		item.report = reports['job_' + item.job_id + '_error_url'];

		// alphabetize any missing and duplicated headers
		item.missing_headers = _.sortBy(item.missing_headers);
		item.duplicated_headers = _.sortBy(item.duplicated_headers);
	}

	return status;
}

const getCrossFileReports = (crossFile, reports) => {

	const crossFileReports = {};

	for (let key in crossFile) {
		crossFileReports[key] = reports['cross_' + key];
	}
	
	return crossFileReports;
}

export const validateSubmission  = (submissionId) => {

	const deferred = Q.defer();

	// set the submission ID
	const store = new StoreSingleton().store;
	store.dispatch(uploadActions.setSubmissionId(submissionId));
	// determine the expected cross file validation keys and metadata
	let possiblePairs = determineExpectedPairs();
	store.dispatch(uploadActions.setExpectedCrossPairs(possiblePairs));

	const validKeys = [];
	possiblePairs.forEach((pair) => {
		validKeys.push(pair.key);
	});

	let status;
	let crossFile;
	let crossFileState;
	let crossFileReports;

	fetchStatus(submissionId)
		.then((statusRes) => {
			status = getFileStates(statusRes);
			crossFile = getCrossFileData(statusRes, validKeys);
			crossFileState = statusRes.crossFile.job_status;
			return fetchErrorReports(submissionId);
		})
		.then((reports) => {
			getFileReports(status, reports);
			crossFileReports = getCrossFileReports(crossFile, reports);
			deferred.resolve({
				file: status,
				crossFile: {
					state: crossFileState,
					reports: crossFileReports,
					data: crossFile
				}
			});
		})
		.catch((err) => {
			deferred.reject(err);
		});

	return deferred.promise;

}

export const listUsers = () => {
	const deferred = Q.defer();

	let request = {
		status: "approved"
	};
	
	Request.get(kGlobalConstants.API + 'list_user_emails/')
		.send(request)
		.end((err, res) => {
			if (err) {
				deferred.reject(err);
			}
			else {
				deferred.resolve(res.body.users);
			}
		});

	return deferred.promise;
}

export const sendNotification = (users, id) => {
    const deferred = Q.defer();

    Request.post(kGlobalConstants.API + 'email_users/')
        .send({
        	'users': users,
        	'email_template': 'review_submission',
        	'submission_id': id
        })
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