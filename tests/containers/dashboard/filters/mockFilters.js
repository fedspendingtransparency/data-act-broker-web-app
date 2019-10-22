import { initialState } from 'redux/reducers/dashboard/dashboardFiltersReducer';

export const mockActions = {
    updateGenericFilter: jest.fn()
};

export const mockRedux = {
    selectedFilters: initialState
};
