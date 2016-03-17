export const setLoginState = (state) => {
	return {
		type: 'SET_LOGIN_STATE',
		login: state
	}
}

export const setActiveUser = (state) => ({
	type: 'SET_ACTIVE_USER',
	user: state.user
})