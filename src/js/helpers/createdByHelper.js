import Q from 'q';
import Request from './sessionSuperagent';

import { kGlobalConstants } from '../GlobalConstants';

export const fetchCreatedBy = () => {
  const deferred = Q.defer();

  Request.get(`${kGlobalConstants.API}list_submission_users/`)
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
