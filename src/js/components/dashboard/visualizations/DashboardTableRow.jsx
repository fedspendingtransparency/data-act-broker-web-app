/**
 * DashboardTableRow.jsx
 * Created by Alisa Burdeyny 11/13/19
 */

import React from 'react';
import PropTypes from 'prop-types';

import { uniqueId } from 'lodash';

const propTypes = {
    cells: PropTypes.array,
    rowNum: PropTypes.number
};

const defaultProps = {
    cells: [],
    rowNum: 0
};

export default class DashboardTableRow extends React.Component {
    render() {
        const tableCells = this.props.cells.map((cell) => (
            <td key={`dashboard-table-row-${this.props.rowNum}-cell-${uniqueId()}`}>
                <div className={cell.class}>
                    {cell.data}
                </div>
            </td>)
        );

        return (
            <tr>
                {tableCells}
            </tr>
        );
    }
}

DashboardTableRow.propTypes = propTypes;
DashboardTableRow.defaultProps = defaultProps;
