/**
 * DashboardTableHeader.jsx
 * Created by Alisa Burdeyny 11/13/19
 */

import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { uniqueId } from 'lodash';

const propTypes = {
    headers: PropTypes.array
};

const defaultProps = {
    headers: []
};

export default class DashboardTableHeader extends React.Component {
    constructor(props) {
        super(props);

        this.sortAsc = this.sortAsc.bind(this);
        this.sortDesc = this.sortDesc.bind(this);
    }
    sortAsc() {
        // TODO: return an ascending sort
    }
    sortDesc() {
        // TODO: return a descending sort
    }
    render() {
        const tableHeaders = this.props.headers.map((header) => (
            <th key={`dashboard-table-header-${uniqueId()}`} className={header.class}>
                <div className="dashboard-table__header-wrapper">
                    <div className="dashboard-table__header-text">
                        {header.text}
                    </div>
                    <div className="dashboard-table__sort-icons">
                        <button onClick={this.sortAsc}>
                            <FontAwesomeIcon size="2x" icon="caret-up" />
                        </button>
                        <button onClick={this.sortDesc}>
                            <FontAwesomeIcon size="2x" icon="caret-down" />
                        </button>
                    </div>
                </div>
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
