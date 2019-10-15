import { hashHistory } from 'react-router';
import LandingPage from 'components/landing/LandingPage';
import LoginPage from 'components/login/LoginPage';
import AuthPage from 'components/login/AuthPage';
import SubmissionGuideContainer from 'containers/addData/SubmissionGuideContainer';
import AddDataPageContainer from 'containers/addData/AddDataPageContainer';
import UploadFabsFilePageContainer from
    'containers/uploadFabsFile/UploadFabsFilePageContainer';
import GenerateDetachedFilesPageContainer
    from 'containers/generateDetachedFiles/GenerateDetachedFilesPageContainer';
import DetachedFileAContainer
    from 'containers/generateDetachedFiles/DetachedFileAContainer';
import StoreSingleton from 'redux/storeSingleton';
import Dashboard from 'components/dashboard/DashboardPage';

import { checkFabsPermissions } from 'helpers/permissionsHelper';

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
            if (search !== "" && Object.prototype.hasOwnProperty.call(query, 'redirect')) {
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
            pushMethod(`/login?redirect=${path}`);
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
    const fabsPermissions = checkFabsPermissions(session);
    if (!fabsPermissions) {
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
            component: UploadFabsFilePageContainer,
            type: 'fabs'
        },
        {
            path: 'FABSaddData',
            onEnter: checkFabsUploadPermissions,
            component: UploadFabsFilePageContainer,
            type: 'fabs'
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
            path: 'submission/:submissionID/:type',
            onEnter: checkUserPermissions,
            getComponent(nextState, cb) {
                require.ensure([], (require) => {
                    cb(null, require('../../containers/submission/SubmissionContainer').default);
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
        },
        {
            path: 'generateDetachedFileA',
            onEnter: checkUserPermissions,
            component: DetachedFileAContainer,
            type: 'dabs'
        },
        {
            path: 'dashboard',
            onEnter: checkUserPermissions,
            component: Dashboard,
            type: 'dabs'
        }
    ];

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
        else if (routeInfo.component === 'submissionsTable') {
            return {
                path: prefix + routeInfo.path,
                onEnter: routeInfo.onEnter[onEnterIndex],
                getComponent(nextState, cb) {
                    require.ensure([], (require) => {
                        cb(null, require('../../components/submissionsTable/SubmissionsTablePage').default);
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

    // Duplicated routes for FABS/DABS
    const sharedRoutes = [
        {
            path: 'landing',
            onEnter: [checkUserPermissions],
            component: 'landing'
        },
        {
            path: 'submissionsTable',
            onEnter: [checkUserPermissions],
            component: 'submissionsTable'
        },
        {
            path: 'help',
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
