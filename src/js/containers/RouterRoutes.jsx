import LoginPage from '../components/login/LoginPage.jsx';
import RegistrationPage from '../components/registration/RegistrationPage.jsx';
import RegistrationTokenPage from '../components/registration/RegisterTokenPage.jsx';
import ForgotPasswordTokenPage from '../components/forgotPassword/ResetPasswordTokenPage.jsx';
import CompleteRegistrationComponent from '../components/registration/ConfirmCodeComponent.jsx';
import ForgotPasswordPage from '../components/forgotPassword/ForgotPasswordPage.jsx';
import LandingPage from '../components/landing/LandingPage.jsx';
import AddDataPage from '../components/addData/AddDataPage.jsx';
import ReviewDataPage from '../components/addData/ReviewDataPage.jsx';
import AdminPage from '../components/admin/AdminPage.jsx';

let store;

const setStore = (parentStore) => {
    store = parentStore;
}

const checkAdminPermissions = (nextState, replace) => {
    //TODO Add check For Permissions
    console.log("test");
    if (store) {
        console.log(store.getState());
    }
}
const checkUserPermissions = (nextState, replace) => {
    //TODO Add check For User Permissions
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
        component: LoginPage
    },
    childRoutes: [
        {
            path: 'login',
            component: LoginPage
        },
        {
            path: 'admin',
            component: AdminPage
        },
        {
            path: 'landing',
            component: LandingPage,
            onEnter: checkAdminPermissions
        },
        {
            path: 'reviewData',
            component: ReviewDataPage
        },
        {
            path: 'reviewData/:subID',
            component: ReviewDataPage
        },
        {
            path: 'forgotpassword',
            component: ForgotPasswordPage
        },
        {
            path: 'forgotpassword/:token',
            component: ForgotPasswordTokenPage
        },
        {
            path: 'registration',
            component: RegistrationPage
        },
        {
            path: 'registration/:token',
            component: RegistrationTokenPage
        }
    ]
}

export const routes = {
    setStore: setStore,
    getStore: () => store,
    routes: () => routeDefinitions
}