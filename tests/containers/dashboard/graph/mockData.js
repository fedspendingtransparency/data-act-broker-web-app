import { initialState as appliedInitialState } from 'redux/reducers/dashboard/appliedFiltersReducer';

export const mockRedux = {
    appliedFilters: appliedInitialState
};

export const mockData = {
    'cross-CD1': [
        {
            submission_id: 123,
            total_warnings: 1000,
            filtered_warnings: 1000,
            agency: {
                code: '020',
                name: 'Department of the Treasury (TREAS)'
            },
            fy: 1999,
            warnings: [
                {
                    label: 'C23.1',
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
            period: 6,
            is_quarter: true
        },
        {
            submission_id: 124,
            total_warnings: 800,
            filtered_warnings: 800,
            agency: {
                code: '020',
                name: 'Department of the Treasury (TREAS)'
            },
            fy: 1998,
            warnings: [
                {
                    label: 'C23.2',
                    instances: 400,
                    percent_total: 50
                },
                {
                    label: 'C12',
                    instances: 200,
                    percent_total: 25
                },
                {
                    label: 'C11',
                    instances: 200,
                    percent_total: 25
                }
            ],
            period: 9,
            is_quarter: false
        }
    ]
};

export const mockSignificanceData = {
    rules: [{
        instances: 3,
        impact: 'high',
        significance: 2,
        category: 'completeness',
        rule_label: 'A33.1',
        percentage: 75.0
    }, {
        instances: 1,
        impact: 'high',
        significance: 3,
        category: 'completeness',
        rule_label: 'A33.2',
        percentage: 25.0
    }],
    total_instances: 4
};
