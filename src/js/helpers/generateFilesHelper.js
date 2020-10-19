import Q from 'q';
import Request from './sessionSuperagent';

import { kGlobalConstants } from '../GlobalConstants';

export const generateFile = (type, submissionId, start, end, agencyType, fileFormat) => {
    const deferred = Q.defer();

    const callBody = {
        submission_id: submissionId,
        file_type: type
    };

    if (start) {
        callBody.start = start;
    }
    if (end) {
        callBody.end = end;
    }
    if (agencyType) {
        callBody.agency_type = agencyType;
    }
    if (fileFormat) {
        callBody.file_format = fileFormat;
    }

    Request.post(`${kGlobalConstants.API}generate_file/`)
        .send(callBody)
        .end((errFile, res) => {
            if (errFile) {
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

export const checkGenerationStatus = (type, submissionId) => {
    const deferred = Q.defer();

    Request.get(`${kGlobalConstants.API}check_generation_status/?submission_id=${submissionId}&file_type=${type}`)
        .end((errFile, res) => {
            if (errFile) {
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

export const fetchFile = (type, submissionId) => {
    const deferred = Q.defer();

    Request.get(`${kGlobalConstants.API}get_file_url?file_type=${type}&submission_id=${submissionId}`)
        .send()
        .end((errFile, res) => {
            if (errFile) {
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

export const fetchDetachedFileUrl = (jobId) => {
    const deferred = Q.defer();

    Request.get(`${kGlobalConstants.API}get_detached_file_url?job_id=${jobId}`)
        .send()
        .end((errFile, res) => {
            if (errFile) {
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

export const getFabsMeta = (submissionId) => {
    const deferred = Q.defer();

    Request.get(`${kGlobalConstants.API}get_fabs_meta/?submission_id=${submissionId}`)
        .send()
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

export const generateDetachedFile = (params) => {
    const deferred = Q.defer();

    Request.post(`${kGlobalConstants.API}generate_detached_file/`)
        .send(params)
        .end((errFile, res) => {
            if (errFile) {
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

export const fetchDetachedFile = (jobId) => {
    const deferred = Q.defer();

    Request.get(`${kGlobalConstants.API}check_detached_generation_status/?job_id=${jobId}`)
        .end((errFile, res) => {
            if (errFile) {
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
