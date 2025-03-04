/**
 * @jest-environment jsdom
 *
 * permissionsHelper-test.js
 * Created by Maxwell Kendall 06/11/19
 */

import * as permissionsHelper from "../../src/js/helpers/permissionsHelper";

const getRole = (agencyName = 'test', role = 'n00b') => ({
    agency_name: agencyName,
    permission: role
});
const getSession = (admin = false, roles = []) => ({
    admin,
    user: {
        affiliations: roles
    }
});

describe('permissionsHelper', () => {
    describe('checkPermissions', () => {
        it('returns true when admin is truthy', () => {
            const admin = permissionsHelper.checkPermissions(getSession(true, []));
            expect(admin).toEqual(true);
        });
        it('returns true if session.admin is falsy but role is writer or submitter', () => {
            const writerRole = getSession(false, [getRole('test', 'writer'), getRole('test', 'n00b')]);
            const submitterRole = getSession(false, [getRole('test', 'submitter'), getRole('test', 'n00b')]);

            const unauthorizedSession = getSession(false, [getRole('test', 'n3rd'), getRole('test', 'n00b')]);
            const writerSession = permissionsHelper.checkPermissions(writerRole);

            const submitterSession = permissionsHelper.checkPermissions(submitterRole);
            const invalidSession = permissionsHelper.checkPermissions(unauthorizedSession);

            expect(writerSession).toEqual(true);
            expect(submitterSession).toEqual(true);
            expect(invalidSession).toEqual(false);
        });
    });
    describe('checkFabsPermissions', () => {
        it('returns true when admin is truthy', () => {
            const admin = permissionsHelper.checkFabsPermissions(getSession(true, []));
            expect(admin).toEqual(true);
        });
        it('returns true when session.admin is falsy but role is fabs', () => {
            const authorizedRole = getSession(false, [getRole('test', 'fabs')]);
            const unauthorizedRole = getSession(false, [getRole('test', 'test')]);

            const fabsSession = permissionsHelper.checkFabsPermissions(authorizedRole);
            const invalidSession = permissionsHelper.checkFabsPermissions(unauthorizedRole);

            expect(fabsSession).toEqual(true);
            expect(invalidSession).toEqual(false);
        });
        it('returns true when session.admin is falsy but role is editfabs', () => {
            const authorizedRole = getSession(false, [getRole('test', 'editfabs')]);
            const unauthorizedRole = getSession(false, [getRole('test', 'test')]);

            const fabsSession = permissionsHelper.checkFabsPermissions(authorizedRole);
            const invalidSession = permissionsHelper.checkFabsPermissions(unauthorizedRole);

            expect(fabsSession).toEqual(true);
            expect(invalidSession).toEqual(false);
        });
    });
    describe('checkFabsPublishPermissions', () => {
        it('should return true when admin is truthy', () => {
            const admin = permissionsHelper.checkFabsPublishPermissions(getSession(true, []));
            expect(admin).toEqual(true);
        });
        it('should return true when session.admin is falsy but role is fabs', () => {
            const authorizedRole = getSession(false, [getRole('test', 'fabs')]);
            const unauthorizedRole = getSession(false, [getRole('test', 'test')]);

            const fabsSession = permissionsHelper.checkFabsPublishPermissions(authorizedRole);
            const invalidSession = permissionsHelper.checkFabsPublishPermissions(unauthorizedRole);

            expect(fabsSession).toEqual(true);
            expect(invalidSession).toEqual(false);
        });
        it('should return false when session.admin is falsy and role is editfabs', () => {
            const authorizedRole = getSession(false, [getRole('test', 'editfabs')]);
            const unauthorizedRole = getSession(false, [getRole('test', 'test')]);

            const fabsSession = permissionsHelper.checkFabsPublishPermissions(authorizedRole);
            const invalidSession = permissionsHelper.checkFabsPublishPermissions(unauthorizedRole);

            expect(fabsSession).toEqual(false);
            expect(invalidSession).toEqual(false);
        });
    });
    describe('checkAgencyPermissions', () => {
        it('returns true when admin is truthy', () => {
            const admin = permissionsHelper.checkAgencyPermissions(getSession(true, []));
            expect(admin).toEqual(true);
        });
        it('returns true when session.admin is falsy but role is writer/submiter', () => {
            const writerRole = getSession(false, [getRole('test', 'writer')]);
            const submitterRole = getSession(false, [getRole('test', 'submitter')]);
            const invalidRole = getSession(false, [getRole('test', 'test')]);

            const writerSession = permissionsHelper.checkAgencyPermissions(writerRole, 'test');
            const submitterSession = permissionsHelper.checkAgencyPermissions(submitterRole, 'test');

            const validAgencyInvalidRole = permissionsHelper.checkAgencyPermissions(invalidRole, 'test'); // valid agency name, invalid role
            const validRoleInvalidAgency = permissionsHelper.checkAgencyPermissions(writerRole, 'invalidAgencyName'); // valid role, invalid agency name

            expect(writerSession).toEqual(true);
            expect(submitterSession).toEqual(true);
            expect(validAgencyInvalidRole).toEqual(false);
            expect(validRoleInvalidAgency).toEqual(false);
        });
    });
    describe('checkFabsAgencyPermissions', () => {
        it('returns true when admin is truthy', () => {
            const admin = permissionsHelper.checkFabsAgencyPermissions(getSession(true, []));
            expect(admin).toEqual(true);
        });
        it('returns true when session.admin is falsy but role is fabs', () => {
            const fabsRole = getSession(false, [getRole('test', 'fabs')]);
            const unauthorizedSession = getSession(false, [getRole('test', 'test')]);

            const fabsSession = permissionsHelper.checkFabsAgencyPermissions(fabsRole, 'test');

            const validRoleInvalidAgency = permissionsHelper.checkFabsAgencyPermissions(fabsRole, 'invalidAgencyName'); // valid role, invalid agency name
            const validAgencyInvalidRole = permissionsHelper.checkFabsAgencyPermissions(unauthorizedSession, 'test'); // valid agency name, invalid role

            expect(fabsSession).toEqual(true);
            expect(validRoleInvalidAgency).toEqual(false);
            expect(validAgencyInvalidRole).toEqual(false);
        });
        it('should return true when session.admin is falsy and role is editfabs', () => {
            const fabsRole = getSession(false, [getRole('test', 'editfabs')]);
            const unauthorizedSession = getSession(false, [getRole('test', 'test')]);

            const fabsSession = permissionsHelper.checkFabsAgencyPermissions(fabsRole, 'test');

            const validRoleInvalidAgency = permissionsHelper.checkFabsAgencyPermissions(fabsRole, 'invalidAgencyName'); // valid role, invalid agency name
            const validAgencyInvalidRole = permissionsHelper.checkFabsAgencyPermissions(unauthorizedSession, 'test'); // valid agency name, invalid role

            expect(fabsSession).toEqual(true);
            expect(validRoleInvalidAgency).toEqual(false);
            expect(validAgencyInvalidRole).toEqual(false);
        });
    });
    describe('checkAffiliations', () => {
        it('should return true when the current user has the specified permission for the given agency', () => {
            const mockRoles = getRole('Mock Agency', 'a_role');
            const session = getSession(false, [mockRoles]);
            const role = permissionsHelper.checkAffiliations(session, 'a_role', 'Mock Agency');
            expect(role).toBeTruthy();
        });
        it('should return false if the current user does not have the specified permission for the given agency', () => {
            const mockRoles = getRole('Mock Agency', 'a_role');
            const session = getSession(false, [mockRoles]);
            const anotherRole = permissionsHelper.checkAffiliations(session, 'another_role', 'Mock Agency');
            const anotherAgency = permissionsHelper.checkAffiliations(session, 'role', 'Another Agency');
            expect(anotherRole).toBeFalsy();
            expect(anotherAgency).toBeFalsy();
        });
    });
    describe('checkSubmitterAffiliations', () => {
        it('should return true when the current user is an admin', () => {
            const seesSettings = permissionsHelper.checkSubmitterAffiliations(getSession(true, []));
            expect(seesSettings).toEqual(true);
        });
        it('should return true when the current user has a submitter role', () => {
            const submitterRole = getSession(false, [getRole('test', 'submitter')]);
            const seesSettings = permissionsHelper.checkSubmitterAffiliations(submitterRole);
            expect(seesSettings).toEqual(true);
        });
        it('should return false when the current user does not have a submitter role', () => {
            const nonSubmitterRole = getSession(false, [getRole('test', 'fabs'), getRole('test', 'writer')]);
            const seesSettings = permissionsHelper.checkSubmitterAffiliations(nonSubmitterRole);
            expect(seesSettings).toEqual(false);
        });
    });
});
