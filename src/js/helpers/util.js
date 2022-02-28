import moment from 'moment';
import { isEqual } from 'lodash';

export const convertToLocalDate = (dateToConvert, showTime = false, separator = '-') => {
    if (dateToConvert === null || dateToConvert === undefined) {
        return dateToConvert;
    }
    // convert date to local date, need to replace the space with a T for Date() formatting
    // Add a Z to the end to imply the date is in UTC
    const formattedDate = `${dateToConvert.replace(" ", "T")}Z`;
    const tmpDate = new Date(formattedDate);

    // format date as YYYY-MM-DD
    const year = tmpDate.getFullYear();
    const month = (tmpDate.getMonth() + 1).toString().padStart(2, '0');
    const day = tmpDate.getDate().toString().padStart(2, '0');

    // if we also need a timestamp, include it
    let timestamp = '';
    if (showTime) {
        const hours = tmpDate.getHours();
        const mins = tmpDate.getMinutes().toString().padStart(2, '0');
        const ampm = hours >= 12 ? 'pm' : 'am';
        timestamp = ` ${(hours % 12) || 12}:${mins} ${ampm}`;
    }
    if (separator === '-') {
        return `${year}-${month}-${day}${timestamp}`;
    }
    return `${month}/${day}/${year}${timestamp}`;
};

export const quarterToMonth = (quarter, quarterYear, type) => {
    // convert quarters to months
    const startMonth = ["10", "01", "04", "07"];
    const endMonth = ["12", "03", "06", "09"];

    const normalQuarter = parseInt(quarter, 10);

    let month = startMonth[normalQuarter - 1];

    if (type === "end") {
        month = endMonth[normalQuarter - 1];
    }

    let year = parseInt(quarterYear, 10);
    if (normalQuarter === 1) {
        // decrement the year by one for the first quarter of the fiscal year
        year -= 1;
    }

    return `${month}/${year}`;
};

export const previousQuarterMonth = (type) => {
    // gets the first or last month + year of the previous quarter.
    const currDate = moment().subtract(3, 'months');
    const month = currDate.month();
    let year = currDate.year();

    let quarter = 1;

    if (month >= 9) {
        // Add a year for quarter 1
        year += 1;
    }
    else if (month >= 6) {
        quarter = 4;
    }
    else if (month >= 3) {
        quarter = 3;
    }
    else {
        quarter = 2;
    }

    return quarterToMonth(quarter, year, type);
};

export const fyStartDate = () => {
    const month = parseInt(moment().format("M"), 10);
    let year = moment().format('YYYY');

    if (month >= 10) {
        year = moment().add(1, 'years').format('YYYY');
    }

    return quarterToMonth(1, year, 'start');
};

export const periodToMonth = (period) => {
    // Returns the month that the period corresponds to in MM format.
    // Period 4 = January, month 01, etc.
    const monthDictionary = {
        4: "01",
        5: "02",
        6: "03",
        7: "04",
        8: "05",
        9: "06",
        10: "07",
        11: "08",
        12: "09",
        1: "10",
        2: "11",
        3: "12"
    };
    return monthDictionary[period];
};


export const validUploadFileChecker = (rawFile) => {
    if (rawFile.file) {
        const fileName = rawFile.file.name.toLowerCase();
        const parsedFileName = fileName.indexOf('.') !== -1 ? fileName.split('.') : ['invalid'];
        const fileType = parsedFileName[parsedFileName.length - 1];
        return !!((fileType === 'csv' || fileType === 'txt'));
    }
    return 'unset';
};


export const checkValidFileList = (fileList) => {
    for (const file of Object.keys(fileList)) {
        const currFile = fileList[file];
        if (!validUploadFileChecker(currFile)) {
            return false;
        }
    }
    return true;
};

export const earliestFileAYear = 2017;

export const convertDateToQuarter = (date) => {
    // Returns the fiscal quarter that the date falls in
    let quarter = 0;
    const month = moment(date).month();

    if (month >= 9 && month <= 11) {
        quarter = 1;
    }

    else if (month >= 0 && month <= 2) {
        quarter = 2;
    }

    else if (month >= 3 && month <= 5) {
        quarter = 3;
    }
    else if (month >= 6 && month <= 8) {
        quarter = 4;
    }

    return quarter;
};

export const currentFiscalYear = () => {
    // determine the current fiscal year
    const currentMonth = moment().month();
    let currentFY = moment().year();
    if (currentMonth >= 9) {
        // months are zero-indexed, so 9 is October
        // starting in October we are in the next fiscal year
        currentFY = moment().year() + 1;
    }

    return currentFY;
};

export const getPeriodTextFromValue = (value) => {
    const periodDictionary = {
        4: "04 - January",
        5: "05 - February",
        6: "06 - March",
        7: "07 - April",
        8: "08 - May",
        9: "09 - June",
        10: "10 - July",
        11: "11 - August",
        12: "12 - September",
        1: "01 - October",
        2: "02 - November",
        3: "03 - December"
    };
    return periodDictionary[value];
};

export const createOnKeyDownHandler = (cb, args = [], keyCodes = [13, 32]) => (e) => { // 13 enter; 32 space
    if (keyCodes.includes(e.keyCode)) {
        e.preventDefault();
        cb(...args);
    }
};

export const formatSize = (totalSize) => {
    let displaySize = `${totalSize} bytes`;
    if (totalSize >= 1000000000) {
        displaySize = `${(totalSize / 1000000000).toFixed(2)} GB`;
    }
    else if (totalSize >= 1000000) {
        displaySize = `${(totalSize / 1000000).toFixed(2)} MB`;
    }
    else if (totalSize >= 1000) {
        displaySize = `${(totalSize / 1000).toFixed(2)} KB`;
    }
    return displaySize;
};

export const getYearAndPeriod = (endDate) => {
    // get the year and period of the submission from the end date (formatted MM/YYYY)
    const month = endDate.substr(0, 2);
    let period = parseInt(month, 10) + 3;
    let year = parseInt(endDate.substr(3), 10);
    if (period > 12) {
        period %= 12;
        year += 1;
    }

    return { year, period };
};

export const trimmedObjectEquality = (obj1, obj2) => {
    // trimming the strings in both objects. This doesn't work if it's not strings
    const obj1Trimmed = {};
    const obj2Trimmed = {};
    for (const key of Object.keys(obj1)) {
        obj1Trimmed[key] = obj1[key].trim();
    }
    for (const key of Object.keys(obj2)) {
        obj2Trimmed[key] = obj2[key].trim();
    }
    return isEqual(obj1Trimmed, obj2Trimmed);
};
