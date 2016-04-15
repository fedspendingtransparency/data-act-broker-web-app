import chai from 'chai';
import { createStore } from 'redux';
import Request from 'superagent';
import Cookies from 'js-cookie';
import sinon from 'sinon';
import Q from 'q';

import * as sessionActions from '../../src/js/redux/actions/sessionActions.js';
import reducers from '../../src/js/redux/reducers/index.js';
import StoreSingleton from '../../src/js/redux/storeSingleton.js';

import * as LoginHelper from '../../src/js/helpers/loginHelper.js';


const sandbox = sinon.sandbox.create();

const mockPost = (err, res) => {
	let postRequest = sandbox.stub(Request, 'post')
			.returns({
				withCredentials: () => ({
					send: () => ({
						end: (cb) => {
							cb(err, res);
						}
					})
				})
			})
}

const mockGet = (err, res) => {
	let postRequest = sandbox.stub(Request, 'get')
			.returns({
				withCredentials: () => ({
					send: () => ({
						end: (cb) => {
							cb(err, res);
						}
					})
				})
			})
}


describe('loginHelper', () => {

	beforeEach(() => {
		// set up a new Redux store for each test
		const store = createStore(reducers, {});
		const singleton = new StoreSingleton();
		singleton.setStore(store);

		// cookies can't be tested without a browser, so replace the cookie library with empty functions
		sandbox.stub(Cookies, 'set', () => {});
		sandbox.stub(Cookies, 'remove', () => {});
		sandbox.stub(Cookies, 'get', () => {});
	});

	afterEach(() => {
		sandbox.restore();
	});

	it('should set the login Redux state to \'failed\' on login failure', () => {

		mockPost({}, null);

		return LoginHelper.performLogin('user','pass')
		.catch((err) => {
			const store = new StoreSingleton().store;
			chai.expect(store.getState().session.login).to.equal('failed');
			
		});
	});

	it('should set the login Redux state to \'loggedIn\' on login success', () => {

		mockPost(null, {});
		mockGet(null, {
			body: {
				name: 'Name',
				permissions: [0]
			}
		});

		return LoginHelper.performLogin('user','pass')
		.then((res) => {
			const store = new StoreSingleton().store;
			chai.expect(store.getState().session.login).to.equal('loggedIn');
		});
	});

	it('should set the Redux login state to \'loggedOut\' when the logout function is called', () => {
		mockPost(null, {});

		return LoginHelper.performLogout()
		.then(() => {
			const store = new StoreSingleton().store;
			chai.expect(store.getState().session.login).to.equal('loggedOut');
		});
	});


	it('should store user data in the Redux session state after a successful login', () => {
		mockPost(null, {});
		mockGet(null, {
			body: {
				name: 'Test Name',
				permissions: [0]
			}
		});

		return LoginHelper.performLogin('user','pass')
		.then((res) => {
			const store = new StoreSingleton().store;
			chai.expect(store.getState().session.user).to.be.an('object');
			chai.expect(store.getState().session.user.name).to.equal('Test Name');
			chai.expect(store.getState().session.user.permissions).to.shallowDeepEqual([0]);
		});
	});

	it('should persist user data in the Redux store', () => {
		mockPost(null, {});
		mockGet(null, {
			body: {
				name: 'Test Name',
				permissions: [0]
			}
		});


		return LoginHelper.performLogin('user','pass')
		.then((res) => {
			return LoginHelper.fetchActiveUser();
		})
		.then(() => {
			const store = new StoreSingleton().store;

			chai.expect(store.getState().session.user).to.be.an('object');
			chai.expect(store.getState().session.user.name).to.equal('Test Name');
			chai.expect(store.getState().session.user.permissions).to.shallowDeepEqual([0]);
		})


	});

	it('should set the Redux admin state to \'false\' if the API does not return the admin permission', () => {
		
		mockGet(null, {
			body: {
				name: 'Test Name',
				permissions: [0]
			}
		});

		return LoginHelper.fetchActiveUser('user','pass')
		.then((res) => {
			const store = new StoreSingleton().store;
			chai.expect(store.getState().session.admin).to.equal(false);
		});

	});

	it('should set the Redux admin state to \'true\' if the API returns the admin permission', () => {

		mockGet(null, {
			body: {
				name: 'Test Name',
				permissions: [0, 1]
			}
		});

		return LoginHelper.fetchActiveUser('user','pass')
		.then((res) => {
			const store = new StoreSingleton().store;
			chai.expect(store.getState().session.admin).to.equal(true);
		});

	});

});