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
    faBell,
    faCalendarAlt,
    faCaretDown,
    faCaretLeft,
    faCaretRight,
    faCaretUp,
    faCheck,
    faCheckCircle,
    faChevronDown,
    faChevronRight,
    faChevronUp,
    faCircle,
    faClipboardCheck,
    faCloudDownloadAlt,
    faCog,
    faEllipsisH,
    faExclamationCircle,
    faExclamationTriangle,
    faFileAlt,
    faFileUpload,
    faFilter,
    faGlobeAmericas,
    faInfoCircle,
    faLandmark,
    faRedo,
    faSearch,
    faSignOutAlt,
    faSpinner,
    faTimes,
    faTimesCircle,
    faUser
} from "@fortawesome/free-solid-svg-icons";
import {
    faGithub
} from "@fortawesome/free-brands-svg-icons";
import {
    faClock
} from "@fortawesome/free-regular-svg-icons";
import AppContainer from './containers/AppContainer';

library.add(
    faAngleDown,
    faAngleUp,
    faAngleLeft,
    faAngleRight,
    faArrowCircleLeft,
    faBars,
    faBell,
    faCalendarAlt,
    faCaretDown,
    faCaretLeft,
    faCaretRight,
    faCaretUp,
    faCheck,
    faCheckCircle,
    faChevronDown,
    faChevronRight,
    faChevronUp,
    faCircle,
    faClipboardCheck,
    faClock,
    faCloudDownloadAlt,
    faCog,
    faEllipsisH,
    faExclamationCircle,
    faExclamationTriangle,
    faFileAlt,
    faFileUpload,
    faFilter,
    faGithub,
    faGlobeAmericas,
    faInfoCircle,
    faLandmark,
    faRedo,
    faSearch,
    faSignOutAlt,
    faSpinner,
    faTimes,
    faTimesCircle,
    faUser
);

require("core-js");
require('../css/main.scss');

const documentLocation = document.getElementById('app');

ReactDOM.render(
    <AppContainer />,
    documentLocation
);
