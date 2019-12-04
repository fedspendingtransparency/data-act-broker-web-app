/**
 * DashboardSummaryContainer-test.jsx
 * Created by Daniel Boos 11/19/19
 */

import React from 'react';
import { shallow } from 'enzyme';

import { DashboardSummaryContainer } from 'containers/dashboard/DashboardSummaryContainer';
import { mockSubmitRedux } from './filters/mockFilters';

// mock the child component by replacing it with a function that returns a null element
jest.mock('components/dashboard/summary/DashboardSummaries', () => jest.fn(() => null));

describe('DashboardSummaryContainer', () => {
    let container;
    beforeEach(() => {
        jest.clearAllMocks();
        container = shallow(<DashboardSummaryContainer {...mockSubmitRedux} />);
    });
    describe('componentDidMount', () => {
        it('should call getSummary on mount', async () => {
            const getSummary = jest.fn();
            container.instance().getSummary = getSummary;
            await container.instance().componentDidMount();
            expect(getSummary).toHaveBeenCalled();
        });
    });
    describe('componentDidUpdate', () => {
        it('should call getSummary if appliedFilters are updated', () => {
            const getSummary = jest.fn();
            container.instance().getSummary = getSummary;
            const newProps = {
                appliedFilters: {
                    filters: {
                        quarters: [2],
                        fy: 2017,
                        agency: "098"
                    }
                }
            };
            container.instance().componentDidUpdate(newProps);
            expect(getSummary).toHaveBeenCalled();
        });
    });
});
