import { apiRequest } from './apiRequest';

export const fetchLatestPublicationPeriod = () => {
    const req = apiRequest({
        url: 'latest_publication_period/'
    });

    return req.promise;
};

export const fetchRules = (data) => {
    const req = apiRequest({
        url: 'get_rule_labels/',
        method: 'post',
        data
    });

    return req.promise;
};

export const fetchWarnings = (data) => {
    const req = apiRequest({
        url: 'historic_dabs_graphs/',
        method: 'post',
        data
    });

    return req.promise;
};

export const fetchDashboardTableContents = (data) => {
    const req = apiRequest({
        url: 'historic_dabs_table/',
        method: 'post',
        data
    });

    return req.promise;
};

export const fetchSubmissions = (data) => {
    const req = apiRequest({
        url: 'list_submissions/',
        method: 'post',
        data
    });

    return req.promise;
};

export const fetchActiveOverview = (submissionId, fileType, errorLevel) => {
    const req = apiRequest({
        url: 'active_submission_overview/',
        params: {
            'submission_id': submissionId,
            'file': fileType,
            'error_level': errorLevel
        }
    });

    return req.promise;
};

export const fetchActiveImpacts = (submissionId, fileType, errorLevel) => {
    const req = apiRequest({
        url: 'get_impact_counts/',
        params: {
            'submission_id': submissionId,
            'file': fileType,
            'error_level': errorLevel
        }
    });

    return req.promise;
};

export const fetchSignificanceCounts = (submissionId, fileType, errorLevel) => {
    const req = apiRequest({
        url: 'get_significance_counts/',
        params: {
            'submission_id': submissionId,
            'file': fileType,
            'error_level': errorLevel
        }
    });

    return req.promise;
};

export const fetchActiveDashboardTableContents = (submissionId, fileType, errorLevel, page, limit, sort, order) => {
    const req = apiRequest({
        url: 'active_submission_table/',
        params: {
            'submission_id': submissionId,
            'file': fileType,
            'error_level': errorLevel,
            'page': page,
            'limit': limit,
            'sort': sort,
            'order': order
        }
    });

    return req.promise;
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
