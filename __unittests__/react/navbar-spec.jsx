import React from 'react';
import TestUtils from 'react-addons-test-utils';
import chai from 'chai';
import sinon from 'sinon';

import { createStore } from 'redux';
import { Provider } from 'react-redux';

import * as sessionActions from '../../src/js/redux/actions/sessionActions.js';
import reducers from '../../src/js/redux/reducers/index.js';
import StoreSingleton from '../../src/js/redux/storeSingleton.js';

import NavbarConnected, { Navbar } from '../../src/js/components/SharedComponents/navigation/NavigationComponent.jsx';
import UserButton from '../../src/js/components/SharedComponents/navigation/UserButton.jsx';

describe('Navbar component', () => {

	let store = null;
	let rendered = null;

	beforeEach(() => {
		// set up the store
		store = createStore(reducers, {});
		
		// render the Component inside a React-Redux provider
		rendered = TestUtils.renderIntoDocument(
			<Provider store={store}>
		 		<NavbarConnected />
		 	</Provider>
		);
	});

	afterEach(() => {
		store = null;
		rendered = null;
	})

	it('should not display an Admin button by default', () => {

		// populate the store (which will also update the component)
		const sessionData = {
			login: 'loggedIn',
			user: {
				name: 'Test',
				permissions: [0]
			},
			admin: false
		};
		store.dispatch(sessionActions.setSession(sessionData));

		// find the React component inside the Redux wrapper
		const navbar = TestUtils.findRenderedComponentWithType(rendered, Navbar);
		
		// iterate through the links that are rendered in the navbar
		const links = TestUtils.scryRenderedDOMComponentsWithTag(navbar, 'a');
		let foundAdmin = false;
		links.forEach((link) => {
			if (link.getAttribute('href') == '#/admin') {
				foundAdmin = true;
			}
		});

		chai.expect(foundAdmin).to.be.false;

	});

	it('should display an Admin button when the Redux state indicates the user is an admin', () => {

		// populate the store (which will also update the component)
		const sessionData = {
			login: 'loggedIn',
			user: {
				name: 'Test',
				permissions: [0, 1]
			},
			admin: true
		};
		store.dispatch(sessionActions.setSession(sessionData));

		// find the React component inside the Redux wrapper
		const navbar = TestUtils.findRenderedComponentWithType(rendered, Navbar);
		
		// iterate through the links that are rendered in the navbar
		const links = TestUtils.scryRenderedDOMComponentsWithTag(navbar, 'a');
		let foundAdmin = false;
		links.forEach((link) => {
			if (link.getAttribute('href') == '#/admin') {
				foundAdmin = true;
			}
		});

		chai.expect(foundAdmin).to.be.true;

	});

	it('should display the user name from the Redux state', () => {
		const sessionData = {
			login: 'loggedIn',
			user: {
				name: 'Test',
				permissions: [0, 1]
			},
			admin: true
		};
		store.dispatch(sessionActions.setSession(sessionData));

		// find the React component inside the Redux wrapper
		const navbar = TestUtils.findRenderedComponentWithType(rendered, Navbar);
		
		// find the user button
		const user = TestUtils.findRenderedComponentWithType(navbar, UserButton);
		const userLink = TestUtils.findRenderedDOMComponentWithClass(user, 'usa-da-user-info');

		const userText = userLink.textContent;
		const expectedText = 'Welcome, Test';

		chai.expect(userText).to.equal(expectedText);

	});

});