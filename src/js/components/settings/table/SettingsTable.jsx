/**
 * SettingsTable.jsx
 * Created by Lizzie Salita 4/24/20
 */

import React from 'react';
import PropTypes from 'prop-types';
import { startCase } from 'lodash';
import { useState } from "react";
import { reorder, listLabels } from 'helpers/settingsTableHelper';
import { useDroppable, DndContext } from "@dnd-kit/core";
import { SortableContext } from "@dnd-kit/sortable";
import SettingsRow from "./SettingsRow";

const propTypes = {
    results: PropTypes.array,
    updateImpact: PropTypes.func,
    updateOrder: PropTypes.func
};

const defaultProps = {
    results: []
};

const SettingsTable = (props) => {

    const columns = ['significance', 'impact', 'description'];
    const [sortedItems, setSortedItems] = useState(listLabels(props.results));

    function handleDragEnd({ active, over }) {
        // dropped outside list or in its old location
        if (!over || active.id === over.id) {
            return;
        }

        const activeIndex = active.data.current.sortable.index;
        const overIndex = over.data.current?.sortable.index || 0;
        const items = reorder(props.results, activeIndex, overIndex);
        props.updateOrder(items);
        setSortedItems(listLabels(items));
    }

    const tableHeaders = columns.map((col) => <th key={col}>{startCase(col)}</th>);
    const { setNodeRef } = useDroppable({ id: 'sortable-context' });
    
    return (
        <DndContext onDragEnd={handleDragEnd}>
            <SortableContext id="sortable-context" items={sortedItems}>
                <table
                    className="broker-table settings-table"
                    ref={setNodeRef}>
                    <thead className="broker-table__header">
                        <tr>
                            {tableHeaders}
                        </tr>
                    </thead>
                    <tbody className="broker-table__body">
                        {props.results.map((row, index) => (
                            <SettingsRow
                                key={row.label}
                                row={row}
                                index={index}
                                updateImpact={props.updateImpact} />
                        ))}
                    </tbody>
                </table>
            </SortableContext>
        </DndContext>
    );
};

SettingsTable.defaultProps = defaultProps;
SettingsTable.propTypes = propTypes;

export default SettingsTable;
