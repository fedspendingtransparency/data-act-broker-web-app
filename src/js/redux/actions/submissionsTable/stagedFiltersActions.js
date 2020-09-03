/**
 * stagedFiltersActions.js
 * Created by Lizzie Salita 8/10/18
 */

export const updateDashboardObjectFilter = (state) => ({
    type: 'UPDATE_DASHBOARD_OBJECT_FILTER',
    dashboard: state.dashboard,
    table: state.table,
    filter: state.filter,
    value: state.value
});

export const updateDashboardStringFilter = (state) => ({
    type: 'UPDATE_DASHBOARD_STRING_FILTER',
    dashboard: state.dashboard,
    table: state.table,
    filter: state.filter,
    value: state.value
});

export const toggleDashboardFilter = (state) => ({
    type: 'TOGGLE_DASHBOARD_FILTER',
    dashboard: state.dashboard,
    table: state.table,
    filter: state.filter,
    value: state.value
});

export const resetDashboardFilters = (state) => ({
    type: 'RESET_DASHBOARD_FILTERS',
    dashboard: state.dashboard,
    table: state.table
});
