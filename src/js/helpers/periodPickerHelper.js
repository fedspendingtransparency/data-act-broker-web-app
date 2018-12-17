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

    if (today.isBetween(moment(`10/19/${year}`, 'MM-DD-YYYY'), moment(`12/06/${year}`, 'MM-DD-YYYY'))) {
        year -= 1; // October
    }
    else if (today.isBetween(moment(`12/07/${year}`, 'MM-DD-YYYY'), moment(`01/07/${year}`, 'MM-DD-YYYY'))) {
        period = 2; // November
    }
    else if (today.isBetween(moment(`01/08/${year}`, 'MM-DD-YYYY'), moment(`02/06/${year}`, 'MM-DD-YYYY'))) {
        period = 3; // December
    }
    else if (today.isBetween(moment(`02/07/${year}`, 'MM-DD-YYYY'), moment(`03/07/${year}`, 'MM-DD-YYYY'))) {
        period = 4; // January
    }
    else if (today.isBetween(moment(`03/08/${year}`, 'MM-DD-YYYY'), moment(`04/04/${year}`, 'MM-DD-YYYY'))) {
        period = 5; // Feburary
    }
    else if (today.isBetween(moment(`04/05/${year}`, 'MM-DD-YYYY'), moment(`05/06/${year}`, 'MM-DD-YYYY'))) {
        period = 6; // March
    }
    else if (today.isBetween(moment(`05/07/${year}`, 'MM-DD-YYYY'), moment(`06/06/${year}`, 'MM-DD-YYYY'))) {
        period = 7; // April
    }
    else if (today.isBetween(moment(`06/07/${year}`, 'MM-DD-YYYY'), moment(`07/05/${year}`, 'MM-DD-YYYY'))) {
        period = 8; // May
    }
    else if (today.isBetween(moment(`07/06/${year}`, 'MM-DD-YYYY'), moment(`08/06/${year}`, 'MM-DD-YYYY'))) {
        period = 9; // June
    }
    else if (today.isBetween(moment(`08/07/${year}`, 'MM-DD-YYYY'), moment(`09/06/${year}`, 'MM-DD-YYYY'))) {
        period = 10; // July
    }
    else if (today.isBetween(moment(`09/07/${year}`, 'MM-DD-YYYY'), moment(`10/04/${year}`, 'MM-DD-YYYY'))) {
        period = 11; // August
    }
    else if (today.isBetween(moment(`10/05/${year}`, 'MM-DD-YYYY'), moment(`10/18/${year}`, 'MM-DD-YYYY'))) {
        period = 12; // September
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
    let firstPeriod = 1;
    if (sanitizedFY === utils.earliestFileAYear) {
        // in the first year of DATA Act reporting, the first period is not available
        firstPeriod = 4;
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
