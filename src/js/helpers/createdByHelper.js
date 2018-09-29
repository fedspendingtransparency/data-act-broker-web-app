import Q from 'q';
import Request from './sessionSuperagent';

import { kGlobalConstants } from '../GlobalConstants';

export const fetchCreatedBy = () => {
  const deferred = Q.defer();

  Request.post(`${kGlobalConstants.API}list_submissions/`)
    .send({
      certified: 'false',
      d2_submission: false,
      // filters: {}
      limit: 200,
      order: 'desc',
      // page: 1
      // sort: "modified"
    })
    .end((err, res) => {
      if (err) {
        deferred.reject(err);
      } else {
        deferred.resolve(res.body.submissions);
      }
    });

  return deferred.promise;
};
