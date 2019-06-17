import React from 'react';
import ReactDOM from 'react-dom';
import AppContainer from './containers/AppContainer';

require("core-js");
require('../css/main.scss');

const documentLocation = document.getElementById('app');

ReactDOM.render(
    <AppContainer />,
    documentLocation
);

