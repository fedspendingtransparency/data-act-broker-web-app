/**
 * TableRow.jsx
 * Created by Kyle Fox 2/19/16
 */

import React, { PropTypes } from 'react';
import TableCell from './TableCell.jsx';

const propTypes = {
    data: PropTypes.array.isRequired
};

export default class TableRow extends React.Component {
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
