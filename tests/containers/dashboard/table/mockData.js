import { initialState } from 'redux/reducers/dashboard/appliedFiltersReducer';

export const mockRedux = {
    appliedFilters: initialState
};

export const mockData = {
    page_metadata: {
        total: 15,
        page: 1,
        limit: 10
    },
    results: [
        {
            submission_id: 2,
            fy: 2017,
            quarter: 3,
            rule_description: 'The description of this rule',
            rule_label: 'TEST1',
            instance_count: 10,
            files: [
                {
                    type: "A",
                    name: "file_A.csv"
                }
            ]
        },
        {
            submission_id: 1,
            fy: 2019,
            quarter: 3,
            rule_description: 'The description of a cross-file rule',
            rule_label: 'TEST2',
            instance_count: 50,
            files: [
                {
                    type: "C",
                    name: "file_C.csv"
                },
                {
                    type: "D1",
                    name: "file_D1.csv"
                }
            ]
        }
    ]
};

export const activeMockData = {
    'page_metadata': {
        'total': 3,
        'page': 1,
        'limit': 2,
        'submission_id': 1,
        'files': ['C', 'D1']
    },
    "results": [
        {
            'significance': 2,
            'rule_label': 'C12',
            'instance_count': 1906,
            'category': 'completeness',
            'impact': 'high',
            'rule_description': 'Description of the rule'
        },
        {
            'significance': 4,
            'rule_label': 'C10',
            'instance_count': 53,
            'category': 'accuracy',
            'impact': 'low',
            'rule_description': 'Description of the second rule'
        }
    ]
};
