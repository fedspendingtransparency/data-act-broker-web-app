import React from 'react';
import ReactDOM from 'react-dom';
import 'babel-polyfill';
import AppContainer from './containers/AppContainer';

const documentLocation = document.getElementById('app');

ReactDOM.render(
    (
        <AppContainer />
    ), documentLocation,
);
