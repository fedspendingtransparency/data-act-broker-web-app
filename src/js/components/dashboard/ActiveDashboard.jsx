/**
 * ActiveDashboard.jsx
 * Created by Lizzie Salita 3/10/20
 */

import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
    submissionID: PropTypes.string
};

const ActiveDashboard = (props) => (
    <div className="dashboard-page-active">
        <div className="dashboard-page__content">
            <h2>Agency Name</h2>
            <hr />
            Summary section
        </div>
        <div className="dashboard-page__content dashboard-page__content_below">
            <h2>Active Submission Summary</h2>
            <hr />
            {props.submissionID}
        </div>
    </div>
);

ActiveDashboard.propTypes = propTypes;
export default ActiveDashboard;
