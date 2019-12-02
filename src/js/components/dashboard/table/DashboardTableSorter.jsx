/**
 * DashboardTableSorter.jsx
 * Created by Alisa Burdeyny 11/26/19
 */

import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const propTypes = {
    sort: PropTypes.string,
    changeSort: PropTypes.func.isRequired,
    activeSort: PropTypes.string
};

const defaultProps = {
    sort: 'period',
    activeSort: ''
};

export default class DashboardTableSorter extends React.Component {
    constructor(props) {
        super(props);

        this.sortAsc = this.sortAsc.bind(this);
        this.sortDesc = this.sortDesc.bind(this);
    }

    sortAsc() {
        this.props.changeSort(this.props.sort, 'asc');
    }

    sortDesc() {
        this.props.changeSort(this.props.sort, 'desc');
    }

    render() {
        let upClass = '';
        let downClass = '';

        if (this.props.activeSort === 'asc') {
            upClass = 'active';
        }

        if (this.props.activeSort === 'desc') {
            downClass = 'active';
        }

        return (
            <div className="dashboard-table__sort-icons">
                <button
                    onClick={this.sortAsc}
                    className={upClass}
                    aria-label={`sort-${this.props.sort}-ascending`}>
                    <FontAwesomeIcon size="2x" icon="caret-up" />
                </button>
                <button
                    onClick={this.sortDesc}
                    className={downClass}
                    aria-label={`sort-${this.props.sort}-descending`}>
                    <FontAwesomeIcon size="2x" icon="caret-down" />
                </button>
            </div>
        );
    }
}

DashboardTableSorter.propTypes = propTypes;
DashboardTableSorter.defaultProps = defaultProps;
