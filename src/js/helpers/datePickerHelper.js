/**
 * datePickerHelper.js
 * Created by Lizzie Salita 02/07/20
 */

import moment from 'moment';

export const isOutsideRange = (day) => {
    const today = moment();
    const minDate = moment('01/01/2017', 'MM/DD/YYYY');

    // disable future dates
    if (day.isAfter(today)) {
        return true;
    }

    // reporting began Q2 of FY 2017
    if (day.isBefore(minDate)) {
        return true;
    }

    return false;
};

export const initialVisibleMonth = () =>
    // Since it shows two months at a time, start with last month
    // since we cannot select future dates
    moment().subtract(1, 'months');
