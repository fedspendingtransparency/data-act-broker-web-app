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

export const getPeriodListFromFilter = (period) => {
    let periodList = [];

    if (period !== null) {
        // if it's a string, then they selected a quarter and we need to insert all 3 relevant periods
        if (typeof period === 'string') {
            const quarter = parseInt(period.substring(1), 10);
            periodList = [quarter * 3, (quarter * 3) - 1, (quarter * 3) - 2];
            // if period 1 is in the array, take it out because that's invalid
            if (periodList.indexOf(1) > -1) {
                periodList.splice(periodList.indexOf(1), 1);
            }
        }
        else {
            periodList = [period];
        }
    }
    return periodList;
};

export const isPeriodDisabled = (period, fys, latestPubPeriod, latestPubYear) => {
    // if there's more than one fiscal year selected, every period will always be available (unless the period is 3,
    // then there is a rare exception)
    if (fys.length !== 1 && period !== 3) {
        return '';
    }
    // if only the first and last years are selected and the latest publication period is 2 and given period is 3,
    // it should be disabled.
    const bookendYears = [2017, latestPubYear];
    if (fys.length === 2 && latestPubPeriod === 2 && period === 3 &&
        fys.every((year, index) => year === bookendYears[index])) {
        return 'notOpen';
    }
    // if only one year is selected, do logic checks for latest/earliest fiscal years
    if (fys.length === 1) {
        // if FY17 was selected, disabled Q1 and periods under 4
        const firstPeriods = [2, 3, 'Q1'];
        if (fys[0] === 2017 && firstPeriods.includes(period)) {
            return 'firstYear';
        }
        else if (fys[0] === latestPubYear) {
            // get either the period provided or the lowest period in the quarter
            const lowestProvidedPeriod = Math.min(...getPeriodListFromFilter(period));
            if (lowestProvidedPeriod > latestPubPeriod) {
                return 'notOpen';
            }
        }
    }

    return '';
};
