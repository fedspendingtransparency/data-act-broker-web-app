/**
 * GenerateFilesContainer-test.jsx
 * Created by Lizzie Salita 12/10/19
 */

import React from 'react';
import { shallow } from 'enzyme';
import moment from 'moment';
import { cloneDeep } from 'lodash';
import { GenerateFilesContainer } from 'containers/generateFiles/GenerateFilesContainer';
import { mockProps, mockActions } from './mockProps';

// mock the submission list helper
jest.mock('helpers/generateFilesHelper', () => require('../generateDetachedFiles/mockGenerateFilesHelper'));
jest.mock('helpers/reviewHelper', () => require('./mockReviewHelper'));

// mock the child component by replacing it with a function that returns a null element
jest.mock('components/generateFiles/GenerateFilesContent', () => jest.fn(() => null));

describe('GenerateFilesContainer', () => {
    describe('componentDidMount', () => {
        it('should call setAgencyName', () => {
            const container = shallow(<GenerateFilesContainer {...mockProps} {...mockActions} />);
            const setAgencyName = jest.fn();
            container.instance().setAgencyName = setAgencyName;
            container.instance().componentDidMount();
            expect(setAgencyName).toHaveBeenCalled();
        });
        it('should call checkForPreviousFiles', () => {
            const container = shallow(<GenerateFilesContainer {...mockProps} {...mockActions} />);
            const checkForPreviousFiles = jest.fn();
            container.instance().checkForPreviousFiles = checkForPreviousFiles;
            container.instance().componentDidMount();
            expect(checkForPreviousFiles).toHaveBeenCalled();
        });
    });
    describe('componentDidUpdate', () => {
        it('should call setAgencyName when the submission id changes', () => {
            const container = shallow(<GenerateFilesContainer {...mockProps} {...mockActions} />);
            const setAgencyName = jest.fn();
            container.instance().setAgencyName = setAgencyName;
            container.instance().componentDidUpdate({ submissionID: '4321' });
            expect(setAgencyName).toHaveBeenCalled();
        });
    });
    describe('parseDate', () => {
        it('should convert quarters from the API into MM/DD/YYY', () => {
            const container = shallow(<GenerateFilesContainer {...mockProps} {...mockActions} />);
            const date = container.instance().parseDate('Q1/1999', 'start');
            expect(date).toEqual('10/01/1998');
        });
        it('should convert months from the API into date objects', () => {
            const container = shallow(<GenerateFilesContainer {...mockProps} {...mockActions} />);
            const date = container.instance().parseDate('03/1999', 'start');
            expect(date).toEqual('03/01/1999');
        });
        it('should handle end dates for quarters', () => {
            const container = shallow(<GenerateFilesContainer {...mockProps} {...mockActions} />);
            const date = container.instance().parseDate('Q2/1999', 'end');
            expect(date).toEqual('03/31/1999');
        });
        it('should handle end dates for months', () => {
            const container = shallow(<GenerateFilesContainer {...mockProps} {...mockActions} />);
            const date = container.instance().parseDate('03/1999', 'end');
            expect(date).toEqual('03/31/1999');
        });
    });
    describe('handleDateChange', () => {
        it('should update the state with the new date', () => {
            const container = shallow(<GenerateFilesContainer {...mockProps} {...mockActions} />);
            container.instance().handleDateChange('d1', 'Wed Feb 01 1999 12:00:00 GMT-0500 (Eastern Standard Time)', 'startDate');
            expect(container.state().d1.startDate).toEqual(moment('Wed Feb 01 1999 12:00:00 GMT-0500 (Eastern Standard Time)'));
        });
        it('should call validateDates', () => {
            const container = shallow(<GenerateFilesContainer {...mockProps} {...mockActions} />);
            const validateDates = jest.fn();
            container.instance().validateDates = validateDates;
            container.instance().handleDateChange('d1', 'Wed Feb 01 1999 12:00:00 GMT-0500 (Eastern Standard Time)', 'startDate');
            expect(validateDates).toHaveBeenCalled();
        });
    });
    describe('validateDats', () => {
        it('should validate that dates are provided for both fields and the end dates don\'t come before the start dates', () => {
            const container = shallow(<GenerateFilesContainer {...mockProps} {...mockActions} />);
            // Set the state to valid dates
            const newState = cloneDeep(container.state());
            newState.d1.startDate = moment('01/02/1993');
            newState.d1.endDate = moment('01/31/1993');
            newState.d2.startDate = moment('03/04/1995');
            newState.d2.endDate = moment('03/31/1995');
            container.setState({ ...newState });
            
            container.instance().validateDates();
            
            expect(container.state().state).toEqual('ready');
        });
    });
});
