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

    constructor(props) {
        super(props);

        this.state = {
            data: props.data
        };
    }

    componentWillReceiveProps(props) {
        this.setState({
            data: props.data
        });
    }

    render() {
        return (
            <td>{this.state.data}</td>
        );
    }
}

class TableRow extends React.Component {

    constructor(props) {
        super(props);

        var tableCells = this.generateTableCells(props);

        this.state = {
            tableCells: tableCells
        };
    }

    componentWillReceiveProps(props) {
        var tableCells = this.generateTableCells(props);
        this.setState({
            tableCells: tableCells
        });
    }

    generateTableCells(props) {
        var tableCells = [];
        for (var i = 0; i < props.data.length; i++) {
            tableCells.push(<TableCell key={i} data={props.data[i]} />);
        }
        return tableCells;
    }

    render() {
        return (
            <tr>{this.state.tableCells}</tr>
        );
    }
}

class TableHeaders extends React.Component {

    constructor(props) {
        super(props);

        var tableHeaders = this.generateTableHeaders(props);

        this.state = {
            tableHeaders: tableHeaders
        };
    }

    componentWillReceiveProps(props) {
        var tableHeaders = this.generateTableHeaders(props);
        this.setState({
            tableHeaders: tableHeaders
        });
    }

    generateTableHeaders(props) {
        var tableHeaders = [];
        for (var i = 0; i < props.data.length; i++) {
            tableHeaders.push(<th key={i}>{props.data[i]}</th>)
        }
        return tableHeaders;
    }

    render() {
        return (
            <tr>{this.state.tableHeaders}</tr>
        )
    }
}

export default class Table extends React.Component {
    constructor(props) {
        super(props);

        var tableRows = this.generateTableRows(props);

        this.state = {
            tableRows: tableRows
        };
    }

    componentWillReceiveProps(props) {
        var tableRows = this.generateTableRows(props);
        this.setState({
            tableRows: tableRows
        });
    }

    generateTableRows(props) {
        var tableRows = [];
        for (var i = 0; i < props.data.length; i++){
            tableRows.push(<TableRow key={i} data={props.data[i]} />);
        }
        return tableRows;
    }

    render() {
        return (
            <table className='usa-da-table'>
                <thead>
                    <TableHeaders data={this.props.headers} />
                </thead>
                <tbody>
                    {this.state.tableRows}
                </tbody>
            </table>
        );
    }
}

Table.propTypes = propTypes;
Table.defaultProps = defaultProps;
