/**
 * @jest-environment jsdom
 *
 * ActiveDashboardTableContainer-test.jsx
 * Created by Alisa Burdeyny 04/01/20
 */

// TODO: Replace with non-enzyme tests or delete
describe('passing test', () => {
    it('this just needs a passing test until we rework it', () => {
        expect(true).toEqual(true);
    });
});
// import React from 'react';
// import { shallow } from 'enzyme';
// import { cloneDeep } from 'lodash';

// import { ActiveDashboardTableContainer } from 'containers/dashboard/table/ActiveDashboardTableContainer';
// import BaseActiveDashboardTableRow from 'models/dashboard/BaseActiveDashboardTableRow';
// import { mockRedux, activeMockData } from './mockData';

// // mock the child component by replacing it with a function that returns a null element
// jest.mock('components/dashboard/table/DashboardTable', () => jest.fn(() => null));

// describe('ActiveDashboardTableContainer', () => {
//     beforeEach(() => {
//         jest.restoreAllMocks();
//     });
//     it('should update the component on mount', () => {
//         const container = shallow(<ActiveDashboardTableContainer 
//             { ...mockRedux } />);

//         const updateTable = jest.fn();
//         container.instance().updateTable = updateTable;
//         container.instance().componentDidMount();

//         expect(updateTable).toHaveBeenCalled();
//     });
//     it('should update the component when the props change', () => {
//         const container = shallow(<ActiveDashboardTableContainer 
//             { ...mockRedux } />);

//         const updateTable = jest.fn();
//         container.instance().updateTable = updateTable;
//         const newRedux = cloneDeep(mockRedux);
//         newRedux.appliedFilters.filters.file = "C";

//         container.instance().componentDidUpdate(newRedux);

//         expect(updateTable).toHaveBeenCalled();
//     });
//     it('should update the component when the page changes', () => {
//         const container = shallow(<ActiveDashboardTableContainer 
//             { ...mockRedux } />);

//         const updateTable = jest.fn();
//         container.instance().updateTable = updateTable;

//         container.instance().changePage(2);

//         expect(updateTable).toHaveBeenCalled();
//     });
//     it('should update the component and set the page to 1 when the limit changes', () => {
//         const container = shallow(<ActiveDashboardTableContainer 
//             { ...mockRedux } />);
//         container.state().page = 2;

//         const updateTable = jest.fn();
//         container.instance().updateTable = updateTable;

//         container.instance().changeLimit(2);

//         expect(container.state().page).toEqual(1);
//         expect(updateTable).toHaveBeenCalled();
//     });
//     it('should update the component and set the new sort order when the sort changes', () => {
//         const container = shallow(<ActiveDashboardTableContainer 
//             { ...mockRedux } />);
//         container.state().page = 2;

//         const updateTable = jest.fn();
//         container.instance().updateTable = updateTable;

//         container.instance().changeSort('instances', 'asc');

//         expect(container.state().page).toEqual(2);
//         expect(container.state().sort).toEqual('instances');
//         expect(container.state().order).toEqual('asc');
//         expect(updateTable).toHaveBeenCalled();
//     });
//     it('should create objects and store them in the state when parseRows is called', () => {
//         const container = shallow(<ActiveDashboardTableContainer 
//             { ...mockRedux } />);
        
//         container.state().inFlight = true;
//         container.instance().parseRows(activeMockData);

//         expect(container.state().totalItems).toEqual(3);
//         expect(container.state().inFlight).toEqual(false);
//         expect(container.state().results.length).toEqual(2);
//         expect(Object.getPrototypeOf(container.state().results[0])).toEqual(BaseActiveDashboardTableRow);
//     });
// });
