export const setErrors = (state) => ({
	type: 'SET_ERRORS',
	errors: state
})

export const resetErrors = (state) => ({
	type: 'SET_ERRORS',
	errors: {}
})