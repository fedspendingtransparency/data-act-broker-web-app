/**
 * RouterRoutes-test.jsx
 * Created by Lizzie Salita 1/22/20
 */

import RouterRoutes, {
    checkHelpUserPermissions,
    checkUserPermissions,
    checkDabsUploadPermissions,
    checkFabsUploadPermissions
} from 'containers/router/RouterRoutes';

describe('RouterRoutes', () => {
    describe('getRoutes', () => {
        it('should return all routes necessary for the application', () => {
            const routes = new RouterRoutes();
            const paths = [...routes.getRoutes().map(({ path }) => path)];
            const expectedPaths = [
                '/login',
                '/auth',
                '/',
                '/submissionGuide',
                '/addData',
                '/FABSaddData/:submissionID',
                '/FABSaddData',
                '/submission/:submissionID/:step',
                '/submission/:submissionID',
                '/submissionHistory/:submissionID',
                '/generateDetachedFiles',
                '/generateDetachedFileA',
                '/dashboard/:type',
                '/dashboard',
                '/landing',
                '/FABSlanding',
                '/submissionTable',
                '/FABSsubmissionTable',
                '/help',
                '/FABShelp',
                '/validations',
                '/FABSvalidations',
                '/resources',
                '/FABSresources',
                '/rawfiles',
                '/FABSrawfiles',
                '/history',
                '/FABShistory',
                '/technicalHistory',
                '/FABStechnicalHistory',
                '*'
            ];
            expect(paths).toEqual(expectedPaths);
        });
        it('should correctly assign types to each route', () => {
            const routes = new RouterRoutes();
            const paths = [...routes.getRoutes().map(({ path, type }) => ({ path, type }))];
            const expectedPaths = [
                { path: '/login', type: undefined },
                { path: '/auth', type: undefined },
                { path: '/', type: 'home' },
                { path: '/submissionGuide', type: 'dabs' },
                { path: '/addData', type: 'dabs' },
                { path: '/FABSaddData/:submissionID', type: 'fabs' },
                { path: '/FABSaddData', type: 'fabs' },
                { path: '/submission/:submissionID/:step', type: 'dabs' },
                { path: '/submission/:submissionID', type: 'dabs' },
                { path: '/submissionHistory/:submissionID', type: 'dabs' },
                { path: '/generateDetachedFiles', type: 'dabs' },
                { path: '/generateDetachedFileA', type: 'dabs' },
                { path: '/dashboard/:type', type: 'dabs' },
                { path: '/dashboard', type: 'dabs' },
                { path: '/landing', type: 'dabs' },
                { path: '/FABSlanding', type: 'fabs' },
                { path: '/submissionTable', type: 'dabs' },
                { path: '/FABSsubmissionTable', type: 'fabs' },
                { path: '/help', type: 'dabs' },
                { path: '/FABShelp', type: 'fabs' },
                { path: '/validations', type: 'dabs' },
                { path: '/FABSvalidations', type: 'fabs' },
                { path: '/resources', type: 'dabs' },
                { path: '/FABSresources', type: 'fabs' },
                { path: '/rawfiles', type: 'dabs' },
                { path: '/FABSrawfiles', type: 'fabs' },
                { path: '/history', type: 'dabs' },
                { path: '/FABShistory', type: 'fabs' },
                { path: '/technicalHistory', type: 'dabs' },
                { path: '/FABStechnicalHistory', type: 'fabs' },
                { path: '*', type: undefined }
            ];
            expect(paths).toEqual(expectedPaths);
        });
    });
    describe('checkHelpUserPermissions', () => {
        it('should return true if the user is logged in', () => {
            const mockSession = {
                login: 'loggedIn',
                user: {}
            };
            const helpPermissions = checkHelpUserPermissions(mockSession);
            expect(helpPermissions).toBeTruthy();
        });
        it('should return false if the user is not logged in', () => {
            const mockSession = {
                login: '',
                user: {}
            };
            const helpPermissions = checkHelpUserPermissions(mockSession);
            expect(helpPermissions).toBeFalsy();
        });
    });
    describe('checkUserPermissions', () => {
        it('should return true if the user is logged in and does not have help-only permissions', () => {
            const mockSession = {
                login: 'loggedIn',
                user: {}
            };
            const userPermissions = checkUserPermissions(mockSession);
            expect(userPermissions).toBeTruthy();
        });
        it('should return false if the user is not logged in', () => {
            const mockSession = {
                login: '',
                user: {}
            };
            const userPermissions = checkUserPermissions(mockSession);
            expect(userPermissions).toBeFalsy();
        });
        it('should return false if the user has help-only permissions', () => {
            const mockSession = {
                login: 'loggedIn',
                user: {
                    helpOnly: true
                }
            };
            const userPermissions = checkUserPermissions(mockSession);
            expect(userPermissions).toBeFalsy();
        });
    });
    describe('checkDabsUploadPermissions', () => {
        it('should return true if the user is an admin', () => {
            const mockSession = {
                login: 'loggedIn',
                user: {},
                admin: true
            };
            const dabsUploadPermissions = checkDabsUploadPermissions(mockSession);
            expect(dabsUploadPermissions).toBeTruthy();
        });
        it('should return true if the user is a writer', () => {
            const mockSession = {
                login: 'loggedIn',
                user: {
                    affiliations: [
                        {
                            permission: 'writer'
                        }
                    ]
                }
            };
            const dabsUploadPermissions = checkDabsUploadPermissions(mockSession);
            expect(dabsUploadPermissions).toBeTruthy();
        });
        it('should return true if the user is a submitter', () => {
            const mockSession = {
                login: 'loggedIn',
                user: {
                    affiliations: [
                        {
                            permission: 'submitter'
                        }
                    ]
                }
            };
            const dabsUploadPermissions = checkDabsUploadPermissions(mockSession);
            expect(dabsUploadPermissions).toBeTruthy();
        });
        it('should return false otherwise', () => {
            const mockSession = {
                login: 'loggedIn',
                user: {
                    affiliations: []
                }
            };
            const dabsUploadPermissions = checkDabsUploadPermissions(mockSession);
            expect(dabsUploadPermissions).toBeFalsy();
        });
    });
    describe('checkFabsUploadPermissions', () => {
        it('should return true if the user is an admin', () => {
            const mockSession = {
                login: 'loggedIn',
                user: {},
                admin: true
            };
            const fabsUploadPermissions = checkFabsUploadPermissions(mockSession);
            expect(fabsUploadPermissions).toBeTruthy();
        });
        it('should return true if the user has fabs permissions', () => {
            const mockSession = {
                login: 'loggedIn',
                user: {
                    affiliations: [
                        {
                            permission: 'fabs'
                        }
                    ]
                }
            };
            const fabsUploadPermissions = checkFabsUploadPermissions(mockSession);
            expect(fabsUploadPermissions).toBeTruthy();
        });
        it('should return false otherwise', () => {
            const mockSession = {
                login: 'loggedIn',
                user: {
                    affiliations: []
                }
            };
            const fabsUploadPermissions = checkFabsUploadPermissions(mockSession);
            expect(fabsUploadPermissions).toBeFalsy();
        });
    });
});
