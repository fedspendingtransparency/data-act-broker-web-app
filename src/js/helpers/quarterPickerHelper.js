/**
 * quarterPickerHelper.js
 * Created by Lizzie Salita 11/9/18
 */

import moment from 'moment';
import * as utils from './util';

export const handlePotentialStrings = (input) => {
    if (typeof input === 'string') {
        return parseInt(input, 10);
    }
    return input;
};

export const mostRecentQuarter = () => {
    // get the latest quarter for which GTAS data is available
    const today = moment();
    let year = today.year();
    let quarter = 4;

    if (today.isBetween(moment(`01/01/${year}`, 'MM-DD-YYYY'), moment(`01-08-${year}`, 'MM-DD-YYYY'))) {
        year -= 1;
    }
    else if (today.isBetween(moment(`01/08/${year}`, 'MM-DD-YYYY'), moment(`04/05/${year}`, 'MM-DD-YYYY'))) {
        quarter = 1;
    }
    else if (today.isBetween(moment(`04/05/${year}`, 'MM-DD-YYYY'), moment(`06/05/${year}`, 'MM-DD-YYYY'))) {
        quarter = 2;
    }
    else if (today.isBetween(moment(`06/05/${year}`, 'MM-DD-YYYY'), moment(`10/05/${year}`, 'MM-DD-YYYY'))) {
        quarter = 3;
    }

    return {
        quarter,
        year
    };
};

export const lastCompletedQuarterInFY = (fy) => {
    // get the most recent available quarter and year
    const current = mostRecentQuarter();
    const sanitizedFY = handlePotentialStrings(fy);

    if (sanitizedFY < current.year) {
        // user wants a previous year's quarters
        // since we are no longer on that year, it must be completed
        return {
            quarter: 4,
            year: sanitizedFY
        };
    }

    // otherwise, return the current year's quarter
    return current;
};

export const availableQuartersInFY = (fy) => {
    const sanitizedFY = handlePotentialStrings(fy);
    // get the most recent available quarter and year
    const lastQuarter = lastCompletedQuarterInFY(sanitizedFY);
    if (lastQuarter.year > sanitizedFY) {
        // FY is in the future
        return {
            quarters: [],
            year: sanitizedFY
        };
    }

    const available = [];
    let firstQuarter = 1;
    if (sanitizedFY === utils.earliestFileAYear) {
        // in the first spending explorer year, the first quarter is not available
        firstQuarter = 2;
    }

    for (let i = firstQuarter; i <= lastQuarter.quarter; i++) {
        if (sanitizedFY >= utils.earliestFileAYear) {
            available.push(i);
        }
    }

    return {
        quarters: available,
        year: lastQuarter.year
    };
};

export const defaultQuarters = () => {
    const current = mostRecentQuarter();
    return availableQuartersInFY(current.year);
};
