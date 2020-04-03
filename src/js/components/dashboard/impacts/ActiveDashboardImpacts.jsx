/**
 * ActiveDashboardImpacts.jsx
 * Created by Daniel Boos 4/1/2020
 */

import React from 'react';
import PropTypes from 'prop-types';

import ImpactGauge from 'components/dashboard/impacts/ImpactGauge';

const propTypes = {
    submissionData: PropTypes.object
};

const ActiveDashboardImpacts = ({submissionData}) => (
    <div className="dashboard-page__impacts">
        <h3>Warning Status</h3>
        <hr />
        <h4>Impact Count</h4>
        <p>
            Identify to what degree current warnings impact your submission.
            The values have been preset by your agency.
        </p>
        {submissionData ?
            <div className="flex-wrapper">
                <ImpactGauge level="low" submissionData={submissionData.low} />
                <ImpactGauge level="medium" submissionData={submissionData.medium} />
                <ImpactGauge level="high" submissionData={submissionData.high} />
            </div> : ''}
    </div>
);

ActiveDashboardImpacts.propTypes = propTypes;
export default ActiveDashboardImpacts;
