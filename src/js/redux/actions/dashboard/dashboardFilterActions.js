/**
  * dashboardFilterActions.js
  * Created by Lizzie Salita 10/02/19
  **/

export const updateGenericFilter = (state) => ({
    type: 'UPDATE_FILTER_SET',
    filterType: state.type,
    filterValue: state.value
});

export const updateFileFilter = (file) => ({
    type: 'UPDATE_FILE_FILTER',
    file
});

export const clearAllFilters = () => ({
    type: 'CLEAR_FILTER_ALL'
});
