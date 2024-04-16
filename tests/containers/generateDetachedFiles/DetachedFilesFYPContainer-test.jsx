/**
 * DetachedFilesFYPContainer-test.jsx
 * Created by Lizzie Salita 10/29/18
 */

import React from 'react';
import { shallow } from 'enzyme';
import { DetachedFilesFYPContainer } from 'containers/generateDetachedFiles/DetachedFilesFYPContainer';

// mock the submission list helper
jest.mock('helpers/generateFilesHelper', () => require('./mockGenerateFilesHelper'));

// mock the child component by replacing it with a function that returns a null element
jest.mock('components/generateDetachedFiles/DetachedFilesFYP', () => jest.fn(() => null));

describe('DetachedFilesFYPContainer', () => {
    describe('parseFileState', () => {
        it('should set a permission error if the httpStatus is 401', () => {
            const container = shallow(<DetachedFilesFYPContainer />);

            container.instance().parseFileState({
                httpStatus: 401
            });

            expect(container.state().errorType).toEqual('Permission Error');
        });
        it('should set a File A error if the status is failed or invalid', () => {
            const container = shallow(<DetachedFilesFYPContainer />);

            container.instance().parseFileState({
                job_id: 1234,
                status: 'failed',
                file_type: 'A',
                url: '',
                size: null,
                start: '01/01/2016',
                end: '03/31/2016',
                message: ''
            });

            expect(container.state().errorType).toEqual('File A Error');
        });
        it('should set showDownload if the status is finished', () => {
            const container = shallow(<DetachedFilesFYPContainer />);

            container.instance().parseFileState({
                job_id: 1234,
                status: 'finished',
                file_type: 'A',
                url: 'http://mockurl.gov',
                size: null,
                start: '01/01/2016',
                end: '03/31/2016',
                message: ''
            });

            expect(container.state().showDownload).toEqual(true);
        });
        it('should call checkFileStatus after 10 seconds if status is waiting', () => {
            const container = shallow(<DetachedFilesFYPContainer />);

            const checkFileStatus = jest.fn();
            container.instance().checkFileStatus = checkFileStatus;

            container.instance().parseFileState({
                job_id: 1234,
                status: 'waiting',
                file_type: 'A',
                url: 'http://mockurl.gov',
                size: null,
                start: '01/01/2016',
                end: '03/31/2016',
                message: ''
            });

            window.setTimeout(() => {
                expect(checkFileStatus).toHaveBeenCalledWith(1234);
            }, 10000);
        });
    });
});
