import { hashHistory } from 'react-router';

import LoginPage from '../../components/login/LoginPage.jsx';
import RegistrationPage from '../../components/registration/RegistrationPage.jsx';
import RegisterEmailContainer from '../registration/RegisterEmailContainer.jsx';
import RegistrationTokenContainer from '../registration/RegisterTokenContainer.jsx';
import ForgotPasswordTokenPage from '../../components/forgotPassword/ResetPasswordTokenPage.jsx';
import CompleteRegistrationComponent from '../../components/registration/ConfirmCodeComponent.jsx';
import ForgotPasswordContainer from '../forgotPassword/ForgotPasswordContainer.jsx';
import LandingPage from '../../components/landing/LandingPage.jsx';
import AddDataPageContainer from '../../containers/addData/AddDataPageContainer.jsx';
import ValidateDataPage from '../../components/validateData/ValidateDataPage.jsx';
import ReviewDataPage from '../../components/reviewData/ReviewDataPage.jsx';
import HelpPage from '../../components/help/helpPage.jsx';
import AdminPage from '../../components/admin/AdminPage.jsx';

import ErrorPage from '../../components/error/ErrorPage.jsx';

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
        component: LandingPage,
        onEnter: checkUserPermissions
    },
    childRoutes: [
        {
            path: 'login',
            component: LoginPage
        },
        {
            path: 'admin',
            component: AdminPage,
            onEnter: checkAdminPermissions
        },
        {
            path: 'landing',
            component: LandingPage,
            onEnter: checkUserPermissions
        },
        {
            path: 'addData',
            component: AddDataPageContainer,
            onEnter: checkUserPermissions
        },
        {
            path: 'validateData/:submissionID',
            component: ValidateDataPage,
            onEnter: checkUserPermissions
        },
        {
            path: 'reviewData/:submissionID',
            component: ReviewDataPage,
            onEnter: checkUserPermissions
        },
        {
            path: 'help',
            component: HelpPage,
            onEnter: checkUserPermissions
        },
        {
            path: 'forgotpassword',
            component: ForgotPasswordContainer
        },
        {
            path: 'forgotpassword/:token',
            component: ForgotPasswordTokenPage
        },
        {
            path: 'registration',
            component: RegisterEmailContainer
        },
        {
            path: 'registration/:token',
            component: RegistrationTokenContainer
        },
        {
            path: '*',
            component: ErrorPage
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