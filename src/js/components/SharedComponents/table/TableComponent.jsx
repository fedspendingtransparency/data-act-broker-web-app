/**
 * TableComponent.jsx
 * Created by michaelbray on 12/22/15.
 */

import React from 'react';
import PropTypes from 'prop-types';
import TableRow from './TableRow';
import TableHeaders from './TableHeaders';

const propTypes = {
    data: PropTypes.array,
    headers: PropTypes.array,
    sortable: PropTypes.bool,
    onSort: PropTypes.func,
    extraClasses: PropTypes.array
};

const defaultProps = {
    onSort: () => {},
    data: [['Error']],
    headers: ['Table Data Missing'],
    sortable: false,
    extraClasses: []
};

export default class Table extends React.Component {
    render() {
        const tableRows = [];
        for (let i = 0; i < this.props.data.length; i++) {
            tableRows.push(<TableRow key={i} data={this.props.data[i]} />);
        }

        let extra = '';
        this.props.extraClasses.forEach((className) => {
            extra += ` ${className}`;
        });

        return (
            <table className={`usa-da-table${extra}`}>
                <thead>
                    <TableHeaders data={this.props.headers} sortable={this.props.sortable} onSort={this.props.onSort} />
                </thead>
                <tbody>
                    {tableRows}
                </tbody>
            </table>
        );
    }
}

Table.propTypes = propTypes;
Table.defaultProps = defaultProps;
