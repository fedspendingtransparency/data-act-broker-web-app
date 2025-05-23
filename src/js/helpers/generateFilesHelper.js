import { apiRequest } from './apiRequest';

export const generateFile = (type, submissionId, start, end, agencyType, fileFormat) => {
    const data = {
        submission_id: submissionId,
        file_type: type
    };

    if (start) {
        data.start = start;
    }
    if (end) {
        data.end = end;
    }
    if (agencyType) {
        data.agency_type = agencyType;
    }
    if (fileFormat) {
        data.file_format = fileFormat;
    }

    const req = apiRequest({
        url: 'generate_file/',
        method: 'post',
        data
    });

    return req.promise;
};

export const checkGenerationStatus = (type, submissionId) => {
    const req = apiRequest({
        url: 'check_generation_status/',
        params: {
            'file_type': type,
            'submission_id': submissionId
        }
    });

    return req.promise;
};

export const fetchFile = (type, submissionId) => {
    const req = apiRequest({
        url: 'get_file_url/',
        params: {
            'file_type': type,
            'submission_id': submissionId
        }
    });

    return req.promise;
};

export const fetchDetachedFileUrl = (jobId) => {
    const req = apiRequest({
        url: 'get_detached_file_url/',
        params: { 'job_id': jobId }
    });

    return req.promise;
};

export const getFabsMeta = (submissionId) => {
    const req = apiRequest({
        url: 'get_fabs_meta/',
        params: {'submission_id': submissionId }
    });

    return req.promise;
};

export const generateDetachedFile = (data) => {
    const req = apiRequest({
        url: 'generate_detached_file/',
        method: 'post',
        data
    });

    return req.promise;
};

export const fetchDetachedFile = (jobId) => {
    const req = apiRequest({
        url: 'check_detached_generation_status/',
        params: { 'job_id': jobId }
    });

    return req.promise;
};
