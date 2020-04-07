/**
 * submissionPeriodHelper.js
 * Created by Lizzie Salita 3/18/20
 */

import moment from 'moment';

/* eslint-disable import/prefer-default-export */
export const submissionPeriodString = (reportingEndDate) => {
    // get the latest quarter for which GTAS data is available
    const today = moment();
    const endDate = moment(reportingEndDate, 'YYYY-MM-DD');
    if (today.isAfter(endDate)) {
        return 'Passed';
    }
    return 'Upcoming';
};
/* eslint-enable import/prefer-default-export */
