/**
 * @jest-environment jsdom
 *
 * ActiveDashboardContainer-test.jsx
 * Created by Lizzie Salita 3/19/20
 */

import React from 'react';
import { render, screen } from '@testing-library/react';
import { ActiveDashboardContainer } from 'containers/dashboard/ActiveDashboardContainer';
import { mockActiveRedux } from './filters/mockFilters';

// mock the child components by replacing them with functions that return a null element
jest.mock('components/dashboard/ActiveDashboard', () => jest.fn(() => null));
jest.mock('components/dashboard/NoResultsMessage', () => jest.fn(() => null));
jest.mock('components/dashboard/LoadingMessage', () => jest.fn(() => null));
jest.mock('components/dashboard/SelectSubmissionTable', () => jest.fn(() => null));


describe('ActiveDashboardContainer', () => {
    let container;
    beforeEach(() => {
        jest.clearAllMocks();
        container = render(<ActiveDashboardContainer {...mockActiveRedux} />);
    });
    describe('componentDidMount', () => {
        it('should call loadSubmissions on mount if filters are applied', () => {
            const loadSubmissions = jest.fn();
            container.instance().loadSubmissions = loadSubmissions;
            container.instance().componentDidMount();
            expect(loadSubmissions).toHaveBeenCalled();
        });
    });
    describe('componentDidUpdate', () => {
        it('should call loadSubmissions if appliedFilters are updated', () => {
            const loadSubmissions = jest.fn();
            container.instance().loadSubmissions = loadSubmissions;
            const prevProps = {
                appliedFilters: {
                    filters: {
                        active: {
                            agency: '789'
                        }
                    }
                }
            };
            container.instance().componentDidUpdate(prevProps);
            expect(loadSubmissions).toHaveBeenCalled();
        });
    });
    describe('setSubmission', () => {
        it('should update the submission id in state', () => {
            expect(container.instance().state.submission).toBeFalsy();
            container.instance().setSubmission('2345');
            expect(container.instance().state.submission).toEqual('2345');
        });
    });
    describe('changePage', () => {
        it('should update the page number in state and call loadSubmissions', () => {
            expect(container.instance().state.page).toEqual(1);
            const loadSubmissions = jest.fn();
            container.instance().loadSubmissions = loadSubmissions;
            container.instance().changePage(3);
            expect(container.instance().state.page).toEqual(3);
            expect(loadSubmissions).toHaveBeenCalled();
        });
    });
    describe('changeLimit', () => {
        it('should update the limit in state, call loadSubmissions, and reset to page 1', () => {
            container.instance().setState({
                page: 2
            });

            expect(container.instance().state.limit).toEqual(10);
            expect(container.instance().state.page).toEqual(2);

            const loadSubmissions = jest.fn();
            container.instance().loadSubmissions = loadSubmissions;

            container.instance().changeLimit(25);

            expect(container.instance().state.limit).toEqual(25);
            expect(loadSubmissions).toHaveBeenCalled();
            expect(container.instance().state.page).toEqual(1);
        });
    });
    describe('changeSort', () => {
        it('should update the sort order in state, call loadSubmissions, and reset to page 1', () => {
            container.instance().setState({
                page: 2
            });

            expect(container.instance().state.sort).toEqual('reporting_start');
            expect(container.instance().state.order).toEqual('desc');
            expect(container.instance().state.page).toEqual(2);

            const loadSubmissions = jest.fn();
            container.instance().loadSubmissions = loadSubmissions;

            container.instance().changeSort('mock_param', 'asc');

            expect(container.instance().state.sort).toEqual('mock_param');
            expect(container.instance().state.order).toEqual('asc');
            expect(loadSubmissions).toHaveBeenCalled();
            expect(container.instance().state.page).toEqual(1);
        });
    });
    describe('parseResults', () => {
        it('should set the submission if there is only one result', () => {
            const mockData = {
                total: 1,
                submissions: [
                    {
                        certification_deadline: '2001-08-14',
                        quarterly_submission: false,
                        submission_id: 1234,
                        time_period: '04 / 2001',
                        user: {
                            user_id: 1,
                            name: 'Mock User'
                        }
                    }
                ]
            };
            container.instance().parseResults(mockData);
            expect(container.instance().state.submission).toEqual('1234');
        });
        it('update the state based on the data', () => {
            const mockData = {
                total: 2,
                submissions: [
                    {
                        certification_deadline: '2001-08-14',
                        quarterly_submission: false,
                        submission_id: 1234,
                        time_period: '04 / 2001',
                        user: {
                            user_id: 1,
                            name: 'Mock User'
                        }
                    },
                    {
                        certification_deadline: '2001-08-14',
                        quarterly_submission: false,
                        submission_id: 5678,
                        time_period: '04 / 2001',
                        user: {
                            user_id: 1,
                            name: 'Mock User'
                        }
                    }
                ]
            };
            container.instance().parseResults(mockData);

            expect(container.instance().state.submission).toEqual('');
            expect(container.instance().state.loading).toBeFalsy();
            expect(container.instance().state.error).toBeFalsy();
            expect(container.instance().state.results.length).toEqual(2);
        });
    });
});
