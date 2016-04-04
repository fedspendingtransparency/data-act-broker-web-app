import Request from 'superagent';
import Q from 'q';
import AWS from 'aws-sdk';
import { dispatch } from 'redux';
import _ from 'lodash';

import StoreSingleton from '../redux/storeSingleton.js';

import { kGlobalConstants } from '../GlobalConstants.js';
import * as reviewActions from '../redux/actions/reviewActions.js';

export const fetchStatus = (submissionID) => {
	const deferred = Q.defer();

	Request.post(kGlobalConstants.API + 'check_status/')
		.withCredentials()
		.send({'submission_id': submissionID})
		.end((errFile, res) => {
			if (errFile) {
				deferred.reject(errFile);
			} else {
				deferred.resolve(res.body);
			}

		});

	return deferred.promise;
}