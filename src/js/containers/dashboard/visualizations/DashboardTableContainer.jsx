/**
 * DashboardTableContainer.jsx
 * Created by Alisa Burdeyny 11/13/19
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { isEqual } from 'lodash';

import * as DashboardHelper from 'helpers/dashboardHelper';
import DashboardTable from 'components/dashboard/visualizations/DashboardTable';
import DashboardTablePagination from 'components/dashboard/visualizations/DashboardTablePagination';
import BaseDashboardTableRow from 'models/dashboard/BaseDashboardTableRow';

const propTypes = {
    appliedFilters: PropTypes.object
};

export class DashboardTableContainer extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            results: [],
            totalPages: 1,
            page: 1,
            limit: 10,
            inFlight: true
        };

        this.updateTable = this.updateTable.bind(this);
        this.changePage = this.changePage.bind(this);
        this.changeLimit = this.changeLimit.bind(this);
        this.parseRows = this.parseRows.bind(this);
    }

    componentDidMount() {
        this.updateTable();
    }

    componentDidUpdate(prevProps) {
        if (!isEqual(this.props.appliedFilters, prevProps.appliedFilters)) {
            this.changePage(1);
        }
    }

    changePage(newPage) {
        this.setState({
            page: newPage
        }, () => {
            this.updateTable();
        });
    }

    changeLimit(newLimit) {
        this.setState({
            page: 1,
            limit: newLimit
        }, () => {
            this.updateTable();
        });
    }

    updateTable() {
        this.setState({
            inFlight: true
        });
        const filters = this.props.appliedFilters.filters;
        const searchParams = {
            filters: {
                quarters: [...filters.quarters],
                fys: [...filters.fy],
                agencies: [filters.agency],
                files: [filters.file],
                rules: [...filters.rules]
            },
            page: this.state.page,
            limit: this.state.limit,
            sort: 'period',
            order: 'desc'
        };

        DashboardHelper.fetchDashboardTableContents(searchParams)
            .then((res) => {
                this.parseRows(res);
            })
            .catch((err) => {
                console.error(err);
                this.setState({
                    inFlight: false
                });
            });
    }

    parseRows(data) {
        const results = [];
        data.results.forEach((item) => {
            const tableRow = Object.create(BaseDashboardTableRow);
            tableRow.populate(item);
            results.push(tableRow);
        });

        this.setState({
            results,
            totalPages: Math.ceil(data.page_metadata.total / this.state.limit),
            inFlight: false
        });
    }

    render() {
        let pagination = null;
        if (!this.state.inFlight && this.state.results.length !== 0) {
            pagination = (
                <DashboardTablePagination
                    totalPages={this.state.totalPages}
                    currentPage={this.state.page}
                    pageLimit={this.state.limit}
                    changePage={this.changePage}
                    changeLimit={this.changeLimit} />);
        }
        return (
            <div className="dashboard-viz dashboard-table-container">
                <DashboardTable
                    results={this.state.results}
                    inFlight={this.state.inFlight} />
                {pagination}
            </div>
        );
    }
}

DashboardTableContainer.propTypes = propTypes;

export default connect(
    (state) => ({
        appliedFilters: state.appliedDashboardFilters
    }),
)(DashboardTableContainer);
