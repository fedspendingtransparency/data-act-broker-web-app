/**
  * TableSorter.jsx
  * Created by Kevin Li 3/31/16
  */

import React, { PropTypes } from 'react';
import * as Icons from '../icons/Icons';

const propTypes = {
    onSort: PropTypes.func,
    active: PropTypes.string,
    col: PropTypes.number
};

const defaultProps = {
    onSort: () => {},
    col: 0,
    active: ''
};

export default class TableSorter extends React.Component {
    sortAsc() {
        this.props.onSort('asc', this.props.col);
    }
    sortDesc() {
        this.props.onSort('desc', this.props.col);
    }

    render() {
        let upClass = '';
        let downClass = '';
        if (this.props.active === 'asc') {
            upClass = ' active';
        }
        else if (this.props.active === 'desc') {
            downClass = ' active';
        }

        return (
            <div className="usa-da-table-sorter">
                <div
                    role="button"
                    tabIndex={0}
                    className={`usa-da-icon sort-icon usa-da-icon-angle-up${upClass}`}
                    onKeyDown={this.sortAsc.bind(this)}
                    onClick={this.sortAsc.bind(this)}>
                    <Icons.AngleUp />
                </div>
                <div
                    role="button"
                    tabIndex={0}
                    className={`usa-da-icon sort-icon usa-da-icon-angle-down${downClass}`}
                    onKeyDown={this.sortDesc.bind(this)}
                    onClick={this.sortDesc.bind(this)}>
                    <Icons.AngleDown />
                </div>
            </div>
        );
    }
}

TableSorter.propTypes = propTypes;
TableSorter.defaultProps = defaultProps;
