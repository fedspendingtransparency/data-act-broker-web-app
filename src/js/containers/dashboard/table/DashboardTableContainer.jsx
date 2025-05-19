/**
 * DashboardTableContainer.jsx
 * Created by Alisa Burdeyny 11/13/19
 */

import React from 'react';
import PropTypes from 'prop-types';
import { isEqual } from 'lodash';
import { Pagination } from 'data-transparency-ui';

import * as DashboardHelper from 'helpers/dashboardHelper';
import * as GenerateFilesHelper from 'helpers/generateFilesHelper';
import DashboardTable from 'components/dashboard/table/DashboardTable';
import BaseDashboardTableRow from 'models/dashboard/BaseDashboardTableRow';

const propTypes = {
    appliedFilters: PropTypes.object
};

export default class DashboardTableContainer extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            results: [],
            totalItems: 0,
            page: 1,
            limit: 10,
            inFlight: true,
            hasError: false,
            sort: 'period',
            order: 'desc'
        };

        this.updateTable = this.updateTable.bind(this);
        this.changePage = this.changePage.bind(this);
        this.changeLimit = this.changeLimit.bind(this);
        this.parseRows = this.parseRows.bind(this);
        this.changeSort = this.changeSort.bind(this);
        this.downloadFile = this.downloadFile.bind(this);
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

    changeSort(sort, order) {
        this.setState({
            sort,
            order
        }, () => {
            this.updateTable();
        });
    }

    downloadFile(fileType, submissionId) {
        GenerateFilesHelper.fetchFile(fileType, submissionId)
            .then((result) => {
                window.open(result.data.url);
            })
            .catch((error) => {
                console.error(error);
            });
    }

    updateTable() {
        this.setState({
            inFlight: true
        });
        const filters = this.props.appliedFilters;
        const periods = DashboardHelper.getPeriodListFromFilter(this.props.appliedFilters.period);
        const searchParams = {
            filters: {
                periods,
                fys: [...filters.fy],
                agencies: [filters.agency.code],
                files: [filters.file],
                rules: [...filters.rules]
            },
            page: this.state.page,
            limit: this.state.limit,
            sort: this.state.sort,
            order: this.state.order
        };

        DashboardHelper.fetchDashboardTableContents(searchParams)
            .then((res) => {
                this.parseRows(res.data);
            })
            .catch((err) => {
                console.error(err);
                this.setState({
                    inFlight: false,
                    hasError: true
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
            totalItems: data.page_metadata.total,
            inFlight: false,
            hasError: false
        });
    }

    render() {
        let pagination = null;
        if (!this.state.inFlight && !this.state.hasError) {
            pagination = (
                <Pagination
                    changePage={this.changePage}
                    totalItems={this.state.totalItems}
                    currentPage={this.state.page}
                    pageSize={this.state.limit}
                    limitSelector
                    changeLimit={this.changeLimit}
                    goToPage />);
        }
        return (
            <div className="dashboard-viz no-top-pad">
                <DashboardTable
                    results={this.state.results}
                    inFlight={this.state.inFlight}
                    hasError={this.state.hasError}
                    changeSort={this.changeSort}
                    currSort={this.state.sort}
                    currOrder={this.state.order}
                    downloadFile={this.downloadFile} />
                {pagination}
            </div>
        );
    }
}

DashboardTableContainer.propTypes = propTypes;
