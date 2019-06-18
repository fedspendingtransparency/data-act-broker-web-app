import React from 'react';
import ReactDOM from 'react-dom';
import axe from 'react-axe';
import AppContainer from './containers/AppContainer';

require("core-js");
require('../css/main.scss');

const documentLocation = document.getElementById('app');

if (process.env.NODE_ENV !== 'production') {
    // logs accessbility issues to the dev console
    axe(React, ReactDOM, 1000);
}

ReactDOM.render(
    <AppContainer />,
    documentLocation
);

