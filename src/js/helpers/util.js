import moment from 'moment';

export const convertToLocalDate = (dateToConvert) => {
    // convert date to local date, need to replace the space with a T for Date() formatting
    // Add a Z to the end to imply the date is in UTC
    const formattedDate = `${dateToConvert.replace(" ", "T")}Z`;
    const tmpDate = new Date(formattedDate);

    // format date as YYYY-MM-DD
    const year = tmpDate.getFullYear();
    let month = tmpDate.getMonth() + 1;
    if (month < 10) {
        month = `0${month}`;
    }
    let day = tmpDate.getDate();
    if (day < 10) {
        day = `0${day}`;
    }
    return `${year}-${month}-${day}`;
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


export const validUploadFileChecker = (rawFile) => {
    if (rawFile.file) {
        const fileName = rawFile.file.name.toLowerCase();
        const parsedFileName = fileName.indexOf('.') !== -1 ? fileName.split('.') : ['invalid'];
        const fileType = parsedFileName[parsedFileName.length - 1];
        return !!((fileType === 'csv' || fileType === 'txt'));
    }
    return 'unset';
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

export const convertQuarterToPeriod = (quarter) => {
    const periodtoQuarters = {
        1: 3, // Quarter 1
        2: 6, // Quarter 2
        3: 9, // Quarter 3
        4: 12 // Quarter 4
    };
    return periodtoQuarters[quarter];
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
