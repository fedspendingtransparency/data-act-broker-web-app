/**
 * ActiveDashboardImpacts.jsx
 * Created by Daniel Boos 4/1/2020
 */

import React from 'react';
import PropTypes from 'prop-types';

import ImpactGauge from 'components/dashboard/impacts/ImpactGauge';

const propTypes = {
    submissionData: PropTypes.object,
    openModal: PropTypes.func.isRequired
};

const ActiveDashboardImpacts = (props) => (
    <div className="dashboard-page__impacts">
        <h3>Warning Status</h3>
        <hr />
        <h4>Impact Count</h4>
        <p>
            Identify to what degree current warnings impact your submission.
            The values have been preset by your agency.
        </p>
        {props.submissionData ?
            <div className="flex-wrapper">
                <ImpactGauge level="low" submissionData={props.submissionData.low} openModal={props.openModal} />
                <ImpactGauge level="medium" submissionData={props.submissionData.medium} openModal={props.openModal} />
                <ImpactGauge level="high" submissionData={props.submissionData.high} openModal={props.openModal} />
            </div> : ''}
    </div>
);

ActiveDashboardImpacts.propTypes = propTypes;
export default ActiveDashboardImpacts;
