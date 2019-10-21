/**
 * FyFilterContainer-test.jsx
 * Created by Lizzie Salita 10/18/19
 */

import React from 'react';
import { shallow } from 'enzyme';

import { FyFilterContainer } from 'containers/dashboard/filters/FyFilterContainer';
import { mockActions, mockRedux } from './mockFilters';

// mock the child component by replacing it with a function that returns a null element
jest.mock('components/dashboard/filters/FiscalYearFilter', () => jest.fn(() => null));

describe('FyFilterContainer', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });
    it('should make an API call for the latest quarter on mount', async () => {
        const container = shallow(<FyFilterContainer
            {...mockActions}
            {...mockRedux} />
        );
        const getLatestQuarter = jest.fn();
        container.instance().getLatestQuarter = getLatestQuarter;
        container.instance().componentDidMount();
        expect(getLatestQuarter).toHaveBeenCalled();
    });
    it('should call generateAllFy when the selected quarters change', () => {
        const container = shallow(<FyFilterContainer
            {...mockActions}
            {...mockRedux} />
        );
        const generateAllFy = jest.fn();
        container.instance().generateAllFy = generateAllFy;

        container.instance().componentDidUpdate({ selectedFilters: { quarters: [2, 3] } });

        expect(generateAllFy).toHaveBeenCalled();
    });
    describe('pickedFy', () => {
        it('should call the updateGenericFilter action', () => {
            const container = shallow(<FyFilterContainer
                {...mockActions}
                {...mockRedux} />
            );

            container.instance().pickedFy(2018);

            expect(mockActions.updateGenericFilter).toHaveBeenCalledWith('fy', 2018);
        });
    });
    describe('generateAllFy', () => {
        it('should disable 2017 when Q1 is the only quarter selected', () => {
            const container = shallow(<FyFilterContainer
                {...mockActions}
                {...mockRedux} />
            );
            container.instance().setState({
                latestYear: 2019,
                latestQuarter: 4,
                allFy: []
            });
            const newProps = { ...container.instance().props };
            newProps.selectedFilters.quarters = newProps.selectedFilters.quarters.add(1);
            container.setProps({ ...newProps });
            container.instance().generateAllFy();
            // Check element at index 2 for 2017
            expect(container.instance().state.allFy[2].disabled).toBeTruthy();
        });
        it('should disable the current FY when every quarter selected is in the future', () => {
            const container = shallow(<FyFilterContainer
                {...mockActions}
                {...mockRedux} />
            );
            container.instance().setState({
                latestYear: 2020,
                latestQuarter: 1,
                allFy: []
            });
            const newProps = { ...container.instance().props };
            const quarters = newProps.selectedFilters.quarters.delete(1);
            newProps.selectedFilters.quarters = quarters.add(4);
            container.setProps({ ...newProps });
            container.instance().generateAllFy();
            // Check element at index 0 for 2020
            expect(container.instance().state.allFy[0].disabled).toBeTruthy();
        });
    });
});
