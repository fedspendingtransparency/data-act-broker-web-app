/**
 * periodPickerHelper-test.js
 * Created by Kwadwo Opoku-Debrah 12/07/18
 */

import * as periodPickerHelper from 'helpers/periodPickerHelper';

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

describe('periodPickerHelper', () => {
    describe('handlePotentialStrings', () => {
        it('should convert its input to an integer if it is a string', () => {
            const output = periodPickerHelper.handlePotentialStrings('12');
            expect(output).toEqual(12);
        });
        it('should return its input otherwise', () => {
            const output = periodPickerHelper.handlePotentialStrings(12);
            expect(output).toEqual(12);
        });
    });

    describe('mostRecentPeriod', () => {
        it('should return the most recently completed period', () => {
            mockDate('1912-06-01');
            const output = periodPickerHelper.mostRecentPeriod();
            expect(output.period).toEqual(6);
        });
        it('should return the fiscal year of the most recently completed period', () => {
            mockDate('1912-06-01');
            const output = periodPickerHelper.mostRecentPeriod();
            expect(output.year).toEqual(1912);
        });
        it('if GTAS data is not available, it should return the period before that', () => {
            mockDate('1912-04-01');
            const output = periodPickerHelper.mostRecentPeriod();
            expect(output).toEqual({
                period: 3,
                year: 1912
            });
        });
        it('if GTAS data is not available for period 1, then it should return period 4 of the previous fiscal year', () => {
            mockDate('1912-01-02');
            const output = periodPickerHelper.mostRecentPeriod();
            expect(output).toEqual({
                period: 12,
                year: 1911
            });
        });
        it('should use the previous fiscal year as the FY when the current date is between Oct 1 and Jan 8', () => {
            mockDate('2018-10-01');
            const output = periodPickerHelper.mostRecentPeriod();
            expect(output).toEqual({
                period: 9,
                year: 2018
            });
        });
    });

    describe('lastCompletedPeriodInFY', () => {
        it('should return the latest period of past fiscal years', () => {
            mockDate('1912-06-01');
            const output = periodPickerHelper.lastCompletedPeriodInFY('1899');
            expect(output).toEqual({
                period: 12,
                year: 1899
            });
        });
        it('should return the last closed period of the current fiscal year', () => {
            mockDate('1912-06-01');
            const output = periodPickerHelper.lastCompletedPeriodInFY('1912');
            expect(output).toEqual({
                period: 6,
                year: 1912
            });
        });
        it('if GTAS data is not available for quarter 1 of the specified FY, it should return the latest period of the previous FY', () => {
            mockDate('1912-01-05');
            const output = periodPickerHelper.lastCompletedPeriodInFY('1912');
            expect(output).toEqual({
                period: 12,
                year: 1911
            });
        });
        it('should accept both string and number FY values', () => {
            mockDate('1912-06-01');
            expect(
                periodPickerHelper.lastCompletedPeriodInFY('1899')
            ).toEqual(
                periodPickerHelper.lastCompletedPeriodInFY(1899)
            );
        });
    });

    describe('availablePeriodsInFY', () => {
        it('for a previous FY that is after 2017, it should return the latest period', () => {
            mockDate('2020-06-01');
            const output = periodPickerHelper.availablePeriodsInFY(2019);
            expect(output).toEqual({
                period: 12,
                periodArray: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
                year: 2019
            });
        });
        it('for the current post-2017 fiscal year, it should return a period before the quarters that have been closed for at least 45 days to date', () => {
            mockDate('2020-06-01');
            const output = periodPickerHelper.availablePeriodsInFY(2020);
            expect(output).toEqual({
                period: 6,
                periodArray: [1, 2, 3, 4, 5, 6],
                year: 2020
            });
        });
        it('for FY 2017, it should return the latest period, but not the first 3 periods', () => {
            mockDate('2020-06-01');
            const output = periodPickerHelper.availablePeriodsInFY(2017);
            expect(output).toEqual({
                period: 12,
                periodArray: [6, 7, 8, 9, 10, 11, 12],
                year: 2017
            });
        });
        it('if the system clock returns a date within FY 2017, it should return a period that have GTAS data available, excluding period 3', () => {
            mockDate('2017-08-30');
            const output = periodPickerHelper.availablePeriodsInFY(2017);
            expect(output).toEqual({
                period: 9,
                periodArray: [6, 7, 8, 9],
                year: 2017
            });
        });
        it('should return a zero value if an FY prior to 2017 is provided', () => {
            mockDate('2020-06-01');
            const output = periodPickerHelper.availablePeriodsInFY(1776);
            expect(output).toEqual({
                period: 0,
                periodArray: [],
                year: 1776
            });
        });
        it('should accept a string or number argument', () => {
            mockDate('2020-06-01');
            expect(
                periodPickerHelper.availablePeriodsInFY('2018')
            ).toEqual(
                periodPickerHelper.availablePeriodsInFY(2018)
            );
        });
    });

    describe('defaultPeriods', () => {
        it('should return the available period in the current year', () => {
            mockDate('2020-06-01');
            const output = periodPickerHelper.defaultPeriods();
            expect(output).toEqual({
                period: 6,
                periodArray: [1, 2, 3, 4, 5, 6],
                year: 2020
            });
        });
        it('should return the available period in the previous year if GTAS data is not yet available for quarter 1', () => {
            mockDate('2020-01-03');
            const output = periodPickerHelper.defaultPeriods();
            expect(output).toEqual({
                period: 12,
                periodArray: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
                year: 2019
            });
        });
    });
});
