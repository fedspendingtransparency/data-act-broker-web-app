/**
 * quarterPickerHelper-test.js
 * Created by Lizzie Salita 11/13/18
 */

import * as quarterPickerHelper from 'helpers/quarterPickerHelper';

const nativeDate = Date.now;

const mockDate = (date) => {
    // mock the current date
    const month = parseInt(date.substring(5, 7), 10) - 1; // month is zero-indexed
    const day = parseInt(date.substring(8));
    const mock = new Date(date.substring(0, 4), month, day);
    Date.now = () => mock;
};

afterAll(() => {
    // restore the original, native date function
    Date.now = nativeDate;
});

describe('quarterPickerHelper', () => {
    describe('handlePotentialStrings', () => {
        it('should convert its input to an integer if it is a string', () => {
            const output = quarterPickerHelper.handlePotentialStrings('12');
            expect(output).toEqual(12);
        });
        it('should return its input otherwise', () => {
            const output = quarterPickerHelper.handlePotentialStrings(12);
            expect(output).toEqual(12);
        });
    });

    describe('mostRecentQuarter', () => {
        it('should return the most recently completed quarter', () => {
            mockDate('1912-06-01');
            const output = quarterPickerHelper.mostRecentQuarter();
            expect(output.quarter).toEqual(2);
        });
        it('should return the fiscal year of the most recently completed quarter', () => {
            mockDate('1912-06-01');
            const output = quarterPickerHelper.mostRecentQuarter();
            expect(output.year).toEqual(1912);
        });
        it('if GTAS data is not available, it should return the quarter before that', () => {
            mockDate('1912-04-01');
            const output = quarterPickerHelper.mostRecentQuarter();
            expect(output).toEqual({
                quarter: 1,
                year: 1912
            });
        });
        it('if GTAS data is not available for quarter 1, then it should return quarter 4 of the previous fiscal year', () => {
            mockDate('1912-01-02');
            const output = quarterPickerHelper.mostRecentQuarter();
            expect(output).toEqual({
                quarter: 4,
                year: 1911
            });
        });
        it('should use the previous fiscal year as the FY when the current date is between Oct 1 and Jan 8', () => {
            mockDate('2018-10-01');
            const output = quarterPickerHelper.mostRecentQuarter();
            expect(output).toEqual({
                quarter: 3,
                year: 2018
            });
        });
    });

    describe('lastCompletedQuarterInFY', () => {
        it('should return quarter 4 of past fiscal years', () => {
            mockDate('1912-06-01');
            const output = quarterPickerHelper.lastCompletedQuarterInFY('1899');
            expect(output).toEqual({
                quarter: 4,
                year: 1899
            });
        });
        it('should return the last closed quarter of the current fiscal year', () => {
            mockDate('1912-06-01');
            const output = quarterPickerHelper.lastCompletedQuarterInFY('1912');
            expect(output).toEqual({
                quarter: 2,
                year: 1912
            });
        });
        it('if GTAS data is not available for quarter 1 of the specified FY, it should return quarter 4 of the previous FY', () => {
            mockDate('1912-01-05');
            const output = quarterPickerHelper.lastCompletedQuarterInFY('1912');
            expect(output).toEqual({
                quarter: 4,
                year: 1911
            });
        });
        it('should accept both string and number FY values', () => {
            mockDate('1912-06-01');

            expect(
                quarterPickerHelper.lastCompletedQuarterInFY('1899')
            ).toEqual(
                quarterPickerHelper.lastCompletedQuarterInFY(1899)
            );
        });
    });

    describe('availableQuartersInFY', () => {
        it('for a previous FY that is after 2017, it should return an array of all four quarters', () => {
            mockDate('2020-06-01');
            const output = quarterPickerHelper.availableQuartersInFY(2019);
            expect(output).toEqual({
                quarters: [1, 2, 3, 4],
                year: 2019
            });
        });
        it('for the current post-2017 fiscal year, it should return an array of each quarter that has been closed for at least 45 days to date', () => {
            mockDate('2020-06-01');
            const output = quarterPickerHelper.availableQuartersInFY(2020);
            expect(output).toEqual({
                quarters: [1, 2],
                year: 2020
            });
        });
        it('for FY 2017, it should return quarters 2, 3, and 4, but not quarter 1', () => {
            mockDate('2020-06-01');
            const output = quarterPickerHelper.availableQuartersInFY(2017);
            expect(output).toEqual({
                quarters: [2, 3, 4],
                year: 2017
            });
        });
        it('if the system clock returns a date within FY 2017, it should return an array of quarters that have GTAS data available, excluding quarter 1', () => {
            mockDate('2017-08-30');
            const output = quarterPickerHelper.availableQuartersInFY(2017);
            expect(output).toEqual({
                quarters: [2, 3],
                year: 2017
            });
        });
        it('should return an empty quarter array if an FY prior to 2017 is provided', () => {
            mockDate('2020-06-01');
            const output = quarterPickerHelper.availableQuartersInFY(1776);
            expect(output).toEqual({
                quarters: [],
                year: 1776
            });
        });
        it('should accept a string or number argument', () => {
            mockDate('2020-06-01');
            expect(
                quarterPickerHelper.availableQuartersInFY('2018')
            ).toEqual(
                quarterPickerHelper.availableQuartersInFY(2018)
            );
        });
    });

    describe('defaultQuarters', () => {
        it('should return all the available quarters in the current year', () => {
            mockDate('2020-06-01');
            const output = quarterPickerHelper.defaultQuarters();
            expect(output).toEqual({
                quarters: [1, 2],
                year: 2020
            });
        });
        it('should return all the available quarters in the previous year if GTAS data is not yet available for quarter 1', () => {
            mockDate('2020-01-03');
            const output = quarterPickerHelper.defaultQuarters();
            expect(output).toEqual({
                quarters: [1, 2, 3, 4],
                year: 2019
            });
        });
    });
});
