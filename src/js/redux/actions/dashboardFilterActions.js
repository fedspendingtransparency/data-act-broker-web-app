/**
 * dashboardFilterActions.js
 * Created by Lizzie Salita 8/10/18
 **/

export const updateDashboardFilter = (state) => ({
    type: 'UPDATE_DASHBOARD_FILTER',
    filter: state.filter,
    value: state.value
});

export const resetDashboardFilters = (state) => ({
    type: 'RESET_DASHBOARD_FILTERS'
});
