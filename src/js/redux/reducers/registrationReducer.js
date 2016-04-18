const initialSessionState = {
	errors: {}
}

export const registrationReducer = (state = initialSessionState, action) => {
	switch (action.type) {
		case 'SET_ERRORS':
			return Object.assign({}, state, {
				errors: action.errors
			});
		default:
			return state;
	}
}