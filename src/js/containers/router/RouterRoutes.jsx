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
        replace('/detachedLanding');
    }
}

const checkHelpUserPermissions = (nextState, replace) => {
    getStore();
    const session = store.getState().session;

    if (session.login != "loggedIn") {
        performAutoLogin(nextState.location, replace);
    }
}

function getRoutes() {
    let returnRoutes = [];
    console.log(window.location.pathname)
    let sharedRoutes = [
        {
            path: 'landing',
            onEnter: [checkUserPermissions],
            component: LandingPage,
            componentURL: '/../../components/landing/LandingPage.jsx'
        },
        {
            path: 'dashboard',
            onEnter: [checkUserPermissions],
            componentURL: '../../components/dashboard/DashboardPage.jsx'
        },
        {
            path: 'help',
            onEnter: [checkHelpUserPermissions, checkUserPermissions],
            componentURL: './../../containers/help/HelpContainer.jsx'
        },
        {
            path: 'practices',
            onEnter: [checkHelpUserPermissions, checkUserPermissions],
            componentURL: './../../containers/help/HelpContainer.jsx'
        },
        {
            path: 'validations',
            onEnter: [checkHelpUserPermissions, checkUserPermissions],
            componentURL: './../../containers/help/HelpContainer.jsx'
        },
        {
            path: 'resources',
            onEnter: [checkHelpUserPermissions, checkUserPermissions],
            componentURL: './../../containers/help/HelpContainer.jsx'
        },
        {
            path: 'history',
            onEnter: [checkHelpUserPermissions, checkUserPermissions],
            componentURL: './../../containers/help/HelpContainer.jsx'
        },
        {
            path: 'technicalHistory',
            onEnter: [checkHelpUserPermissions, checkUserPermissions],
            componentURL: './../../containers/help/HelpContainer.jsx'
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
    return returnRoutes;
}

function routeConstructor(props, onEnterIndex, type) {
    let prefix = '';
    if(type == 'fabs') {
        prefix = 'FABS'
    }

    return {
        path: prefix + props.path,
        onEnter: props.onEnter[onEnterIndex],
        getComponent(nextState, cb) {
            require.ensure([], (require) => {
                cb(null, require(props.componentURL).default)
            });
        },
        type: type
    }
}

// defining the routes outside of the component because React Router cannot handle state/prop changes that Redux causes
const routeDefinitions = {
    path: '/',
    indexRoute: {
        onEnter: checkUserPermissions,
        component: LandingPage,
        type: kGlobalConstants.STAGING ? 'home' : 'dabs'
    },
    childRoutes: [
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
    ].concat(getRoutes())
}

export default class RouterRoutes {
    constructor() {
        if (!instance) {
            instance = this;
        }

        instance.routes = () => routeDefinitions;
        instance.autoLogin = (location) => performAutoLogin(location);

        console.log(routeDefinitions)

        return instance;
    }

}
