/**
 * TableComponent.jsx
 * Created by michaelbray on 12/22/15.
 */

import React, { PropTypes } from 'react';

const propTypes = {
    data: PropTypes.array.isRequired,
    headers: PropTypes.array.isRequired
};

const defaultProps = {
    data: [['Error']],
    headers: ['Table Data Missing']
};

class TableCell extends React.Component {
    render() {
        return (
            <td>{this.props.data}</td>
        );
    }
}

TableCell.propTypes = propTypes;
TableCell.defaultProps = defaultProps;

class TableRow extends React.Component {
    render() {
        const tableCells = [];
        for (let i = 0; i < this.props.data.length; i++) {
            tableCells.push(<TableCell key={i} data={this.props.data[i]} />);
        }

        return (
            <tr>{tableCells}</tr>
        );
    }
}

TableRow.propTypes = propTypes;
TableRow.defaultProps = defaultProps;

class TableHeaders extends React.Component {
    render() {
        const tableHeaders = [];
        for (let i = 0; i < this.props.data.length; i++) {
            tableHeaders.push(<th key={i}>{this.props.data[i]}</th>);
        }

        return (
            <tr>{tableHeaders}</tr>
        );
    }
}

TableHeaders.propTypes = propTypes;
TableHeaders.defaultProps = defaultProps;

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
