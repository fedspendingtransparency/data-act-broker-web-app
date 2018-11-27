import Q from 'q';
import moment from 'moment';
import { kGlobalConstants } from '../GlobalConstants';
import Request from './sessionSuperagent';

export const generateProtectedUrls = () => {
    let isCanceled = false;
    const deferred = Q.defer();

    Request.get(`${kGlobalConstants.API}get_protected_files/`)
        .send()
        .end((err, res) => {
            if (isCanceled || err) {
                deferred.reject(err);
            }
            else {
                deferred.resolve(res.body.urls);
            }
        });

    return {
        promise: deferred.promise,
        cancel: () => {
            isCanceled = true;
        }
    };
};

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

    const normalQuarter = quarter.toString();

    let month = startMonth[normalQuarter - 1];

    if (type === "end") {
        month = endMonth[normalQuarter - 1];
    }

    let year = parseInt(quarterYear, 10);
    if (normalQuarter === '1') {
        // decrement the year by one for the first quarter of the fiscal year
        year -= 1;
    }

    return `${month}/${year}`;
};

export const currentQuarter = (type) => {
    const month = parseInt(moment().format("M"), 10);
    let year = moment().format('YYYY');

    let quarter = 1;

    if (month === 12) {
        // Add a year for quarter 1, since 1/2 are already in the new year do not need to update
        year = moment().add(1, 'years').format('YYYY');
    }
    else if (month >= 9) {
        quarter = 4;
    }
    else if (month >= 6) {
        quarter = 3;
    }
    else if (month >= 3) {
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
        const parsed = rawFile.file.name.split('.');
        const fileType = parsed[parsed.length - 1];
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
