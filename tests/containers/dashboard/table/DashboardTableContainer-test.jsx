/**
 * DashboardTableContainer-test.jsx
 * Created by Alisa Burdeyny 11/18/19
 */

import React from 'react';
import { shallow } from 'enzyme';
import { cloneDeep } from 'lodash';

import { DashboardTableContainer } from 'containers/dashboard/table/DashboardTableContainer';
import { mockRedux } from './mockData';

// mock the child component by replacing it with a function that returns a null element
jest.mock('components/dashboard/table/DashboardTable', () => jest.fn(() => null));

describe('DashboardTableContainer', () => {
    beforeEach(() => {
        jest.restoreAllMocks();
    });
    it('should update the component on mount', () => {
        const container = shallow(<DashboardTableContainer 
            { ...mockRedux } />);

        const updateTable = jest.fn();
        container.instance().updateTable = updateTable;
        container.instance().componentDidMount();

        expect(updateTable).toHaveBeenCalled();
    });
    it('should update the component when the props change', () => {
        const container = shallow(<DashboardTableContainer 
            { ...mockRedux } />);

        const updateTable = jest.fn();
        container.instance().updateTable = updateTable;
        const newRedux = cloneDeep(mockRedux);
        newRedux.appliedFilters.filters.file = "C";

        container.instance().componentDidUpdate(newRedux);

        expect(updateTable).toHaveBeenCalled();
    });
    it('should update the component when the page changes', () => {
        const container = shallow(<DashboardTableContainer 
            { ...mockRedux } />);

        const updateTable = jest.fn();
        container.instance().updateTable = updateTable;

        container.instance().changePage(2);

        expect(updateTable).toHaveBeenCalled();
    });
    it('should update the component and set the page to 1 when the limit changes', () => {
        const container = shallow(<DashboardTableContainer 
            { ...mockRedux } />);
        container.state().page = 2;

        const updateTable = jest.fn();
        container.instance().updateTable = updateTable;

        container.instance().changeLimit(2);

        expect(container.state().page).toEqual(1);
        expect(updateTable).toHaveBeenCalled();
    });
});
