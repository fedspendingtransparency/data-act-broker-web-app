/**
 * dashboardFilterActions.js
 * Created by Lizzie Salita 8/10/18
 **/

export const updateDashboardFilter = (state) => ({
    type: 'UPDATE_DASHBOARD_FILTER',
    table: state.table,
    filter: state.filter,
    value: state.value
});

export const updateDashboardFilterList = (state) => ({
    type: 'UPDATE_DASHBOARD_FILTER_LIST',
    table: state.table,
    filter: state.filter,
    value: state.value
});

export const resetDashboardFilters = (state) => ({
    type: 'RESET_DASHBOARD_FILTERS',
    table: state.table,
});
