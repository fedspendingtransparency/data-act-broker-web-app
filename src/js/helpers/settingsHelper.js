import Q from 'q';
import Request from './sessionSuperagent';

import { kGlobalConstants } from '../GlobalConstants';

export const fetchSettings = (agencyCode, file) => {
    const deferred = Q.defer();

    Request.get(`${kGlobalConstants.API}rule_settings?agency_code=${agencyCode}&file=${file}`)
        .send()
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

export const saveSettings = (callBody) => {
    const deferred = Q.defer();

    Request.post(`${kGlobalConstants.API}save_rule_settings/`)
        .send(callBody)
        .end((err, res) => {
            if (err) {
                const response = Object.assign({}, res.body);
                response.httpStatus = res.status;
                deferred.reject(response);
            }
            else {
                deferred.resolve(res.body);
            }
        });

    return deferred.promise;
};
