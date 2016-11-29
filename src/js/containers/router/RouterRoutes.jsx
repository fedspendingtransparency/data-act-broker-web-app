import { hashHistory } from 'react-router';
import { kGlobalConstants } from '../../GlobalConstants.js';

import LandingPage from '../../components/landing/LandingPage.jsx';
import LoginPage from '../../components/login/LoginPage.jsx';
import AuthPage from '../../components/login/AuthPage.jsx';
import SubmissionGuideContainer from '../../containers/addData/SubmissionGuideContainer.jsx';
import AddDataPageContainer from '../../containers/addData/AddDataPageContainer.jsx';

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

const checkAdminPermissions = (nextState, replace) => {
    getStore();
    const session = store.getState().session;
    if (session.login != "loggedIn") {
        // user isn't logged in
        replace('/login?redirect=/admin');
    }
    else if (!session.admin) {
        // if not an admin, bounce to home
        replace('/landing');
    }

}

const checkUserPermissions = (nextState, replace) => {
    getStore();
    const session = store.getState().session;
    if (session.login != "loggedIn") {
        performAutoLogin(nextState.location, replace);
    }
    else if (!session.permission) {
        // if no permissions, bounce to help
        replace('/help');
    }
}

const checkHelpUserPermissions = (nextState, replace) => {
    getStore();
    const session = store.getState().session;

    if (session.login != "loggedIn") {
        performAutoLogin(nextState.location, replace);
    }
}

const rejectIfMAXEnabled = (nextState, replace) => {
    if (!kGlobalConstants.LOCAL) {
        // MAX enabled, this route is not available
        replace('/');
    }
}

const redirectIfLogin = (nextState, replace) => {
    //TODO Add check For User Permissions
}
const debugRoute = (nextState, replace) => {

}

// defining the routes outside of the component because React Router cannot handle state/prop changes that Redux causes
const routeDefinitions = {
    path: '/',
    indexRoute: {
        onEnter: checkUserPermissions,
        component: LandingPage
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
            path: 'admin',
            onEnter: checkAdminPermissions,
            getComponent(nextState, cb) {
                require.ensure([], (require) => {
                    cb(null, require('../../components/admin/AdminPage.jsx').default)
                });
            }
        },
        {
            path: 'landing',
            onEnter: checkUserPermissions,
            component: LandingPage
        },
        {
            path: 'submissionGuide',
            onEnter: checkUserPermissions,
            component: SubmissionGuideContainer
        },
        {
            path: 'dashboard',
            onEnter: checkUserPermissions,
            getComponent(nextState, cb) {
                require.ensure([], (require) => {
                    cb(null, require('../../components/dashboard/DashboardPage.jsx').default)
                });
            }
        },
        {
            path: 'addData',
            onEnter: checkUserPermissions,
            component: AddDataPageContainer
        },
        {
            path: 'validateData/:submissionID',
            onEnter: checkUserPermissions,
            getComponent(nextState, cb) {
                require.ensure([], (require) => {
                    cb(null, require('../../components/validateData/ValidateDataPage.jsx').default)
                });
            }
        },
        {
            path: 'generateFiles/:submissionID',
            onEnter: checkUserPermissions,
            getComponent(nextState, cb) {
                require.ensure([], (require) => {
                    cb(null, require('../../components/generateFiles/GenerateFilesPage.jsx').default)
                });
            }
        },
        {
            path: 'generateEF/:submissionID',
            onEnter: checkUserPermissions,
            getComponent(nextState, cb) {
                require.ensure([], (require) => {
                    cb(null, require('../../components/generateEF/GenerateEFPage.jsx').default)
                });
            }
        },
        {
            path: 'validateCrossFile/:submissionID',
            onEnter: checkUserPermissions,
            getComponent(nextState, cb) {
                require.ensure([], (require) => {
                    cb(null, require('../../components/crossFile/CrossFilePage.jsx').default)
                });
            }
        },
        {
            path: 'reviewData/:submissionID',
            onEnter: checkUserPermissions,
            getComponent(nextState, cb) {
                require.ensure([], (require) => {
                    cb(null, require('../../containers/review/ReviewDataContainer.jsx').default)
                });
            }
        },
        {
            path: 'help',
            onEnter: checkHelpUserPermissions,
            getComponent(nextState, cb) {
                require.ensure([], (require) => {
                    cb(null, require('../../containers/help/HelpContainer.jsx').default)
                });
            }
        },
        {
            path: 'practices',
            onEnter: checkHelpUserPermissions,
            getComponent(nextState, cb) {
                require.ensure([], (require) => {
                    cb(null, require('../../containers/help/HelpContainer.jsx').default)
                });
            }
        },
        {
            path: 'validations',
            onEnter: checkHelpUserPermissions,
            getComponent(nextState, cb) {
                require.ensure([], (require) => {
                    cb(null, require('../../containers/help/HelpContainer.jsx').default)
                });
            }
        },
		{
            path: 'resources',
            onEnter: checkHelpUserPermissions,
            getComponent(nextState, cb) {
                require.ensure([], (require) => {
                    cb(null, require('../../containers/help/HelpContainer.jsx').default)
                });
            }
        },

		{
            path: 'history',
            onEnter: checkHelpUserPermissions,
            getComponent(nextState, cb) {
                require.ensure([], (require) => {
                    cb(null, require('../../containers/help/HelpContainer.jsx').default)
                });
            }
        },
        {
            path: 'forgotpassword',
            onEnter: rejectIfMAXEnabled,
            getComponent(nextState, cb) {
                require.ensure([], (require) => {
                    cb(null, require('../forgotPassword/ForgotPasswordContainer.jsx').default)
                });
            }
        },
        {
            path: 'forgotpassword/:token',
            onEnter: rejectIfMAXEnabled,
            getComponent(nextState, cb) {
                require.ensure([], (require) => {
                    cb(null, require('../../components/forgotPassword/ResetPasswordTokenPage.jsx').default)
                });
            }
        },
        {
            path: '*',
            getComponent(nextState, cb) {
                require.ensure([], (require) => {
                    cb(null, require('../../components/error/ErrorPage.jsx').default)
                });
            }
        }
    ]
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
