import Request from './sessionSuperagent.js';
import Q from 'q';
import Cookies from 'js-cookie';

import StoreSingleton from '../redux/storeSingleton.js';

import { kGlobalConstants } from '../GlobalConstants.js';

export const setSkipGuide = (skip_guide) => {
    /*const deferred = Q.defer();

    Request.post(kGlobalConstants.API + 'set_skip_guide/')
        .send({skip_guide: skip_guide})
        .end((err, res) => {

            if (err) {
                deferred.reject(err);
            } else {
                deferred.resolve(res.body);
            }

        });

    return deferred.promise;*/
}