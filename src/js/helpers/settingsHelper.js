import Q from 'q';
import Request from './sessionSuperagent';

import { kGlobalConstants } from '../GlobalConstants';

/* eslint-disable import/prefer-default-export */
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

/* eslint-enable import/prefer-default-export */
