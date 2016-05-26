const initialState = {
	users: [],
	activeUser: {}
}

export const adminUserListReducer = (state = initialState, action) => {
	switch (action.type) {
		case 'SET_USER_LIST':
			return Object.assign({}, state, {
				users: action.users
			});
		case 'SET_ACTIVE_USER':
			return Object.assign({}, state, {
				activeUser: action.user
			});
		case 'CLEAR_ACTIVE_USER':
			return Object.assign({}, state, {
				activeUser: {}
			});
		default:
			return state;
	}
}