import Q from 'q';
import moment from 'moment';
import { kGlobalConstants } from '../GlobalConstants.js';
import Request from './sessionSuperagent.js';

export const generateProtectedUrls = () => {
    let isCanceled = false;
    const deferred = Q.defer();

    Request.get(kGlobalConstants.API + 'get_protected_files/')
        .send()
        .end((err, res) => {
            if (isCanceled || err) {
                deferred.reject(err);
            }
            else {
                deferred.resolve(res.body.urls);
            }
        });

    return {
        promise: deferred.promise,
        cancel: () => {
            isCanceled = true;
        }
    };
};

export const rssFileKey = () => {
    // returns the file key name for the RSS file
    return 'RSS_v1.0.xlsx';
};

export const generateRSSUrl = () => {
    let isCanceled = false;

    const deferred = Q.defer();

    // utilize the generateProtectedUrls call to fetch the signed RSS link
    generateProtectedUrls().promise
        .then((urls) => {
            if (isCanceled) {
                deferred.reject('canceled');
            }
            else {
                deferred.resolve(urls[rssFileKey()]);
            }
        })
        .catch((err) => {
            console.error(err);
            deferred.reject(err);
        });

    return {
        promise: deferred.promise,
        cancel: () => {
            isCanceled = true;
        }
    };
};

export const quarterToMonth = (quarter, quarterYear, type) => {
    // convert quarters to months
    const startMonth = ["10", "01", "04", "07"];
    const endMonth = ["12", "03", "06", "09"];

    let month = startMonth[quarter - 1];
    if (type === "end") {
        month = endMonth[quarter - 1];
    }

    let year = parseInt(quarterYear, 10);
    if (quarter === 1) {
        // decrement the year by one for the first quarter of the fiscal year
        year -= 1;
    }

    return month + '/' + year;
};

export const currentQuarter = (type) => {
    const month = parseInt(moment().format("M"), 10);
    let year = moment().format('YYYY');

    let quarter = 1;

    if (month === 12) {
        // Add a year for quarter 1, since 1/2 are already in the new year do not need to update
        year = moment().add(1, 'years').format('YYYY');
    }
    else if (month >= 9) {
        quarter = 4;
    }
    else if (month >= 6) {
        quarter = 3;
    }
    else if (month >= 3) {
        quarter = 2;
    }

    return quarterToMonth(quarter, year, type);
};

export const fyStartDate = () => {
    const month = parseInt(moment().format("M"), 10);
    let year = moment().format('YYYY');

    if (month >= 10) {
        year = moment().add(1, 'years').format('YYYY');
    }

    return quarterToMonth(1, year, 'start');
};
