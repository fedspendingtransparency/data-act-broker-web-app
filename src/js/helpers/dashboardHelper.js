import Q from 'q';
import Request from './sessionSuperagent';

import { kGlobalConstants } from '../GlobalConstants';

export const fetchQuarterlyRevalidationThreshold = () => {
    const deferred = Q.defer();

    Request.get(`${kGlobalConstants.API}latest_certification_period/`)
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
