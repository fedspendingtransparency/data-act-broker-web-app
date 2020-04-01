/**
 * submissionPeriodHelper.js
 * Created by Lizzie Salita 3/18/20
 */

import moment from 'moment';

export const submissionPeriodString = (reportingEndDate) => {
    // get the latest quarter for which GTAS data is available
    const today = moment();
    const endDate = moment(reportingEndDate, 'YYYY-MM-DD');
    if (today.isAfter(endDate)) {
        return 'Passed';
    }
    return 'Upcoming';
};

export const formatMonthlyTimePeriod = (month) => {
    const monthMoment = moment(month, 'MM/YYYY');
    return monthMoment.format('MMMM YYYY');
};
