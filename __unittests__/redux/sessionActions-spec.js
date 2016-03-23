import chai from 'chai';
chai.use(require('chai-shallow-deep-equal'));
import { createStore } from 'redux';

import * as sessionActions from '../../src/js/redux/actions/sessionActions.js';
import reducers from '../../src/js/redux/reducers/index.js';


describe('Login Redux state', () => {

	it('should default to a pending state', () => {
		const store = createStore(reducers, {});
		const expectedLogin = 'pending';


		chai.expect(store.getState().session.login).to.equal(expectedLogin);
	})

	it('action creator should set the login state as a string', () => {
		const loginState = 'loggedIn';
		const expectedAction = {
			type: 'SET_LOGIN_STATE',
			login: loginState
		};

		chai.expect(sessionActions.setLoginState(loginState)).to.shallowDeepEqual(expectedAction);
	});

	it('session action creator should set the login state as a string', () => {
		const session = {
			login: 'loggedIn',
			user: {},
			admin: false
		};
		const expectedAction = {
			type: 'SET_SESSION',
			login: 'loggedIn',
			user: {},
			admin: false
		};

		chai.expect(sessionActions.setSession(session)).to.shallowDeepEqual(expectedAction);
	});

	it('logout convenience action creator should set the login state to \'loggedOut\', clear the user object, and set admin to false', () => {


		const expectedAction = {
			type: 'SET_SESSION',
			login: 'loggedOut',
			user: {},
			admin: false
		};
		chai.expect(sessionActions.setLoggedOut()).to.shallowDeepEqual(expectedAction);

	});
});