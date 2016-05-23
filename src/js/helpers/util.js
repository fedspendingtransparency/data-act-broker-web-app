import AWS from 'aws-sdk';
import Q from 'q';
import { kGlobalConstants } from '../GlobalConstants.js';
import Request from './sessionSuperagent.js';
import moment from 'moment';

export const generateRSSUrl = () => {

	let isCanceled = false;

	const deferred = Q.defer();

	Request.get(kGlobalConstants.API + 'get_rss/')
		.send()
		.end((err, res) => {

			if (isCanceled) {
				deferred.reject('canceled');
			}
			else {
				if (err) {
					deferred.reject(err);
				}
				else {
					deferred.resolve(res.body.rss_url);
				}
			}
		});

	return {
		promise: deferred.promise,
		cancel: () => {
			isCanceled = true;
		}
	}
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