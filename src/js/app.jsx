import React from 'react';
import ReactDOM from 'react-dom';
import "babel-polyfill";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
    faAngleDown,
    faArrowCircleLeft,
    faCalendarAlt,
    faCaretDown,
    faCaretUp,
    faChevronDown,
    faEllipsisH,
    faExclamationCircle,
    faFileAlt,
    faFileUpload,
    faLandmark,
    faSearch,
    faSpinner,
    faTimes,
    faUser
} from "@fortawesome/free-solid-svg-icons";
import AppContainer from './containers/AppContainer';

library.add(
    faAngleDown,
    faArrowCircleLeft,
    faCalendarAlt,
    faCaretDown,
    faCaretUp,
    faChevronDown,
    faEllipsisH,
    faExclamationCircle,
    faFileAlt,
    faFileUpload,
    faLandmark,
    faSearch,
    faSpinner,
    faTimes,
    faUser
);

require("core-js");
require('../css/main.scss');

const documentLocation = document.getElementById('app');

ReactDOM.render(
    <AppContainer />,
    documentLocation
);
