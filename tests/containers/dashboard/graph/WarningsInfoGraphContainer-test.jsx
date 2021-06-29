/**
 * WarningsInfoGraphContainer-test.jsx
 * Created by Lizzie Salita 11/19/19
 */

import React from 'react';
import { shallow } from 'enzyme';
import { cloneDeep } from 'lodash';

import WarningsInfoGraphContainer from 'containers/dashboard/graph/WarningsInfoGraphContainer';
import { mockRedux, mockData } from './mockData';

// mock the child component by replacing it with a function that returns a null element
jest.mock('components/dashboard/graph/DashboardGraph', () => jest.fn(() => null));

describe('WarningsInfoGraphContainer', () => {
    beforeEach(() => {
        jest.restoreAllMocks();
    });
    it('should make an API call on mount', () => {
        const container = shallow(<WarningsInfoGraphContainer
            {...mockRedux} />
        );

        const fetchData = jest.fn();
        container.instance().fetchData = fetchData;

        container.instance().componentDidMount();

        expect(fetchData).toHaveBeenCalled();
    });
    it('should make an API call when the applied filters change', () => {
        const container = shallow(<WarningsInfoGraphContainer
            {...mockRedux} />
        );
        const newRedux = cloneDeep(mockRedux);
        newRedux.appliedFilters.file = 'B';

        const fetchData = jest.fn();
        container.instance().fetchData = fetchData;

        container.instance().componentDidUpdate(newRedux);
        expect(fetchData).toHaveBeenCalled();
    });
    describe('generateLegend', () => {
        it('should return an array representing the legend', () => {
            const container = shallow(<WarningsInfoGraphContainer
                {...mockRedux} />
            );
            const ySeries = [
                [{
                    instances: 1234,
                    percent_total: 42,
                    label: "C23"
                }, {
                    label: "C12"
                }, {
                    label: "C11"
                }]
            ];
            const mockLegend = container.instance().generateLegend(ySeries);
            expect(Object.keys(mockLegend[0])).toEqual(['color', 'label', 'offset']);
        });
        it('should handle multiple submissions and remove duplicate rules', () => {
            const container = shallow(<WarningsInfoGraphContainer
                {...mockRedux} />
            );
            const yData = [
                [{
                    label: "C23"
                }, {
                    label: "C12"
                }],
                [{
                    label: "C23"
                }, {
                    label: "C12"
                }, {
                    label: "C11"
                }]
            ];
            const mockLegend = container.instance().generateLegend(yData);
            expect(mockLegend.length).toEqual(3);
        });
    });
    describe('parseData', () => {
        it('should call generateLegend', () => {
            const container = shallow(<WarningsInfoGraphContainer
                {...mockRedux} />
            );
            const generateLegend = jest.fn();
            container.instance().generateLegend = generateLegend;

            // set the file to match the one in mock data
            const newProps = cloneDeep(mockRedux);
            newProps.appliedFilters.file = 'cross-CD1';
            container.setProps({ ...newProps });

            container.instance().parseData(mockData);
            expect(generateLegend).toHaveBeenCalled();
        });
        it('should parse the x-axis labels (in chronologic order)', () => {
            const container = shallow(<WarningsInfoGraphContainer
                {...mockRedux} />
            );
            const generateLegend = jest.fn();
            container.instance().generateLegend = generateLegend;

            // set the file to match the one in mock data
            const newProps = cloneDeep(mockRedux);
            newProps.appliedFilters.file = 'cross-CD1';
            container.setProps({ ...newProps });

            container.instance().parseData(mockData);
            expect(container.instance().state.xSeries).toEqual(['FY 98 / P09', 'FY 99 / Q2']);
        });
        it('should parse the warnings data (in chronologic order)', () => {
            const container = shallow(<WarningsInfoGraphContainer
                {...mockRedux} />
            );
            const generateLegend = jest.fn();
            container.instance().generateLegend = generateLegend;

            // set the file to match the one in mock data
            const newProps = cloneDeep(mockRedux);
            newProps.appliedFilters.file = 'cross-CD1';
            container.setProps({ ...newProps });

            container.instance().parseData(mockData);
            const expected = [
                {
                    'C23.2': {
                        percent: 50,
                        value: 400,
                        bottom: 0,
                        top: 400,
                        description: 'C23.2',
                        totalWarnings: 800,
                        shownWarnings: 800
                    },
                    C12: {
                        percent: 25,
                        value: 200,
                        bottom: 400,
                        top: 600,
                        description: 'C12',
                        totalWarnings: 800,
                        shownWarnings: 800
                    },
                    C11: {
                        percent: 25,
                        value: 200,
                        bottom: 600,
                        top: 800,
                        description: 'C11',
                        totalWarnings: 800,
                        shownWarnings: 800
                    }
                },
                {
                    'C23.1': {
                        percent: 50,
                        value: 500,
                        bottom: 0,
                        top: 500,
                        description: 'C23.1',
                        totalWarnings: 1000,
                        shownWarnings: 1000
                    },
                    C12: {
                        percent: 10,
                        value: 100,
                        bottom: 500,
                        top: 600,
                        description: 'C12',
                        totalWarnings: 1000,
                        shownWarnings: 1000
                    },
                    C11: {
                        percent: 40,
                        value: 400,
                        bottom: 600,
                        top: 1000,
                        description: 'C11',
                        totalWarnings: 1000,
                        shownWarnings: 1000
                    }
                }
            ];
            expect(container.instance().state.ySeries).toEqual(expected);
        });
        it('should store the total warnings data (in chronologic order)', () => {
            const container = shallow(<WarningsInfoGraphContainer
                {...mockRedux} />
            );
            const generateLegend = jest.fn();
            container.instance().generateLegend = generateLegend;

            // set the file to match the one in mock data
            const newProps = cloneDeep(mockRedux);
            newProps.appliedFilters.file = 'cross-CD1';
            container.setProps({ ...newProps });

            container.instance().parseData(mockData);
            expect(container.instance().state.allY).toEqual(
                {"shownWarnings": [800, 1000], "totalWarnings": [800, 1000]});
        });
    });
});
