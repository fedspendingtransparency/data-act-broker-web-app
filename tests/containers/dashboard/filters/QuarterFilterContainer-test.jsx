/**
 * QuarterFilterContainer-test.jsx
 * Created by Lizzie Salita 10/16/19
 */

import React from 'react';
import { shallow } from 'enzyme';

import { QuarterFilterContainer } from 'containers/dashboard/filters/QuarterFilterContainer';
import { mockActions, mockRedux } from './mockFilters';

// mock the child component by replacing it with a function that returns a null element
jest.mock('components/dashboard/filters/QuarterPicker', () => jest.fn(() => null));

describe('QuarterFilterContainer', () => {
    beforeEach(() => {
        jest.restoreAllMocks();
    });
    it('should make an API call for the latest quarter on mount', async () => {
        const container = shallow(<QuarterFilterContainer
            {...mockActions}
            {...mockRedux} />
        );
        const getLatestQuarter = jest.fn();
        container.instance().getLatestQuarter = getLatestQuarter;
        container.instance().componentDidMount();
        expect(getLatestQuarter).toHaveBeenCalled();
    });
    it('should call getDisabledStatus when the selected FYs change', () => {
        const container = shallow(<QuarterFilterContainer
            {...mockActions}
            {...mockRedux} />
        );
        const getDisabledStatus = jest.fn();
        container.instance().getDisabledStatus = getDisabledStatus;

        container.instance().componentDidUpdate({ selectedFilters: { fy: [2018, 2019] } });

        expect(getDisabledStatus).toHaveBeenCalled();
    });
    it('should call removeDisabledSelections when the selected FYs change', () => {
        const container = shallow(<QuarterFilterContainer
            {...mockActions}
            {...mockRedux} />
        );
        const removeDisabledSelections = jest.fn();
        container.instance().removeDisabledSelections = removeDisabledSelections;

        container.instance().componentDidUpdate({ selectedFilters: { fy: [2019, 2020] } });

        expect(removeDisabledSelections).toHaveBeenCalled();
    });
    describe('pickedQuarter', () => {
        it('should call the updateGenericFilter action', () => {
            const container = shallow(<QuarterFilterContainer
                {...mockActions}
                {...mockRedux} />
            );

            container.instance().pickedQuarter(4);

            expect(mockActions.updateGenericFilter).toHaveBeenCalledWith('quarters', 4);
        });
    });
    describe('getDisabledStatus', () => {
        it('should disable Q1 when 2017 is the only FY selected', () => {
            const container = shallow(<QuarterFilterContainer
                {...mockActions}
                {...mockRedux} />
            );
            container.instance().setState({
                latestYear: 2019,
                latestQuarter: 4
            });
            const newProps = { ...container.instance().props };
            newProps.selectedFilters.fy = newProps.selectedFilters.fy.add(2017);
            container.setProps({ ...newProps });
            container.instance().getDisabledStatus();
            expect(container.instance().props.selectedFilters.fy.toArray()).toEqual([2017]);
            expect(container.instance().state.disabledQuarters[0]).toBeTruthy();
        });
        it('should disabled future quarters when the current FY is the only FY selected', () => {
            const container = shallow(<QuarterFilterContainer
                {...mockActions}
                {...mockRedux} />
            );
            container.instance().setState({
                latestYear: 2020,
                latestQuarter: 1
            });
            const newProps = { ...container.instance().props };
            const fy = newProps.selectedFilters.fy.delete(2017);
            newProps.selectedFilters.fy = fy.add(2020);
            container.setProps({ ...newProps });
            container.instance().getDisabledStatus();

            expect(container.instance().props.selectedFilters.fy.toArray()).toEqual([2020]);
            expect(container.instance().state.disabledQuarters[0]).toBeFalsy();
            expect(container.instance().state.disabledQuarters[1]).toBeTruthy();
            expect(container.instance().state.disabledQuarters[2]).toBeTruthy();
            expect(container.instance().state.disabledQuarters[3]).toBeTruthy();
        });
        it('should enable all quarters when more than one FY is selected', () => {
            const container = shallow(<QuarterFilterContainer
                {...mockActions}
                {...mockRedux} />
            );
            container.instance().setState({
                latestYear: 2020,
                latestQuarter: 1
            });
            const newProps = { ...container.instance().props };
            newProps.selectedFilters.fy = newProps.selectedFilters.fy.add(2018);
            container.setProps({ ...newProps });
            container.instance().getDisabledStatus();

            expect(container.instance().props.selectedFilters.fy.toArray()).toEqual([2020, 2018]);
            expect(container.instance().state.disabledQuarters[0]).toBeFalsy();
            expect(container.instance().state.disabledQuarters[1]).toBeFalsy();
            expect(container.instance().state.disabledQuarters[2]).toBeFalsy();
            expect(container.instance().state.disabledQuarters[3]).toBeFalsy();
        });
    });
    describe('removeDisabledSelections', () => {
        it('should remove Q1 if FY 17 is the only year selected', () => {
            const container = shallow(<QuarterFilterContainer
                {...mockActions}
                {...mockRedux} />
            );
            const pickedQuarter = jest.fn();
            container.instance().pickedQuarter = pickedQuarter;
            
            // Set the props to FY 2017 and Q1
            const newProps = { ...container.instance().props };
            let fy = newProps.selectedFilters.fy.delete(2018);
            fy = fy.delete(2020);
            fy = fy.delete(2018);
            newProps.selectedFilters.fy = fy.add(2017);
            newProps.selectedFilters.quarters = newProps.selectedFilters.quarters.add(1);
            container.setProps({ ...newProps });

            expect(container.instance().props.selectedFilters.fy.toArray()).toEqual([2017]);
            expect(container.instance().props.selectedFilters.quarters.toArray()).toEqual([1]);
            container.instance().removeDisabledSelections();
            expect(pickedQuarter).toHaveBeenCalledWith(1);
        });
        it('should remove the current FY if only future quarters are selected', () => {
            const container = shallow(<QuarterFilterContainer
                {...mockActions}
                {...mockRedux} />
            );
            const pickedQuarter = jest.fn();
            container.instance().pickedQuarter = pickedQuarter;
            // Mock the latest FY and quarter
            container.instance().setState({
                latestYear: 2020,
                latestQuarter: 1
            });

            // Set the props to FY 2020 and Q4
            const newProps = { ...container.instance().props };
            const quarters = newProps.selectedFilters.quarters.delete(1);
            newProps.selectedFilters.quarters = quarters.add(4);
            const fy = newProps.selectedFilters.fy.delete(2017);
            newProps.selectedFilters.fy = fy.add(2020);
            container.setProps({ ...newProps });

            expect(container.instance().props.selectedFilters.fy.toArray()).toEqual([2020]);
            expect(container.instance().props.selectedFilters.quarters.toArray()).toEqual([4]);
            container.instance().removeDisabledSelections();
            expect(pickedQuarter).toHaveBeenCalledWith(4);
        });
    });
});
