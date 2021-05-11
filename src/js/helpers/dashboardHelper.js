import Q from 'q';
import Request from './sessionSuperagent';

import { kGlobalConstants } from '../GlobalConstants';

export const fetchLatestPublicationPeriod = () => {
    const deferred = Q.defer();

    Request.get(`${kGlobalConstants.API}latest_publication_period/`)
        .send()
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

export const fetchRules = (callBody) => {
    const deferred = Q.defer();

    Request.post(`${kGlobalConstants.API}get_rule_labels/`)
        .send(callBody)
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

export const fetchWarnings = (callBody) => {
    const deferred = Q.defer();

    Request.post(`${kGlobalConstants.API}historic_dabs_graphs/`)
        .send(callBody)
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

export const fetchDashboardTableContents = (callBody) => {
    const deferred = Q.defer();

    Request.post(`${kGlobalConstants.API}historic_dabs_table/`)
        .send(callBody)
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

export const fetchSubmissions = (callBody) => {
    const deferred = Q.defer();
    Request.post(`${kGlobalConstants.API}list_submissions/`)
        .send(callBody)
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

export const fetchActiveOverview = (submissionId, fileType, errorLevel) => {
    const deferred = Q.defer();

    Request.get(`${kGlobalConstants.API}active_submission_overview/?submission_id=${submissionId}&file=${fileType}&` +
        `error_level=${errorLevel}`)
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


export const fetchActiveImpacts = (submissionId, fileType, errorLevel) => {
    const deferred = Q.defer();

    Request.get(`${kGlobalConstants.API}get_impact_counts/?submission_id=${submissionId}&file=${fileType}&` +
        `error_level=${errorLevel}`)
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

export const fetchSignificanceCounts = (submissionId, fileType, errorLevel) => {
    const deferred = Q.defer();

    Request.get(`${kGlobalConstants.API}get_significance_counts/?submission_id=${submissionId}&file=${fileType}&` +
        `error_level=${errorLevel}`)
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

export const fetchActiveDashboardTableContents = (submissionId, fileType, errorLevel, page, limit, sort, order) => {
    const deferred = Q.defer();

    Request.get(`${kGlobalConstants.API}active_submission_table/?submission_id=${submissionId}&file=${fileType}&` +
        `error_level=${errorLevel}&page=${page}&limit=${limit}&sort=${sort}&order=${order}`)
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
