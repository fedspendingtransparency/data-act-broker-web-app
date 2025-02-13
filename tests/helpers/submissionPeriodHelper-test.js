/**
 * @jest-environment jsdom
 *
 * submissionPeriodHelper-test.js
 * Created by Lizzie Salita 3/18/20
 */

import { submissionPeriodString, formatMonthlyTimePeriod } from 'helpers/submissionPeriodHelper';

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

describe('submissionPeriodString', () => {
    mockDate('2000-01-02');
    it('should return Passed when the reporting end date is before today', () => {
        const result = submissionPeriodString('1999-12-31');
        expect(result).toEqual('Passed');
    });
    it('should return Upcoming when the reporting end date is after today', () => {
        const result = submissionPeriodString('2000-06-30');
        expect(result).toEqual('Upcoming');
    });
    it('should return Upcoming when the reporting end date is today', () => {
        const result = submissionPeriodString('2000-01-02');
        expect(result).toEqual('Upcoming');
    });
});

describe('formatMonthlyTimePeriod', () => {
    it('should convert a date from MM/YYYY to spell out the month', () => {
        const sept = formatMonthlyTimePeriod('09/1999');
        const jan = formatMonthlyTimePeriod('01/2000');
        expect(sept).toEqual('September 1999');
        expect(jan).toEqual('January 2000');
    });
});
