/**
 * util-test.js
 * Created by Lizzie Salita 10/24/18.
 */

import * as utilHelper from '../../src/js/helpers/util';
import moment from 'moment';

describe('util helper functions', () => {
    describe('convertToLocalDate', () => {
        it('should convert a date/time string to a formatted date', () => {
            const date = utilHelper.convertToLocalDate('2018-10-25 16:24:53.438768');
            expect(date).toEqual('2018-10-25');
        });
    });
    describe('quarterToMonth', () => {
        it('should convert the end of a quarter to its corresponding month', () => {
            const months = utilHelper.quarterToMonth(3, 2017, 'end');
            expect(months).toEqual('06/2017');
        });
        it('should convert the start of a quarter to its corresponding month', () => {
            const months = utilHelper.quarterToMonth(2, 2018, 'start');
            expect(months).toEqual('01/2018');
        });
        it('should work when the quarter is passed as a string', () => {
            const months = utilHelper.quarterToMonth("1", 2018, 'start');
            expect(months).toEqual('10/2017');
        });
    });
    describe('previousQuarterMonth', () => {
        it('should return the date corresponding to the start of the previous quarter', () => {
            const mockedDate = moment('2015-04-01', 'YYYY-MM-DD').toDate();
            moment.now = () => (mockedDate);

            const quarter = utilHelper.previousQuarterMonth('start');
            expect(quarter).toEqual('01/2015');

            // reset moment's date to the current time
            moment.now = () => (new Date());
        });
        it('should return the date corresponding to the end of the previous quarter', () => {
            const mockedDate = moment('2015-04-01', 'YYYY-MM-DD').toDate();
            moment.now = () => (mockedDate);

            const quarter = utilHelper.previousQuarterMonth('end');
            expect(quarter).toEqual('03/2015');

            // reset moment's date to the current time
            moment.now = () => (new Date());
        });
        it('should properly get the beginning of quarter 1', () => {
            const mockedDate = moment('2016-03-31', 'YYYY-MM-DD').toDate();
            moment.now = () => (mockedDate);

            const quarter = utilHelper.previousQuarterMonth('start');
            expect(quarter).toEqual('10/2015');

            // reset moment's date to the current time
            moment.now = () => (new Date());
        });
        it('should correctly return the 4th quarter dates when given December', () => {
            const mockedDate = moment('2015-12-31', 'YYYY-MM-DD').toDate();
            moment.now = () => (mockedDate);

            const quarter = utilHelper.previousQuarterMonth('start');
            expect(quarter).toEqual('07/2015');

            // reset moment's date to the current time
            moment.now = () => (new Date());
        });
    });
    describe('fyStartDate', () => {
        it('should return the start date of the current fiscal year', ()=> {
            const mockedDate = moment('2015-04-01', 'YYYY-MM-DD').toDate();
            moment.now = () => (mockedDate);

            const fyStart = utilHelper.fyStartDate();
            expect(fyStart).toEqual('10/2014');

            // reset moment's date to the current time
            moment.now = () => (new Date());
        });
    });
});