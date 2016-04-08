/**
 * TableHeaders.jsx
 * Created by Kyle Fox 2/19/16
 */

import React, { PropTypes } from 'react';
import TableSorter from './TableSorter.jsx';

const propTypes = {
    data: PropTypes.array.isRequired,
    onSort: PropTypes.func
};

export default class TableHeaders extends React.Component {
    render() {

        const tableHeaders = [];
        for (let i = 0; i < this.props.data.length; i++) {

            // add sorter buttons only if this table is sortable
            let sorters = '';
            if (this.props.sortable) {
                sorters = <TableSorter onSort={this.props.onSort} col={i} />;
            }

            tableHeaders.push(<th key={i}>
                {this.props.data[i]}
                {sorters}
            </th>);
        }

        

        return (
            <tr>
                {tableHeaders}
            </tr>
        );
    }
}

TableHeaders.propTypes = propTypes;
