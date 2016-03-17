const initialSessionState = {
	login: 'loggedOut',
	user: {}
}

export const sessionReducer = (state = initialSessionState, action) => {
	switch (action.type) {
		case 'SET_LOGIN_STATE':
			return Object.assign({}, state, {
					login: action.login
				});
		case 'SET_ACTIVE_USER':
			return Object.assign({}, state, {
				user: action.user
			});
		default:
			return state;
	}
}