/**
 * DashboardTableContainer.jsx
 * Created by Alisa Burdeyny 11/13/19
 */

import React from 'react';
import PropTypes from 'prop-types';

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
    }

    componentDidMount() {
        this.updateTable();
    }

    changePage(newPage) {
        this.setState({
            page: newPage
        }, () => {
            this.updateTable();
        });
    }

    updateTable() {
        const searchParams = {
            filters: {
                quarters: [],
                fys: [],
                agencies: [],
                files: [],
                rules: []
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
                    changePage={this.changePage} />
            </div>
        );
    }
}

DashboardTableContainer.propTypes = propTypes;
