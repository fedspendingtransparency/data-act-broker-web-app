import { hashHistory } from 'react-router';
import { kGlobalConstants } from '../../GlobalConstants.js';

import LandingPage from '../../components/landing/LandingPage.jsx';
import LoginPage from '../../components/login/LoginPage.jsx';
import AuthPage from '../../components/login/AuthPage.jsx';
import SubmissionGuideContainer from '../../containers/addData/SubmissionGuideContainer.jsx';
import AddDataPageContainer from '../../containers/addData/AddDataPageContainer.jsx';
import UploadDetachedFilesPageContainer from '../../containers/uploadDetachedFiles/UploadDetachedFilesPageContainer.jsx';
import GenerateDetachedFilesPageContainer from '../../containers/generateDetachedFiles/GenerateDetachedFilesPageContainer.jsx';
import * as PermissionsHelper from '../../helpers/permissionsHelper.js';

import StoreSingleton from '../../redux/storeSingleton.js';

let instance = null;
let store = new StoreSingleton().store;
let storeListener = null;

const getStore = () => {
    if (!store) {
        store = new StoreSingleton().store;
    }
    return store;
}

const performAutoLogin = (location, replace) => {
    getStore();

    let session = store.getState().session;

    const path = location.pathname;
    const search = location.search;
    const query = location.query;

    let pushMethod = hashHistory.push;
    if (replace) {
        pushMethod = replace;
    }



    if (path == "/login") {
        if (session.login == "loggedIn") {
            // user is logged in, go to landing page
            if (search != "" && query.hasOwnProperty('redirect')) {
                // a redirect option was provided
                pushMethod(query.redirect);
            }
            else {
                pushMethod('/');
            }
        }
    }
    else {
        if (session.login != "loggedIn") {
            if (path == "/login") {
                pushMethod('/login');
            }
            else {
                pushMethod('/login?redirect=' + path);
            }
        }
    }

}

const checkUserPermissions = (nextState, replace) => {
    getStore();
    const session = store.getState().session;
    if (session.login != "loggedIn") {
        performAutoLogin(nextState.location, replace);
    }
    else if (session.user.helpOnly) {
        // if no permissions or attempting to reach DABS with improper permissions, bounce to help
        replace('/help');
    }
}

const checkDabsUploadPermissions = (nextState, replace) => {
    getStore();
    const session = store.getState().session;
    if (session.login != "loggedIn") {
        performAutoLogin(nextState.location, replace);
    }
    else if (!session.admin) {
        for(var i = 0; i < session.user.affiliations.length; i++){
            if (session.user.affiliations[i].permission === 'writer' || session.user.affiliations[i].permission === 'submitter'){
                return;
            }
        }
        // if no permissions, bounce to landing
        replace('/landing');
    }
}

const checkFabsUploadPermissions = (nextState, replace) => {
    getStore();
    const session = store.getState().session;
    if (session.login != "loggedIn") {
        performAutoLogin(nextState.location, replace);
    }
    else if (!session.admin) {
        for(var i = 0; i < session.user.affiliations.length; i++){
            if (session.user.affiliations[i].permission === 'fabs'){
                return;
            }
        }
        // if no permissions, bounce to landing
        replace('/FABSLanding');
    }
}

const checkHelpUserPermissions = (nextState, replace) => {
    getStore();
    const session = store.getState().session;

    if (session.login != "loggedIn") {
        performAutoLogin(nextState.location, replace);
    }
}

const getRoutes = () => {
    let returnRoutes = [
        {
            path: 'login',
            component: LoginPage
        },
        {
            path: 'auth',
            component: AuthPage
        },
        {
            path: 'submissionGuide',
            onEnter: checkUserPermissions,
            component: SubmissionGuideContainer,
            type: 'dabs'
        },
        {
            path: 'addData',
            onEnter: checkDabsUploadPermissions,
            component: AddDataPageContainer,
            type: 'dabs'
        },
        {
            path: 'FABSaddData/:submissionID',
            onEnter: checkUserPermissions,
            component: UploadDetachedFilesPageContainer,
            type: 'fabs'
        },
        {
            path: 'FABSaddData',
            onEnter: checkFabsUploadPermissions,
            component: UploadDetachedFilesPageContainer,
            type: 'fabs'
        },
        {
            path: 'validateData/:submissionID',
            onEnter: checkUserPermissions,
            getComponent(nextState, cb) {
                require.ensure([], (require) => {
                    cb(null, require('../../components/validateData/ValidateDataPage.jsx').default)
                });
            },
            type: 'dabs'
        },
        {
            path: 'submission/:submissionID',
            onEnter: checkUserPermissions,
            getComponent(nextState, cb) {
                require.ensure([], (require) => {
                    cb(null, require('../../containers/submission/SubmissionContainer.jsx').default)
                });
            },
            type: 'dabs'
        },
        {
            path: 'generateFiles/:submissionID',
            onEnter: checkUserPermissions,
            getComponent(nextState, cb) {
                require.ensure([], (require) => {
                    cb(null, require('../../components/generateFiles/GenerateFilesPage.jsx').default)
                });
            },
            type: 'dabs'
        },
        {
            path: 'generateEF/:submissionID',
            onEnter: checkUserPermissions,
            getComponent(nextState, cb) {
                require.ensure([], (require) => {
                    cb(null, require('../../components/generateEF/GenerateEFPage.jsx').default)
                });
            },
            type: 'dabs'
        },
        {
            path: 'validateCrossFile/:submissionID',
            onEnter: checkUserPermissions,
            getComponent(nextState, cb) {
                require.ensure([], (require) => {
                    cb(null, require('../../components/crossFile/CrossFilePage.jsx').default)
                });
            },
            type: 'dabs'
        },
        {
            path: 'reviewData/:submissionID',
            onEnter: checkUserPermissions,
            getComponent(nextState, cb) {
                require.ensure([], (require) => {
                    cb(null, require('../../containers/review/ReviewDataContainer.jsx').default)
                });
            },
            type: 'dabs'
        },
        {
            path: 'submissionHistory/:submissionID',
            onEnter: checkUserPermissions,
            getComponent(nextState, cb) {
                require.ensure([], (require) => {
                    cb(null, require('../../containers/history/HistoryContainer.jsx').default)
                });
            },
            type: 'dabs'
        },
        {
            path: 'generateDetachedFiles',
            onEnter: checkUserPermissions,
            component: GenerateDetachedFilesPageContainer,
            type: 'dabs'
        }
    ];

    //Duplicated routes for FABS/DABS
    let sharedRoutes = [
        {
            path: 'landing',
            onEnter: [checkUserPermissions],
            component: 'landing'
        },
        {
            path: 'dashboard',
            onEnter: [checkUserPermissions],
            component: 'dashboard'
        },
        {
            path: 'help',
            onEnter: [checkHelpUserPermissions, checkUserPermissions],
            component: 'help'
        },
        {
            path: 'practices',
            onEnter: [checkHelpUserPermissions, checkUserPermissions],
            component: 'help'
        },
        {
            path: 'validations',
            onEnter: [checkHelpUserPermissions, checkUserPermissions],
            component: 'help'
        },
        {
            path: 'resources',
            onEnter: [checkHelpUserPermissions, checkUserPermissions],
            component: 'help'
        },
        {
            path: 'history',
            onEnter: [checkHelpUserPermissions, checkUserPermissions],
            component: 'help'
        },
        {
            path: 'technicalHistory',
            onEnter: [checkHelpUserPermissions, checkUserPermissions],
            component: 'help'
        }
    ]  
    for(let i = 0; i < sharedRoutes.length; i++) {
        if(sharedRoutes[i].onEnter.length == 1) {
            returnRoutes.push(routeConstructor(sharedRoutes[i], 0, 'dabs'))
            returnRoutes.push(routeConstructor(sharedRoutes[i], 0, 'fabs'));
        }
        else {
            returnRoutes.push(routeConstructor(sharedRoutes[i], 0, 'dabs'))
            returnRoutes.push(routeConstructor(sharedRoutes[i], 1, 'fabs'));
        }
    }
    returnRoutes.push(
        {
            path: '*',
            onEnter: checkUserPermissions,
            getComponent(nextState, cb) {
                require.ensure([], (require) => {
                    cb(null, require('../../components/error/ErrorPage.jsx').default)
                });
            },
            type: 'home'
        });
    return returnRoutes
}

function routeConstructor(route_info, onEnterIndex, type) {
    let prefix = '';
    if(type == 'fabs') {
        prefix = 'FABS'
    }

    if(route_info.component === 'landing') {
        return {
            path: prefix + route_info.path,
            onEnter: route_info.onEnter[onEnterIndex],
            getComponent(nextState, cb) {
                require.ensure([], (require) => {
                    cb(null, require('../../components/landing/LandingPage.jsx').default)
                });
            },
            type: type
        }
    }
    else if(route_info.component === 'dashboard') {
        return {
            path: prefix + route_info.path,
            onEnter: route_info.onEnter[onEnterIndex],
            getComponent(nextState, cb) {
                require.ensure([], (require) => {
                    cb(null, require('../../components/dashboard/DashboardPage.jsx').default)
                });
            },
            type: type
        }
    }
    else if(route_info.component ==='help') {
        return {
            path: prefix + route_info.path,
            onEnter: route_info.onEnter[onEnterIndex],
            getComponent(nextState, cb) {
                require.ensure([], (require) => {
                    cb(null, require('../help/HelpContainer.jsx').default)
                });
            },
            type: type
        }
    }
}

// defining the routes outside of the component because React Router cannot handle state/prop changes that Redux causes
const routeDefinitions = {
    path: '/',
    indexRoute: {
        onEnter: checkUserPermissions,
        component: LandingPage,
        type: 'home'
    },
    childRoutes: getRoutes()
}

export default class RouterRoutes {
    constructor() {
        if (!instance) {
            instance = this;
        }

        instance.routes = () => routeDefinitions;
        instance.autoLogin = (location) => performAutoLogin(location);

        return instance;
    }

}
