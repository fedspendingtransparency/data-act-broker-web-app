import chai from 'chai';
chai.use(require('chai-shallow-deep-equal'));
import { createStore } from 'redux';

import Moment from 'moment';

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
			name: 'appropriation',
			state: 'failed'
		};
		store.dispatch(uploadActions.setUploadState(simulateFailure));
		chai.expect(store.getState().submission.files.appropriation.state).to.equal('failed');

		// now change the state again
		const simulateSuccess = {
			name: 'appropriation',
			state: 'success'
		};
		store.dispatch(uploadActions.setUploadState(simulateSuccess));
		chai.expect(store.getState().submission.files.appropriation.state).to.equal('success');

	});


	it('setMeta action creator should update the submission\'s metadata', () => {

		chai.expect(store.getState().submission.meta).to.shallowDeepEqual({});

		const meta = {
			agency: "Test Agency",
			startDate: Moment('2015-01-01', 'YYYY-MM-DD'),
			endDate: Moment('2016-01-01', 'YYYY-MM-DD')
		};

		store.dispatch(uploadActions.setMeta(meta));
		chai.expect(store.getState().submission.meta).to.shallowDeepEqual(meta);

	});

	it('setSubmissionId action creator should update the submission\'s submission ID', () => {

		chai.expect(store.getState().submission.id).to.be.equal(null);

		const submissionId = 123;

		store.dispatch(uploadActions.setSubmissionId(submissionId));
		chai.expect(store.getState().submission.id).to.be.equal(123);

	});


	it('resetSubmission action creator should reset the submission\'s store to its default state', () => {

		// make some changes to the submission
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

		// now reset the submission
		store.dispatch(uploadActions.resetSubmission());

		const storeState = store.getState().submission;
		const files = Object.keys(storeState.files);
		
		// there should be no files left
		chai.expect(files.length).to.equal(0);

	});

});