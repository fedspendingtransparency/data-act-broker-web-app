/**
  * dashboardFilterActions.js
  * Created by Lizzie Salita 10/02/19
  **/

export const updateFilterSet = (dashboardType, filterType, filterValue) => ({
    type: 'UPDATE_FILTER_SET',
    filterType,
    filterValue,
    dashboardType
});

export const clearFilter = (dashboardType, filterType) => ({
    type: 'CLEAR_FILTER',
    filterType,
    dashboardType
});

export const updateGenericFilter = (dashboardType, filterType, value) => ({
    type: 'UPDATE_GENERIC_FILTER',
    value,
    filterType,
    dashboardType
});

export const clearAllFilters = (dashboardType) => ({
    type: 'CLEAR_DASHBOARD_FILTERS',
    dashboardType
});
