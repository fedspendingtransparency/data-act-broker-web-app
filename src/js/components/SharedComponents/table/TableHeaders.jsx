/**
 * TableHeaders.jsx
 * Created by Kyle Fox 2/19/16
 */

import React, { PropTypes } from 'react';
import _ from 'lodash';
import TableSorter from './TableSorter';

const propTypes = {
    onSort: PropTypes.func,
    currentSort: PropTypes.object,
    data: PropTypes.array.isRequired,
    headerClasses: PropTypes.array,
    unsortable: PropTypes.array,
    sortable: PropTypes.bool
};

const defaultProps = {
    headerClasses: []
};

export default class TableHeaders extends React.Component {
    render() {
        const tableHeaders = [];
        for (let i = 0; i < this.props.data.length; i++) {
            let className = "table-header-value";

            // add sorter buttons only if this table is sortable
            let sorters = '';
            if (this.props.sortable && _.indexOf(this.props.unsortable, i) === -1) {
                className += " sortable";

                // check if this column is currently the selected sort key
                let activeSort = '';
                if (this.props.currentSort.col === i) {
                    activeSort = this.props.currentSort.direction;
                }

                sorters = <TableSorter onSort={this.props.onSort} col={i} active={activeSort} />;
            }

            tableHeaders.push(
                <th key={i} className={this.props.headerClasses[i]}>
                    <div className={className} >
                        {this.props.data[i]}
                    </div>
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
TableHeaders.defaultProps = defaultProps;
