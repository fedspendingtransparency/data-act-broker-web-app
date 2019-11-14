/**
  * dashboardFilterActions.js
  * Created by Lizzie Salita 10/02/19
  **/

export const updateGenericFilter = (filterType, filterValue) => ({
    type: 'UPDATE_FILTER_SET',
    filterType,
    filterValue
});

export const clearGenericFilter = (filterType) => ({
    type: 'CLEAR_FILTER_SET',
    filterType
});

export const updateFileFilter = (file) => ({
    type: 'UPDATE_FILE_FILTER',
    file
});

export const updateAgencyFilter = (agency) => ({
    type: 'UPDATE_AGENCY_FILTER',
    agency
});

export const clearAllFilters = () => ({
    type: 'CLEAR_DASHBOARD_FILTERS'
});
