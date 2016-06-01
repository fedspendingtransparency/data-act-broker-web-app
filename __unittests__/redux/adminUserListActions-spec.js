import chai from 'chai';
chai.use(require('chai-shallow-deep-equal'));
import { createStore } from 'redux';
import _ from 'lodash';

import * as adminUserListActions from '../../src/js/redux/actions/adminUserListActions.js';
import reducers from '../../src/js/redux/reducers/index.js';


describe('Admin User List Redux state', () => {

	it('should default to an empty array', () => {
		const store = createStore(reducers, {});
		const expectedUsers = [];

		const isEqual = _.isEqual(store.getState().adminUsers.users, expectedUsers);

		chai.expect(isEqual).to.be.true;
	});

	it ('should populate the user array when setUserList is called', () => {
		const store = createStore(reducers, {});
		const expectedUser = {
			id: 1,
			name: 'User Name',
			title: 'Title',
			agency: 'Agency',
			email: 'email@internet.com',
			status: 'approved',
			permissions: ['website_admin'],
			'is_active': true
		}

		const action = adminUserListActions.setUserList([expectedUser]);
		store.dispatch(action);

		const expectedUsers = [expectedUser];

		const isEqual = _.isEqual(store.getState().adminUsers.users, expectedUsers);

		chai.expect(isEqual).to.be.true;
	});
});