import Request from './sessionSuperagent.js';
import Q from 'q';
import Cookies from 'js-cookie';

import StoreSingleton from '../redux/storeSingleton.js';

import { kGlobalConstants } from '../GlobalConstants.js';


export const listUsersWithStatus = (status) => {
	const deferred = Q.defer();
	
	Request.post(kGlobalConstants.API + 'list_users_with_status/')
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
	return modifyUser(userId, {
		status: status
	});
}

export const modifyUser = (userId, changes) => {
	const deferred = Q.defer();

	// create a request object that is the merged result of the user ID and the change dictionary
	const request = Object.assign({
		uid: userId
	}, changes);

	Request.post(kGlobalConstants.API + 'update_user/')
		.send(request)
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

export const listAllUsers = () => {
	const deferred = Q.defer();

	Request.post(kGlobalConstants.API + 'list_users/')
		.send()
		.end((err, res) => {
			if (err) {
				deferred.reject(err);
			}
			else {
				// break up the permissions
				const users = [];
				res.body.users.forEach((user) => {
					// sometimes python adds extra spaces to the comma separated list, so strip those out
					const permString = user.permissions.replace(/\s/g, '');
					user.permissions = permString.split(',');
					users.push(user);
				});
				deferred.resolve(users);
			}
		});

	return deferred.promise;
}