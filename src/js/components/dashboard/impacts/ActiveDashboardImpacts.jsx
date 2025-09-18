/**
 * ActiveDashboardImpacts.jsx
 * Created by Daniel Boos 4/1/2020
 */

import PropTypes from 'prop-types';
import { startCase } from 'lodash';

import ImpactGauge from 'components/dashboard/impacts/ImpactGauge';

const propTypes = {
    submissionData: PropTypes.shape({
        low: PropTypes.object,
        medium: PropTypes.object,
        high: PropTypes.object
    }),
    inFlight: PropTypes.bool,
    hasFailed: PropTypes.bool,
    openModal: PropTypes.func.isRequired,
    errorLevel: PropTypes.oneOf(['error', 'warning'])
};

const ActiveDashboardImpacts = (props) => (
    <div className="dashboard-viz dashboard-page__impacts">
        <h3 className="dashboard-viz__heading">{startCase(props.errorLevel)} Status</h3>
        <h4>Impact Count</h4>
        <p>
            Identify to what degree current {props.errorLevel}s impact your submission.
            The values have been preset by your agency.
        </p>
        {props.submissionData ?
            <div className="flex-wrapper">
                <ImpactGauge
                    level="low"
                    submissionData={props.submissionData.low}
                    openModal={props.openModal}
                    inFlight={props.inFlight}
                    hasFailed={props.hasFailed} />
                <ImpactGauge
                    level="medium"
                    submissionData={props.submissionData.medium}
                    openModal={props.openModal}
                    inFlight={props.inFlight}
                    hasFailed={props.hasFailed} />
                <ImpactGauge
                    level="high"
                    submissionData={props.submissionData.high}
                    openModal={props.openModal}
                    inFlight={props.inFlight}
                    hasFailed={props.hasFailed} />
            </div> : ''}
    </div>
);

ActiveDashboardImpacts.propTypes = propTypes;
export default ActiveDashboardImpacts;
