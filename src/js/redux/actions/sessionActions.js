export const setLoginState = (state) => ({
	type: 'SET_LOGIN_STATE',
	login: state

})

export const setActiveUser = (state) => ({
	type: 'SET_ACTIVE_USER',
	user: state
})

export const setAdmin = (state) => ({
	type: 'SET_ADMIN',
	admin: state
})

export const setSession = (state) => ({
	type: 'SET_SESSION',
	login: state.login,
	user: state.user,
	admin: state.admin
})