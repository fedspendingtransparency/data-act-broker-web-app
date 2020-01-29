/**
 * ProtectedRoute-test.jsx
 * Created by Lizzie Salita 1/24/20
 */

import React from 'react';
import { mount } from 'enzyme';
import { cloneDeep } from 'lodash';
import { MemoryRouter } from 'react-router-dom';

import ProtectedRoute from 'containers/router/ProtectedRoute';
import { mockProps } from './mockProps';
import { getPath } from './mockLoginHelper2';

jest.mock('helpers/loginHelper', () => require('./mockLoginHelper2'));

describe('ProtectedRoute', () => {
    it('should fetch a redirect path if the user is not authorized', () => {
        const newProps = cloneDeep(mockProps);
        newProps.authFn = () => false;
        const container = mount(
            <MemoryRouter>
                <ProtectedRoute {...newProps} />
            </MemoryRouter>
        );
        expect(getPath).toHaveBeenCalled();
    });
});
