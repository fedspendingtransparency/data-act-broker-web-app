const mockSubmissions= {
    total: 2,
    submissions: [
        {
            certifying_user: "",
            agency: "Department of State (DOS)",
            submission_id: 1,
            reporting_start_date: "1999-07-01",
            reporting_end_date: "1999-09-30",
            status: "waiting",
            publish_status: "unpublished",
            last_modified: "1999-10-29 17:59:11.771504",
            certified_on: "",
            user: {
                user_id: 1,
                name: "George Washington"
            },
            files: [
                "d1_data.csv",
                "d2_data.csv",
                "executive_compensation_data.csv",
                null,
                "/data-act/backend/tmp/456_programActivityValid.csv",
                "/data-act/backend/tmp/456_awardFinancialValid.csv",
                "/data-act/backend/tmp/456_appropValid.csv",
                "sub_award_data.csv"
            ]
        },
        {
            certifying_user: "",
            agency: "Department of Commerce (DOC)",
            submission_id: 2,
            reporting_start_date: "1999-10-01",
            reporting_end_date: "1999-12-31",
            status: "waiting",
            publish_status: "unpublished",
            last_modified: "2000-01-01 16:59:11.771504",
            certified_on: "",
            user: {
                user_id: 2,
                name: "John Adams"
            },
            files: [
                "d1_data.csv",
                "d2_data.csv",
                "executive_compensation_data.csv",
                null,
                "/data-act/backend/tmp/123_programActivityValid.csv",
                "/data-act/backend/tmp/123_awardFinancialValid.csv",
                "/data-act/backend/tmp/123_appropValid.csv",
                "sub_award_data.csv"
            ]
        }
    ]
};

export const loadSubmissionList = jest.fn(() => (
    {
        promise: new Promise((resolve) => {
            process.nextTick(() => {
                resolve(mockSubmissions);
            });
        }),
        cancel: jest.fn()
    }
));