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

export const determineExpectedPairs = () => {
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
        if (Object.prototype.hasOwnProperty.call(data[dataType], index)) {
            // fetch the error object
            const item = data[dataType][index];

            // generate possible key names for this pair of target/source files
            const keyNames = [`${item.target_file}-${item.source_file}`, `${item.source_file}-${item.target_file}`];
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
            if (Object.prototype.hasOwnProperty.call(output, key)) {
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

export const fetchSubmissionMetadata = (submissionId, type) => {
    const deferred = Q.defer();

    // set the submission ID
    const store = new StoreSingleton().store;
    store.dispatch(uploadActions.setSubmissionId(submissionId));

    Request.get(`${kGlobalConstants.API}submission_metadata/?submission_id=${submissionId}`)
        .end((errFile, res) => {
            if (errFile) {
                return deferred.reject(res);
            }
            if (!res.body.fabs_meta && type === 'fabs') {
                const message = 'This is a DABS ID. Please navigate to DABS.';
                return deferred.reject({ body: { message } });
            }
            const response = Object.assign({}, res.body);
            store.dispatch(uploadActions.setSubmissionPublishStatus(response.publish_status));
            return deferred.resolve(res.body);
        });

    return deferred.promise;
};

export const fetchSubmissionData = (submissionId, type = '') => {
    const deferred = Q.defer();

    let typeFilter = '';
    if (type) {
        typeFilter = `&type=${type}`;
    }

    Request.get(`${kGlobalConstants.API}submission_data/?submission_id=${submissionId}${typeFilter}`)
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
        typeFilter = `&type=${type}`;
    }

    const startTime = new Date().getTime();
    // set submission ID
    const store = new StoreSingleton().store;
    store.dispatch(uploadActions.setSubmissionId(submissionId));

    // set cross-file pairs
    const possiblePairs = determineExpectedPairs();
    store.dispatch(uploadActions.setExpectedCrossPairs(possiblePairs));

    Request.get(`${kGlobalConstants.API}check_status/?submission_id=${submissionId}${typeFilter}`)
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
                if (res.body !== null && Object.prototype.hasOwnProperty.call(res.body, 'message')) {
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
            if (Object.prototype.hasOwnProperty.call(!item, 'error_data')) {
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
            if (Object.prototype.hasOwnProperty.call(!item, 'warning_data')) {
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

    Request.get(`${kGlobalConstants.API}list_user_emails/`)
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

    Request.post(`${kGlobalConstants.API}email_users/`)
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

    Request.get(`${kGlobalConstants.API}get_obligations/?submission_id=${submissionId}`)
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
    const params = [`submission_id=${submissionId}`];
    if (warning) {
        params.push('warning=true');
    }
    else {
        params.push('warning=false');
    }
    if (fileType) {
        params.push(`file_type=${fileType}`);
    }
    if (crossType) {
        params.push(`cross_type=${crossType}`);
    }

    Request.get(`${kGlobalConstants.API}report_url/?${params.join('&')}`)
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

export const fetchCommentsFile = (submissionId) => {
    const deferred = Q.defer();

    Request.get(`${kGlobalConstants.API}get_comments_file?submission_id=${submissionId}`)
        .send()
        .end((commFile, res) => {
            if (commFile) {
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

export const fetchSubmissionNarrative = (submissionId) => {
    const deferred = Q.defer();

    Request.get(`${kGlobalConstants.API}get_submission_comments?submission_id=${submissionId}`)
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

export const saveNarrative = (narrative) => {
    const deferred = Q.defer();

    Request.post(`${kGlobalConstants.API}update_submission_comments`)
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

export const publishCertifyDABSSubmission = (submissionId, type = 'both') => {
    const deferred = Q.defer();

    let apiCall = 'publish_and_certify_dabs_submission';
    if (type === 'certify') {
        apiCall = 'certify_dabs_submission';
    }
    if (type === 'publish') {
        apiCall = 'publish_dabs_submission';
    }

    Request.post(`${kGlobalConstants.API}${apiCall}/`)
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

    Request.post(`${kGlobalConstants.API}delete_submission/`)
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

export const revalidateSubmission = (submissionId, isFabs = false) => {
    const deferred = Q.defer();

    Request.post(`${kGlobalConstants.API}restart_validation/`)
        .send({
            submission_id: submissionId,
            is_fabs: isFabs
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

export const listBanners = (login) => {
    const deferred = Q.defer();

    Request.get(`${kGlobalConstants.API}list_banners/?login=${login}`)
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

export const revertToCertified = (submissionID) => {
    const deferred = Q.defer();

    Request.post(`${kGlobalConstants.API}revert_submission/`)
        .send({
            submission_id: parseInt(submissionID, 10)
        })
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
