/**
 * TableHeaders.jsx
 * Created by Kyle Fox 2/19/16
 */

import React, { PropTypes } from 'react';

const propTypes = {
    data: PropTypes.array.isRequired
};

export default class TableHeaders extends React.Component {
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
