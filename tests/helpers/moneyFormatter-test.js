/**
 * @jest-environment jsdom
 *
 * moneyFormatter-test.js
 * Created by Lizzie Salita 11/19/19
 */

import * as MoneyFormatter from 'helpers/moneyFormatter';

describe('Money Formatter helper functions', () => {
    describe('formatMoney', () => {
        it('should round monetary values to the nearest dollar', () => {
            const formattedDown = MoneyFormatter.formatMoney(123.45);
            expect(formattedDown).toEqual('$123');

            const formattedUp = MoneyFormatter.formatMoney(123.75);
            expect(formattedUp).toEqual('$124');

            const formattedHalf = MoneyFormatter.formatMoney(123.50);
            expect(formattedHalf).toEqual('$124');
        });

        it('should format positive values to $XXX,XXX format', () => {
            const formatted = MoneyFormatter.formatMoney(12345678.23);
            expect(formatted).toEqual('$12,345,678');
        });

        it('should format negative values to -$XXX,XXX format', () => {
            const formatted = MoneyFormatter.formatMoney(-12345678.23);
            expect(formatted).toEqual('-$12,345,678');
        });

        it('should handle zero values as $0', () => {
            const formatted = MoneyFormatter.formatMoney(0);
            expect(formatted).toEqual('$0');
        });
    });
    describe('formatNumberWithPrecision', () => {
        it('should round values to the specified precision', () => {
            const formattedDown = MoneyFormatter.formatNumberWithPrecision(123.45, 2);
            expect(formattedDown).toEqual('123.45');

            const formattedUp = MoneyFormatter.formatNumberWithPrecision(123.75, 0);
            expect(formattedUp).toEqual('124');

            const formattedHalf = MoneyFormatter.formatNumberWithPrecision(123.50, 4);
            expect(formattedHalf).toEqual('123.5000');
        });

        it('should format positive values to XXX,XXX format', () => {
            const formatted = MoneyFormatter.formatNumberWithPrecision(12345678.23, 0);
            expect(formatted).toEqual('12,345,678');
        });

        it('should format negative values to -XXX,XXX format', () => {
            const formatted = MoneyFormatter.formatNumberWithPrecision(-12345678.23, 0);
            expect(formatted).toEqual('-12,345,678');
        });
    });
    describe('formatMoneyWithPrecision', () => {
        it('should round values to the specified precision', () => {
            const formattedDown = MoneyFormatter.formatMoneyWithPrecision(123.45, 2);
            expect(formattedDown).toEqual('$123.45');

            const formattedUp = MoneyFormatter.formatMoneyWithPrecision(123.75, 0);
            expect(formattedUp).toEqual('$124');

            const formattedHalf = MoneyFormatter.formatMoneyWithPrecision(123.50, 4);
            expect(formattedHalf).toEqual('$123.5000');
        });

        it('should format positive values to $XXX,XXX format', () => {
            const formatted = MoneyFormatter.formatMoneyWithPrecision(12345678.23, 0);
            expect(formatted).toEqual('$12,345,678');
        });

        it('should format negative values to -$XXX,XXX format', () => {
            const formatted = MoneyFormatter.formatMoneyWithPrecision(-12345678.23, 0);
            expect(formatted).toEqual('-$12,345,678');
        });
    });
});
