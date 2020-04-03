/**
 * ActiveDashboard.jsx
 * Created by Lizzie Salita 3/10/20
 */

import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import ActiveDashboardOverviewContainer from 'containers/dashboard/ActiveDashboardOverviewContainer';
import ActiveDashboardImpactsContainer from 'containers/dashboard/ActiveDashboardImpactsContainer';
import SignificanceGraphContainer from 'containers/dashboard/graph/SignificanceGraphContainer';
import ActiveDashboardTableContainer from 'containers/dashboard/table/ActiveDashboardTableContainer';

const propTypes = {
    submissionID: PropTypes.string,
    numResults: PropTypes.number,
    backToList: PropTypes.func
};

const ActiveDashboard = (props) => (
    <div className="dashboard-page-active">
        <div className="dashboard-page__content">
            {props.numResults > 1 ?
                <button
                    onClick={props.backToList}
                    className="back-button">
                    <div className="button-wrapper">
                        <div className="button-icon">
                            <FontAwesomeIcon icon="angle-left" />
                        </div>
                        <div className="button-content">
                            Dashboard Submission Selection
                        </div>
                    </div>
                </button> : null}
            <ActiveDashboardOverviewContainer errorLevel="warning" submissionID={props.submissionID} />
        </div>
        <div className="dashboard-page__content dashboard-page__content_below">
            <h2>Active Submission Summary</h2>
            <hr />
            <ActiveDashboardImpactsContainer errorLevel="warning" submissionID={props.submissionID} />
            <SignificanceGraphContainer errorLevel="warning" submissionID={props.submissionID} />
            <ActiveDashboardTableContainer submissionID={props.submissionID} />
        </div>
    </div>
);

ActiveDashboard.propTypes = propTypes;
export default ActiveDashboard;
