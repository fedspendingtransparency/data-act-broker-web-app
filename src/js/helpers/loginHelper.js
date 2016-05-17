import Request from './sessionSuperagent.js';
import Q from 'q';
import Cookies from 'js-cookie';
import _ from 'lodash';

import StoreSingleton from '../redux/storeSingleton.js';

import { kGlobalConstants } from '../GlobalConstants.js';
import * as sessionActions from '../redux/actions/sessionActions.js';
import * as registrationActions from '../redux/actions/registrationActions.js';

export const fetchActiveUser = () => {

	const deferred = Q.defer();

	const store = new StoreSingleton().store;

	Request.get(kGlobalConstants.API + 'current_user/')
	        .send()
	        .end((err, res) => {
	            if (err) {
	            	const action = sessionActions.setLoggedOut();
	                store.dispatch(action);

	                // unset the login state cookie
	                Cookies.remove('brokerLogin');
	                deferred.reject(err);
	            }
	            else {
	            	// set the login state cookie that expires in 15 minutes
					Cookies.set('brokerLogin', Date.now(), {expires: (1/(24*4))});

	                // check to see if the user is an admin
	                let isAdmin = false;
	                res.body.permissions.forEach(function(perm) {
	                    if (perm == 1) {
	                        isAdmin = true;
	                    }
	                });
	                
	                const sessionData = {
	                    login: 'loggedIn',
	                    user: res.body,
	                    admin: isAdmin
	                };

	                const action = sessionActions.setSession(sessionData);
	                store.dispatch(action);
	                deferred.resolve(res.body);
	            }
	        });

    return deferred.promise;
}

const establishSession = (responseHeaders) => {
	const cookieOpts = {
		expires: 7,
		path: '/'
	};

	// lowercase all the headers
	const headers = {};
	for (let headerKey in responseHeaders) {
		headers[headerKey.toLowerCase()] = _.clone(responseHeaders[headerKey]);
	}

	// check to see if we received a session header
	if (headers.hasOwnProperty('x-session-id')) {
		// we did, save it in a cookie
		Cookies.set('session', headers['x-session-id'], cookieOpts);
	}
}

export const performLogin = (username, password) => {
	
	const deferred = Q.defer();
	const store = new StoreSingleton().store;

	// wipe out old session cookies to prevent session weirdness
	Cookies.remove('session');

	Request.post(kGlobalConstants.API + 'login/')
           .send({ 'username': username, 'password': password })
           .end((err, res) => {
				if (err) {
					const action = sessionActions.setLoginState('failed');
					store.dispatch(action);

					// unset the login state cookie
	                Cookies.remove('brokerLogin');

	                // if a message is available, display that
	                if (res.body && res.body.hasOwnProperty('message')) {
						deferred.reject(res.body.message);
					}
					else {
						deferred.reject(err);
					}
				} else {
					
					Cookies.set('brokerLogin', Date.now(), {expires: (1/(24*4))});

					establishSession(res.headers);
					// check if cookies could be set
					if (!Cookies.get('session')) {
						// couldn't set cookie, fail this request and notify the user
						const action = sessionActions.setLoginState('failed');
						store.dispatch(action);
						deferred.reject('cookie');
						return;
					}
					
					fetchActiveUser(store)
					.then((data) => {
						deferred.resolve(data);
					})
					.catch((dataErr) => {
						deferred.reject(dataErr);
					});
				}
           });

	return deferred.promise;
}

export const performLogout = () => {
	const deferred = Q.defer();

	const store = new StoreSingleton().store;

	Request.post(kGlobalConstants.API + 'logout/')
            .send()
            .end((err, res) => {
                if (!err) {
                    const action = sessionActions.setLoggedOut();
                    store.dispatch(action);

                    // unset the login state cookie
	                Cookies.remove('brokerLogin');
	                Cookies.remove('session');

                    deferred.resolve();
                }
            });

	return deferred.promise;
}

export const checkSession = () => {
	const deferred = Q.defer();

	const store = new StoreSingleton().store;

	Request.get(kGlobalConstants.API + 'session/')
		.send()
		.end((err, res) => {
			if (!err && res.body.status == 'True') {
				// session is valid
				deferred.resolve();
			}
			else {
				// session expired, update redux state
				const action = sessionActions.setLoggedOut();
				store.dispatch(action);

				// unset the login state cookie
                Cookies.remove('brokerLogin');

				deferred.reject();
			}
		});

	return deferred.promise;
}


export const registerEmail = (email) => {
	const deferred = Q.defer();

	const store = new StoreSingleton().store;

	Request.post(kGlobalConstants.API + 'confirm_email/')
		.send({ 'email': email })
		.end((err) => {

			const action = registrationActions.resetErrors();
			store.dispatch(action);


        	if (err) {
        		deferred.reject(err);
        	}
        	else {
        		deferred.resolve();
        	}

		});

    return deferred.promise;
}

export const lookupEmailToken = (token) => {
	const deferred = Q.defer();

	const store = new StoreSingleton().store;

	Request.post(kGlobalConstants.API + 'confirm_email_token/')
		.send({ 'token': token })
		.end((err, res) => {
			if (err) {
				deferred.reject(err);
			} else {
				establishSession(res.headers);
				const action = registrationActions.setErrors(res.body);
				store.dispatch(action);
				deferred.resolve(res.body);
			}
		});

	return deferred.promise;
}

export const registerAccount = (account) => {

	const deferred = Q.defer();

	Request.post(kGlobalConstants.API + 'register/')
		.send(account)
		.end((err) => {
			if (err) {
				deferred.reject(err);
			} else {
				deferred.resolve();
			}
		});
	return deferred.promise;
}

export const resetPassword = (email, password) => {
	const deferred = Q.defer();

	Request.post(kGlobalConstants.API + 'set_password/')
		.send({ 'user_email': email, 'password': password })
		.end((err) => {

			if (err) {
				deferred.reject(err);
			}
			else {
				deferred.resolve();
			}

		});

	return deferred.promise;
}

export const requestPasswordToken = (email) => {

	const deferred = Q.defer();

	Request.post(kGlobalConstants.API + 'reset_password/')
		.send({ 'email': email })
		.end((err) => {
			if (err) {
				deferred.reject(err);
			}
			else {
				deferred.resolve();
			}
		});

	return deferred.promise;
}

export const lookupPasswordToken = (token) => {

	const deferred = Q.defer();

	Request.post(kGlobalConstants.API + 'confirm_password_token/')
		.send({ 'token': token })
		.end((err, res) => {
		    if (err) {
		        deferred.reject(err);
		    } else {
		    	establishSession(res.headers);
		    	deferred.resolve(res.body);
		    }
		});

    return deferred.promise;
}