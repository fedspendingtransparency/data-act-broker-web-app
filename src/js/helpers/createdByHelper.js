import { apiRequest } from './apiRequest';

export const fetchCreatedBy = (tablename) => {
    const req = apiRequest({
        url: 'list_submission_users/',
        params: {'is_fabs': tablename.toLowerCase() === 'fabs' ? 'True' : 'False'}
    })

    return req.promise;
};

export { fetchCreatedBy as default };
