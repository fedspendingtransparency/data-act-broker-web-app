import AWS from 'aws-sdk';
import Q from 'q';
import { kGlobalConstants } from '../GlobalConstants.js';
import Request from './sessionSuperagent.js';

export const fetchStaticAssetPath = () => {
	let imgSrc = '';
	return imgSrc;
};

export const generateRSSUrl = () => {

	const deferred = Q.defer();

	Request.get(kGlobalConstants.API + 'get_rss/')
		.send()
		.end((err, res) => {
			if (err) {
				deferred.reject(err);
			}
			else {
				deferred.resolve(res.body.rss_url);
			}
		})

	return deferred.promise;
}