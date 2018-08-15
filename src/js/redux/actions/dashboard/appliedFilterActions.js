/**
 * appliedFilterActions.js
 * Created by Lizzie Salita 8/14/18
 */

export const setAppliedFilterCompletion = (state) => ({
    type: 'SET_APPLIED_FILTER_COMPLETION',
    complete: state.complete,
    dashboard: state.dashboard,
    table: state.table
});

export const setAppliedFilterEmptiness = (state) => ({
    type: 'SET_APPLIED_FILTER_EMPTINESS',
    empty: state.empty,
    dashboard: state.dashboard,
    table: state.table
});

export const applyStagedFilters = (state) => ({
    type: 'APPLY_STAGED_FILTERS',
    filters: state.filters,
    dashboard: state.dashboard,
    table: state.table
});

export const resetAppliedFilters = (state) => ({
    type: 'CLEAR_APPLIED_FILTERS',
    dashboard: state.dashboard,
    table: state.table
});
