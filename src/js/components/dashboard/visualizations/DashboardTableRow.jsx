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
        const tableCells = this.props.cells.map((cell, index) => 
            (<td key={'dashboard-table-cell-' + index} className={'tmp'}>
                {cell}
            </td>)
        );

        return (
            <tbody>
                <tr>
                    {tableCells}
                </tr>
            </tbody>
        );
    }
}

DashboardTableRow.propTypes = propTypes;
DashboardTableRow.defaultProps = defaultProps;
