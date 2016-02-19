/**
 * TableCell.jsx
 * Created by Kyle Fox 2/19/16
 */

import React, { PropTypes } from 'react';

const propTypes = {
    data: PropTypes.node.isRequired
};

export default class TableCell extends React.Component {
    render() {
        return (
            <td>{this.props.data}</td>
        );
    }
}

TableCell.propTypes = propTypes;
