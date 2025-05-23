import moment from 'moment';
import { apiRequest } from './apiRequest';

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
        published: Status.StatusTypes.PUBLISHED,
        certified: Status.StatusTypes.CERTIFIED,
        updated: Status.StatusTypes.UPDATED
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
        tmpItem.sortableFileName = tmpItem.files[0].split('/').pop().replace(/^[0-9]*_/, '');
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
    page = 1, limit = 10, published = false, sort = 'updated', order = 'desc', fabs = false, filters = {}) => {
    const data = {
        page,
        limit,
        published: published.toString(),
        sort,
        order,
        fabs,
        filters
    };
    const req = apiRequest({
        url: 'list_submissions/',
        method: 'post',
        data
    });

    return req.promise;
};

export const loadSubmissionHistory = (submissionID) => {
    const req = apiRequest({
        url: 'list_history/',
        params: {'submission_id': submissionID}
    });

    return req.promise;
};

export const getSubmissionFile = (submissionID, publishedFilesHistory, isWarning) => {
    const req = apiRequest({
        url: 'get_published_file/',
        params: {
            'submission_id': submissionID,
            'published_files_history_id': publishedFilesHistory,
            'is_warning': isWarning
        }
    });

    return req.promise;
};

export const getSubmissionZip = (submissionID, historyId, activeType) => {
    const historyType = (activeType === 'publication') ? 'publish' : 'certify';
    const req = apiRequest({
        url: 'get_submission_zip/',
        params: {
            'submission_id': submissionID,
            [`${historyType}_history_id`]: historyId
        }
    });

    return req.promise;
};

export const loadRecentActivity = (type) => loadSubmissionList(1, 5, 'mixed', 'updated', 'desc', type === 'fabs');
