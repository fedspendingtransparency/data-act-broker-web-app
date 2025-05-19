/**
 * ActiveDashboardTableContainer.jsx
 * Created by Alisa Burdeyny 04/01/20
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { isEqual } from 'lodash';
import { Pagination } from 'data-transparency-ui';

import * as DashboardHelper from 'helpers/dashboardHelper';
import * as GenerateFilesHelper from 'helpers/generateFilesHelper';
import ActiveDashboardTable from 'components/dashboard/table/ActiveDashboardTable';
import ActiveDashboardTableModal from 'components/dashboard/table/ActiveDashboardTableModal';
import BaseActiveDashboardTableRow from 'models/dashboard/BaseActiveDashboardTableRow';

const propTypes = {
    appliedFilters: PropTypes.object,
    submissionID: PropTypes.string,
    errorLevel: PropTypes.oneOf(['error', 'warning'])
};

export class ActiveDashboardTableContainer extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            results: [],
            totalItems: 0,
            page: 1,
            limit: 10,
            inFlight: true,
            hasError: false,
            sort: 'significance',
            order: 'asc',
            showModal: false,
            modalData: {}
        };

        this.updateTable = this.updateTable.bind(this);
        this.changePage = this.changePage.bind(this);
        this.changeLimit = this.changeLimit.bind(this);
        this.parseRows = this.parseRows.bind(this);
        this.changeSort = this.changeSort.bind(this);
        this.openModal = this.openModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.downloadFile = this.downloadFile.bind(this);
    }

    componentDidMount() {
        this.updateTable();
    }

    componentDidUpdate(prevProps) {
        if (!isEqual(this.props, prevProps)) {
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

    openModal(data) {
        this.setState({
            showModal: true,
            modalData: data
        });
    }

    closeModal() {
        this.setState({
            showModal: false,
            modalData: {}
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
            inFlight: true,
            showModal: false,
            modalData: {}
        });
        const submissionId = parseInt(this.props.submissionID, 10);

        DashboardHelper.fetchActiveDashboardTableContents(submissionId, this.props.appliedFilters.file,
            this.props.errorLevel, this.state.page, this.state.limit, this.state.sort, this.state.order)
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
        const meta = data.page_metadata;
        data.results.forEach((item) => {
            const tableRow = Object.create(BaseActiveDashboardTableRow);
            tableRow.populate(item, meta);
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
        let modal = null;
        if (this.state.showModal) {
            modal = (
                <ActiveDashboardTableModal
                    downloadFile={this.downloadFile}
                    data={this.state.modalData}
                    closeModal={this.closeModal}
                    isOpen={this.state.showModal} />);
        }
        return (
            <div className="dashboard-viz">
                <ActiveDashboardTable
                    results={this.state.results}
                    inFlight={this.state.inFlight}
                    hasError={this.state.hasError}
                    changeSort={this.changeSort}
                    currSort={this.state.sort}
                    currOrder={this.state.order}
                    openModal={this.openModal}
                    errorLevel={this.props.errorLevel} />
                {pagination}
                {modal}
            </div>
        );
    }
}

ActiveDashboardTableContainer.propTypes = propTypes;

export default connect(
    (state) => ({
        appliedFilters: state.appliedDashboardFilters.filters.active
    })
)(ActiveDashboardTableContainer);
