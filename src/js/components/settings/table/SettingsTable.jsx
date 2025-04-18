/**
 * SettingsTable.jsx
 * Created by Lizzie Salita 4/24/20
 */

import React from 'react';
import PropTypes from 'prop-types';
import { startCase } from 'lodash';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { reorder } from 'helpers/settingsTableHelper';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import ImpactDropdown from './ImpactDropdown';

const propTypes = {
    results: PropTypes.array,
    updateImpact: PropTypes.func,
    updateOrder: PropTypes.func
};

const defaultProps = {
    results: []
};

const columns = ['significance', 'impact', 'description'];

const getItemStyle = (isDragging, draggableStyle) => ({
    userSelect: 'none',
    // change background color if dragging
    background: isDragging ? '#9bdaf1' : '',
    boxShadow: isDragging ? '0 2px 5px rgba(0, 0, 0, 0.15)' : '0 0',
    // styles we need to apply on draggables
    ...draggableStyle
});

export default class SettingsTable extends React.Component {
    constructor(props) {
        super(props);
        this.onDragEnd = this.onDragEnd.bind(this);
    }

    onDragEnd(result) {
        // dropped outside the list
        if (!result.destination) {
            return;
        }

        const items = reorder(this.props.results, result.source.index, result.destination.index);

        // Update Redux state
        this.props.updateOrder(items);
    }

    tableHeaders = columns.map((col) => <th key={col}>{startCase(col)}</th>);

    render() {
        return (
            <DragDropContext onDragEnd={this.onDragEnd}>
                <Droppable droppableId="droppable">
                    {(provided) => (
                        <table
                            className="broker-table settings-table"
                            ref={provided.innerRef}>
                            <thead className="broker-table__header">
                                <tr>
                                    {this.tableHeaders}
                                </tr>
                            </thead>
                            <tbody className="broker-table__body">
                                {this.props.results.map((row, index) => (
                                    <Draggable key={row.label} draggableId={row.label} index={index}>
                                        {(provided, snapshot) => (
                                            <tr
                                                className="settings-table__row"
                                                ref={provided.innerRef}
                                                {...provided.draggableProps}
                                                {...provided.dragHandleProps}
                                                style={getItemStyle(
                                                    snapshot.isDragging,
                                                    provided.draggableProps.style
                                                )}>
                                                <td
                                                    style={{ width: "20%" }}
                                                    className="settings-table__data settings-table__data_significance">
                                                    <FontAwesomeIcon icon="bars" />
                                                    {index + 1}.
                                                    <span className="settings-table__rule">{row.label}</span>
                                                </td>
                                                <td style={{ width: "20%" }} className="settings-table__data">
                                                    <ImpactDropdown
                                                        rule={row.label}
                                                        selectedOption={startCase(row.impact)}
                                                        updateImpact={this.props.updateImpact} />
                                                </td>
                                                <td style={{ width: "60%" }} className="settings-table__data">
                                                    <div title={row.description} className="ellipse-box">
                                                        {row.description}
                                                    </div>
                                                </td>
                                            </tr>
                                        )}
                                    </Draggable>
                                ))}
                                {provided.placeholder}
                            </tbody>
                        </table>
                    )}
                </Droppable>
            </DragDropContext>
        );
    }
}

SettingsTable.defaultProps = defaultProps;
SettingsTable.propTypes = propTypes;
