/**
 * DashboardAgencyFilterContainer-test.jsx
 * Created by Alisa Burdeyny 11/18/19
 */

import React from 'react';
import { shallow } from 'enzyme';

import { DashboardTableContainer } from 'containers/dashboard/visualizations/DashboardTableContainer';
import { mockRedux } from './mockData';

// mock the child component by replacing it with a function that returns a null element
jest.mock('components/dashboard/visualizations/DashboardTable', () => jest.fn(() => null));

describe('DashboardTableContainer', () => {
    beforeEach(() => {
        jest.restoreAllMocks();
    });
    it('should update the component on mount', () => {
        const updateTable = jest.fn();
        const container = shallow(<DashboardTableContainer 
            { ...mockRedux } />);

        container.instance().updateTable = updateTable;
        container.instance().componentDidMount();

        expect(updateTable).toHaveBeenCalled();
    });
    it('should update the component when the props change', () => {
        const updateTable = jest.fn();

        const container = shallow(<DashboardTableContainer 
            { ...mockRedux } />);

        container.instance().updateTable = updateTable;
        const newRedux = {
            appliedFilters: {
                filters: {...mockRedux.appliedFilters.filters },
                empty_: true 
            }
        };
        newRedux.appliedFilters.filters.file = "C";

        container.instance().componentDidUpdate(newRedux);

        expect(updateTable).toHaveBeenCalled();
    });
    it('should update the component when the page changes', () => {
        const updateTable = jest.fn();

        const container = shallow(<DashboardTableContainer 
            { ...mockRedux } />);

        container.instance().updateTable = updateTable;

        container.instance().changePage(2);

        expect(updateTable).toHaveBeenCalled();
    });
    it('should update the component and set the page to 1 when the limit changes', () => {
        const updateTable = jest.fn();

        const container = shallow(<DashboardTableContainer 
            { ...mockRedux } />);
        container.state().page = 2;

        container.instance().updateTable = updateTable;

        container.instance().changeLimit(2);

        expect(container.state().page).toEqual(1);
        expect(updateTable).toHaveBeenCalled();
    });
});
