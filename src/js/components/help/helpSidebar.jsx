/**
 * HelpSidebar.jsx
 * Created by Mike Bray 4/1/16
 */

import { Link } from 'react-router';
import PropTypes from 'prop-types';

const propTypes = {
    latestRelease: PropTypes.string,
    type: PropTypes.string
};

const HelpSidebar = (props) => {
    const help = props.type === 'fabs' ? "/FABSHelp" : '/help';
    const history = props.type === 'fabs' ? "/#FABSHistory" : '/history';
    const technicalHistory = props.type === 'fabs' ? "/FABSTechnicalHistory" : '/technicalHistory';
    const resources = props.type === 'fabs' ? "/FABSResources" : '/resources';
    let schedule = null;
    if (props.type === 'dabs') {
        schedule = (
            <div>
                <h6>Submission Deadlines</h6>
                <ul>
                    <li>
                        <a
                            target="_blank"
                            rel="noopener noreferrer"
                            href={"https://tfx.treasury.gov/system/files/2025-04/" +
                                    "fy25-dabs-reporting-window-schedule.xlsx"}>
                        Fiscal Year 2025 DABS Reporting Schedule
                        </a>
                    </li>
                    <li>
                        <a
                            target="_blank"
                            rel="noopener noreferrer"
                            href={"https://tfx.treasury.gov/system/files/2025-09/" +
                                "fy26-dabs-reporting-window-schedule.xlsx"}>
                        Fiscal Year 2026 DABS Reporting Schedule
                        </a>
                    </li>
                </ul>
            </div>
        );
    }

    return (
        <div className="usa-da-help-sidebar">
            {schedule}
            <h6>Release Notes</h6>
            <ul>
                <li>
                    <Link to={`${help}`}>
                        Latest: {props.latestRelease}
                    </Link>
                </li>
                <li>
                    <Link to={history}>Release Notes Archive</Link>
                </li>
                <li>
                    <Link to={technicalHistory}>Technical Notes Archive</Link>
                </li>
            </ul>
            <h6>Getting More Help</h6>
            <ul>
                <li>
                    <Link to={resources}>Resources - GSDM</Link>
                </li>
            </ul>
            <div className="usa-da-help-sidebar__signup">
                <div className="usa-da-help-sidebar__signup-content">
                    <span
                        className="usa-da-help-sidebar__signup-header usa-da-help-sidebar__signup-header_bold">
                        Receive Data Broker Updates
                    </span>
                    <p>Subscribe to a list-serv for Data Broker updates as well as regular release notes.</p>
                    <a
                        className="usa-da-help-sidebar__signup-btn"
                        href="mailto:join-data-act-broker@lists.fiscal.treasury.gov?subject=
                        Sign%20Up%20for%20Broker%20Updates&body=Yes%2C%20sign%20me%20up%20for
                        Data%20Broker%20Updates!">
                        Sign Up
                    </a>
                </div>
            </div>
        </div>
    );
};

HelpSidebar.propTypes = propTypes;
export default HelpSidebar;
