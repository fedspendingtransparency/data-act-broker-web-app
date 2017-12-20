import { hashHistory } from 'react-router';
import LandingPage from '../../components/landing/LandingPage';
import LoginPage from '../../components/login/LoginPage';
import AuthPage from '../../components/login/AuthPage';
import SubmissionGuideContainer from '../../containers/addData/SubmissionGuideContainer';
import AddDataPageContainer from '../../containers/addData/AddDataPageContainer';
import UploadDetachedFilesPageContainer from
    '../../containers/uploadDetachedFiles/UploadDetachedFilesPageContainer';
import GenerateDetachedFilesPageContainer
    from '../../containers/generateDetachedFiles/GenerateDetachedFilesPageContainer';
import StoreSingleton from '../../redux/storeSingleton';

let instance = null;
let store = new StoreSingleton().store;

const getStore = () => {
    if (!store) {
        store = new StoreSingleton().store;
    }
    return store;
};

const performAutoLogin = (location, replace) => {
    getStore();

    const session = store.getState().session;

    const path = location.pathname;
    const search = location.search;
    const query = location.query;

    let pushMethod = hashHistory.push;
    if (replace) {
        pushMethod = replace;
    }

    if (path === "/login") {
        if (session.login === "loggedIn") {
            // user is logged in, go to landing page
            if (search !== "" && query.hasOwnProperty('redirect')) {
                // a redirect option was provided
                pushMethod(query.redirect);
            }
            else {
                pushMethod('/');
            }
        }
    }
    else if (session.login !== "loggedIn") {
        if (path === "/login") {
            pushMethod('/login');
        }
        else {
            pushMethod('/login?redirect=' + path);
        }
    }
};

const checkUserPermissions = (nextState, replace) => {
    getStore();
    const session = store.getState().session;
    if (session.login !== "loggedIn") {
        performAutoLogin(nextState.location, replace);
    }
    else if (session.user.helpOnly) {
        // if no permissions or attempting to reach DABS with improper permissions, bounce to help
        replace('/help');
    }
};

const checkDabsUploadPermissions = (nextState, replace) => {
    getStore();
    const session = store.getState().session;
    if (session.login !== "loggedIn") {
        performAutoLogin(nextState.location, replace);
    }
    else if (!session.admin) {
        for (let i = 0; i < session.user.affiliations.length; i++) {
            if (session.user.affiliations[i].permission === 'writer' ||
                session.user.affiliations[i].permission === 'submitter') {
                return;
            }
        }
        // if no permissions, bounce to landing
        replace('/landing');
    }
};

const checkFabsUploadPermissions = (nextState, replace) => {
    getStore();
    const session = store.getState().session;
    if (session.login !== "loggedIn") {
        performAutoLogin(nextState.location, replace);
    }
    else if (!session.admin) {
        for (let i = 0; i < session.user.affiliations.length; i++) {
            if (session.user.affiliations[i].permission === 'fabs') {
                return;
            }
        }
        // if no permissions, bounce to landing
        replace('/FABSLanding');
    }
};

const checkHelpUserPermissions = (nextState, replace) => {
    getStore();
    const session = store.getState().session;

    if (session.login !== "loggedIn") {
        performAutoLogin(nextState.location, replace);
    }
};

const getRoutes = () => {
    const returnRoutes = [
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
                    cb(null, require('../../components/validateData/ValidateDataPage').default);
                });
            },
            type: 'dabs'
        },
        {
            path: 'submission/:submissionID',
            onEnter: checkUserPermissions,
            getComponent(nextState, cb) {
                require.ensure([], (require) => {
                    cb(null, require('../../containers/submission/SubmissionContainer').default);
                });
            },
            type: 'dabs'
        },
        {
            path: 'generateFiles/:submissionID',
            onEnter: checkUserPermissions,
            getComponent(nextState, cb) {
                require.ensure([], (require) => {
                    cb(null, require('../../components/generateFiles/GenerateFilesPage').default);
                });
            },
            type: 'dabs'
        },
        {
            path: 'generateEF/:submissionID',
            onEnter: checkUserPermissions,
            getComponent(nextState, cb) {
                require.ensure([], (require) => {
                    cb(null, require('../../components/generateEF/GenerateEFPage').default);
                });
            },
            type: 'dabs'
        },
        {
            path: 'validateCrossFile/:submissionID',
            onEnter: checkUserPermissions,
            getComponent(nextState, cb) {
                require.ensure([], (require) => {
                    cb(null, require('../../components/crossFile/CrossFilePage').default);
                });
            },
            type: 'dabs'
        },
        {
            path: 'reviewData/:submissionID',
            onEnter: checkUserPermissions,
            getComponent(nextState, cb) {
                require.ensure([], (require) => {
                    cb(null, require('../../containers/review/ReviewDataContainer').default);
                });
            },
            type: 'dabs'
        },
        {
            path: 'submissionHistory/:submissionID',
            onEnter: checkUserPermissions,
            getComponent(nextState, cb) {
                require.ensure([], (require) => {
                    cb(null, require('../../containers/history/HistoryContainer').default);
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

    // Duplicated routes for FABS/DABS
    const sharedRoutes = [
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
    ];
    for (let i = 0; i < sharedRoutes.length; i++) {
        if (sharedRoutes[i].onEnter.length === 1) {
            returnRoutes.push(routeConstructor(sharedRoutes[i], 0, 'dabs'));
            returnRoutes.push(routeConstructor(sharedRoutes[i], 0, 'fabs'));
        }
        else {
            returnRoutes.push(routeConstructor(sharedRoutes[i], 0, 'dabs'));
            returnRoutes.push(routeConstructor(sharedRoutes[i], 1, 'fabs'));
        }
    }
    returnRoutes.push(
        {
            path: '*',
            onEnter: checkUserPermissions,
            getComponent(nextState, cb) {
                require.ensure([], (require) => {
                    cb(null, require('../../components/error/ErrorPage').default);
                });
            },
            type: 'home'
        });
    return returnRoutes;
};

function routeConstructor(routeInfo, onEnterIndex, type) {
    let prefix = '';
    if (type === 'fabs') {
        prefix = 'FABS';
    }

    if (routeInfo.component === 'landing') {
        return {
            path: prefix + routeInfo.path,
            onEnter: routeInfo.onEnter[onEnterIndex],
            getComponent(nextState, cb) {
                require.ensure([], (require) => {
                    cb(null, require('../../components/landing/LandingPage').default);
                });
            },
            type
        };
    }
    else if (routeInfo.component === 'dashboard') {
        return {
            path: prefix + routeInfo.path,
            onEnter: routeInfo.onEnter[onEnterIndex],
            getComponent(nextState, cb) {
                require.ensure([], (require) => {
                    cb(null, require('../../components/dashboard/DashboardPage').default);
                });
            },
            type
        };
    }
    else if (routeInfo.component === 'help') {
        return {
            path: prefix + routeInfo.path,
            onEnter: routeInfo.onEnter[onEnterIndex],
            getComponent(nextState, cb) {
                require.ensure([], (require) => {
                    cb(null, require('../help/HelpContainer').default);
                });
            },
            type
        };
    }
    return null;
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
};

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
