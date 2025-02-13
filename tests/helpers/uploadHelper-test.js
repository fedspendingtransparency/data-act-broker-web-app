/**
 * @jest-environment jsdom
 *
 * uploadHelper-test.js
 * Created by Maxwell Kendall 06/11/19
 */

import * as uploadHelper from '../../src/js/helpers/uploadHelper';

describe('prepareMetaData', () => {
    const data1 = {
        codeType: 'frec_code',
        agency: 'test_agency',
        startDate: 'test',
        endDate: 'test',
        dateType: 'quarter'
    };
    const data2 = {
        codeType: 'cgac_code',
        agency: 'test_agency2',
        startDate: 'test',
        endDate: 'test',
        dateType: 'monthly'
    };
    it('returns the correct request object', () => {
        const result1 = uploadHelper.prepareMetadata(data1, {});
        expect(result1.is_quarter).toEqual(true);
        expect(result1.frec_code).toEqual('test_agency');
        expect(result1.cgac_code).toEqual(null);

        const result2 = uploadHelper.prepareMetadata(data2, {});
        expect(result2.is_quarter).toEqual(false);
        expect(result2.frec_code).toEqual(null);
        expect(result2.cgac_code).toEqual('test_agency2');
    });
});
