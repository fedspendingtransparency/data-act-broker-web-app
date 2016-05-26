import Request from './sessionSuperagent.js';
import Q from 'q';
import { dispatch } from 'redux';
import _ from 'lodash';
import { kGlobalConstants } from '../GlobalConstants.js';

export const loadActivity = () => {
	const deferred = Q.defer();

     Request.get(kGlobalConstants.API + 'list_submissions/?filter_by=agency')
            .send()
            .end((err, res) => {

                if (err) {
                    deferred.reject(err);
                }
                else {
                    deferred.resolve(res.body.submissions);
                }
            });

    return deferred.promise;
}