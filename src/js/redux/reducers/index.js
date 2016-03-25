import { combineReducers } from 'redux';

import { sessionReducer } from './sessionReducer.js';

const appReducer = combineReducers({
	session: sessionReducer
});

export default appReducer;