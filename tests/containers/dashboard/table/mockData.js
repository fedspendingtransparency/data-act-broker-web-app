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
