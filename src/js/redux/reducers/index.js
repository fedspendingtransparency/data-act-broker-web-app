import { combineReducers } from 'redux';

import { sessionReducer } from './sessionReducer.js';
import { uploadReducer } from './uploadReducer.js';

const appReducer = combineReducers({
	session: sessionReducer,
	submission: uploadReducer
});

export default appReducer;