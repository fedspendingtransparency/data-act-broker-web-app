import React from 'react';
import ReactDOM from 'react-dom';
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
    faCloudUploadAlt,
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
    faLock,
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
    faBuilding,
    faCalendarAlt,
    faClock,
    faSave,
    faTrashAlt
} from "@fortawesome/free-regular-svg-icons";
import AppContainer from './containers/AppContainer';
import "../../node_modules/react-day-picker/src/style.css";

library.add(
    faAngleDown,
    faAngleUp,
    faAngleLeft,
    faAngleRight,
    faArrowCircleLeft,
    faBars,
    faBell,
    faBuilding,
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
    faCloudUploadAlt,
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
    faLock,
    faRedo,
    faSave,
    faSearch,
    faSignOutAlt,
    faSpinner,
    faTimes,
    faTimesCircle,
    faTrashAlt,
    faUser
);

require("core-js");
require('../css/main.scss');

const documentLocation = document.getElementById('app');

ReactDOM.render(
    <AppContainer />,
    documentLocation
);
