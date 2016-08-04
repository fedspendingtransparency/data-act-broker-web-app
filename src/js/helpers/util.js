import Q from 'q';
import { kGlobalConstants } from '../GlobalConstants.js';
import Request from './sessionSuperagent.js';
import moment from 'moment';

export const generateRSSUrl = () => {

	let isCanceled = false;

	const deferred = Q.defer();

	// utilize the generateProtectedUrls call to fetch the signed RSS link
	generateProtectedUrls().promise
		.then((urls) => {

			if (isCanceled) {
				deferred.reject('canceled');
			}
			else {
				deferred.resolve(urls['RSS_v1.0.xlsx']);
			}
		})
		.catch((err) => {
			console.log(err);
			deferred.reject(err);
		});

	return {
		promise: deferred.promise,
		cancel: () => {
			isCanceled = true;

		}
	}
}

export const generateProtectedUrls = () => {

	let isCanceled = false;
	const deferred = Q.defer();

	Request.get(kGlobalConstants.API + 'get_protected_files/')
		.send()
		.end((err, res) => {
			if (isCanceled) {
				deferred.reject();
			}
			else if (err && res.body) {
				deferred.reject(res.body.message);
			}
			else if (err) {
				deferred.reject();
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
}

export const currentQuarter = (type) => {

	const month = parseInt(moment().format("M"));
    let year = moment().format('YYYY');

	let quarter = 4;

	if (month >= 10) {
		quarter = 1;
        // for the first quarter, we need to move forward one year
        year = moment().add(1, 'years').format('YYYY');
	}
	else if (month <= 3) {
		quarter = 2;
	}
	else if (month <= 6) {
		quarter = 3;
	}

	return quarterToMonth(quarter, year, type);
};

export const fyStartDate = () => {

	const month = parseInt(moment().format("M"));
    let year = moment().format('YYYY');

    if (month >= 10) {
    	year = moment().add(1, 'years').format('YYYY');
    }

	return quarterToMonth(1, year, 'start');

}

export const quarterToMonth = (quarter, quarterYear, type) => {
    // convert quarters to months
    const startMonth = ["10", "01", "04", "07"];
    const endMonth = ["12", "03", "06", "09"];

    let month = startMonth[quarter - 1];
    if (type == "end") {
        month = endMonth[quarter - 1];
    }

    let year = parseInt(quarterYear);
    if (quarter == 1) {
        // decrement the year by one for the first quarter of the fiscal year
        year = parseInt(quarterYear) - 1;
    }

    return month + '/' + year;
};