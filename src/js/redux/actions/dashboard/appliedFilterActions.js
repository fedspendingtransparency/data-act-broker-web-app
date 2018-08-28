/**
 * appliedFilterActions.js
 * Created by Lizzie Salita 8/14/18
 */

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
