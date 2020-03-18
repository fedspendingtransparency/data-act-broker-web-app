/**
 * ActiveDashboard.jsx
 * Created by Lizzie Salita 3/10/20
 */

import React from 'react';
import PropTypes from 'prop-types';

import ActiveDashboardOverviewContainer from 'containers/dashboard/ActiveDashboardOverviewContainer';

const propTypes = {
    submissionID: PropTypes.number
};

const ActiveDashboard = (props) => (
    <div className="dashboard-page-active">
        <ActiveDashboardOverviewContainer errorLevel={"warning"} />
        <div className="dashboard-page__content dashboard-page__content_below">
            <h2>Active Submission Summary</h2>
            <hr />
            {props.submissionID}
        </div>
    </div>
);

ActiveDashboard.propTypes = propTypes;
export default ActiveDashboard;
