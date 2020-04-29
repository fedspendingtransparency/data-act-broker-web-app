/**
 * SettingsTableRow.jsx
 * Created by Lizzie Salita 4/29/20
 */

import React from 'react';
import PropTypes from 'prop-types';
import { startCase } from 'lodash';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ImpactDropdown from './ImpactDropdown';

const propTypes = {
    label: PropTypes.string,
    significance: PropTypes.number,
    impact: PropTypes.string,
    description: PropTypes.string,
    updateImpact: PropTypes.func
};

const SettingsTableRow = (props) => (
    <tr className="settings-table__row">
        <td className="settings-table__data settings-table__data_significance">
            <FontAwesomeIcon icon="bars" />
            {props.significance}.<span className="settings-table__rule">{props.label}</span>
        </td>
        <td className="settings-table__data">
            <ImpactDropdown
                rule={props.label}
                selectedOption={startCase(props.impact)}
                updateImpact={props.updateImpact} />
        </td>
        <td className="settings-table__data">
            <div title={props.description} className="ellipse-box">
                {props.description}
            </div>
        </td>
    </tr>
);

SettingsTableRow.propTypes = propTypes;

export default SettingsTableRow;
