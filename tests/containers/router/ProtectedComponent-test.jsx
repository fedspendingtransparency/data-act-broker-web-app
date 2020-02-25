/**
 * ProtectedComponent-test.jsx
 * Created by Lizzie Salita 1/22/20
 */

import React from 'react';
import { shallow } from 'enzyme';
import { cloneDeep } from 'lodash';

import { ProtectedComponent } from 'containers/router/ProtectedComponent';
import { mockProps } from './mockProps';
import { performLogout } from './mockLoginHelper';

jest.mock('helpers/loginHelper', () => require('./mockLoginHelper'));

describe('ProtectedComponent', () => {
    beforeEach(() => {
        jest.restoreAllMocks();
    });
    describe('componentDidUpdate', () => {
        it('should auto-login on update', () => {
            // session changed from "loggedOut" to "loggedIn"
            const container = shallow(<ProtectedComponent {...mockProps} />);

            const prevProps = cloneDeep(mockProps);
            prevProps.session.login = 'loggedOut';

            const performAutoLogin = jest.fn();
            const monitorSession = jest.fn();

            container.instance().performAutoLogin = performAutoLogin;
            container.instance().monitorSession = monitorSession;

            container.instance().componentDidUpdate(prevProps);

            expect(performAutoLogin).toHaveBeenCalled();
            expect(monitorSession).toHaveBeenCalled();
        });
        it('should logout on update', () => {
            // session changed from "loggedIn" to "loggedOut"
            const newProps = cloneDeep(mockProps);
            newProps.session.login = 'loggedOut';

            const container = shallow(<ProtectedComponent {...newProps} />);

            const logout = jest.fn();

            container.instance().logout = logout;

            container.instance().componentDidUpdate(mockProps);

            expect(logout).toHaveBeenCalled();
        });
    });
    describe('performAutoLogin', () => {
        it('should call the auth function and push the path to history', () => {
            const container = shallow(<ProtectedComponent {...mockProps} />);

            container.instance().performAutoLogin();

            expect(mockProps.authFn).toHaveBeenCalled();
            expect(mockProps.history.push).toHaveBeenCalledWith('/mockPath');
        });
    });
    describe('logout', () => {
        it('should call performLogout and redirect to the login page', async () => {
            const container = shallow(<ProtectedComponent {...mockProps} />);

            container.instance().logout();
            // Wait for the logout to resolve
            await performLogout();

            expect(mockProps.history.push).toHaveBeenLastCalledWith('/login');
        });
    });
});
