import Request from 'superagent';
import Q from 'q';
import Cookies from 'js-cookie';

import StoreSingleton from '../redux/storeSingleton.js';

import { kGlobalConstants } from '../GlobalConstants.js';


export const listUsersWithStatus = (status) => {
	const deferred = Q.defer();
	
	Request.post(kGlobalConstants.API + 'list_users_with_status/')
	        .withCredentials()
	        .send({ status: status })
	        .end((err, res) => {

	        	if (err) {
	        		deferred.reject(err);
	        	}
	        	else {
	        		deferred.resolve(res.body);
	        	}

	        });

	return deferred.promise;
}

export const changeUserStatus = (userId, status) => {

	const deferred = Q.defer();

	Request.post(kGlobalConstants.API + 'change_status/')
		.withCredentials()
		.send({
			uid: userId,
			new_status: status
		})
		.end((err, res) => {
			if (err) {
				deferred.reject(err);
			}
			else {
				deferred.resolve(res.body);
			}
		});

	return deferred.promise;
}