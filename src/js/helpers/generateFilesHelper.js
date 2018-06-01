import Q from 'q';
import Request from './sessionSuperagent';

import { kGlobalConstants } from '../GlobalConstants';

export const fetchSubmissionMetadata = (submissionId) => {
    const deferred = Q.defer();

    Request.get(kGlobalConstants.API + 'submission_metadata/?submission_id=' + submissionId)
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

export const generateFile = (type, submissionId, start, end) => {
    const deferred = Q.defer();

    Request.post(kGlobalConstants.API + 'generate_file/')
        .send({
            submission_id: submissionId,
            file_type: type,
            start,
            end
        })
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

    Request.post(kGlobalConstants.API + 'check_generation_status/')
        .send({
            submission_id: submissionId,
            file_type: type
        })
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

    Request.post(kGlobalConstants.API + 'get_fabs_meta/')
        .send({ submission_id: submissionId })
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

export const generateDetachedFile = (type, start, end, cgacCode, frecCode) => {
    const deferred = Q.defer();

    Request.post(kGlobalConstants.API + 'generate_detached_file/')
        .send({
            file_type: type,
            start,
            end,
            cgac_code: cgacCode,
            frec_code: frecCode
        })
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

    Request.post(kGlobalConstants.API + 'check_detached_generation_status/')
        .send({
            job_id: jobId
        })
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
