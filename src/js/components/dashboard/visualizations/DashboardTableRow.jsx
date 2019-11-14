/**
 * DashboardTableRow.jsx
 * Created by Alisa Burdeyny 11/13/19
 */

import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
    cells: PropTypes.array
};

const defaultProps = {
    cells: []
};

export default class DashboardTableRow extends React.Component {
    render() {
        const tableCells = this.props.cells.map((cell, index) => (
            <td key={'dashboard-table-cell-' + index}>
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
