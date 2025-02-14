/**
 * @jest-environment jsdom
 *
 * periodPickerHelper-test.js
 * Created by Kwadwo Opoku-Debrah 12/07/18
 */

import * as periodPickerHelper from 'helpers/periodPickerHelper';

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
            expect(output.period).toEqual(8);
        });
        it('should return the fiscal year of the most recently completed period', () => {
            mockDate('1912-06-01');
            const output = periodPickerHelper.mostRecentPeriod();
            expect(output.year).toEqual(1912);
        });
        it('if period 2 isnt over yet, then it should return period 12 of the previous fiscal year)', () => {
            mockDate('2018-11-19');
            const output = periodPickerHelper.mostRecentPeriod();
            expect(output).toEqual({
                period: 12,
                year: 2018
            });
        });
        it('if period 2 is over for this year, then it should return the next year for this specific window', () => {
            mockDate('1912-12-19');
            const output = periodPickerHelper.mostRecentPeriod();
            expect(output).toEqual({
                period: 2,
                year: 1913
            });
        });
        it('should use the current calendar year starting on Jan 1st', () => {
            mockDate('1913-01-01');
            const output = periodPickerHelper.mostRecentPeriod();
            expect(output).toEqual({
                period: 3,
                year: 1913
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
                period: 8,
                year: 1912
            });
        });
        it('if period 2 of the specified FY is complete, it should return the next calendar year for the FY', () => {
            mockDate('1912-12-19');
            const output = periodPickerHelper.lastCompletedPeriodInFY('1913');
            expect(output).toEqual({
                period: 2,
                year: 1913
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
        it('for the current post-2017 fiscal year, it should return a period before the periods that have finished', () => {
            mockDate('2020-06-01');
            const output = periodPickerHelper.availablePeriodsInFY(2020);
            expect(output).toEqual({
                period: 8,
                periodArray: [1, 2, 3, 4, 5, 6, 7, 8],
                year: 2020
            });
        });
        it('for FY 2017, it should return all periods regardless', () => {
            mockDate('2020-06-01');
            const output = periodPickerHelper.availablePeriodsInFY(2017);
            expect(output).toEqual({
                period: 12,
                periodArray: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
                year: 2017
            });
        });
        it('if the system clock returns a date within FY 2017, it should return all completed periods, in addition to periods starting in October', () => {
            mockDate('2017-08-30');
            const output = periodPickerHelper.availablePeriodsInFY(2017);
            expect(output).toEqual({
                period: 10,
                periodArray: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
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
                period: 8,
                periodArray: [1, 2, 3, 4, 5, 6, 7, 8],
                year: 2020
            });
        });
        it('should return the available period in the previous year if GTAS data is not yet available', () => {
            mockDate('2020-10-20');
            const output = periodPickerHelper.defaultPeriods();
            expect(output).toEqual({
                period: 12,
                periodArray: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
                year: 2020
            });
        });
        it('should return the available period in the current fiscal year if period 2 is done, also one year ahead if its period 3', () => {
            mockDate('2020-12-20');
            const output = periodPickerHelper.defaultPeriods();
            expect(output).toEqual({
                period: 2,
                periodArray: [1, 2],
                year: 2021
            });
        });
    });
});
