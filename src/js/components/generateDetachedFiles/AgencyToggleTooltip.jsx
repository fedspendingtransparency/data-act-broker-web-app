/**
 * AgencyToggleTooltip.jsx
 * Created by Lizzie Salita 10/11/18
 */

import React from 'react';

export default class AgencyToggleTooltip extends React.Component {
    render() {
        return (
            <div
                className="agency-toggle-tooltip"
                role="tooltip">
                <div className="agency-toggle-tooltip__interior">
                    <div className="tooltip-pointer bottom" />
                    <div className="agency-toggle-tooltip__content">
                        These options may benefit small agencies that use a shared service provider (SSP) to manage and
                        issue awards that they fund. The vast majority of agencies will want to leave &quot;Awarding Agency&quot; selected.
                    </div>
                </div>
            </div>
        );
    }
}
