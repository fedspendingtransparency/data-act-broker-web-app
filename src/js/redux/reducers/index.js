import { combineReducers } from 'redux';

import { sessionReducer } from './sessionReducer.js';
import { uploadReducer } from './uploadReducer.js';
import { agencyReducer } from './agencyReducer.js';

const appReducer = combineReducers({
	session: sessionReducer,
	submission: uploadReducer,
	agencyList: agencyReducer
});

export default appReducer;