/**
 * @jest-environment jsdom
 *
 * util-test.js
 * Created by Lizzie Salita 10/24/18.
 */

import moment from "moment";
import * as utilHelper from "../../src/js/helpers/util";

describe("util helper functions", () => {
    describe("convertToLocalDate", () => {
        it("should convert a date/time string to a formatted date", () => {
            const date = utilHelper.convertToLocalDate("2018-10-25 16:24:53.438768");
            expect(date).toEqual("2018-10-25");
        });
    });
    describe("quarterToMonth", () => {
        it("should convert the end of a quarter to its corresponding month", () => {
            const months = utilHelper.quarterToMonth(3, 2017, "end");
            expect(months).toEqual("06/2017");
        });
        it("should convert the start of a quarter to its corresponding month", () => {
            const months = utilHelper.quarterToMonth(2, 2018, "start");
            expect(months).toEqual("01/2018");
        });
        it("should work when the quarter is passed as a string", () => {
            const months = utilHelper.quarterToMonth("1", 2018, "start");
            expect(months).toEqual("10/2017");
        });
    });
    describe("previousQuarterMonth", () => {
        it("should return the date corresponding to the start of the previous quarter", () => {
            const mockedDate = moment("2015-04-01", "YYYY-MM-DD").toDate();
            moment.now = () => mockedDate;

            const quarter = utilHelper.previousQuarterMonth("start");
            expect(quarter).toEqual("01/2015");

            // reset moment's date to the current time
            moment.now = () => new Date();
        });
        it("should return the date corresponding to the end of the previous quarter", () => {
            const mockedDate = moment("2015-04-01", "YYYY-MM-DD").toDate();
            moment.now = () => mockedDate;

            const quarter = utilHelper.previousQuarterMonth("end");
            expect(quarter).toEqual("03/2015");

            // reset moment's date to the current time
            moment.now = () => new Date();
        });
        it("should properly get the beginning of quarter 1", () => {
            const mockedDate = moment("2016-03-31", "YYYY-MM-DD").toDate();
            moment.now = () => mockedDate;

            const quarter = utilHelper.previousQuarterMonth("start");
            expect(quarter).toEqual("10/2015");

            // reset moment's date to the current time
            moment.now = () => new Date();
        });
        it("should correctly return the 4th quarter dates when given December", () => {
            const mockedDate = moment("2015-12-31", "YYYY-MM-DD").toDate();
            moment.now = () => mockedDate;

            const quarter = utilHelper.previousQuarterMonth("start");
            expect(quarter).toEqual("07/2015");

            // reset moment's date to the current time
            moment.now = () => new Date();
        });
    });
    describe("periodToMonth", () => {
        it("should return the correct month when provided with a period", () => {
            const month = utilHelper.periodToMonth(4);
            expect(month).toEqual("01");
        });
    });
    describe("fyStartDate", () => {
        it("should return the start date of the current fiscal year", () => {
            const mockedDate = moment("2015-04-01", "YYYY-MM-DD").toDate();
            moment.now = () => mockedDate;

            const fyStart = utilHelper.fyStartDate();
            expect(fyStart).toEqual("10/2014");

            // reset moment's date to the current time
            moment.now = () => new Date();
        });
    });
    describe("validUploadFileChecker", () => {
        const buildRawFileObj = (name) => ({ file: { name } });
        it("returns invalid for file strings without a period or not .txt/.csv", () => {
            expect(utilHelper.validUploadFileChecker(buildRawFileObj("testcsv"))).toEqual(false);
            expect(utilHelper.validUploadFileChecker(buildRawFileObj("test.doc"))).toEqual(false);
            expect(utilHelper.validUploadFileChecker(buildRawFileObj("test.pdf"))).toEqual(false);
        });
        it("returns true for csv & txt files", () => {
            expect(utilHelper.validUploadFileChecker(buildRawFileObj("test.csv"))).toEqual(true);
            expect(utilHelper.validUploadFileChecker(buildRawFileObj("test.txt"))).toEqual(true);
        });
        it('returns "unset" string when invalid object is passed', () => {
            expect(utilHelper.validUploadFileChecker("blahblah")).toEqual("unset");
        });
    });

    describe("convertDateToQuarter", () => {
        const generateDateForMonthNumber = (month) => moment(`2012-${month}-01`);
        it("returns only returns 1 for months inclusively between October and December", () => {
            expect(utilHelper.convertDateToQuarter(generateDateForMonthNumber(10))).toEqual(1);
            expect(utilHelper.convertDateToQuarter(generateDateForMonthNumber(11))).toEqual(1);
            expect(utilHelper.convertDateToQuarter(generateDateForMonthNumber(12))).toEqual(1);
        });
        it("returns only returns 2 for months inclusively between January and March", () => {
            expect(utilHelper.convertDateToQuarter(generateDateForMonthNumber(1))).toEqual(2);
            expect(utilHelper.convertDateToQuarter(generateDateForMonthNumber(2))).toEqual(2);
            expect(utilHelper.convertDateToQuarter(generateDateForMonthNumber(3))).toEqual(2);
        });
        it("returns only returns 1 for months inclusively between April and June", () => {
            expect(utilHelper.convertDateToQuarter(generateDateForMonthNumber(4))).toEqual(3);
            expect(utilHelper.convertDateToQuarter(generateDateForMonthNumber(5))).toEqual(3);
            expect(utilHelper.convertDateToQuarter(generateDateForMonthNumber(6))).toEqual(3);
        });
        it("returns only returns 1 for months inclusively between July and September", () => {
            expect(utilHelper.convertDateToQuarter(generateDateForMonthNumber(7))).toEqual(4);
            expect(utilHelper.convertDateToQuarter(generateDateForMonthNumber(8))).toEqual(4);
            expect(utilHelper.convertDateToQuarter(generateDateForMonthNumber(9))).toEqual(4);
        });
    });

    describe("currentFiscalYear", () => {
        // testing a time-sensitive function. Using current month as condition for what to expect.
        it("returns current calendar year plus one for dates on or after october & returns current calendar year for dates before october", () => {
            const isInclusivelyAfterOctober = moment().month() >= 9;
            const currentCalendarYear = moment().year();
            if (isInclusivelyAfterOctober) {
                expect(utilHelper.currentFiscalYear()).toEqual(currentCalendarYear + 1);
            }
            else {
                expect(utilHelper.currentFiscalYear()).toEqual(currentCalendarYear);
            }
        });
    });

    describe("getPeriodTextFromValue", () => {
        it("returns the correct date string for the given period", () => {
            expect(utilHelper.getPeriodTextFromValue(4)).toEqual("04 - January");
            expect(utilHelper.getPeriodTextFromValue(5)).toEqual("05 - February");
            expect(utilHelper.getPeriodTextFromValue(6)).toEqual("06 - March");
            expect(utilHelper.getPeriodTextFromValue(7)).toEqual("07 - April");
            expect(utilHelper.getPeriodTextFromValue(8)).toEqual("08 - May");
            expect(utilHelper.getPeriodTextFromValue(9)).toEqual("09 - June");
            expect(utilHelper.getPeriodTextFromValue(10)).toEqual("10 - July");
            expect(utilHelper.getPeriodTextFromValue(11)).toEqual("11 - August");
            expect(utilHelper.getPeriodTextFromValue(12)).toEqual("12 - September");
            expect(utilHelper.getPeriodTextFromValue(1)).toEqual("01 - October");
            expect(utilHelper.getPeriodTextFromValue(2)).toEqual("02 - November");
            expect(utilHelper.getPeriodTextFromValue(3)).toEqual("03 - December");
        });
    });

    describe('createOnKeyDownHandler', () => {
        it('returns a function that is only invoked when it is passed an event with the space/enter keycodes', () => {
            const cb = jest.fn();
            const args = ["test1", "test2", "test3"];
            const onKeyDownHandler = utilHelper.createOnKeyDownHandler(cb, args);
            onKeyDownHandler({ keyCode: 1 });
            onKeyDownHandler({ keyCode: 2 });
            onKeyDownHandler({ keyCode: 3 });
            onKeyDownHandler({ keyCode: 4 });
            onKeyDownHandler({ keyCode: 5 });
            onKeyDownHandler({ keyCode: 6 });
            onKeyDownHandler({ keyCode: 13, preventDefault: jest.fn() }); // enter
            onKeyDownHandler({ keyCode: 32, preventDefault: jest.fn() }); // space
            expect(cb).toHaveBeenCalledTimes(2);
            expect(cb).toHaveBeenCalledWith("test1", "test2", "test3");
        });
    });

    describe("formatSize", () => {
        it("returns the correct size formatted to bytes/KB/MB/GB for the given size", () => {
            expect(utilHelper.formatSize(4)).toEqual("4 bytes");
            expect(utilHelper.formatSize(850)).toEqual("850 bytes");
            expect(utilHelper.formatSize(1000)).toEqual("1.00 KB");
            expect(utilHelper.formatSize(8345)).toEqual("8.35 KB");
            expect(utilHelper.formatSize(265972)).toEqual("265.97 KB");
            expect(utilHelper.formatSize(1234567)).toEqual("1.23 MB");
            expect(utilHelper.formatSize(153498726)).toEqual("153.50 MB");
            expect(utilHelper.formatSize(9876543210)).toEqual("9.88 GB");
        });
    });

    describe("getYearAndPeriod", () => {
        it("returns the correct period", () => {
            expect(utilHelper.getYearAndPeriod('02/2020').period).toEqual(5);
            expect(utilHelper.getYearAndPeriod('06/2020').period).toEqual(9);
            expect(utilHelper.getYearAndPeriod('11/2020').period).toEqual(2);
        });
        it("returns the correct year", () => {
            expect(utilHelper.getYearAndPeriod('02/2020').year).toEqual(2020);
            expect(utilHelper.getYearAndPeriod('06/2020').year).toEqual(2020);
            expect(utilHelper.getYearAndPeriod('11/2020').year).toEqual(2021);
        });
    });

    describe("trimmedObjectEquality", () => {
        it("trims the values in the objects", () => {
            expect(utilHelper.trimmedObjectEquality({ A: 'test ' }, { A: '   test   '})).toEqual(true);
            expect(utilHelper.trimmedObjectEquality({ A: 'test', B: 'test2'}, {A: 'test2   '})).toEqual(false);
        });
    });
});
