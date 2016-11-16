import Request from './sessionSuperagent.js';
import Q from 'q';
import Cookies from 'js-cookie';

import StoreSingleton from '../redux/storeSingleton.js';

import { kGlobalConstants } from '../GlobalConstants.js';

export const UserStatus = {
	UNKNOWN: 0,
	AWAITING_CONFIRMATION: 1,
	EMAIL_CONFIRMED: 2,
	AWAITING_APPROVAL: 3,
	ACTIVE: 4,
	INACTIVE: 5,
	DENIED: 6
};

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

export const deleteUser = (email) => {
	const deferred = Q.defer();

	Request.post(kGlobalConstants.API + 'delete_user/')
		.send({ email: email })
		.end((err, res) => {
			if (err) {
				deferred.reject(err);
			}
			else if (res.body.hasOwnProperty('message') && res.body.message == 'success') {
				deferred.resolve();
			}
			else {
				deferred.reject(res.body.message);
			}
		});

	return deferred.promise;
}

export const determineStatus = (user) => {
	let statusType = UserStatus.AWAITING_CONFIRMATION;

	const statusStrings = ['Unknown', 'Awaiting Confirmation', 'Email Confirmed', 'Awaiting Approval', 'Active', 'Inactive', 'Denied'];

	if (user.status == 'email_confirmed') {
		statusType = UserStatus.EMAIL_CONFIRMED;
	}
	else if (user.status == 'awaiting_approval') {
		statusType = UserStatus.AWAITING_APPROVAL;
	}
	else if (user.status == 'approved') {
		statusType = UserStatus.ACTIVE;
	}
	else if (user.status == 'denied') {
		statusType = UserStatus.DENIED;
	}

	if (user.status == 'approved' && user.is_active != true) {
		statusType = UserStatus.INACTIVE;
	}

	return {
		string: statusStrings[statusType],
		type: statusType
	};
}

export const listAllUsers = () => {
	const deferred = Q.defer();

	Request.post(kGlobalConstants.API + 'list_users/')
		.send({})
		.end((err, res) => {
			if (err) {
				deferred.reject(err);
			}
			else {
				const users = [];
				res.body.users.forEach((user) => {
					const status = determineStatus(user);

					user.statusString = status.string;
					user.statusType = status.type;

					users.push(user);
				});
				deferred.resolve(users);
			}
		});

	return deferred.promise;
}
