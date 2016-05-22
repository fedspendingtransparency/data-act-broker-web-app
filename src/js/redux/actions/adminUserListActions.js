export const setUserList = (state) => ({
	type: 'SET_USER_LIST',
	users: state
})

export const setActiveUser = (state) => ({
	type: 'SET_ACTIVE_USER',
	user: state
})

export const clearActiveUser = (state) => ({
	type: 'CLEAR_ACTIVE_USER'
})