export const setUploadItem = (state) => ({
	type: 'SET_UPLOAD_ITEM',
	name: state.name,
	file: state.file,
	state: state.state,
})

export const setUploadProgress = (state) => ({
	type: 'SET_UPLOAD_PROGRESS',
	name: state.name,
	progress: state.progress
})

export const setUploadState = (state) => ({
	type: 'SET_UPLOAD_STATE',
	name: state.name,
	state: state.state
})

export const setSubmissionState = (state) => ({
	type: 'SET_SUBMISSION_STATE',
	state: state
})

export const setMeta = (state) => ({
	type: 'SET_META',
	state: state
})

export const setSubmissionId = (state) => ({
	type: 'SET_SUBMISSION_ID',
	state: state
});

export const setValidation = (state) => ({
	type: 'SET_VALIDATION',
	state: state
})