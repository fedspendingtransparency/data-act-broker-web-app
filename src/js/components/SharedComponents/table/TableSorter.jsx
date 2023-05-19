/**
  * TableSorter.jsx
  * Created by Kevin Li 3/31/16
  */

import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
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
                    onClick={this.sortAsc}
                    aria-label="Arrow Pointing Up">
                    <FontAwesomeIcon icon="angle-up" />
                </div>
                <div
                    role="button"
                    tabIndex={0}
                    className={`usa-da-icon sort-icon usa-da-icon-angle-down${downClass}`}
                    onKeyDown={onKeyDownHandlerDesc}
                    onClick={this.sortDesc}
                    aria-label="Arrow Pointing Down">
                    <FontAwesomeIcon icon="angle-down" />
                </div>
            </div>
        );
    }
}

TableSorter.propTypes = propTypes;
TableSorter.defaultProps = defaultProps;
