/**
 * WarningsInfoGraphContainer-test.jsx
 * Created by Lizzie Salita 11/19/19
 */

import React from 'react';
import { shallow } from 'enzyme';
import { cloneDeep } from 'lodash';

import { WarningsInfoGraphContainer } from 'containers/dashboard/graph/WarningsInfoGraphContainer';
import { mockRedux, mockData } from './mockData';

// mock the child component by replacing it with a function that returns a null element
jest.mock('components/dashboard/graph/WarningsInfoGraph', () => jest.fn(() => null));

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
        it('should update the state with an array representing the legend, without duplicate rules', () => {
            const container = shallow(<WarningsInfoGraphContainer
                {...mockRedux} />
            );
            const newState = cloneDeep(container.instance().state);
            newState.ySeries = [
                [{
                    label: "C23"
                }, {
                    label: "C12"
                }, {
                    label: "C12"
                }]
            ];
            container.instance().setState(newState);
            container.instance().generateLegend();
            expect(container.instance().state.legend.length).toEqual(2);
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
    });
});
