import React from 'react';
import ReactDOM from 'react-dom';
import AppContainer from './containers/AppContainer';

require("core-js");
require('../css/main.scss');

const documentLocation = document.querySelector('body');

ReactDOM.render(
    <AppContainer />,
    documentLocation
);

