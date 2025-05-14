import _ from 'lodash';
import { apiRequest } from './apiRequest';

import StoreSingleton from '../redux/storeSingleton';

import * as uploadActions from '../redux/actions/uploadActions';

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

export const  fetchSubmissionMetadata = (submissionId) => {
    // set the submission ID
    const store = new StoreSingleton().store;
    store.dispatch(uploadActions.setSubmissionId(submissionId));

    const req = apiRequest({
        url: 'submission_metadata/',
        params: { 'submission_id': submissionId }
    })

    return req.promise;
};

export const fetchSubmissionData = (submissionId, type = '') => {
    const params = { 'submission_id': submissionId };
    if (type) {
        params['type'] = type;
    }

    const req = apiRequest({
        url: 'submission_data/',
        params
    })

    return req.promise;
};

export const  fetchStatus = (submissionId, type = '') => {
    const params = { 'submission_id': submissionId };
    if(type) {
        params['type'] = type;
    }

    // set submission ID
    const store = new StoreSingleton().store;
    store.dispatch(uploadActions.setSubmissionId(submissionId));

    // set cross-file pairs
    const possiblePairs = determineExpectedPairs();
    store.dispatch(uploadActions.setExpectedCrossPairs(possiblePairs));

    const req = apiRequest({
        url: 'check_status/',
        params
    })

    return req.promise;
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

export const validateFabsSubmission = (submissionId) => {
    // set the submission ID
    const store = new StoreSingleton().store;
    store.dispatch(uploadActions.setSubmissionId(submissionId));

    return fetchSubmissionData(submissionId);
};

export const listUsers = () => {
    const req = apiRequest({
        url: 'list_user_emails/',
        params: { 'status': 'approved' }
    })

    return req.promise;
};

export const fetchObligations = (submissionId) => {
    const req = apiRequest({
        url: 'get_obligations/',
        params: { 'submission_id': submissionId }
    })

    return req.promise;
};

export const submissionReport = (submissionId, warning, fileType, crossType) => {
    const params = {
        'submission_id': submissionId,
        warning
    };
    if (fileType) {
        params['file_type'] = fileType;
    }
    if (crossType) {
        params['cross_type'] = crossType;
    }

    const req = apiRequest({
        url: 'report_url/',
        params
    })

    return req.promise;
};

export const fetchCommentsFile = (submissionId) => {
    const req = apiRequest({
        url: 'get_comments_file/',
        params: { 'submission_id': submissionId }
    })

    return req.promise;
};

export const fetchSubmissionNarrative = (submissionId) => {
    const req = apiRequest({
        url: 'get_submission_comments/',
        params: { 'submission_id': submissionId }
    })

    return req.promise;
};

export const saveNarrative = (narrative) => {
    const req = apiRequest({
        url: 'update_submission_comments/',
        method: 'post',
        data: narrative
    })

    return req.promise;
};

export const publishCertifyDABSSubmission = (submissionId, type = 'both') => {
    let url = 'publish_and_certify_dabs_submission';
    if (type === 'certify') {
        url = 'certify_dabs_submission';
    }
    if (type === 'publish') {
        url = 'publish_dabs_submission';
    }

    const req = apiRequest({
        url,
        method: 'post',
        data: { 'submission_id': submissionId }
    })

    return req.promise;
};

export const deleteSubmission = (submissionId) => {
    const req = apiRequest({
        url: 'delete_submission/',
        method: 'post',
        data: { 'submission_id': submissionId }
    })

    return req.promise;
};

export const revalidateSubmission = (submissionId, isFabs = false) => {
    const req = apiRequest({
        url: 'restart_validation/',
        method: 'post',
        data: {
            'submission_id': submissionId,
            'is_fabs': isFabs
        }
    })

    return req.promise;
};

export const listBanners = (login) => {
    const req = apiRequest({
        url: 'list_banners/',
        params: { login }
    })

    return req.promise;
};

export const revertToCertified = (submissionID) => {
    const req = apiRequest({
        url: 'revert_submission/',
        method: 'post',
        data: { 'submission_id': parseInt(submissionID, 10) }
    })

    return req.promise;
};
