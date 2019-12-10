/**
 * DashboardTablePagination.jsx
 * Created by Alisa Burdeyny 11/15/19
 */

import React from 'react';
import PropTypes from 'prop-types';

import TablePaginator from 'components/SharedComponents/table/TablePaginator';
import TableLimit from 'components/SharedComponents/table/TableLimit';
import TableGoTo from 'components/SharedComponents/table/TableGoTo';

const propTypes = {
    totalPages: PropTypes.number,
    currentPage: PropTypes.number,
    pageLimit: PropTypes.number,
    changePage: PropTypes.func.isRequired,
    changeLimit: PropTypes.func.isRequired
};

const defaultProps = {
    totalPages: 1,
    currentPage: 1,
    pageLimit: 10
};

export default class DashboardTablePagination extends React.Component {
    render() {
        return (
            <div className="dashboard-table-pagination">
                <TablePaginator
                    current={this.props.currentPage}
                    total={this.props.totalPages}
                    changePage={this.props.changePage} />
                <TableLimit
                    changeLimit={this.props.changeLimit}
                    pageLimit={this.props.pageLimit} />
                <TableGoTo
                    changePage={this.props.changePage}
                    totalPages={this.props.totalPages} />
            </div>
        );
    }
}

DashboardTablePagination.defaultProps = defaultProps;
DashboardTablePagination.propTypes = propTypes;
