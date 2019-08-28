/**
 * TableRow.jsx
 * Created by Kyle Fox 2/19/16
 */

import React from 'react';
import PropTypes from 'prop-types';
import TableCell from './TableCell';

const propTypes = {
    data: PropTypes.array.isRequired,
    cellClasses: PropTypes.array
};

const defaultProps = {
    cellClasses: []
};

export default class TableRow extends React.Component {
    render() {
        const tableCells = [];
        for (let i = 0; i < this.props.data.length; i++) {
            tableCells.push(<TableCell key={i} data={this.props.data[i]} cellClass={this.props.cellClasses[i]} />);
        }

        return (
            <tr>{tableCells}</tr>
        );
    }
}

TableRow.propTypes = propTypes;
TableRow.defaultProps = defaultProps;
