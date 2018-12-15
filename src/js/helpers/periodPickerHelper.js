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

    let period = 12;

    if (today.isBetween(moment(`01/01/${year}`, 'MM-DD-YYYY'), moment(`01-08-${year}`, 'MM-DD-YYYY'))) {
        year -= 1;
    }
    else if (today.isBetween(moment(`01/08/${year}`, 'MM-DD-YYYY'), moment(`04/05/${year}`, 'MM-DD-YYYY'))) {
        period = utils.convertQuarterToPeriod(1);
    }
    else if (today.isBetween(moment(`04/05/${year}`, 'MM-DD-YYYY'), moment(`06/05/${year}`, 'MM-DD-YYYY'))) {
        period = utils.convertQuarterToPeriod(2);
    }
    else if (today.isBetween(moment(`06/05/${year}`, 'MM-DD-YYYY'), moment(`10/05/${year}`, 'MM-DD-YYYY'))) {
        period = utils.convertQuarterToPeriod(3);
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
            periodArray: [1],
            period: 1,
            year: sanitizedFY
        };
    }

    const available = [];
    let firstPeriod = 1;
    if (sanitizedFY === utils.earliestFileAYear) {
        // in the first year of DATA Act reporting, the first period is not available
        firstPeriod = utils.convertQuarterToPeriod(2);
    }

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
