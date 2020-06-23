import React from 'react';
import ReactDOM from 'react-dom';
import "babel-polyfill";
import 'react-dates/initialize';
import 'react-dates/lib/css/_datepicker.css';
import { library } from "@fortawesome/fontawesome-svg-core";
import {
    faAngleDown,
    faAngleUp,
    faAngleLeft,
    faAngleRight,
    faArrowCircleLeft,
    faBars,
    faCalendarAlt,
    faCaretDown,
    faCaretUp,
    faCheckCircle,
    faChevronDown,
    faChevronUp,
    faCircle,
    faClipboardCheck,
    faCog,
    faEllipsisH,
    faExclamationCircle,
    faExclamationTriangle,
    faFileAlt,
    faFileUpload,
    faFilter,
    faInfoCircle,
    faLandmark,
    faSearch,
    faSignOutAlt,
    faSpinner,
    faTimes,
    faUser
} from "@fortawesome/free-solid-svg-icons";
import AppContainer from './containers/AppContainer';

library.add(
    faAngleDown,
    faAngleUp,
    faAngleLeft,
    faAngleRight,
    faBars,
    faArrowCircleLeft,
    faCalendarAlt,
    faCaretDown,
    faCaretUp,
    faCheckCircle,
    faChevronDown,
    faChevronUp,
    faCircle,
    faClipboardCheck,
    faCog,
    faEllipsisH,
    faExclamationCircle,
    faExclamationTriangle,
    faFileAlt,
    faFileUpload,
    faFilter,
    faInfoCircle,
    faLandmark,
    faSearch,
    faSignOutAlt,
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
