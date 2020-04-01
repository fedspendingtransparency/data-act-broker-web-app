/**
 * ActiveDashboard.jsx
 * Created by Lizzie Salita 3/10/20
 */

import React from 'react';
import PropTypes from 'prop-types';

import ActiveDashboardOverviewContainer from 'containers/dashboard/ActiveDashboardOverviewContainer';
import ActiveDashboardTableContainer from 'containers/dashboard/table/ActiveDashboardTableContainer';

const propTypes = {
    submissionID: PropTypes.string
};

const ActiveDashboard = (props) => (
    <div className="dashboard-page-active">
        <ActiveDashboardOverviewContainer errorLevel="warning" submissionID={props.submissionID} />
        <div className="dashboard-page__content dashboard-page__content_below">
            <h2>Active Submission Summary</h2>
            <hr />
            {props.submissionID}
            <ActiveDashboardTableContainer submissionID={props.submissionID} />
        </div>
    </div>
);

ActiveDashboard.propTypes = propTypes;
export default ActiveDashboard;
