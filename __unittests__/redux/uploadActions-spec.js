import chai from 'chai';
chai.use(require('chai-shallow-deep-equal'));
import { createStore } from 'redux';

import * as uploadActions from '../../src/js/redux/actions/uploadActions.js';
import reducers from '../../src/js/redux/reducers/index.js';


describe('Upload Redux state', () => {

	let store = null;

	beforeEach(() => {
		store = createStore(reducers, {});		
	});

	afterEach(() => {
		store = null;
	});

	it('setUploadItem action creator should add a file to the submission store', () => {
		const uploadItem = {
			name: 'appropriation',
			file: {},
			state: 'ready'
		};

		const expectedState = {
			appropriation: {
				state: 'ready'
			}
		};

		store.dispatch(uploadActions.setUploadItem(uploadItem));
		chai.expect(store.getState().submission.files).to.shallowDeepEqual(expectedState);
	});

	it('setSubmissionState action creator should change the state of the submission store', () => {
		const newState = 'ready';

		const expectedState = 'ready';

		store.dispatch(uploadActions.setSubmissionState(newState));
		chai.expect(store.getState().submission.state).to.equal(expectedState);
	});

	it('setUploadProgress action creator should update the progress of a file item', () => {

		const uploadItem = {
			name: 'appropriation',
			file: {},
			state: 'ready'
		};
		store.dispatch(uploadActions.setUploadItem(uploadItem));
		chai.expect(store.getState().submission.files.appropriation.progress).to.equal(0);

		const firstUpdate = {
			name: 'appropriation',
			progress: 10
		};
		store.dispatch(uploadActions.setUploadProgress(firstUpdate));
		chai.expect(store.getState().submission.files.appropriation.progress).to.equal(10);


		const secondUpdate = {
			name: 'appropriation',
			progress: 25
		};
		store.dispatch(uploadActions.setUploadProgress(secondUpdate));
		chai.expect(store.getState().submission.files.appropriation.progress).to.equal(25);
	});

	it('setUploadState action creator should update the state of a file item', () => {

		const uploadItem = {
			name: 'appropriation',
			file: {},
			state: 'ready'
		};

		// set the initial state
		store.dispatch(uploadActions.setUploadItem(uploadItem));
		chai.expect(store.getState().submission.files.appropriation.state).to.equal('ready');


		// now change the state
		const simulateFailure = {
			name: 'appropriation'
		};
		store.dispatch(uploadActions.setUploadFailed(simulateFailure));
		chai.expect(store.getState().submission.files.appropriation.state).to.equal('failed');
		chai.expect(store.getState().submission.state).to.equal('ready');
	});

});