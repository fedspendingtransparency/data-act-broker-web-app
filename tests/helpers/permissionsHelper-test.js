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
    });
});
