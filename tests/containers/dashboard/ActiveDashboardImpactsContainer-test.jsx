/**
 * @jest-environment jsdom
 *
 * ActiveDashboardImpactsContainer-test.jsx
 * Created by Daniel Boos 4/2/2020
 */

// TODO: Replace with non-enzyme tests or delete
describe('passing test', () => {
    it('this just needs a passing test until we rework it', () => {
        expect(true).toEqual(true);
    });
});
// import React from 'react';
// import { shallow } from 'enzyme';

// import { ActiveDashboardImpactsContainer } from 'containers/dashboard/ActiveDashboardImpactsContainer';
// import { mockSubmitRedux } from './filters/mockFilters';

// // mock the child component by replacing it with a function that returns a null element
// jest.mock('components/dashboard/impacts/ActiveDashboardImpacts', () => jest.fn(() => null));

// describe('ActiveDashboardImpactsContainer', () => {
//     let container;
//     beforeEach(() => {
//         jest.clearAllMocks();
//         container = shallow(<ActiveDashboardImpactsContainer {...mockSubmitRedux} />);
//     });
//     describe('componentDidMount', () => {
//         it('should call getImpacts on mount', async () => {
//             const getImpacts = jest.fn();
//             container.instance().getImpacts = getImpacts;
//             await container.instance().componentDidMount();
//             expect(getImpacts).toHaveBeenCalled();
//         });
//     });
//     describe('componentDidUpdate', () => {
//         it('should call getImpacts if appliedFilters are updated', () => {
//             const getImpacts = jest.fn();
//             container.instance().getImpacts = getImpacts;
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
//             expect(getImpacts).toHaveBeenCalled();
//         });
//     });
// });
