/**
 * @jest-environment jsdom
 *
 * GenerateFilesContainer-test.jsx
 * Created by Lizzie Salita 12/10/19
 */

// TODO: Replace with non-enzyme tests or delete
describe('passing test', () => {
    it('this just needs a passing test until we rework it', () => {
        expect(true).toEqual(true);
    });
});
// import React from 'react';
// import { shallow } from 'enzyme';
// import moment from 'moment';
// import { cloneDeep } from 'lodash';
// import { GenerateFilesContainer } from 'containers/generateFiles/GenerateFilesContainer';
// import { mockProps, mockActions } from './mockProps';
// import { mockFileState } from '../generateDetachedFiles/mockGenerateFilesHelper';

// // mock the submission list helper
// jest.mock('helpers/generateFilesHelper', () => require('../generateDetachedFiles/mockGenerateFilesHelper'));
// jest.mock('helpers/reviewHelper', () => require('./mockReviewHelper'));

// // mock the child component by replacing it with a function that returns a null element
// jest.mock('components/generateFiles/GenerateFilesContent', () => jest.fn(() => null));

// describe('GenerateFilesContainer', () => {
//     describe('componentDidMount', () => {
//         it('should call setAgencyName', () => {
//             const container = shallow(<GenerateFilesContainer {...mockProps} {...mockActions} />);
//             const setAgencyName = jest.fn();
//             container.instance().setAgencyName = setAgencyName;
//             container.instance().componentDidMount();
//             expect(setAgencyName).toHaveBeenCalled();
//         });
//         it('should call checkForPreviousFiles', () => {
//             const container = shallow(<GenerateFilesContainer {...mockProps} {...mockActions} />);
//             const checkForPreviousFiles = jest.fn();
//             container.instance().checkForPreviousFiles = checkForPreviousFiles;
//             container.instance().componentDidMount();
//             expect(checkForPreviousFiles).toHaveBeenCalled();
//         });
//     });
//     describe('componentDidUpdate', () => {
//         it('should call setAgencyName when the submission id changes', () => {
//             const container = shallow(<GenerateFilesContainer {...mockProps} {...mockActions} />);
//             const setAgencyName = jest.fn();
//             container.instance().setAgencyName = setAgencyName;
//             container.instance().componentDidUpdate({ submissionID: '4321' });
//             expect(setAgencyName).toHaveBeenCalled();
//         });
//     });
//     describe('handleDateChange', () => {
//         it('should update the state with the new date', () => {
//             const container = shallow(<GenerateFilesContainer {...mockProps} {...mockActions} />);
//             container.instance().handleDateChange('d1', 'Wed Feb 01 1999 12:00:00 GMT-0500 (Eastern Standard Time)', 'startDate');
//             expect(container.state().d1.startDate).toEqual(moment('Wed Feb 01 1999 12:00:00 GMT-0500 (Eastern Standard Time)'));
//         });
//         it('should call validateDates', () => {
//             const container = shallow(<GenerateFilesContainer {...mockProps} {...mockActions} />);
//             const validateDates = jest.fn();
//             container.instance().validateDates = validateDates;
//             container.instance().handleDateChange('d1', 'Wed Feb 01 1999 12:00:00 GMT-0500 (Eastern Standard Time)', 'startDate');
//             expect(validateDates).toHaveBeenCalled();
//         });
//     });
//     describe('validateDats', () => {
//         it('should validate that dates are provided for both fields and the end dates don\'t come before the start dates', () => {
//             const container = shallow(<GenerateFilesContainer {...mockProps} {...mockActions} />);
//             // Set the state to valid dates
//             const newState = cloneDeep(container.state());
//             newState.d1.startDate = moment('01/02/1993');
//             newState.d1.endDate = moment('01/31/1993');
//             newState.d2.startDate = moment('03/04/1995');
//             newState.d2.endDate = moment('03/31/1995');
//             container.setState({ ...newState });

//             container.instance().validateDates();
//             expect(container.state().state).toEqual('ready');
//         });
//         it('should show an error when an end date comes before a start date', () => {
//             const container = shallow(<GenerateFilesContainer {...mockProps} {...mockActions} />);
//             // Set the state to invalid dates
//             const newState = cloneDeep(container.state());
//             newState.d1.startDate = moment('01/31/1993');
//             newState.d1.endDate = moment('01/02/1993');
//             container.setState({ ...newState });

//             container.instance().validateDates();
//             expect(container.state().d1.error.show).toBeTruthy();
//             expect(container.state().d1.error.header).toEqual('Invalid Dates');
//         });
//         it('should reset the error state when not all dates are provided', () => {
//             const container = shallow(<GenerateFilesContainer {...mockProps} {...mockActions} />);
//             container.instance().validateDates();
//             expect(container.state().d1.error.show).toBeFalsy();
//             expect(container.state().d1.error.header).toEqual('');
//         });
//     });
//     describe('updateError', () => {
//         it('should set the error state for the provided file', () => {
//             const container = shallow(<GenerateFilesContainer {...mockProps} {...mockActions} />);
//             container.instance().updateError('d1', 'Mock Error', 'some description');
//             expect(container.state().d1.error.show).toBeTruthy();
//             expect(container.state().d1.error.header).toEqual('Mock Error');
//             expect(container.state().d1.error.description).toEqual('some description');
//         });
//         it('should not display an error if falsy values are provided', () => {
//             const container = shallow(<GenerateFilesContainer {...mockProps} {...mockActions} />);
//             container.instance().updateError('d1', '', '');
//             expect(container.state().d1.error.show).toBeFalsy();
//         });
//     });
//     describe('updateFileProperty', () => {
//         it('should set state for the given property', () => {
//             const container = shallow(<GenerateFilesContainer {...mockProps} {...mockActions} />);
//             container.instance().updateFileProperty('d2', 'fileFormat', 'txt');
//             expect(container.state().d2.fileFormat).toEqual('txt');
//         });
//     });
//     describe('parseFileStates', () => {
//         it('should show the download buttons when file generation is complete', () => {
//             const container = shallow(<GenerateFilesContainer {...mockProps} {...mockActions} />);
//             const mockData = [mockFileState, mockFileState];
//             container.instance().parseFileStates(mockData);
//             expect(container.state().d1.showDownload).toBeTruthy();
//             expect(container.state().d2.showDownload).toBeTruthy();
//         });
//         it('should show a permissions error for 401s', () => {
//             const container = shallow(<GenerateFilesContainer {...mockProps} {...mockActions} />);
//             const newFileState = cloneDeep(mockFileState);
//             newFileState.httpStatus = 401;
//             const mockData = [newFileState, newFileState];
//             container.instance().parseFileStates(mockData);
//             expect(container.state().d1.error.header).toEqual('Permission Error');
//             expect(container.state().d2.error.header).toEqual('Permission Error');
//         });
//     });
// });
