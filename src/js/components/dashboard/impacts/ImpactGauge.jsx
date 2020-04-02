/**
 * ImpactGauge.jsx
 * Created by Daniel Boos 4/1/2020
 */

import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
    submissionData: PropTypes.object,
    level: PropTypes.string
};

const ImpactGauge = (props) => (
    <div className="impact-section">
        {/* eslint-disable import/no-dynamic-require, global-require */}
        <img
            src={require(`../../../../graphics/gauges/chart-${props.level}.png`)}
            alt={props.level} />
        {/* eslint-enable import/no-dynamic-require, global-require */}
        <div className="impact-stats">
            {props.submissionData ?
                <p className="impact-count">{props.submissionData.total}</p> : ''
            }
            <p className="impact-level">{props.level}</p>
        </div>
    </div>
);

ImpactGauge.propTypes = propTypes;
export default ImpactGauge;
