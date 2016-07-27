import Request from './sessionSuperagent.js';
import Q from 'q';
import Cookies from 'js-cookie';

import StoreSingleton from '../redux/storeSingleton.js';

import { kGlobalConstants } from '../GlobalConstants.js';

export const fetchSubmissionMetadata = (submissionId) => {

    const deferred = Q.defer();

    Request.post(kGlobalConstants.API + 'check_status/')
            .send({'submission_id': submissionId})
            .end((errFile, res) => {

                if (errFile) {
                    deferred.reject(errFile);
                }
                else {
                    deferred.resolve(res.body);
                }

            });

    return deferred.promise;
}