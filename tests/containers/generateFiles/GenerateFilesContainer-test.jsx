/**
 * GenerateFilesContainer-test.jsx
 * Created by Lizzie Salita 12/10/19
 */

import React from 'react';
import { shallow } from 'enzyme';
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
});
