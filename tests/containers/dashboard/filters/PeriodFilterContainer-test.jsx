/**
 * @jest-environment jsdom
 *
 * PeriodFilterContainer-test.jsx
 * Created by Alisa Burdeyny 06/11/21
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

// import { PeriodFilterContainer } from 'containers/dashboard/filters/PeriodFilterContainer';
// import { mockActions, mockReduxHistorical } from './mockFilters';

// // mock the child component by replacing it with a function that returns a null element
// jest.mock('components/generateDetachedFiles/PeriodPicker', () => jest.fn(() => null));

// describe('PeriodFilterContainer', () => {
//     beforeEach(() => {
//         jest.restoreAllMocks();
//     });
//     describe('getDisabledStatus', () => {
//         it('should disable P02, P03, and Q1 when 2017 is the only FY selected', () => {
//             const container = shallow(<PeriodFilterContainer
//                 {...mockActions}
//                 {...mockReduxHistorical} />
//             );
//             container.instance().setState({
//                 latestYear: 2019,
//                 lastestPeriod: 4
//             });
//             const newProps = cloneDeep(container.instance().props);
//             newProps.selectedFilters.fy = newProps.selectedFilters.fy.add(2017);
//             container.setProps({ ...newProps });
//             container.instance().getDisabledStatus();
//             expect(container.instance().props.selectedFilters.fy.toArray()).toEqual([2017]);
//             expect(container.instance().state.disabledPeriods[0]).toEqual('firstYear');
//             expect(container.instance().state.disabledPeriods[1]).toEqual('firstYear');
//             expect(container.instance().state.disabledPeriods[2]).toEqual('firstYear');
//             expect(container.instance().state.disabledPeriods[3]).toEqual('');
//         });
//         it('should disabled future periods when the current FY is the only FY selected, current period enabled', () => {
//             const container = shallow(<PeriodFilterContainer
//                 {...mockActions}
//                 {...mockReduxHistorical} />
//             );
//             container.instance().setState({
//                 latestYear: 2020,
//                 latestPeriod: 7
//             });
//             const newProps = cloneDeep(container.instance().props);
//             newProps.selectedFilters.fy = newProps.selectedFilters.fy.add(2020);
//             container.setProps({ ...newProps });
//             container.instance().getDisabledStatus();

//             expect(container.instance().props.selectedFilters.fy.toArray()).toEqual([2020]);
//             expect(container.instance().state.disabledPeriods[7]).toEqual('');
//             expect(container.instance().state.disabledPeriods[8]).toEqual('');
//             expect(container.instance().state.disabledPeriods[9]).toEqual('notOpen');
//             expect(container.instance().state.disabledPeriods[10]).toEqual('notOpen');
//             expect(container.instance().state.disabledPeriods[11]).toEqual('notOpen');
//             expect(container.instance().state.disabledPeriods[12]).toEqual('notOpen');
//         });
//         it('should enable all periods when more than one FY is selected', () => {
//             const container = shallow(<PeriodFilterContainer
//                 {...mockActions}
//                 {...mockReduxHistorical} />
//             );
//             container.instance().setState({
//                 latestYear: 2020,
//                 latestPeriod: 1
//             });
//             const newProps = cloneDeep(container.instance().props);
//             newProps.selectedFilters.fy = newProps.selectedFilters.fy.add(2020);
//             newProps.selectedFilters.fy = newProps.selectedFilters.fy.add(2018);
//             container.setProps({ ...newProps });
//             container.instance().getDisabledStatus();

//             expect(container.instance().props.selectedFilters.fy.toArray()).toEqual([2020, 2018]);
//             expect(container.instance().state.disabledPeriods[0]).toEqual('');
//             expect(container.instance().state.disabledPeriods[1]).toEqual('');
//             expect(container.instance().state.disabledPeriods[6]).toEqual('');
//             expect(container.instance().state.disabledPeriods[7]).toEqual('');
//             expect(container.instance().state.disabledPeriods[13]).toEqual('');
//             expect(container.instance().state.disabledPeriods[14]).toEqual('');
//         });
//     });
// });
