import { apiRequest } from './apiRequest';

export const fetchSettings = (agencyCode, file) => {
    const req = apiRequest({
        url: 'rule_settings/',
        params: {
            'agency_code': agencyCode,
            file
        }
    })

    return req.promise;
};

export const saveSettings = (data) => {
    const req = apiRequest({
        url: 'save_rule_settings/',
        method: 'post',
        data
    })

    return req.promise;
};
