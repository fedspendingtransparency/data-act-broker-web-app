import Accounting from 'accounting';

// convert monetary values to currency strings
const accountingOptions = {
    symbol: '$',
    precision: 0,
    format: {
        pos: '%s%v',
        neg: '-%s%v',
        zero: '%s%v'
    }
};

export const formatMoney = (value) => Accounting.formatMoney(value, accountingOptions);

export const formatNumberWithPrecision = (number, precision) => {
    const options = Object.assign({}, accountingOptions, {
        symbol: '',
        precision
    });
    return Accounting.formatMoney(number, options);
};

export const formatMoneyWithPrecision = (value, precision) => {
    const modifiedOptions = Object.assign({}, accountingOptions, {
        precision
    });
    return Accounting.formatMoney(value, modifiedOptions);
};
