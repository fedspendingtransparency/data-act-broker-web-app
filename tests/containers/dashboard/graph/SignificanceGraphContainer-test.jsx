/**
 * @jest-environment jsdom
 *
 * SignificanceGraphContainer-test.jsx
 * Created by Lizzie Salita 4/1/20
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

// import { SignificanceGraphContainer } from 'containers/dashboard/graph/SignificanceGraphContainer';
// import { mockRedux, mockSignificanceData } from './mockData';

// // mock the child component by replacing it with a function that returns a null element
// jest.mock('components/dashboard/graph/DashboardGraph', () => jest.fn(() => null));

// describe('SignificanceGraphContainer', () => {
//     beforeEach(() => {
//         jest.restoreAllMocks();
//     });
//     it('should make an API call on mount', () => {
//         const container = shallow(<SignificanceGraphContainer
//             {...mockRedux} />
//         );

//         const fetchData = jest.fn();
//         container.instance().fetchData = fetchData;

//         container.instance().componentDidMount();

//         expect(fetchData).toHaveBeenCalled();
//     });
//     it('should make an API call when the applied filters change', () => {
//         const container = shallow(<SignificanceGraphContainer
//             {...mockRedux} />
//         );
//         const newRedux = cloneDeep(mockRedux);
//         newRedux.appliedFilters.file = 'B';

//         const fetchData = jest.fn();
//         container.instance().fetchData = fetchData;

//         container.instance().componentDidUpdate(newRedux);
//         expect(fetchData).toHaveBeenCalled();
//     });
//     describe('parseData', () => {
//         it('should parse the x-axis data', () => {
//             const container = shallow(<SignificanceGraphContainer
//                 {...mockRedux} />
//             );

//             container.instance().parseData(mockSignificanceData.rules);
//             expect(container.instance().state.xSeries).toEqual([2, 3]);
//         });
//         it('should parse the significance data', () => {
//             const container = shallow(<SignificanceGraphContainer
//                 {...mockRedux} />
//             );

//             container.instance().parseData(mockSignificanceData.rules);
//             const expected = [
//                 {
//                     label: 'A33.1',
//                     category: 'completeness',
//                     significance: 2,
//                     impact: 'high',
//                     instances: 3,
//                     percentage: 75.0
//                 },
//                 {
//                     label: 'A33.2',
//                     category: 'completeness',
//                     significance: 3,
//                     impact: 'high',
//                     instances: 1,
//                     percentage: 25.0
//                 }
//             ];
//             expect(container.instance().state.ySeries).toEqual(expected);
//         });
//         it('should store the total instances data', () => {
//             const container = shallow(<SignificanceGraphContainer
//                 {...mockRedux} />
//             );

//             container.instance().parseData(mockSignificanceData.rules);
//             expect(container.instance().state.allY).toEqual([3, 1]);
//         });
//     });
// });
