/**
 * PeriodFilterContainer-test.jsx
 * Created by Alisa Burdeyny 06/11/21
 */

import React from 'react';
import { shallow } from 'enzyme';
import { cloneDeep } from 'lodash';

import { PeriodFilterContainer } from 'containers/dashboard/filters/PeriodFilterContainer';
import { mockActions, mockReduxHistorical } from './mockFilters';

// mock the child component by replacing it with a function that returns a null element
jest.mock('components/generateDetachedFiles/PeriodPicker', () => jest.fn(() => null));

describe('PeriodFilterContainer', () => {
    beforeEach(() => {
        jest.restoreAllMocks();
    });
    it('should make an API call for the latest period on mount', async () => {
        const container = shallow(<PeriodFilterContainer
            {...mockActions}
            {...mockReduxHistorical} />
        );
        const getLatestPeriod = jest.fn();
        container.instance().getLatestPeriod = getLatestPeriod;
        container.instance().componentDidMount();
        expect(getLatestPeriod).toHaveBeenCalled();
    });
    it('should call getDisabledStatus when the selected FYs change', () => {
        const container = shallow(<PeriodFilterContainer
            {...mockActions}
            {...mockReduxHistorical} />
        );
        const getDisabledStatus = jest.fn();
        container.instance().getDisabledStatus = getDisabledStatus;

        container.instance().componentDidUpdate({ selectedFilters: { fy: [2018, 2019] } });

        expect(getDisabledStatus).toHaveBeenCalled();
    });
    describe('pickedPeriod', () => {
        it('should call the updateGenericFilter action', () => {
            const container = shallow(<PeriodFilterContainer
                {...mockActions}
                {...mockReduxHistorical} />
            );

            container.instance().pickedPeriod(4);

            expect(mockActions.updateGenericFilter).toHaveBeenCalledWith('historical', 'period', 4);
        });
    });
    describe('removePeriod', () => {
        it('should call the updateGenericFilter action', () => {
            const container = shallow(<PeriodFilterContainer
                {...mockActions}
                {...mockReduxHistorical} />
            );
            const newProps = cloneDeep(container.instance().props);
            newProps.selectedFilters.period = 5;
            container.setProps({ ...newProps });

            container.instance().removePeriod();

            expect(mockActions.updateGenericFilter).toHaveBeenCalledWith('historical', 'period', 5);
        });
    });
    describe('getDisabledStatus', () => {
        it('should disable P02, P03, and Q1 when 2017 is the only FY selected', () => {
            const container = shallow(<PeriodFilterContainer
                {...mockActions}
                {...mockReduxHistorical} />
            );
            container.instance().setState({
                latestYear: 2019,
                lastestPeriod: 4
            });
            const newProps = cloneDeep(container.instance().props);
            newProps.selectedFilters.fy = newProps.selectedFilters.fy.add(2017);
            container.setProps({ ...newProps });
            container.instance().getDisabledStatus();
            expect(container.instance().props.selectedFilters.fy.toArray()).toEqual([2017]);
            expect(container.instance().state.disabledPeriods[0]).toEqual('firstYear');
            expect(container.instance().state.disabledPeriods[1]).toEqual('firstYear');
            expect(container.instance().state.disabledPeriods[2]).toEqual('firstYear');
            expect(container.instance().state.disabledPeriods[3]).toEqual('');
        });
        it('should disabled future periods when the current FY is the only FY selected, current period enabled', () => {
            const container = shallow(<PeriodFilterContainer
                {...mockActions}
                {...mockReduxHistorical} />
            );
            container.instance().setState({
                latestYear: 2020,
                latestPeriod: 7
            });
            const newProps = cloneDeep(container.instance().props);
            newProps.selectedFilters.fy = newProps.selectedFilters.fy.add(2020);
            container.setProps({ ...newProps });
            container.instance().getDisabledStatus();

            expect(container.instance().props.selectedFilters.fy.toArray()).toEqual([2020]);
            expect(container.instance().state.disabledPeriods[7]).toEqual('');
            expect(container.instance().state.disabledPeriods[8]).toEqual('');
            expect(container.instance().state.disabledPeriods[9]).toEqual('notOpen');
            expect(container.instance().state.disabledPeriods[10]).toEqual('notOpen');
            expect(container.instance().state.disabledPeriods[11]).toEqual('notOpen');
            expect(container.instance().state.disabledPeriods[12]).toEqual('notOpen');
        });
        it('should enable all periods when more than one FY is selected', () => {
            const container = shallow(<PeriodFilterContainer
                {...mockActions}
                {...mockReduxHistorical} />
            );
            container.instance().setState({
                latestYear: 2020,
                latestPeriod: 1
            });
            const newProps = cloneDeep(container.instance().props);
            newProps.selectedFilters.fy = newProps.selectedFilters.fy.add(2020);
            newProps.selectedFilters.fy = newProps.selectedFilters.fy.add(2018);
            container.setProps({ ...newProps });
            container.instance().getDisabledStatus();

            expect(container.instance().props.selectedFilters.fy.toArray()).toEqual([2020, 2018]);
            expect(container.instance().state.disabledPeriods[0]).toEqual('');
            expect(container.instance().state.disabledPeriods[1]).toEqual('');
            expect(container.instance().state.disabledPeriods[6]).toEqual('');
            expect(container.instance().state.disabledPeriods[7]).toEqual('');
            expect(container.instance().state.disabledPeriods[13]).toEqual('');
            expect(container.instance().state.disabledPeriods[14]).toEqual('');
        });
    });
});
