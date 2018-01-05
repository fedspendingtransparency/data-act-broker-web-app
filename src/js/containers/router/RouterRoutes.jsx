import { hashHistory } from 'react-router';
import { kGlobalConstants } from '../../GlobalConstants.js';

import LandingPage from '../../components/landing/LandingPage.jsx';
import LoginPage from '../../components/login/LoginPage.jsx';
import AuthPage from '../../components/login/AuthPage.jsx';
import SubmissionGuideContainer from '../../containers/addData/SubmissionGuideContainer.jsx';
import AddDataPageContainer from '../../containers/addData/AddDataPageContainer.jsx';
import UploadDetachedFilesPageContainer from '../../containers/uploadDetachedFiles/UploadDetachedFilesPageContainer.jsx';
import GenerateDetachedFilesPageContainer from '../../containers/generateDetachedFiles/GenerateDetachedFilesPageContainer.jsx';

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
        // if no permissions, bounce to help
        replace('/help');
    }
}

const checkReadUserPermissions = (nextState, replace) => {
    getStore();
    const session = store.getState().session;
    if (session.login != "loggedIn") {
        performAutoLogin(nextState.location, replace);
    }
    else if (!session.admin) {
        for(var i = 0; i < session.user.affiliations.length; i++){
            if(session.user.affiliations[i].permission != 'reader'){
                return;
            }
        }
        // if no permissions, bounce to landing
        replace('/landing');
    }
}

const checkHelpUserPermissions = (nextState, replace) => {
    getStore();
    const session = store.getState().session;

    if (session.login != "loggedIn") {
        performAutoLogin(nextState.location, replace);
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
            path: 'landing',
            onEnter: checkUserPermissions,
            component: LandingPage,
            type: 'dabs'
        },
        {
            path: 'detachedLanding',
            onEnter: checkUserPermissions,
            component: LandingPage,
            type: 'fabs'
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
            },
            type: 'dabs'
        },
        {
            path: 'detachedDashboard',
            onEnter: checkUserPermissions,
            getComponent(nextState, cb) {
                require.ensure([], (require) => {
                    cb(null, require('../../components/dashboard/DashboardPage.jsx').default)
                });
            },
            type: 'fabs'
        },
        {
            path: 'addData',
            onEnter: checkReadUserPermissions,
            component: AddDataPageContainer
        },
        {
            path: 'uploadDetachedFiles/:submissionID',
            onEnter: checkUserPermissions,
            component: UploadDetachedFilesPageContainer,
            type:'fabs'
        },
        {
            path: 'uploadDetachedFiles',
            onEnter: checkUserPermissions,
            component: UploadDetachedFilesPageContainer,
            type:'fabs'
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
            path: 'submission/:submissionID',
            onEnter: checkUserPermissions,
            getComponent(nextState, cb) {
                require.ensure([], (require) => {
                    cb(null, require('../../containers/submission/SubmissionContainer.jsx').default)
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
            path: 'submissionHistory/:submissionID',
            onEnter: checkUserPermissions,
            getComponent(nextState, cb) {
                require.ensure([], (require) => {
                    cb(null, require('../../containers/history/HistoryContainer.jsx').default)
                });
            }
        },
        {
            path: 'generateDetachedFiles',
            onEnter: checkUserPermissions,
            component: GenerateDetachedFilesPageContainer
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
            path: 'technicalHistory',
            onEnter: checkHelpUserPermissions,
            getComponent(nextState, cb) {
                require.ensure([], (require) => {
                    cb(null, require('../../containers/help/HelpContainer.jsx').default)
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
