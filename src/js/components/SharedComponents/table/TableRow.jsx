/**
 * TableRow.jsx
 * Created by Kyle Fox 2/19/16
 */

import React, { PropTypes } from 'react';
import TableCell from './TableCell.jsx';

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
        let colspan = "1";
        if(this.props.data.length === 1){
            colspan="7";
        }
        for (let i = 0; i < this.props.data.length; i++) {
            tableCells.push(<TableCell key={i} data={this.props.data[i]} colspan={colspan} cellClass={this.props.cellClasses[i]} />);
        }

        return (
            <tr>{tableCells}</tr>
        );
    }
}

TableRow.propTypes = propTypes;
TableRow.defaultProps = defaultProps;