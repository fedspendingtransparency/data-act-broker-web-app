/**
 * SubmissionsTableContainer-test.jsx
 * Created by Lizzie Salita 10/29/18
 */

import React from 'react';
import { shallow } from 'enzyme';

import { SubmissionsTableContainer } from 'containers/submissionsTable/SubmissionsTableContainer';
import { mockActions, mockRedux } from './mockData';

// mock the submission list helper
jest.mock('helpers/submissionListHelper', () => require('./mockSubmissionListHelper'));

// mock the child component by replacing it with a function that returns a null element
jest.mock('components/submissionsTable/SubmissionsTableContent', () => jest.fn(() => null));

describe('SubmissionsTableContainer', () => {
    it('should update the state when the type changes', () => {
        const container = shallow(<SubmissionsTableContainer
            {...mockRedux}
            {...mockActions} />);

        // Change the type
        container.setProps({
            type: 'fabs'
        });

        expect(container.state().type).toEqual('fabs');
    });
    it('should reset the applied filters for the current type on unmount', () => {
        const container = shallow(<SubmissionsTableContainer
            {...mockRedux}
            {...mockActions} />);

        container.instance().componentWillUnmount();

        expect(mockActions.resetAppliedFilters).toHaveBeenCalledWith({
            dashboard: 'dabs'
        });
    });
    it('should reset the staged filters for the given type on unmount', () => {
        const container = shallow(<SubmissionsTableContainer
            {...mockRedux}
            {...mockActions} />);

        // Change the type
        container.setProps({
            type: 'fabs'
        });

        container.instance().componentWillUnmount();

        expect(mockActions.resetDashboardFilters).toHaveBeenCalledWith({
            dashboard: 'fabs'
        });
    });
});