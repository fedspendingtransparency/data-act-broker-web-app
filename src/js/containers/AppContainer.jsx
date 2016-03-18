/**
* AppContainer.jsx
* Created by Kevin Li 3/16/15
**/

import React from 'react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import RouterContainer from './RouterContainer.jsx';

import reducers from '../redux/reducers/index.js';

// create the state store
const store = createStore(reducers, {},
	window.devToolsExtension ? window.devToolsExtension() : undefined
);

export default class AppContainer extends React.Component {
	render() {
		return (
			<Provider store={store}>
				<RouterContainer store={store} />
			</Provider>
		);
	}
}
