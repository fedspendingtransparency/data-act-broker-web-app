/**
  * TableSorter.jsx
  * Created by Kevin Li 3/31/16
  */

import React, { PropTypes } from 'react';
import * as Icons from '../icons/Icons.jsx';

const propTypes = {
    onSort: PropTypes.func.isRequired,
    active: PropTypes.string,
    col: PropTypes.number
};

const defaultProps = {
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
                <div className={"usa-da-icon sort-icon usa-da-icon-angle-up" + upClass}
                    onClick={this.sortAsc.bind(this)}><Icons.AngleUp />
                </div>
                <div className={"usa-da-icon sort-icon usa-da-icon-angle-down" + downClass}
                    onClick={this.sortDesc.bind(this)}><Icons.AngleDown />
                </div>
            </div>
        );
    }
}

TableSorter.propTypes = propTypes;
TableSorter.defaultProps = defaultProps;
