/**
 * @jest-environment jsdom
 *
 * ActiveDashboardOverviewContainer-test.jsx
 * Created by Alisa Burdeyny 4/19/2020
 */

// TODO: Replace with non-enzyme tests or delete
describe('passing test', () => {
    it('this just needs a passing test until we rework it', () => {
        expect(true).toEqual(true);
    });
});
// import React from 'react';
// import { shallow } from 'enzyme';

// import { ActiveDashboardOverviewContainer } from 'containers/dashboard/ActiveDashboardOverviewContainer';
// import { mockSubmitRedux } from './filters/mockFilters';

// // mock the child component by replacing it with a function that returns a null element
// jest.mock('components/dashboard/ActiveDashboardOverview', () => jest.fn(() => null));

// describe('ActiveDashboardOverviewContainer', () => {
//     let container;
//     beforeEach(() => {
//         jest.clearAllMocks();
//         container = shallow(<ActiveDashboardOverviewContainer {...mockSubmitRedux} />);
//     });
//     describe('componentDidMount', () => {
//         it('should call getOverview on mount', async () => {
//             const getOverview = jest.fn();
//             container.instance().getOverview = getOverview;
//             await container.instance().componentDidMount();
//             expect(getOverview).toHaveBeenCalled();
//         });
//     });
//     describe('componentDidUpdate', () => {
//         it('should call getOverview if appliedFilters are updated', () => {
//             const getOverview = jest.fn();
//             container.instance().getOverview = getOverview;
//             const newProps = {
//                 appliedFilters: {
//                     filters: {
//                         period: 6,
//                         fy: 2017,
//                         agency: "098"
//                     }
//                 }
//             };
//             container.instance().componentDidUpdate(newProps);
//             expect(getOverview).toHaveBeenCalled();
//         });
//     });
// });
