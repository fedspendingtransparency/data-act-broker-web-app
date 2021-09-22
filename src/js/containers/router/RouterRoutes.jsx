import UploadFabsFilePageContainer from 'containers/uploadFabsFile/UploadFabsFilePageContainer';
import GenerateDetachedFilesPageContainer from 'containers/generateDetachedFiles/GenerateDetachedFilesPageContainer';
import LandingPage from 'components/landing/LandingPage';
import LoginPage from 'components/login/LoginPage';
import AuthPage from 'components/login/AuthPage';
import SubmissionGuideContainer from 'containers/addData/SubmissionGuideContainer';
import AddDataPageContainer from 'containers/addData/AddDataPageContainer';
import SubmissionsTablePage from 'components/submissionsTable/SubmissionsTablePage';
import DetachedFileAContainer from 'containers/generateDetachedFiles/DetachedFileAContainer';
import SubmissionContainer from 'containers/submission/SubmissionContainer';
import SubmissionStepsContainer from 'containers/submission/SubmissionStepsContainer';
import HistoryContainer from 'containers/history/HistoryContainer';
import Dashboard from 'components/dashboard/DashboardPage';
import HelpContainer from 'containers/help/HelpContainer';
import ErrorPage from 'components/error/ErrorPage';

let instance = null;

export const checkHelpUserPermissions = (session) => {
    if (session.login !== "loggedIn") {
        return false;
    }
    return true;
};

export const checkUserPermissions = (session) => {
    if (session.login === "loggedIn" && !session.user.helpOnly) {
        return true;
    }
    return false;
};

export const checkDabsUploadPermissions = (session) => {
    if (session.admin) {
        return true;
    }

    return session.user.affiliations.reduce((acc, affiliation) => {
        if (affiliation.permission === 'writer' || affiliation.permission === 'submitter') {
            return true;
        }
        return acc;
    }, false);
};

export const checkFabsUploadPermissions = (session) => {
    if (session.admin) {
        return true;
    }

    return session.user.affiliations.reduce((acc, affiliation) => {
        if (affiliation.permission === 'fabs' || affiliation.permission === 'editfabs') {
            return true;
        }
        return acc;
    }, false);
};

const getRoutes = () => {
    const returnRoutes = [
        {
            path: '/login',
            component: LoginPage,
            authFn: () => true
        },
        {
            path: '/auth',
            component: AuthPage,
            authFn: () => true
        },
        {
            path: '/',
            component: LandingPage,
            authFn: checkHelpUserPermissions,
            type: 'home',
            exact: true
        },
        {
            path: '/submissionGuide',
            authFn: checkUserPermissions,
            component: SubmissionGuideContainer,
            type: 'dabs'
        },
        {
            path: '/addData',
            authFn: checkDabsUploadPermissions,
            component: AddDataPageContainer,
            type: 'dabs'
        },
        {
            path: '/FABSaddData/:submissionID',
            authFn: checkUserPermissions,
            component: UploadFabsFilePageContainer,
            type: 'fabs'
        },
        {
            path: '/FABSaddData',
            authFn: checkFabsUploadPermissions,
            component: UploadFabsFilePageContainer,
            type: 'fabs'
        },
        {
            path: '/submission/:submissionID/:step',
            authFn: checkUserPermissions,
            component: SubmissionStepsContainer,
            type: 'dabs'
        },
        {
            path: '/submission/:submissionID',
            authFn: checkUserPermissions,
            component: SubmissionContainer,
            type: 'dabs'
        },
        {
            path: '/submissionHistory/:submissionID',
            authFn: checkUserPermissions,
            component: HistoryContainer,
            type: 'dabs'
        },
        {
            path: '/generateDetachedFiles',
            authFn: checkUserPermissions,
            component: GenerateDetachedFilesPageContainer,
            type: 'dabs'
        },
        {
            path: '/generateDetachedFileA',
            authFn: checkUserPermissions,
            component: DetachedFileAContainer,
            type: 'dabs'
        },
        {
            path: '/dashboard/:type',
            authFn: checkUserPermissions,
            component: Dashboard,
            type: 'dabs'
        },
        {
            path: '/dashboard',
            authFn: checkUserPermissions,
            component: Dashboard,
            type: 'dabs'
        }
    ];

    function routeConstructor(routeInfo, onEnterIndex, type) {
        let prefix = '/';
        if (type === 'fabs') {
            prefix = '/FABS';
        }

        if (routeInfo.component === 'landing') {
            return {
                path: prefix + routeInfo.path,
                authFn: routeInfo.authFn[onEnterIndex],
                component: LandingPage,
                type
            };
        }
        else if (routeInfo.component === 'submissionTable') {
            return {
                path: prefix + routeInfo.path,
                authFn: routeInfo.authFn[onEnterIndex],
                component: SubmissionsTablePage,
                type
            };
        }
        else if (routeInfo.component === 'help') {
            return {
                path: prefix + routeInfo.path,
                authFn: routeInfo.authFn[onEnterIndex],
                component: HelpContainer,
                type
            };
        }
        return null;
    }

    // Duplicated routes for FABS/DABS
    const sharedRoutes = [
        // first authFn is for Dabs if they are different
        {
            path: 'landing',
            authFn: [checkUserPermissions],
            component: 'landing'
        },
        {
            path: 'submissionTable',
            authFn: [checkUserPermissions],
            component: 'submissionTable'
        },
        {
            path: 'help',
            authFn: [checkHelpUserPermissions, checkUserPermissions],
            component: 'help'
        },
        {
            path: 'validations',
            authFn: [checkHelpUserPermissions, checkUserPermissions],
            component: 'help'
        },
        {
            path: 'resources',
            authFn: [checkHelpUserPermissions, checkUserPermissions],
            component: 'help'
        },
        {
            path: 'rawfiles',
            authFn: [checkHelpUserPermissions, checkUserPermissions],
            component: 'help'
        },
        {
            path: 'datasources',
            authFn: [checkHelpUserPermissions, checkUserPermissions],
            component: 'help'
        },
        {
            path: 'history',
            authFn: [checkHelpUserPermissions, checkUserPermissions],
            component: 'help'
        },
        {
            path: 'technicalHistory',
            authFn: [checkHelpUserPermissions, checkUserPermissions],
            component: 'help'
        }
    ];
    sharedRoutes.forEach((sharedRoute) => {
        if (sharedRoute.authFn.length === 1) {
            returnRoutes.push(routeConstructor(sharedRoute, 0, 'dabs'));
            returnRoutes.push(routeConstructor(sharedRoute, 0, 'fabs'));
        }
        else {
            returnRoutes.push(routeConstructor(sharedRoute, 0, 'dabs'));
            returnRoutes.push(routeConstructor(sharedRoute, 1, 'fabs'));
        }
    });

    returnRoutes.push(
        {
            path: '*',
            authFn: checkUserPermissions,
            component: ErrorPage
        });
    return returnRoutes;
};

export default class RouterRoutes {
    constructor() {
        if (!instance) {
            instance = this;
        }

        instance.getRoutes = () => getRoutes();

        return instance;
    }
}
