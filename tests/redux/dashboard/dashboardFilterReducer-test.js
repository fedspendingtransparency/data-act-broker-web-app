/**
 * dashboardFilterReducer-test.js
 * Created by Lizzie Salita 10/29/18
 */

import { dashboardFilterReducer, initialState } from 'redux/reducers/dashboard/dashboardFilterReducer';

describe('dashboardFilterReducer', () => {
    describe('UPDATE_DASHBOARD_FILTER', () => {
        it('should update the filter for the given type and table to the provided value', () => {
            let state = dashboardFilterReducer(undefined, {});

            const action = {
                type: 'UPDATE_DASHBOARD_FILTER',
                dashboard: 'dabs',
                table: 'active',
                filter: 'lastDateModified',
                value: {
                    startDate: "1999-01-02",
                    endDate: "1999-03-04"
                }
            };

            state = dashboardFilterReducer(state, action);

            expect(state.dabs.active.lastDateModified.startDate).toEqual("1999-01-02");
            expect(state.dabs.active.lastDateModified.endDate).toEqual("1999-03-04");
        });
    });
    describe('TOGGLE_DASHBOARD_FILTER', () => {
        it('should add a value to the specified list of filters if it was not already included', () => {
            let state = dashboardFilterReducer(undefined, {});

            const action = {
                type: 'TOGGLE_DASHBOARD_FILTER',
                dashboard: 'dabs',
                table: 'active',
                filter: 'createdBy',
                value: {
                    name: 'User',
                    userId: '1'
                }
            };

            state = dashboardFilterReducer(state, action);

            expect(state.dabs.active.createdBy).toEqual([{
                name: 'User',
                userId: '1'
            }]);
        });
        it('should remove a value from the specified list of filters if it was already included', () => {
            let state = dashboardFilterReducer(undefined, {});

            // Add the value '1'
            const action1 = {
                type: 'TOGGLE_DASHBOARD_FILTER',
                dashboard: 'dabs',
                table: 'active',
                filter: 'submissionIds',
                value: '1'
            };

            state = dashboardFilterReducer(state, action1);

            expect(state.dabs.active.submissionIds).toEqual(['1']);

            // Add the value '2'
            const action2 = {
                type: 'TOGGLE_DASHBOARD_FILTER',
                dashboard: 'dabs',
                table: 'active',
                filter: 'submissionIds',
                value: '2'
            };

            state = dashboardFilterReducer(state, action2);

            expect(state.dabs.active.submissionIds).toEqual(['1', '2']);

            // Remove the value '1'
            const action3 = {
                type: 'TOGGLE_DASHBOARD_FILTER',
                dashboard: 'dabs',
                table: 'active',
                filter: 'submissionIds',
                value: '1'
            };

            state = dashboardFilterReducer(state, action3);

            expect(state.dabs.active.submissionIds).toEqual(['2']);
        });
    });
    describe('RESET_DASHBOARD_FILTERS', () => {
        it('should reset the dashboard filters to their initial state', () => {
            let state = dashboardFilterReducer(undefined, {
                dabs: {
                    active: {
                        agencies: [],
                        fileNames: ['test_file.csv'],
                        submissionIds: ['1', '2'],
                        createdBy: ['1', '2'],
                        lastDateModified: {
                            startDate: '',
                            endDate: ''
                        }
                    },
                    certified: initialState.dabs.certified
                },
                fabs: initialState.fabs
            });

            // Reset the filters
            const resetAction = {
                type: 'RESET_DASHBOARD_FILTERS'
            };

            state = dashboardFilterReducer(state, resetAction);

            expect(state).toEqual(initialState);
        });
    });
});
