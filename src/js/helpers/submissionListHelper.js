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
        'failed': Status.StatusTypes.SERVERERROR,
        'certified': Status.StatusTypes.CERTIFIED
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

        // creating sortable agency to be consistent with other sortable keys
        item.sortableAgency = item.agency
        // sortable date parses the date into unix time stamp for simple sortablity
        item.sortableDate = moment(item.last_modified).unix();
        // sortable reporting date parses the date into unix time stamp for simple sortablity
        item.sortableReportingDate = moment(item.reporting_start_date).unix();
        item.sortableName = '';
        if (item.hasOwnProperty("user")) {
            item.sortableName = item.user.name;
        }
        parsedSubmissions.push(item);
    });

    return parsedSubmissions;
}

export const loadSubmissionList = (page = 1, limit = 10, certified = false, sort = 'updated', order = 'desc', d2_submission = false) => {
    const deferred = Q.defer();

     Request.get(kGlobalConstants.API + 'list_submissions/')
            .query({ page, limit, certified, sort, order, d2_submission})
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

export const loadSubmissionHistory = (submissionID) => {
    const deferred = Q.defer();

     Request.post(kGlobalConstants.API + 'list_certifications/')
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
}

export const getSubmissionFile = (submissionID, certified_files_history, is_warning) => {

    const deferred = Q.defer();

     Request.post(kGlobalConstants.API + 'get_certified_file/')
            .send({ 
                submission_id: submissionID,
                certified_files_history_id: certified_files_history,
                is_warning: is_warning 
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
}

<<<<<<< HEAD
export const loadRecentActivity = (type) => {
	return loadSubmissionList(1, 5, 'mixed', 'updated', 'desc', type=='fabs');
=======
export const loadRecentActivity = () => {
	return loadSubmissionList(1, 5, 'mixed', 'updated', 'desc');
>>>>>>> 77ed6a5a529590cf0f235359fd92e0aa5695d37c
}
