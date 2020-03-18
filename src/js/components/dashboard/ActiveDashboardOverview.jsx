/**
 * ActiveDashboardOverview.jsx
 * Created by Alisa Burdeyny 4/17/2020
 */

import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
    submissionData: PropTypes.object,
    errorLevel: PropTypes.string
};

const ActiveDashboardOverview = (props) => (
    <div className="dashboard-page__content">
        <div className="dashboard-page__submission-overview">
            <h2>{props.submissionData.agency_name}</h2>
            <hr />
            <div className="submission-overview-details">
                <h3>Submission Period</h3>
                <div className="flex-wrapper">
                    <div className="overview-section">
                        <h4>Certification Due</h4>
                        {props.submissionData.certification_deadline}
                    </div>
                    <div className="overview-section">
                        <h4>Days Left Until Certification</h4>
                        {props.submissionData.days_remaining}
                    </div>
                    <div className="overview-section">
                        <h4>Reporting Period</h4>
                        {props.submissionData.reporting_period}
                    </div>
                    <div className="overview-section">
                        <h4>Duration</h4>
                        {props.submissionData.duration}
                    </div>
                </div>
                <h3>Submission Status ({props.errorLevel}s)</h3>
                <div className="flex-wrapper">
                    <div className="overview-section">
                        <h4>Submission ID</h4>
                        {props.submissionData.submission_id}
                    </div>
                    <div className="overview-section">
                        <h4>Validation Type</h4>
                        {props.submissionData.file}
                    </div>
                    <div className="overview-section">
                        <h4>Number of Rules</h4>
                        {props.submissionData.number_of_rules}
                    </div>
                    <div className="overview-section">
                        <h4>Total # of Warings</h4>
                        {props.submissionData.total_instances}
                    </div>
                </div>
            </div>
        </div>
    </div>
);

ActiveDashboardOverview.propTypes = propTypes;
export default ActiveDashboardOverview;