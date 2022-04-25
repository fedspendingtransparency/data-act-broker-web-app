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

            container.instance().setState({ results: [
                {
                    cgac_code: `${mockProps.selectedAgency.code}`,
                    agency_name: mockProps.selectedAgency.name
                },
                {
                    cgac_code: `${mockProps.selectedAgency.code}56`,
                    agency_name: mockProps.selectedAgency.name
                }]
            });

            container.instance().onSelect(`${mockProps.selectedAgency.code}56`);

            expect(mockProps.updateAgency).toHaveBeenCalledWith({
                code: `${mockProps.selectedAgency.code}56`,
                name: mockProps.selectedAgency.name
            });
        });
    });
    describe('onSelect', () => {
        it('should call the updateAgency function with empty string if selected agency is the same', () => {
            const container = shallow(<SettingsAgencySelectContainer {...mockProps} />);

            container.instance().setState({ results: [
                {
                    cgac_code: `${mockProps.selectedAgency.code}`,
                    agency_name: mockProps.selectedAgency.name
                }
            ] });

            container.instance().onSelect(mockProps.selectedAgency.code);

            expect(mockProps.updateAgency).toHaveBeenCalledWith({ code: '', name: '' });
        });
    });
});
