/**
 * DashboardTableHeader.jsx
 * Created by Alisa Burdeyny 11/13/19
 */

import React from 'react';
import PropTypes from 'prop-types';
import { uniqueId } from 'lodash';

import DashboardTableSorter from 'components/dashboard/table/DashboardTableSorter';

const propTypes = {
    headers: PropTypes.array,
    changeSort: PropTypes.func.isRequired,
    currSort: PropTypes.string,
    currOrder: PropTypes.string
};

const defaultProps = {
    headers: [],
    currSort: 'period',
    currOrder: 'desc'
};

export default class DashboardTableHeader extends React.Component {
    render() {
        const tableHeaders = this.props.headers.map((header) => {
            let activeSort = '';
            if (header.sortType === this.props.currSort) {
                activeSort = this.props.currOrder;
            }
            let tableSorter = null;
            if (header.sortType) {
                tableSorter = (<DashboardTableSorter
                    sort={header.sortType}
                    changeSort={this.props.changeSort}
                    activeSort={activeSort} />);
            }
            return (
                <th key={`dashboard-table-header-${uniqueId()}`} className={header.class}>
                    <div className="dashboard-table__header-wrapper">
                        <div className="dashboard-table__header-text">
                            {header.text}
                        </div>
                        {tableSorter}
                    </div>
                </th>);
        });

        return (
            <thead className="broker-table__header">
                <tr>
                    {tableHeaders}
                </tr>
            </thead>
        );
    }
}

DashboardTableHeader.propTypes = propTypes;
DashboardTableHeader.defaultProps = defaultProps;
