/**
 * appliedFilterActions.js
 * Created by Lizzie Salita 10/02/19
 */

export const setAppliedFilterEmptiness = (empty) => ({
    empty,
    type: 'SET_APPLIED_FILTER_EMPTINESS'
});

export const applyStagedFilters = (filters) => ({
    filters,
    type: 'APPLY_STAGED_FILTERS'
});

export const resetAppliedFilters = () => ({
    type: 'CLEAR_APPLIED_FILTERS'
});
