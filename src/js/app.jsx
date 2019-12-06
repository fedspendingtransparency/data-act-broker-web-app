import React from 'react';
import ReactDOM from 'react-dom';
import "babel-polyfill";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
    faAngleDown,
    faArrowCircleLeft,
    faSpinner,
    faTimes,
    faLandmark,
    faFileAlt,
    faCalendarAlt,
    faFileUpload,
    faUser
} from "@fortawesome/free-solid-svg-icons";
import AppContainer from './containers/AppContainer';

library.add(
    faAngleDown,
    faArrowCircleLeft,
    faSpinner,
    faTimes,
    faLandmark,
    faFileAlt,
    faCalendarAlt,
    faFileUpload,
    faUser
);

require("core-js");
require('../css/main.scss');

const documentLocation = document.getElementById('app');

ReactDOM.render(
    <AppContainer />,
    documentLocation
);
