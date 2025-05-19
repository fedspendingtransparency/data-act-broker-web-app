import { apiRequest } from './apiRequest';

export const setSkipGuide = (skipGuide) => {
    const req = apiRequest({
        url: 'set_skip_guide/',
        method: 'post',
        data: {'skip_guide': skipGuide}
    });

    return req.promise;
};

export const getSubmissionPage = (submissionId) => {
    const req = apiRequest({
        url: 'check_current_page/',
        params: {'submission_id': submissionId}
    });

    return req.promise;
};
