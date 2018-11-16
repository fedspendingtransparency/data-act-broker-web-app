import Q from 'q';
import Request from './sessionSuperagent';

import { kGlobalConstants } from '../GlobalConstants';

export const fetchCreatedBy = (tablename) => {
    const deferred = Q.defer();
    const table = tablename.toLowerCase() === 'fabs' ? 'True' : 'False';

    Request.get(`${kGlobalConstants.API}list_submission_users/?d2_submission=${table}`)
        .send()
        .end((err, res) => {
            if (err) {
                deferred.reject(err);
            }
            else {
                deferred.resolve(res.body.users);
            }
        });

    return deferred.promise;
};
