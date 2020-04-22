/**
 * SettingsAgencySelectContainer-test.jsx
 * Created by Alisa Burdeyny 04/13/20
 */

import React from 'react';
import { shallow } from 'enzyme';

import SettingsAgencySelectContainer from 'containers/settings/SettingsAgencySelectContainer';
import { mockProps } from './mockProps';

// mock the child component by replacing it with a function that returns a null element
jest.mock('components/dashboard/filters/DashboardAgencyFilter', () => jest.fn(() => null));

describe('SettingsAgencySelectContainer', () => {
    beforeEach(() => {
        jest.restoreAllMocks();
    });
    it('should call loadData on mount', () => {
        const container = shallow(<SettingsAgencySelectContainer {...mockProps} />);

        const loadData = jest.fn();
        container.instance().loadData = loadData;

        container.instance().componentDidMount();

        expect(loadData).toHaveBeenCalled();
    });
    describe('onSelect', () => {
        it('should call the updateAgency function with agency code if selected agency is different', () => {
            const container = shallow(<SettingsAgencySelectContainer {...mockProps} />);

            container.instance().onSelect(`${mockProps.selectedAgency}56`);

            expect(mockProps.updateAgency).toHaveBeenCalledWith(`${mockProps.selectedAgency}56`);
        });
    });
    describe('onSelect', () => {
        it('should call the updateAgency function with empty string if selected agency is the same', () => {
            const container = shallow(<SettingsAgencySelectContainer {...mockProps} />);

            container.instance().onSelect(mockProps.selectedAgency);

            expect(mockProps.updateAgency).toHaveBeenCalledWith('');
        });
    });
});
