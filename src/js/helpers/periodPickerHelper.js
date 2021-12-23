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
    const now = moment();
    let year = now.year();
    // moment.month is 0-indexed
    let period = (now.month() + 3) % 12;
    // if we're in October/November, we only want to show the previous year's P12
    if (period === 0 || period === 1) {
        period = 12;
    }
    // if we're in December we want to see FY22 P02 but the current year is still 2021 so we need to add 1
    if (period === 2) {
        year += 1;
    }

    return {
        period,
        year
    };
};

export const lastCompletedPeriodInFY = (fy) => {
    // get the most recent available period and year
    const current = mostRecentPeriod();
    const sanitizedFY = handlePotentialStrings(fy);

    if (sanitizedFY < current.year) {
        // user wants a previous year's periods
        // since we are no longer on that year, it must be completed
        return {
            period: 12,
            year: sanitizedFY
        };
    }

    // otherwise, return the current year's period
    return current;
};

export const availablePeriodsInFY = (fy, ignoreOne = false) => {
    // if we want to ignore one from the array (for certain picker purposes) ignoreOne should be true
    const sanitizedFY = handlePotentialStrings(fy);
    // get the most recent available period and year
    const lastPeriod = lastCompletedPeriodInFY(sanitizedFY);

    if (lastPeriod.year > sanitizedFY) {
        const periodArray = ignoreOne ? [2] : [1, 2];
        // FY is in the future
        return {
            periodArray,
            period: 2,
            year: sanitizedFY
        };
    }

    const available = [];
    const firstPeriod = ignoreOne ? 2 : 1;

    for (let i = firstPeriod; i <= lastPeriod.period; i++) {
        if (sanitizedFY >= utils.earliestFileAYear) {
            available.push(i);
        }
    }

    return {
        periodArray: available,
        period: available[available.length - 1] || 0,
        year: lastPeriod.year
    };
};

export const defaultPeriods = (ignoreOne = false) => {
    const current = mostRecentPeriod();
    return availablePeriodsInFY(current.year, ignoreOne);
};

export const defaultFiscalYear = () => {
    const current = mostRecentPeriod();
    return current.year;
};
