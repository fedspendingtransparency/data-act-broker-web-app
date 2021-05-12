/**
 * HistoricalDashboard.jsx
 * Created by Alisa Burdeyny 11/13/19
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import WarningsInfoGraphContainer from 'containers/dashboard/graph/WarningsInfoGraphContainer';
import DashboardTableContainer from 'containers/dashboard/table/DashboardTableContainer';

const propTypes = {
    appliedFilters: PropTypes.object
};

export class DashboardTable extends React.Component {
    render() {
        let fileType = `File ${this.props.appliedFilters.file}`;
        if (this.props.appliedFilters.file.startsWith('cross') === true) {
            const nameParts = this.props.appliedFilters.file.split('-');
            fileType = `Cross ${nameParts[1].slice(0, 1)}/${nameParts[1].slice(1)}`;
        }
        return (
            <div className="dashboard-page__content historic">
                <h2>{fileType} Warnings</h2>
                <h3>{this.props.appliedFilters.agency.name}</h3>
                <WarningsInfoGraphContainer appliedFilters={this.props.appliedFilters} />
                <DashboardTableContainer appliedFilters={this.props.appliedFilters} />
            </div>
        );
    }
}

DashboardTable.propTypes = propTypes;

export default connect(
    (state) => ({
        appliedFilters: state.appliedDashboardFilters.filters.historical
    })
)(DashboardTable);
