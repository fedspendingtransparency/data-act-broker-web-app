import Request from './sessionSuperagent.js';
import Q from 'q';
import Cookies from 'js-cookie';
import _ from 'lodash';

import StoreSingleton from '../redux/storeSingleton.js';

import { kGlobalConstants } from '../GlobalConstants.js';
import * as sessionActions from '../redux/actions/sessionActions.js';

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
                    Cookies.set('brokerLogin', Date.now(), { expires: (1 / (24 * 4)) });

                    const sessionData = {
                        login: 'loggedIn',
                        user: res.body,
                        admin: res.body.website_admin,
                        skipGuide: res.body.skip_guide
                    };
                    sessionData.user.helpOnly = !res.body.website_admin && res.body.affiliations.length === 0;

                    const action = sessionActions.setSession(sessionData);
                    store.dispatch(action);
                    deferred.resolve(res.body);
                }
            });

    return deferred.promise;
};

const establishSession = (responseHeaders) => {
    const cookieOpts = {
        expires: 7,
        path: '/'
    };

    // lowercase all the headers
    const headers = {};
    for (let headerKey in responseHeaders) {
        if (responseHeaders.hasOwnProperty(headerKey)) {
            headers[headerKey.toLowerCase()] = _.clone(responseHeaders[headerKey]);
        }
    }

    // check to see if we received a session header
    if (headers.hasOwnProperty('x-session-id')) {
        // we did, save it in a cookie
        Cookies.set('session', headers['x-session-id'], cookieOpts);
    }
};

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
                }
                else {
                    Cookies.set('brokerLogin', Date.now(), { expires: (1 / (24 * 4)) });

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
};

export const performMaxLogin = (ticket) => {
    const deferred = Q.defer();
    const store = new StoreSingleton().store;

    // wipe out old session cookies to prevent session weirdness
    Cookies.remove('session');

    // determine the service
    const service = encodeURIComponent(kGlobalConstants.AUTH_CALLBACK);

    Request.post(kGlobalConstants.API + 'max_login/')
        .send({ 'ticket': ticket, 'service': service })
        .end((err, res) => {
            if (err) {
                const action = sessionActions.setLoginState('failed');
                store.dispatch(action);

                // unset the login state cookie
                Cookies.remove('brokerLogin');

                // if a message is available, display that
                if (res && res.hasOwnProperty('body') && res.body.hasOwnProperty('message')) {
                    deferred.reject(res.body.message);
                }
                else {
                    deferred.reject(err);
                }
            }
            else {
                Cookies.set('brokerLogin', Date.now(), { expires: (1 / (24 * 4)) });
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
};

export const performLogout = () => {
    const deferred = Q.defer();

    const store = new StoreSingleton().store;

    Request.post(kGlobalConstants.API + 'logout/')
            .send({})
            .end((err) => {
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
};

export const checkSession = () => {
    const deferred = Q.defer();

    const store = new StoreSingleton().store;

    Request.get(kGlobalConstants.API + 'session/')
        .send()
        .end((err, res) => {
            if (!err && res.body.status === 'True') {
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
};
