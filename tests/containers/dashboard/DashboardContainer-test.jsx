/**
 * DashboardContainer-test.jsx
 * Created by Lizzie Salita 10/29/18
 */

import React, { PropTypes } from 'react';
import { shallow, mount } from 'enzyme';

// mock the submission list helper
jest.mock('helpers/submissionListHelper', () => require('./mockSubmissionListHelper'));

import { DashboardContainer } from 'containers/dashboard/DashboardContainer';
import { mockActions, mockRedux } from './mockData';

// mock the child component by replacing it with a function that returns a null element
jest.mock('components/dashboard/DashboardContent', () => jest.fn(() => null));

describe('DashboardContainer', () => {
    it('should update the state when the type changes', () => {
        const container = shallow(<DashboardContainer
            {...mockRedux}
            {...mockActions} />);

        // Change the type
        container.setProps({
            type: 'fabs'
        });

        expect(container.state().type).toEqual('fabs');
    });
    it('should reset the applied filters for the current type on unmount', () => {
        const container = shallow(<DashboardContainer
            {...mockRedux}
            {...mockActions} />);

        container.instance().componentWillUnmount();

        expect(mockActions.resetAppliedFilters).toHaveBeenCalledWith({
            dashboard: 'dabs'
        });
    });
    it('should reset the staged filters for the given type on unmount', () => {
        const container = shallow(<DashboardContainer
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