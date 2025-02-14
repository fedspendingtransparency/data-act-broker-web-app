/**
 * @jest-environment jsdom
 *
 * loginHelper-test.js
 * Created by Lizzie Salita 1/10/20
 */

import { getRedirectPath, getPath } from 'helpers/loginHelper';

describe('getRedirectPath', () => {
    it('should return the redirect location if one exists', () => {
        const mockLoaction = {
            search: '?redirect=/mockpage'
        };
        const redirectPath = getRedirectPath(mockLoaction);
        expect(redirectPath).toEqual('/mockpage');
    });
    it('should return null if there is no redirect location', () => {
        const mockLoaction = {
            search: ''
        };
        const redirectPath = getRedirectPath(mockLoaction);
        expect(redirectPath).toBeFalsy();
    });
});

describe('getPath', () => {
    it('should send an authorized user to their redirect path', () => {
        const mockLoaction = {
            pathname: '/login?redirect=/mockpage',
            search: '?redirect=/mockpage'
        };
        const path = getPath(mockLoaction, true);
        expect(path).toEqual('/mockpage');
    });
    it('should send an authorized user to the default url if there is no redirect', () => {
        const mockLoaction = {
            pathname: '/login',
            search: ''
        };
        const path = getPath(mockLoaction, true);
        expect(path).toEqual('/');
    });
    it('should send an unauthorized user to the login page', () => {
        const mockLoaction = {
            pathname: '/login',
            search: ''
        };
        const path = getPath(mockLoaction, false);
        expect(path).toEqual('/login');
    });
    it('should send an unauthorized user to the login page with their redirect path', () => {
        const mockLoaction = {
            pathname: '/mockpage',
            search: ''
        };
        const path = getPath(mockLoaction, false);
        expect(path).toEqual('/login?redirect=/mockpage');
    });
});
