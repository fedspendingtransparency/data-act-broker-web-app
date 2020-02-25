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
    it('should call loadData on mount', () => {
        const container = shallow(<DashboardAgencyFilterContainer
            type="active"
            {...mockActions}
            {...mockRedux} />
        );

        const loadData = jest.fn();
        container.instance().loadData = loadData;

        container.instance().componentDidMount();

        expect(loadData).toHaveBeenCalled();
    });
    it('should call loadData when the dashboard type changes', () => {
        const container = shallow(<DashboardAgencyFilterContainer
            type="active"
            {...mockActions}
            {...mockRedux} />
        );

        const loadData = jest.fn();
        container.instance().loadData = loadData;

        container.instance().componentDidUpdate({ type: 'historical' });

        expect(loadData).toHaveBeenCalled();
    });
    describe('onSelect', () => {
        it('should call the updateAgencyFilter action', () => {
            const container = shallow(<DashboardAgencyFilterContainer
                type="active"
                {...mockActions}
                {...mockRedux} />
            );

            container.instance().onSelect('123');

            expect(mockActions.updateGenericFilter).toHaveBeenCalledWith('active', 'agency', '123');
        });
    });
});
