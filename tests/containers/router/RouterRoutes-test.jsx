/**
 * RouterRoutes-test.jsx
 * Created by Lizzie Salita 1/22/20
 */

import RouterRoutes from 'containers/router/RouterRoutes';
import {
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
                '/submission/:submissionID/:type',
                '/submission/:submissionID',
                '/submissionHistory/:submissionID',
                '/generateDetachedFiles',
                '/generateDetachedFileA',
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
                '/history',
                '/FABShistory',
                '/technicalHistory',
                '/FABStechnicalHistory',
                '*'
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
