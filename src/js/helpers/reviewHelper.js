import Q from 'q';
import _ from 'lodash';
import Request from './sessionSuperagent';

import StoreSingleton from '../redux/storeSingleton';

import { kGlobalConstants } from '../GlobalConstants';
import * as uploadActions from '../redux/actions/uploadActions';
import * as sessionActions from '../redux/actions/sessionActions';

Q.longStackSupport = true;

const availablePairs = ['appropriations-program_activity', 'program_activity-award_financial',
    'award_financial-award_procurement', 'award_financial-award'];
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
    award_procurement: {
        name: 'Award Procurement',
        letter: 'D1'
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
            firstKey,
            secondType: globalFileData[secondKey].letter,
            secondName: globalFileData[secondKey].name,
            secondKey
        };

        output.push(item);
    });

    return output;
};

export const getCrossFileData = (data, type) => {
    const output = {};

    let dataType = 'error_data';
    if (type === 'warnings') {
        dataType = 'warning_data';
    }

    const possiblePairs = determineExpectedPairs();

    const validKeys = [];
    possiblePairs.forEach((pair) => {
        validKeys.push(pair.key);
    });

    for (const index in data[dataType]) {
        if (data[dataType].hasOwnProperty(index)) {
            // fetch the error object
            const item = data[dataType][index];

            // generate possible key names for this pair of target/source files
            const keyNames = [item.target_file + '-' + item.source_file, item.source_file + '-' + item.target_file];
            // determine which is the correct name
            let key = keyNames[0];
            if (_.indexOf(validKeys, key) === -1) {
                key = keyNames[1];
            }

            // check if the key is a valid cross-file pairing we care about
            if (_.indexOf(validKeys, key) === -1) {
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
    }

    return output;
};

export const fetchSubmissionMetadata = (submissionId) => {
    const deferred = Q.defer();

    // set the submission ID
    const store = new StoreSingleton().store;
    store.dispatch(uploadActions.setSubmissionId(submissionId));

    Request.get(kGlobalConstants.API + 'submission_metadata/?submission_id=' + submissionId)
        .end((errFile, res) => {
            if (errFile) {
                deferred.reject(res);
            }
            else {
                const response = Object.assign({}, res.body);
                store.dispatch(uploadActions.setSubmissionPublishStatus(response.publish_status));
                deferred.resolve(res.body);
            }
        });

    return deferred.promise;
};

export const fetchSubmissionData = (submissionId, type = '') => {
    const deferred = Q.defer();

    let typeFilter = '';
    if (type) {
        typeFilter = '&type=' + type;
    }

    Request.get(kGlobalConstants.API + 'submission_data/?submission_id=' + submissionId + typeFilter)
        .end((errFile, res) => {
            if (errFile) {
                deferred.reject(res);
            }
            else {
                deferred.resolve(res.body);
            }
        });

    return deferred.promise;
};

export const fetchStatus = (submissionId, type = '') => {
    const deferred = Q.defer();

    let typeFilter = '';
    if (type) {
        typeFilter = '&type=' + type;
    }

    const startTime = new Date().getTime();
    // set submission ID
    const store = new StoreSingleton().store;
    store.dispatch(uploadActions.setSubmissionId(submissionId));

    // set cross-file pairs
    const possiblePairs = determineExpectedPairs();
    store.dispatch(uploadActions.setExpectedCrossPairs(possiblePairs));

    Request.get(kGlobalConstants.API + 'check_status/?submission_id=' + submissionId + typeFilter)
        .end((errFile, res) => {
            // calculate how long the API call took
            const endTime = new Date().getTime();
            const duration = endTime - startTime;
            // log the API call duration
            const action = sessionActions.setApiMeta({
                time: duration
            });
            store.dispatch(action);


            if (errFile) {
                let detail = '';
                if (res.body !== null && res.body.hasOwnProperty('message')) {
                    detail = res.body.message;
                }

                deferred.reject({
                    reason: res.statusCode,
                    error: errFile,
                    detail
                });
            }
            else {
                deferred.resolve(res.body);
            }
        });

    return deferred.promise;
};

export const getFileStates = (status) => {
    const output = {};

    status.jobs.forEach((item) => {
        if (item.file_type) {
            output[item.file_type] = item;
            output[item.file_type].report = null;
            output[item.file_type].error_count = 0;
            output[item.file_type].warning_count = 0;

            // force an error_data array if no field is passed back in the JSON
            if (!item.hasOwnProperty('error_data')) {
                output[item.file_type].error_data = [];
            }
            else {
                let count = 0;
                item.error_data.forEach((error) => {
                    count += parseInt(error.occurrences, 10);
                });

                output[item.file_type].error_count = count;
            }

            // do the same for warnings
            if (!item.hasOwnProperty('warning_data')) {
                output[item.file_type].warning_data = [];
            }
            else {
                let count = 0;
                item.warning_data.forEach((warning) => {
                    count += parseInt(warning.occurrences, 10);
                });
                output[item.file_type].warning_count = count;
            }
        }
    });

    return output;
};

export const checkSubmissionStatus = (submissionId) => {
    const deferred = Q.defer();

    // TODO: figure all of this out. Do we still need it?
    // determine the expected cross file validation keys and metadata
    const store = new StoreSingleton().store;
    const possiblePairs = determineExpectedPairs();
    store.dispatch(uploadActions.setExpectedCrossPairs(possiblePairs));

    const validKeys = [];
    possiblePairs.forEach((pair) => {
        validKeys.push(pair.key);
    });

    fetchStatus(submissionId)
        .then((statusRes) => {
            deferred.resolve(statusRes);
        })
        .catch((err) => {
            const response = Object.assign({}, err.body);
            response.httpStatus = err.status;
            deferred.reject(response);
        });

    return deferred.promise;
};

export const validateFabsSubmission = (submissionId) => {
    const deferred = Q.defer();

    // set the submission ID
    const store = new StoreSingleton().store;
    store.dispatch(uploadActions.setSubmissionId(submissionId));

    let status;
    fetchSubmissionData(submissionId)
        .then((statusRes) => {
            status = getFileStates(statusRes);
            deferred.resolve(status);
        })
        .catch((err) => {
            const response = Object.assign({}, err.body);
            response.httpStatus = err.status;
            deferred.reject(response);
        });

    return deferred.promise;
};

export const listUsers = () => {
    const deferred = Q.defer();

    Request.get(kGlobalConstants.API + 'list_user_emails/')
        .send({ status: "approved" })
        .end((err, res) => {
            if (err) {
                deferred.reject(err);
            }
            else {
                deferred.resolve(res.body.users);
            }
        });

    return deferred.promise;
};

export const sendNotification = (users, id) => {
    const deferred = Q.defer();

    Request.post(kGlobalConstants.API + 'email_users/')
        .send({
            users,
            email_template: 'review_submission',
            submission_id: id
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
};

export const fetchObligations = (submissionId) => {
    const deferred = Q.defer();

    Request.get(kGlobalConstants.API + 'get_obligations/?submission_id=' + submissionId)
        .end((errFile, res) => {
            if (errFile) {
                deferred.reject(errFile);
            }
            else {
                deferred.resolve(res.body);
            }
        });

    return deferred.promise;
};

export const submissionReport = (submissionId, warning, fileType, crossType) => {
    const deferred = Q.defer();
    const params = [];
    if (warning) {
        params.push('warning=' + warning);
    }
    if (fileType) {
        params.push('file_type=' + fileType);
    }
    if (crossType) {
        params.push('cross_type=' + crossType);
    }

    Request.get(kGlobalConstants.API + 'submission/' + submissionId + '/report_url?' + params.join('&'))
        .end((errFile, res) => {
            if (errFile) {
                deferred.reject(errFile, res);
            }
            else {
                deferred.resolve(res.body);
            }
        });

    return deferred.promise;
};

export const fetchSubmissionNarrative = (submissionId) => {
    const deferred = Q.defer();

    Request.get(kGlobalConstants.API + 'submission/' + submissionId + '/narrative')
        .end((errFile, res) => {
            if (errFile) {
                deferred.reject(errFile);
            }
            else {
                deferred.resolve(res.body);
            }
        });

    return deferred.promise;
};

export const saveNarrative = (submissionId, narrative) => {
    const deferred = Q.defer();

    Request.post(kGlobalConstants.API + 'submission/' + submissionId + '/narrative')
        .send(narrative)
        .end((errFile, res) => {
            if (errFile) {
                deferred.reject(errFile);
            }
            else {
                deferred.resolve(res.body);
            }
        });

    return deferred.promise;
};

export const certifySubmission = (submissionId) => {
    const deferred = Q.defer();

    Request.post(kGlobalConstants.API + 'certify_submission/')
        .send({ submission_id: submissionId })
        .end((err, res) => {
            if (err) {
                const response = Object.assign({}, res.body);
                response.httpStatus = res.status;
                deferred.reject(response);
            }
            else {
                deferred.resolve(res.body);
            }
        });

    return deferred.promise;
};

export const deleteSubmission = (submissionId) => {
    const deferred = Q.defer();

    Request.post(kGlobalConstants.API + 'delete_submission/')
        .send({ submission_id: submissionId })
        .end((err, res) => {
            if (err) {
                deferred.reject(res.body);
            }
            else {
                const output = {
                    message: res.body.message
                };
                deferred.resolve(output);
            }
        });

    return deferred.promise;
};

export const revalidateSubmission = (submissionId, d2Submission = false) => {
    const deferred = Q.defer();

    Request.post(kGlobalConstants.API + 'restart_validation/')
        .send({
            submission_id: submissionId,
            d2_submission: d2Submission
        })
        .end((err, res) => {
            if (err) {
                deferred.reject(err);
            }
            else {
                const output = {
                    message: res.body.message
                };
                deferred.resolve(output);
            }
        });

    return deferred.promise;
};

export const isWindow = () => {
    const deferred = Q.defer();

    Request.get(kGlobalConstants.API + 'window/')
        .end((err, res) => {
            if (err) {
                const response = Object.assign({}, res.body);
                response.httpStatus = res.status;
                deferred.reject(response);
            }
            else {
                deferred.resolve(res.body);
            }
        });

    return deferred.promise;
};

export const revalidationThreshold = () => {
    const deferred = Q.defer();

    Request.get(kGlobalConstants.API + 'revalidation_threshold/')
        .end((err, res) => {
            if (err) {
                deferred.reject(err);
            }
            else {
                deferred.resolve(res.body);
            }
        });

    return deferred.promise;
};
