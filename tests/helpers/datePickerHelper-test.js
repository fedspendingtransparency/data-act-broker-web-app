/**
 * @jest-environment jsdom
 *
 * datePickerHelper-test.js
 * Created by Lizzie Salita 02/07/20
 */

import * as datePickerHelper from 'helpers/datePickerHelper';
import moment from 'moment';

const nativeDate = Date.now;

const mockDate = (date) => {
    // mock the current date
    const month = parseInt(date.substring(5, 7), 10) - 1; // month is zero-indexed
    const day = parseInt(date.substring(8), 10);
    const mock = new Date(date.substring(0, 4), month, day);
    Date.now = () => mock;
};

afterAll(() => {
    // restore the original, native date function
    Date.now = nativeDate;
});

describe('datePickerHelper', () => {
    describe('isOutsideRange', () => {
        it('should return true for future dates', () => {
            const tomorrow = moment().add(1, 'days');
            const output = datePickerHelper.isOutsideRange(tomorrow);
            expect(output).toBeTruthy();
        });
        it('should return true for dates before Q2 FY 2017', () => {
            const q1Fy17 = moment('12/31/2016', 'MM/DD/YYYY');
            const output = datePickerHelper.isOutsideRange(q1Fy17);
            expect(output).toBeTruthy();
        });
        it('should return false for dates between Q2 FY 2017 and today', () => {
            const inRange = moment('12/31/2018', 'MM/DD/YYYY');
            const output = datePickerHelper.isOutsideRange(inRange);
            expect(output).toBeFalsy();
        });
    });
    describe('initialVisibleMonth', () => {
        it('should return a moment in the previous month', () => {
            mockDate('1999-12-31');
            const output = datePickerHelper.initialVisibleMonth();
            expect(output.format('MM/YYYY')).toEqual('11/1999');
        });
    });
});
