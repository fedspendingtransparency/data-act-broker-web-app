const initialState = {
	users: []
}

export const adminUserListReducer = (state = initialState, action) => {
	switch (action.type) {
		case 'SET_USER_LIST':
			return Object.assign({}, state, {
				users: action.users
			});
		default:
			return state;
	}
}