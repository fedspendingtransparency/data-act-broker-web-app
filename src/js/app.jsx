import React from 'react';
import ReactDOM from 'react-dom';
import { library } from "@fortawesome/fontawesome-svg-core";
import {
    faAngleDown,
    faArrowCircleLeft,
    faSpinner,
    faTimes,
    faCaretUp,
    faCaretDown
} from "@fortawesome/free-solid-svg-icons";
import AppContainer from './containers/AppContainer';

library.add(
    faAngleDown,
    faArrowCircleLeft,
    faSpinner,
    faTimes,
    faCaretUp,
    faCaretDown
);

require("core-js");
require('../css/main.scss');

const documentLocation = document.getElementById('app');

ReactDOM.render(
    <AppContainer />,
    documentLocation
);
