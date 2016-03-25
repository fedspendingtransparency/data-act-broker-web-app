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

export const setSubmissionState = (state) => ({
	type: 'SET_SUBMISSION_STATE',
	state: state
})