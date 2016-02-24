/**
 * TableComponent.jsx
 * Created by michaelbray on 12/22/15.
 */

import React, { PropTypes } from 'react';
import TableRow from './TableRow.jsx';
import TableHeaders from './TableHeaders.jsx';

const propTypes = {
    data: PropTypes.array.isRequired,
    headers: PropTypes.array.isRequired
};

const defaultProps = {
    data: [['Error']],
    headers: ['Table Data Missing']
};

export default class Table extends React.Component {
    render() {
        const tableRows = [];
        for (let i = 0; i < this.props.data.length; i++) {
            tableRows.push(<TableRow key={i} data={this.props.data[i]} />);
        }

        return (
            <table className="usa-da-table">
                <thead>
                    <TableHeaders data={this.props.headers} />
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
