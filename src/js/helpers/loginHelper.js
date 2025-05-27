import Cookies from 'js-cookie';
import _ from 'lodash';
import queryString from 'query-string';

import { apiRequest } from './apiRequest';

import StoreSingleton from '../redux/storeSingleton';

import { kGlobalConstants } from '../GlobalConstants';
import * as sessionActions from '../redux/actions/sessionActions';

export const fetchActiveUser = () => {
    const store = new StoreSingleton().store;

    const req = apiRequest({
        url: 'active_user/'
    });

    const completedRun = req.promise.then((res) => {
        // set the login state cookie that expires in 15 minutes
        Cookies.set('brokerLogin', Date.now(), { expires: (1 / (24 * 4)) });

        const sessionData = {
            login: 'loggedIn',
            user: res.data,
            admin: res.data.website_admin,
            skipGuide: res.data.skip_guide
        };
        sessionData.user.helpOnly = !res.data.website_admin && res.data.affiliations.length === 0;

        const action = sessionActions.setSession(sessionData);
        store.dispatch(action);
        return Promise.resolve(res.data);
    });

    return completedRun;
};

export const establishSession = (responseHeaders) => {
    const cookieOpts = {
        expires: 7,
        path: '/'
    };

    // lowercase all the headers
    const headers = {};
    for (const headerKey in responseHeaders) {
        if (Object.prototype.hasOwnProperty.call(responseHeaders, headerKey)) {
            headers[headerKey.toLowerCase()] = _.clone(responseHeaders[headerKey]);
        }
    }

    // check to see if we received a session header
    if (Object.prototype.hasOwnProperty.call(headers, 'x-session-id')) {
        // we did, save it in a cookie
        Cookies.set('session', headers['x-session-id'], cookieOpts);
    }
};

export const performLogin = (username, password) => {
    // wipe out old session cookies to prevent session weirdness
    Cookies.remove('session');

    const req = apiRequest({
        url: 'login/',
        method: 'post',
        data: { username, password }
    });

    return req.promise;
};

export const performCAIALogin = (code) => {
    // wipe out old session cookies to prevent session weirdness
    Cookies.remove('session');
    // determine the service
    const redirectUri = kGlobalConstants.AUTH_CALLBACK;

    const req = apiRequest({
        url: 'caia_login/',
        method: 'post',
        data: { code, 'redirect_uri': redirectUri }
    });

    return req.promise;
};

export const performLogout = () => {
    const req = apiRequest({
        url: 'logout/',
        method: 'post'
    });

    return req.promise;
};

export const checkSession = () => {
    const req = apiRequest({
        url: 'session/'
    });

    return req.promise;
};

export const getRedirectPath = (location) => {
    const { search } = location;

    const queryStrings = queryString.parse(search); // '?foo=bar' --> { foo: 'bar' }
    const hasRedirectQueryString = Object.keys(queryStrings).includes('redirect');
    if (hasRedirectQueryString) return queryStrings.redirect;
    return null;
};

export const getPath = (location, isAuthorized) => {
    const { pathname } = location;
    const redirectPath = getRedirectPath(location);
    if (isAuthorized && redirectPath) {
        return redirectPath;
    }
    else if (isAuthorized && !redirectPath) {
        return '/';
    }
    else if (!isAuthorized && pathname !== '/login') {
        return `/login?redirect=${pathname}`;
    }
    return '/login';
};
