/**
 * appliedFilterActions.js
 * Created by Lizzie Salita 10/02/19
 */

export const setAppliedFilterEmptiness = (dashboardType, empty) => ({
    dashboardType,
    empty,
    type: 'SET_APPLIED_FILTER_EMPTINESS'
});

export const applyStagedFilters = (dashboardType, filters) => ({
    dashboardType,
    filters,
    type: 'APPLY_STAGED_FILTERS'
});

export const resetAppliedFilters = (dashboardType) => ({
    dashboardType,
    type: 'CLEAR_APPLIED_FILTERS'
});
