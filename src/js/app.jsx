import React from 'react';
import { createRoot } from "react-dom/client";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
    faAngleDown,
    faAngleUp,
    faAngleLeft,
    faAngleRight,
    faArrowRotateRight,
    faBars,
    faBell,
    faCaretDown,
    faCaretUp,
    faChevronDown,
    faChevronUp,
    faCircle,
    faCircleArrowLeft,
    faCircleCheck,
    faCircleExclamation,
    faCircleInfo,
    faCircleXmark,
    faClipboardCheck,
    faCloudArrowDown,
    faCloudArrowUp,
    faEarthAmericas,
    faFileArrowUp,
    faFilter,
    faGear,
    faLock,
    faMagnifyingGlass,
    faRightFromBracket,
    faSpinner,
    faTriangleExclamation,
    faUser,
    faXmark
} from "@fortawesome/free-solid-svg-icons";
import {
    faGithub
} from "@fortawesome/free-brands-svg-icons";
import {
    faBuilding,
    faCalendarDays,
    faClock,
    faFloppyDisk,
    faTrashCan
} from "@fortawesome/free-regular-svg-icons";
import AppContainer from './containers/AppContainer';
import "../../node_modules/react-day-picker/src/style.css";

library.add(
    faAngleDown,
    faAngleUp,
    faAngleLeft,
    faAngleRight,
    faArrowRotateRight,
    faBars,
    faBell,
    faBuilding,
    faCalendarDays,
    faCaretDown,
    faCaretUp,
    faChevronDown,
    faChevronUp,
    faCircle,
    faCircleArrowLeft,
    faCircleCheck,
    faCircleExclamation,
    faCircleInfo,
    faCircleXmark,
    faClipboardCheck,
    faClock,
    faCloudArrowDown,
    faCloudArrowUp,
    faEarthAmericas,
    faFileArrowUp,
    faFilter,
    faFloppyDisk,
    faGear,
    faGithub,
    faLock,
    faMagnifyingGlass,
    faRightFromBracket,
    faSpinner,
    faTrashCan,
    faTriangleExclamation,
    faUser,
    faXmark
);

require("core-js");
require('../css/main.scss');

const documentLocation = document.getElementById('app');
const root = createRoot(documentLocation);
const App = root.render(
    <AppContainer />
);
export default App;
