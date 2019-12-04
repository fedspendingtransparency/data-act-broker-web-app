/**
 * DashboardAgencyFilterContainer-test.jsx
 * Created by Alisa Burdeyny 11/12/19
 */

import React from 'react';
import { shallow } from 'enzyme';

import { DashboardAgencyFilterContainer } from 'containers/dashboard/filters/DashboardAgencyFilterContainer';
import { mockActions, mockRedux } from './mockFilters';

// mock the child component by replacing it with a function that returns a null element
jest.mock('components/dashboard/filters/DashboardAgencyFilter', () => jest.fn(() => null));

describe('DashboardAgencyFilterContainer', () => {
    beforeEach(() => {
        jest.restoreAllMocks();
    });
    describe('onSelect', () => {
        it('should call the updateAgencyFilter action', () => {
            const container = shallow(<DashboardAgencyFilterContainer
                {...mockActions}
                {...mockRedux} />
            );

            container.instance().onSelect('123');

            expect(mockActions.updateAgencyFilter).toHaveBeenCalledWith('123');
        });
    });
});
