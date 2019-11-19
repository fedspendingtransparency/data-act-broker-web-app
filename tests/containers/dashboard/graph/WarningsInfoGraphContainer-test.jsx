/**
 * WarningsInfoGraphContainer-test.jsx
 * Created by Lizzie Salita 11/19/19
 */

import React from 'react';
import { shallow } from 'enzyme';
import { cloneDeep } from 'lodash';

import { WarningsInfoGraphContainer } from 'containers/dashboard/graph/WarningsInfoGraphContainer';
import { mockRedux } from './mockData';

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
    it('make an API call when the applied filters change', () => {
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
});
