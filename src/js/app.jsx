import React from 'react';
import ReactDOM from 'react-dom';
import AppContainer from './containers/AppContainer.jsx';

import Preloader from './preload.js';

const documentLocation = document.getElementById('app');

ReactDOM.render((
    <AppContainer />
), documentLocation);