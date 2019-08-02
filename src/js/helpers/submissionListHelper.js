import Q from 'q';
import moment from 'moment';
import Request from './sessionSuperagent';
import { kGlobalConstants } from '../GlobalConstants';

import * as Status from '../components/landing/recentActivity/SubmissionStatus';

export const parseRecentActivity = (submissions) => {
    const parsedSubmissions = [];

    const statusMap = {
        ready: Status.StatusTypes.STARTED,
        waiting: Status.StatusTypes.STARTED,
        running: Status.StatusTypes.INPROGRESS,
        validation_successful: Status.StatusTypes.VALIDATED,
        validation_successful_warnings: Status.StatusTypes.VALIDATEDWARNINGS,
        validation_errors: Status.StatusTypes.HASERRORS,
        file_errors: Status.StatusTypes.HASERRORS,
        failed: Status.StatusTypes.SERVERERROR,
        certified: Status.StatusTypes.CERTIFIED
    };

    submissions.forEach((item) => {
        const tmpItem = Object.assign({}, item);
        // determine the status
        let rowStatus = Status.StatusTypes.UNKNOWN;
        if (Object.prototype.hasOwnProperty.call(statusMap, tmpItem.status)) {
            rowStatus = statusMap[tmpItem.status];
        }

        // convert the file size to KB or MB as appropriate
        let fileSize = '--';
        if (tmpItem.size) {
            fileSize = `${(tmpItem.size / 1000000).toFixed(2)} MB`;
            if (tmpItem.size < 100000) {
                fileSize = `${(tmpItem.size / 1000).toFixed(2)} KB`;
            }
        }

        tmpItem.fileSize = fileSize;
        tmpItem.rowStatus = rowStatus;

        // creating sortable agency to be consistent with other sortable keys
        tmpItem.sortableAgency = tmpItem.agency;
        // sortable date parses the date into unix time stamp for simple sortablity
        tmpItem.sortableDate = moment(tmpItem.last_modified).unix();
        // sortable reporting date parses the date into unix time stamp for simple sortablity
        tmpItem.sortableReportingDate = moment(tmpItem.reporting_start_date).unix();
        tmpItem.sortableName = '';
        if (Object.prototype.hasOwnProperty.call(tmpItem, "user")) {
            tmpItem.sortableName = tmpItem.user.name;
        }
        parsedSubmissions.push(tmpItem);
    });

    return parsedSubmissions;
};

export const loadSubmissionList = (
    page = 1, limit = 10, certified = false, sort = 'updated', order = 'desc', fabs = false, filters = {}) => {
    const deferred = Q.defer();

    Request.post(`${kGlobalConstants.API}list_submissions/`)
        .send({
            page,
            limit,
            certified: certified.toString(),
            sort,
            order,
            fabs,
            filters
        })
        .end((err, res) => {
            if (err) {
                deferred.reject(err);
            }
            else {
                console.log(' List Submissions Endpoint Response : ', res);
                const { submissions, total } = res.body;
                const output = {
                    submissions: parseRecentActivity(submissions),
                    total,
                    min_last_modified: res.body.min_last_modified
                };
                deferred.resolve(output);
            }
        });

    return deferred.promise;
};

export const loadSubmissionHistory = (submissionID) => {
    const deferred = Q.defer();

    Request.post(`${kGlobalConstants.API}list_certifications/`)
        .send({ submission_id: submissionID })
        .end((err, res) => {
            if (err) {
                deferred.reject(err);
            }
            else {
                deferred.resolve(res.body);
            }
        });

    return deferred.promise;
};

export const getSubmissionFile = (submissionID, certifiedFilesHistory, isWarning) => {
    const deferred = Q.defer();

    Request.post(`${kGlobalConstants.API}get_certified_file/`)
        .send({
            submission_id: submissionID,
            certified_files_history_id: certifiedFilesHistory,
            is_warning: isWarning
        })
        .end((err, res) => {
            if (err) {
                deferred.reject(err);
            }
            else {
                deferred.resolve(res.body);
            }
        });

    return deferred.promise;
};

export const loadRecentActivity = (type) => loadSubmissionList(1, 5, 'mixed', 'updated', 'desc', type === 'fabs');
