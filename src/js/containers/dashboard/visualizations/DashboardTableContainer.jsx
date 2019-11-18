/**
 * DashboardTableContainer.jsx
 * Created by Alisa Burdeyny 11/13/19
 */

import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';

import * as DashboardHelper from 'helpers/dashboardHelper';
import DashboardTable from 'components/dashboard/visualizations/DashboardTable';
import DashboardTablePagination from 'components/dashboard/visualizations/DashboardTablePagination';

const propTypes = {
    appliedFilters: PropTypes.object.isRequired
};

export default class DashboardTableContainer extends React.Component {
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
    }

    componentDidMount() {
        this.updateTable();
    }

    componentDidUpdate(prevProps) {
        if (!_.isEqual(this.props.appliedFilters.filters, prevProps.appliedFilters.filters)) {
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
                this.setState({
                    results: res.results,
                    totalPages: Math.ceil(res.page_metadata.total / this.state.limit),
                    inFlight: false
                });
            })
            .catch((err) => {
                console.error(err);
                this.setState({
                    inFlight: false
                });
            });
    }

    render() {
        return (
            <div className="dashboard-table-container">
                <DashboardTable results={this.state.results} />
                <DashboardTablePagination
                    totalPages={this.state.totalPages}
                    currentPage={this.state.page}
                    pageLimit={this.state.limit}
                    changePage={this.changePage}
                    changeLimit={this.changeLimit} />
            </div>
        );
    }
}

DashboardTableContainer.propTypes = propTypes;
