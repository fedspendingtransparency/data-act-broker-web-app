/**
  * dashboardFilterActions.js
  * Created by Lizzie Salita 10/02/19
  **/

export const updateGenericFilter = (filterType, filterValue) => ({
    type: 'UPDATE_FILTER_SET',
    filterType,
    filterValue
});

export const updateFileFilter = (file) => ({
    type: 'UPDATE_FILE_FILTER',
    file
});

export const clearAllFilters = () => ({
    type: 'CLEAR_DASHBOARD_FILTERS'
});
