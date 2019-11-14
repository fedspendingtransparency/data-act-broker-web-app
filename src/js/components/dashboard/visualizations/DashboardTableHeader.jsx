/**
 * DashboardTableHeader.jsx
 * Created by Alisa Burdeyny 11/13/19
 */

import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
    headers: PropTypes.array
};

const defaultProps = {
    headers: []
};

export default class DashboardTableHeader extends React.Component {
    render() {
        const tableHeaders = this.props.headers.map((header, index) => (
            <th key={'dashboard-table-header-' + index} className={header.class}>
                {header.text}
            </th>)
        );

        return (
            <thead>
                <tr>
                    {tableHeaders}
                </tr>
            </thead>
        );
    }
}

DashboardTableHeader.propTypes = propTypes;
DashboardTableHeader.defaultProps = defaultProps;
