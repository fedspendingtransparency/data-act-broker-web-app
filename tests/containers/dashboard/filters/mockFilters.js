import { initialState } from 'redux/reducers/dashboard/dashboardFiltersReducer';
import { initialState as appliedInitialState } from 'redux/reducers/dashboard/appliedFiltersReducer';

export const mockActions = {
    updateGenericFilter: jest.fn(),
    updateFilterSet: jest.fn(),
    clearFilter: jest.fn(),
    applyStagedFilters: jest.fn(),
    clearStagedFilters: jest.fn(),
    resetAppliedFilters: jest.fn(),
    setAppliedFilterEmptiness: jest.fn()
};

export const mockRedux = {
    selectedFilters: initialState
};

export const mockReduxHistorical = {
    selectedFilters: initialState.historical
};

export const mockReduxActive = {
    selectedFilters: initialState.active
};

export const mockSubmitRedux = {
    stagedFilters: initialState,
    appliedFilters: appliedInitialState
};

export const mockActiveRedux = {
    appliedFilters: {
        filters: {
            active: {
                agency: {
                    code: '123',
                    name: 'test agency'
                },
                file: 'A'
            }
        }
    },
    _activeEmpty: false
};
