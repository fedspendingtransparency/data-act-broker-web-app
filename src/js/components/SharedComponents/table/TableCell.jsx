/**
 * TableCell.jsx
 * Created by Kyle Fox 2/19/16
 */

import React, { PropTypes } from 'react';

const propTypes = {
    data: PropTypes.node
};

const defaultProps = {
	cellClass: '',
	data: ''
};

export default class TableCell extends React.Component {
    render() {
        return (
            <td className={this.props.cellClass}>{this.props.data}</td>
        );
    }
}

TableCell.propTypes = propTypes;
TableCell.defaultProps = defaultProps;