/**
 * periodPickerHelper.js
 * Created by Kwadwo Opoku-Debrah 12/06/18
 */

import moment from 'moment';
import * as utils from './util';

export const handlePotentialStrings = (input) => {
    if (typeof input === 'string') {
        return parseInt(input, 10);
    }
    return input;
};

export const mostRecentPeriod = () => {
    // get the latest period for which GTAS data is available
    const today = moment();
    let year = today.year();
    const month = today.month();

    let period = 11;

    if (today.isBetween(moment(`01/01/${year}`, 'MM-DD-YYYY'), moment(`11-30-${year}`, 'MM-DD-YYYY'))) {
        year -= 1;
    }
    else if (today.isBetween(moment(`10/01/${year - 1}`, 'MM-DD-YYYY'), moment(`12-31-${year}`, 'MM-DD-YYYY'))) {
        period = month;
    }

    return {
        period,
        year
    };
};

export const lastCompletedPeriodInFY = (fy) => {
    // get the most recent available quarter and year
    const current = mostRecentPeriod();
    const sanitizedFY = handlePotentialStrings(fy);

    if (sanitizedFY < current.year) {
        // user wants a previous year's quarters
        // since we are no longer on that year, it must be completed
        return {
            period: 11,
            year: sanitizedFY
        };
    }

    // otherwise, return the current year's quarter
    return current;
};

export const availablePeriodsInFY = (fy) => {
    const sanitizedFY = handlePotentialStrings(fy);
    // get the most recent available quarter and year
    const lastPeriod = lastCompletedPeriodInFY(sanitizedFY);
    if (lastPeriod.year > sanitizedFY) {
        // FY is in the future
        return {
            period: 0,
            year: sanitizedFY
        };
    }

    const available = [];
    let firstPeriod = 0;
    if (sanitizedFY === utils.earliestFileAYear) {
        // in the first spending explorer year, the first quarter is not available
        firstPeriod = 3;
    }

    for (let i = firstPeriod; i <= lastPeriod.period; i++) {
        if (sanitizedFY >= utils.earliestFileAYear) {
            available.push(i);
        }
    }

    return {
        unavailablePeriod: available[0],
        period: available[available.length - 1],
        year: lastPeriod.year
    };
};

export const defaultPeriods = () => {
    const current = mostRecentPeriod();
    return availablePeriodsInFY(current.year);
};

export const defaultFiscalYear = () => {
    const current = mostRecentPeriod();
    return current.year;
};
