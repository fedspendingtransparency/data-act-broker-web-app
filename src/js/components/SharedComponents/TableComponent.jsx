/**
 * TableComponent.jsx
 * Created by michaelbray on 12/22/15.
 */

import React from 'react';

class TableCell extends React.Component {
    render() {
        return (
            <td>{this.props.data}</td>
        );
    }
}

class TableRow extends React.Component {
    render() {
        var tableCells = [];
        for (var i = 0; i < this.props.data.length; i++) {
            tableCells.push(<TableCell key={i} data={this.props.data[i]} />);
        }

        return (
            <tr>{tableCells}</tr>
        );
    }
}

class TableHeaders extends React.Component {
    render() {
        var tableHeaders = [];
        for (var i = 0; i < this.props.data.length; i++){
            tableHeaders.push(<th key={i}>{this.props.data[i]}</th>)
        }

        return (
            <tr>{tableHeaders}</tr>
        )
    }
}

class TableHolder extends React.Component {
    render() {
        var tableRows = [];
        for (var i = 0; i < this.props.data.length; i++){
            tableRows.push(<TableRow key={i} data={this.props.data[i]} />);
        }

        return (
        	<table className='usa-da-table'>
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

export default class Table extends React.Component {
    render() {
        return (
            <TableHolder data={this.props.data} headers={this.props.headers} />
        );
    }
}