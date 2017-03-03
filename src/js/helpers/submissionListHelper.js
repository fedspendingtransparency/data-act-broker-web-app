import Request from './sessionSuperagent.js';
import Q from 'q';
import { dispatch } from 'redux';
import _ from 'lodash';
import moment from 'moment';
import { kGlobalConstants } from '../GlobalConstants.js';

import * as Status from '../components/landing/recentActivity/SubmissionStatus.jsx';

const parseRecentActivity = (submissions) => {
    const parsedSubmissions = [];

    const statusMap = {
        'ready': Status.StatusTypes.STARTED,
        'waiting': Status.StatusTypes.STARTED,
        'running': Status.StatusTypes.INPROGRESS,
        'validation_successful': Status.StatusTypes.VALIDATED,
        'validation_successful_warnings': Status.StatusTypes.VALIDATEDWARNINGS,
        'validation_errors': Status.StatusTypes.HASERRORS,
        'file_errors': Status.StatusTypes.HASERRORS,
        'failed': Status.StatusTypes.SERVERERROR
    };

    submissions.forEach((item) => {
        // determine the status
        let rowStatus = Status.StatusTypes.UNKNOWN
        if (statusMap.hasOwnProperty(item.status)) {
            rowStatus = statusMap[item.status];
        }

        // convert the file size to KB or MB as appropriate
        let fileSize = '--';
        if (item.size) {
            fileSize = (item.size / 1000000).toFixed(2) + ' MB';
            if (item.size < 100000) {
                fileSize = (item.size / 1000).toFixed(2) + ' KB';
            }
        }

        item.fileSize = fileSize;
        item.rowStatus = rowStatus;

        // sortable date parses the date into unix time stamp for simple sortablity
        item.sortableDate = moment(item.last_modified, "MM/DD/YYYY").unix();

        // do the same thing for size and status, since they are going to be parsed into strings of differing units by the component
        item.sortableSize = item.size;
        item.sortableStatus = rowStatus;
        item.sortableReportingDate = moment(item.reporting_start_date, "MM/DD/YYYY").unix();
        item.sortableName = '';
        if (item.hasOwnProperty("user")) {
            item.sortableName = item.user.name;
        }

        parsedSubmissions.push(item);
    });

    return parsedSubmissions;
}

export const loadSubmissionList = (page = 1, limit = 10, certified = false, sort = 'updated', order = 'desc') => {
    const deferred = Q.defer();

     Request.get(kGlobalConstants.API + 'list_submissions/')
            .query({ page, limit, certified, sort, order })
            .end((err, res) => {

                if (err) {
                    deferred.reject(err);
                }
                else {
                    const output = {
                        submissions: parseRecentActivity(res.body.submissions),
                        total: res.body.total
                    };
                    deferred.resolve(output);
                }
            });

    return deferred.promise;
}

export const loadRecentActivity = () => {
	return loadSubmissionList(1, 5, 'mixed');
}