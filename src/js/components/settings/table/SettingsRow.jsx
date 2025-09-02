/**
 * SettingsRow.jsx
 * Created by Alisa Burdeyny 5/1/2025
 */

import React from 'react';
import PropTypes from 'prop-types';
import { startCase } from 'lodash';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import ImpactDropdown from './ImpactDropdown';


const propTypes = {
    row: PropTypes.object.isRequired,
    index: PropTypes.number,
    updateImpact: PropTypes.func.isRequired
};

const SettingsRow = (props) => {
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition
    } = useSortable({id: `drag-row-${props.row.label}` });

    const itemStyle = {
        transform: CSS.Transform.toString(transform),
        transition
    };

    return (
        <tr className="settings-table__row" style={itemStyle} ref={setNodeRef}>
            <td
                style={{ width: "20%" }}
                className="settings-table__data settings-table__data_significance">
                <span {...attributes} {...listeners} aria-label="draggable-row">
                    <FontAwesomeIcon icon="bars" className="horizontal-bars-icon" />
                </span>
                {props.index + 1}.
                <span className="settings-table__rule">{props.row.label}</span>
            </td>
            <td style={{ width: "20%" }} className="settings-table__data">
                <ImpactDropdown
                    rule={props.row.label}
                    selectedOption={startCase(props.row.impact)}
                    updateImpact={props.updateImpact} />
            </td>
            <td style={{ width: "60%" }} className="settings-table__data">
                <div title={props.row.description} className="ellipse-box">
                    {props.row.description}
                </div>
            </td>
        </tr>
    );
};

SettingsRow.propTypes = propTypes;

export default SettingsRow;
