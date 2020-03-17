/**
 * RevertToCertifiedContainer-test.jsx
 * Created by Lizzie Salita 3/17/20
 */

import React from 'react';
import { shallow } from 'enzyme';

import { RevertToCertifiedContainer } from 'containers/review/RevertToCertifiedContainer';
import { response } from './mockReviewHelper';

// mock the review helper
jest.mock('helpers/reviewHelper', () => require('./mockReviewHelper'));

// mock the child component by replacing it with a function that returns a null element
jest.mock('components/reviewData/RevertToCertified', () => jest.fn(() => null));

const mockSubmission = {
    id: '1234',
    publishStatus: 'updated'
};

describe('RevertToCertifiedContainer', () => {
    let container;
    beforeEach(() => {
        jest.clearAllMocks();
        container = shallow(<RevertToCertifiedContainer submission={mockSubmission} />);
    });
    describe('componentDidUpdate', () => {
        it('should call reset when the submission changes', () => {
            const reset = jest.fn();
            container.instance().reset = reset;
            container.instance().componentDidUpdate({
                submission: {
                    id: '5678',
                    publishStatus: 'published'
                }
            });
            expect(reset).toHaveBeenCalled();
        });
    });
    describe('revert', () => {
        it('should update the state with a status message', async () => {
            await container.instance().revert();
            expect(container.instance().state.message).toBeTruthy();
            expect(container.instance().state.message).toEqual(response.message);
        });
    });
});
