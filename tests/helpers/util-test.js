/**
 * util-test.js
 * Created by Lizzie Salita 10/24/18.
 */

import * as utilHelper from '../../src/js/helpers/util';

describe('util helper functions', () => {
    describe('quarterToMonth', () => {
        it('should convert the end of a quarter to its corresponding month', () => {
            const months = utilHelper.quarterToMonth(3, 2017, 'end');
            expect(months).toEqual('06/2017');
        });
        it('should convert the start of a quarter to its corresponding month', () => {
            const months = utilHelper.quarterToMonth(2, 2018, 'start');
            expect(months).toEqual('01/2018');
        });
    })
});