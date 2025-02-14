/**
 * @jest-environment jsdom
 *
 * submissionListHelper-test.js
 * Created by Maxwell Kendall 06/11/19
 */

import { parseRecentActivity } from "../../src/js/helpers/submissionListHelper";

describe('parseRecentActivity', () => {
    const generateItem = (size = 1000000, status = 'failed') => ({
        size,
        statusMap: {},
        status,
        agency: 'test',
        files: ['test-file/test.txt'],
        last_modified: '01-01-2001',
        reporting_start_date: '01-01-2001',
        user: {
            name: 'n00b'
        }
    });

    it('successfully translates file size to MB/KB', () => {
        const result1 = parseRecentActivity([generateItem()])[0];
        const result2 = parseRecentActivity([generateItem(1000)])[0];
        expect(result1.fileSize).toEqual('1.00 MB');
        expect(result2.fileSize).toEqual('1.00 KB');
    });
});
