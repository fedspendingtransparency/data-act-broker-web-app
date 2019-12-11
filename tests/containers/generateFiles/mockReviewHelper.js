export const mockSubmissionMetadata = {
    1234: {
        number_of_rows: 2000,
        created_on: '07/18/1999',
        fabs_meta: null,
        number_of_warnings: 1000,
        reporting_period: 'Q2/1999',
        last_updated: '1999-11-19T15:20:45',
        cgac_code: '011',
        fabs_submission: false,
        publish_status: 'unpublished',
        frec_code: null,
        quarterly_submission: true,
        agency_name: 'Mock Agency (ABC)',
        total_size: 100000,
        last_validated: '1999-07-18T15:37:08',
        number_of_errors: 0
    }
};

export const fetchSubmissionMetadata = (submissionId) =>
    new Promise((resolve, reject) => {
        process.nextTick(() =>
            (mockSubmissionMetadata[submissionId]
                ? resolve(mockSubmissionMetadata[submissionId])
                : reject(new Error(`Submission with ${submissionId} not found.`)))
        );
    });
