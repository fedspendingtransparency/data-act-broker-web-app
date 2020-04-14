/**
 * ActiveDashboardImpacts.jsx
 * Created by Daniel Boos 4/1/2020
 */

import React from 'react';
import PropTypes from 'prop-types';
import { startCase } from 'lodash';

import ImpactGauge from 'components/dashboard/impacts/ImpactGauge';

const propTypes = {
    submissionData: PropTypes.shape({
        low: PropTypes.object,
        medium: PropTypes.object,
        high: PropTypes.object
    }),
    openModal: PropTypes.func.isRequired,
    errorLevel: PropTypes.oneOf(['error', 'warning'])
};

const ActiveDashboardImpacts = ({ submissionData, openModal, errorLevel }) => (
    <div className="dashboard-page__impacts">
        <h3>{startCase(errorLevel)} Status</h3>
        <hr />
        <h4>Impact Count</h4>
        <p>
            Identify to what degree current {errorLevel}s impact your submission.
            The values have been preset by your agency.
        </p>
        {submissionData ?
            <div className="flex-wrapper">
                <ImpactGauge level="low" submissionData={submissionData.low} openModal={openModal} />
                <ImpactGauge level="medium" submissionData={submissionData.medium} openModal={openModal} />
                <ImpactGauge level="high" submissionData={submissionData.high} openModal={openModal} />
            </div> : ''}
    </div>
);

ActiveDashboardImpacts.propTypes = propTypes;
export default ActiveDashboardImpacts;
