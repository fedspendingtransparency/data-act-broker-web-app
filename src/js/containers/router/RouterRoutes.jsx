import { hashHistory } from 'react-router';

import LandingPage from '../../components/landing/LandingPage.jsx';
import LoginPage from '../../components/login/LoginPage.jsx';
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
            onEnter: checkUserPermissions,
            getComponent(nextState, cb) {
                require.ensure([], (require) => {
                    cb(null, require('../../components/help/helpPage.jsx').default)
                });
            }
        },
        {
            path: 'practices',
            onEnter: checkUserPermissions,
            getComponent(nextState, cb) {
                require.ensure([], (require) => {
                    cb(null, require('../../components/help/practicesProceduresPage.jsx').default)
                });
            }
        },
        {
            path: 'validations',
            onEnter: checkUserPermissions,
            getComponent(nextState, cb) {
                require.ensure([], (require) => {
                    cb(null, require('../../components/help/validationRulesTablePage.jsx').default)
                });
            }
        },
        {
            path: 'forgotpassword',
            getComponent(nextState, cb) {
                require.ensure([], (require) => {
                    cb(null, require('../forgotPassword/ForgotPasswordContainer.jsx').default)
                });
            }
        },
        {
            path: 'forgotpassword/:token',
            getComponent(nextState, cb) {
                require.ensure([], (require) => {
                    cb(null, require('../../components/forgotPassword/ResetPasswordTokenPage.jsx').default)
                });
            }
        },
        {
            path: 'registration',
            getComponent(nextState, cb) {
                require.ensure([], (require) => {
                    cb(null, require('../registration/RegisterEmailContainer.jsx').default)
                });
            }
        },
        {
            path: 'registration/:token',
            getComponent(nextState, cb) {
                require.ensure([], (require) => {
                    cb(null, require('../registration/RegisterTokenContainer.jsx').default)
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
