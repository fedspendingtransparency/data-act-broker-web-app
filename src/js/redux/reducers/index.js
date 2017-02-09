import { combineReducers } from 'redux';

import { sessionReducer } from './sessionReducer.js';
import { uploadReducer } from './uploadReducer.js';
import { agencyReducer } from './agencyReducer.js';
import { subTierAgencyReducer } from './subTierAgencyReducer.js';

const appReducer = combineReducers({
	session: sessionReducer,
	submission: uploadReducer,
	agencyList: agencyReducer,
	subTierAgencyList: subTierAgencyReducer
});

export default appReducer;