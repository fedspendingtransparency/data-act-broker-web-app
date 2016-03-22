import Request from 'superagent';
import Q from 'q';
import Cookies from 'js-cookie';

import StoreSingleton from '../redux/storeSingleton.js';

import { kGlobalConstants } from '../GlobalConstants.js';
import * as sessionActions from '../redux/actions/sessionActions.js';

export const fetchActiveUser = () => {

	const deferred = Q.defer();

	const store = new StoreSingleton().store;

	Request.get(kGlobalConstants.API + 'current_user/')
	        .withCredentials()
	        .send()
	        .end((err, res) => {
	            if (err) {
	            	const action = sessionActions.setSession({
	                    login: 'loggedOut',
	                    user: {},
	                    admin: false
	                });
	                store.dispatch(action);

	                // unset the login state cookie
	                Cookies.remove('brokerLogin');
	                deferred.reject(err);
	            }
	            else {

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

export const performLogin = (username, password) => {
	
	const deferred = Q.defer();
	const store = new StoreSingleton().store;

	Request.post(kGlobalConstants.API + 'login/')
           .withCredentials()
           .send({ 'username': username, 'password': password })
           .end((err, res) => {
				if (err) {
					const action = sessionActions.setLoginState('failed');
					store.dispatch(action);

					// unset the login state cookie
	                Cookies.remove('brokerLogin');
					deferred.reject(err);
				} else {
					// set the login state cookie that expires in 15 minutes
					Cookies.set('brokerLogin', Date.now(), {expires: (1/(24*4))});

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
            .withCredentials()
            .send()
            .end((err, res) => {
                if (!err) {
                    const action = sessionActions.setSession({
                        login: 'loggedOut',
                        user: {},
                        admin: false
                    });
                    store.dispatch(action);

                    // unset the login state cookie
	                Cookies.remove('brokerLogin');

                    deferred.resolve();
                }
            });

	return deferred.promise;
}