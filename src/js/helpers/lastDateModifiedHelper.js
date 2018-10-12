import Q from 'q';
import Request from './sessionSuperagent';

import { kGlobalConstants } from '../GlobalConstants';

export const fetchLastDateModified = () => {
  const deferred = Q.defer();

  Request.post(`${kGlobalConstants.API}list_submissions/`)
    .send({
      certified: 'false',
      d2_submission: false,
      limit: 200,
      order: 'desc'
    })
    .end((err, res) => {
      if (err) {
        deferred.reject(err);
      }
      else {
        deferred.resolve(res.body.submissions);
      }
    });

  return deferred.promise;
};
