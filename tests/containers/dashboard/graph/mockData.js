import { initialState as appliedInitialState } from 'redux/reducers/dashboard/appliedFiltersReducer';

export const mockRedux = {
    appliedFilters: appliedInitialState
};

export const mockData = {
    'cross-CD1': [
        {
            submission_id: 123,
            total_warnings: 1000,
            agency: {
                code: '020',
                name: 'Department of the Treasury (TREAS)'
            },
            fy: 1999,
            warnings: [
                {
                    label: 'C23',
                    instances: 500,
                    percent_total: 50
                },
                {
                    label: 'C12',
                    instances: 100,
                    percent_total: 10
                },
                {
                    label: 'C11',
                    instances: 400,
                    percent_total: 40
                }
            ],
            quarter: 2
        }
    ]
};
