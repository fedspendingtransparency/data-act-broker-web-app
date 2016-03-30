import _ from 'lodash';
import Moment from 'moment';

const initialUploadState = {
	state: 'empty',
	id: null,
	meta: {
		agency: '',
		startDate: null,
		endDate: null
	},
	files: {},
	validation: {
	}
}

const setUploadItem = (state, action) => {
	let newFile = {
		[action.name]: {
			state: action.state,
			file: action.file,
			progress: 0
		}
	};

	const files = Object.assign({}, state.files, newFile);

	return files;
}

const setUploadProgress = (state, action) => {
	let file = Object.assign({}, state.files[action.name]);
	file.progress = action.progress;

	let newFile = {
		[action.name]: file
	};

	const files = Object.assign({}, state.files, newFile);

	return files;
}

const setUploadState = (state, action) => {
	let file = Object.assign({}, state.files[action.name]);
	file.state = action.state;

	let newFile = {
		[action.name]: file
	};

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

		case 'SET_UPLOAD_STATE':

			return Object.assign({}, state, {
				files: setUploadState(state, action)
			});

		case 'SET_SUBMISSION_STATE':
			return Object.assign({}, state, {
				state: action.state
			});

		case 'SET_META':
			return Object.assign({}, state, {
				meta: action.state
			});

		case 'SET_SUBMISSION_ID':
			return Object.assign({}, state, {
				id: action.state
			});

		case 'SET_VALIDATION':
			return Object.assign({}, state, {
				validation: action.state
			});

		default:
			return state;
	}
}