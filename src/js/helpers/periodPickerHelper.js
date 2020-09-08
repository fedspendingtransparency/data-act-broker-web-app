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

    let period = 12;

    if (now.isBetween(moment(`12/19/${year}`, 'MM-DD-YYYY'), moment(`12/31/${year}`, 'MM-DD-YYYY'), null, '[]')) {
        // Period 2 before Jan 1
        period = 2;
        year += 1;
    }
    else if (now.isBetween(moment(`01/01/${year}`, 'MM-DD-YYYY'), moment(`01/16/${year}`, 'MM-DD-YYYY'), null, '[]')) {
        // Period 2 after Jan 1
        period = 2;
    }
    else if (now.isBetween(moment(`01/17/${year}`, 'MM-DD-YYYY'), moment(`02/18/${year}`, 'MM-DD-YYYY'), null, '[]')) {
        period = 3;
    }
    else if (now.isBetween(moment(`02/19/${year}`, 'MM-DD-YYYY'), moment(`03/18/${year}`, 'MM-DD-YYYY'), null, '[]')) {
        period = 4;
    }
    else if (now.isBetween(moment(`03/19/${year}`, 'MM-DD-YYYY'), moment(`04/16/${year}`, 'MM-DD-YYYY'), null, '[]')) {
        period = 5;
    }
    else if (now.isBetween(moment(`04/17/${year}`, 'MM-DD-YYYY'), moment(`05/18/${year}`, 'MM-DD-YYYY'), null, '[]')) {
        period = 6;
    }
    else if (now.isBetween(moment(`05/19/${year}`, 'MM-DD-YYYY'), moment(`06/18/${year}`, 'MM-DD-YYYY'), null, '[]')) {
        period = 7;
    }
    else if (now.isBetween(moment(`06/19/${year}`, 'MM-DD-YYYY'), moment(`07/16/${year}`, 'MM-DD-YYYY'), null, '[]')) {
        period = 8;
    }
    else if (now.isBetween(moment(`07/17/${year}`, 'MM-DD-YYYY'), moment(`08/18/${year}`, 'MM-DD-YYYY'), null, '[]')) {
        period = 9;
    }
    else if (now.isBetween(moment(`08/19/${year}`, 'MM-DD-YYYY'), moment(`09/17/${year}`, 'MM-DD-YYYY'), null, '[]')) {
        period = 10;
    }
    else if (now.isBetween(moment(`09/18/${year}`, 'MM-DD-YYYY'), moment(`10/16/${year}`, 'MM-DD-YYYY'), null, '[]')) {
        period = 11;
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

export const availablePeriodsInFY = (fy) => {
    const sanitizedFY = handlePotentialStrings(fy);
    // get the most recent available period and year
    const lastPeriod = lastCompletedPeriodInFY(sanitizedFY);

    if (lastPeriod.year > sanitizedFY) {
        // FY is in the future
        return {
            periodArray: [1, 2],
            period: 2,
            year: sanitizedFY
        };
    }

    const available = [];
    const firstPeriod = 1;

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

export const defaultPeriods = () => {
    const current = mostRecentPeriod();
    return availablePeriodsInFY(current.year);
};

export const defaultFiscalYear = () => {
    const current = mostRecentPeriod();
    return current.year;
};
