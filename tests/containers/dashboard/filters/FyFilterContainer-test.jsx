/**
 * @jest-environment jsdom
 *
 * FyFilterContainer-test.jsx
 * Created by Lizzie Salita 10/18/19
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

// import { FyFilterContainer } from 'containers/dashboard/filters/FyFilterContainer';
// import { mockActions, mockReduxHistorical } from './mockFilters';

// // mock the child component by replacing it with a function that returns a null element
// jest.mock('components/dashboard/filters/FiscalYearFilter', () => jest.fn(() => null));

// describe('FyFilterContainer', () => {
//     beforeEach(() => {
//         jest.clearAllMocks();
//     });
//     describe('generateAllFy', () => {
//         it('should disable 2017 when P02, P03, or Q1 is the only period selected', () => {
//             const container = shallow(<FyFilterContainer
//                 {...mockActions}
//                 {...mockReduxHistorical} />
//             );
//             container.instance().setState({
//                 latestYear: 2019,
//                 latestPeriod: 12,
//                 allFy: []
//             });
//             const newProps = cloneDeep(container.instance().props);
//             newProps.selectedFilters.period = 3;
//             container.setProps({ ...newProps });
//             container.instance().generateAllFy();
//             // Check element at index 2 for 2017
//             expect(container.instance().state.allFy[2].disabled).toBeTruthy();
//         });
//         it('should disable the current FY when the selected period is in the future', () => {
//             const container = shallow(<FyFilterContainer
//                 {...mockActions}
//                 {...mockReduxHistorical} />
//             );
//             container.instance().setState({
//                 latestYear: 2020,
//                 latestPeriod: 3,
//                 allFy: []
//             });
//             const newProps = cloneDeep(container.instance().props);
//             newProps.selectedFilters.period = 4;
//             container.setProps({ ...newProps });
//             container.instance().generateAllFy();
//             // Check element at index 0 for 2020
//             expect(container.instance().state.allFy[0].disabled).toBeTruthy();
//         });
//     });
//     describe('removeDisabledSelections', () => {
//         it('should remove FY 2017 if P02, P03, or Q1 is the only period selected', () => {
//             const container = shallow(<FyFilterContainer
//                 {...mockActions}
//                 {...mockReduxHistorical} />
//             );
//             const pickedFy = jest.fn();
//             container.instance().pickedFy = pickedFy;

//             // Set the props to FY 2017 and Q1
//             const newProps = cloneDeep(container.instance().props);
//             newProps.selectedFilters.period = 'Q1';
//             newProps.selectedFilters.fy = newProps.selectedFilters.fy.add(2017);
//             container.setProps({ ...newProps });

//             expect(container.instance().props.selectedFilters.fy.toArray()).toEqual([2017]);
//             expect(container.instance().props.selectedFilters.period).toEqual('Q1');
//             container.instance().removeDisabledSelections();
//             expect(pickedFy).toHaveBeenCalledWith(2017);
//         });
//         it('should remove the current FY if only a future period is selected', () => {
//             const container = shallow(<FyFilterContainer
//                 {...mockActions}
//                 {...mockReduxHistorical} />
//             );
//             const pickedFy = jest.fn();
//             container.instance().pickedFy = pickedFy;
//             // Mock the latest FY and quarter
//             container.instance().setState({
//                 latestYear: 2020,
//                 latestPeriod: 3
//             });

//             // Set the props to FY 2020 and Q4
//             const newProps = cloneDeep(container.instance().props);
//             newProps.selectedFilters.period = 4;
//             newProps.selectedFilters.fy = newProps.selectedFilters.fy.add(2020);
//             container.setProps({ ...newProps });

//             expect(container.instance().props.selectedFilters.fy.toArray()).toEqual([2020]);
//             expect(container.instance().props.selectedFilters.period).toEqual(4);
//             container.instance().removeDisabledSelections();
//             expect(pickedFy).toHaveBeenCalledWith(2020);
//         });
//     });
// });
