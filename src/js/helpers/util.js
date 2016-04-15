
import { kGlobalConstants } from '../GlobalConstants.js';

export const fetchStaticAssetPath = () => {
	let imgSrc = '';
	if (kGlobalConstants.DEV) {
    	imgSrc = 'dev/';
	}
	return imgSrc;
};