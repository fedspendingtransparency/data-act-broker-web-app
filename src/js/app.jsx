import React from 'react';
import ReactDOM from 'react-dom';
import axe from 'react-axe';
import 'babel-polyfill';
import AppContainer from './containers/AppContainer';

const documentLocation = document.getElementById('app');

if (process.env.NODE_ENV !== 'production') {
    // logs accessbility issues to the dev console
    axe(React, ReactDOM, 1000);
}

ReactDOM.render(
    (
        <AppContainer />
    ), documentLocation,
);
