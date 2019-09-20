/**
  * TableSorter.jsx
  * Created by Kevin Li 3/31/16
  */

import React from 'react';
import PropTypes from 'prop-types';
import * as Icons from '../icons/Icons';
import { createOnKeyDownHandler } from '../../../helpers/util';

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
    constructor(props) {
        super(props);
        this.sortAsc = this.sortAsc.bind(this);
        this.sortDesc = this.sortDesc.bind(this);
    }
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

        const onKeyDownHandlerAsc = createOnKeyDownHandler(this.sortAsc);
        const onKeyDownHandlerDesc = createOnKeyDownHandler(this.sortDesc);

        return (
            <div className="usa-da-table-sorter">
                <div
                    role="button"
                    tabIndex={0}
                    className={`usa-da-icon sort-icon usa-da-icon-angle-up${upClass}`}
                    onKeyDown={onKeyDownHandlerAsc}
                    onClick={this.sortAsc}>
                    <Icons.AngleUp />
                </div>
                <div
                    role="button"
                    tabIndex={0}
                    className={`usa-da-icon sort-icon usa-da-icon-angle-down${downClass}`}
                    onKeyDown={onKeyDownHandlerDesc}
                    onClick={this.sortDesc}>
                    <Icons.AngleDown />
                </div>
            </div>
        );
    }
}

TableSorter.propTypes = propTypes;
TableSorter.defaultProps = defaultProps;
