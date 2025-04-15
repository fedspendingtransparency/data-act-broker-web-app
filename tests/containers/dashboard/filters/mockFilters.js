import { initialState } from 'redux/reducers/dashboard/dashboardFiltersReducer';

export const mockActions = {
    updateGenericFilter: jest.fn(),
    updateFilterSet: jest.fn(),
    clearFilter: jest.fn(),
    applyStagedFilters: jest.fn(),
    clearStagedFilters: jest.fn(),
    resetAppliedFilters: jest.fn(),
    setAppliedFilterEmptiness: jest.fn()
};

export const mockReduxHistorical = {
    selectedFilters: initialState.historical
};
