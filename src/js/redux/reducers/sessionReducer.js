const initialSessionState = {
	login: 'pending',
	user: {},
	admin: false
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
		case 'SET_ADMIN':
			return Object.assign({}, state, {
				admin: action.admin
			});
		case 'SET_SESSION': 
			return Object.assign({}, state, {
				login: action.login,
				user: action.user,
				admin: action.admin
			});
		default:
			return state;
	}
}