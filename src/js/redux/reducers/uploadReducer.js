import _ from 'lodash';

const initialUploadState = {
	state: 'empty',
	files: {}
}

const setUploadItem = (state, action) => {
	let newFile = {};
	newFile[action.name] = {
		state: action.state,
		file: action.file,
		progress: 0
	};

	const files = Object.assign({}, state.files, newFile);

	return files;
}

const setUploadProgress = (state, action) => {
	let file = Object.assign({}, state.files[action.name]);
	file.progress = action.progress;

	let newFile = {};
	newFile[action.name] = file;

	const files = Object.assign({}, state.files, newFile);

	return files;
}

export const uploadReducer = (state = initialUploadState, action) => {
	switch (action.type) {
		case 'SET_UPLOAD_ITEM':

			return Object.assign({}, state, {
				files: setUploadItem(state, action)
			});

		case 'SET_UPLOAD_PROGRESS':

			return Object.assign({}, state, {
				files: setUploadProgress(state, action)
			});

		case 'SET_SUBMISSION_STATE':
			return Object.assign({}, state, {
				state: action.state
			});

		default:
			return state;
	}
}