import { initialState } from 'redux/reducers/dashboard/dashboardFiltersReducer';
import { initialState as appliedInitialState } from 'redux/reducers/dashboard/appliedFiltersReducer';

export const mockActions = {
    updateGenericFilter: jest.fn(),
    clearGenericFilter: jest.fn(),
    applyStagedFilters: jest.fn(),
    clearStagedFilters: jest.fn(),
    resetAppliedFilters: jest.fn(),
    setAppliedFilterEmptiness: jest.fn()
};

export const mockRedux = {
    selectedFilters: initialState
};

export const mockSubmitRedux = {
    stagedFilters: initialState,
    appliedFilters: appliedInitialState
};
