import { combineReducers } from 'redux';

import { registrationReducer } from './registrationReducer.js';
import { sessionReducer } from './sessionReducer.js';
import { uploadReducer } from './uploadReducer.js';

const appReducer = combineReducers({
	registration: registrationReducer,
	session: sessionReducer,
	submission: uploadReducer
});

export default appReducer;