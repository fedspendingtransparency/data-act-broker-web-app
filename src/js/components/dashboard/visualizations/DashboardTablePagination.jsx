/**
 * DashboardTablePagination.jsx
 * Created by Alisa Burdeyny 11/15/19
 */

import React from 'react';
import PropTypes from 'prop-types';

import TablePaginator from 'components/SharedComponents/table/TablePaginator';

const propTypes = {
    totalPages: PropTypes.number,
    currentPage: PropTypes.number,
    pageLimit: PropTypes.number
};

const defaultProps = {
    totalPages: 1,
    currentPage: 1,
    pageLimit: 10
};

export default class DashboardTablePagination extends React.Component {
    constructor(props) {
        super(props);

        this.changePage = this.changePage.bind(this);
    }

    changePage(newPage) {
        console.log(newPage);
    }
    render() {
        let paginator;

        if (this.props.totalPages > 1) {
            paginator = (<TablePaginator
                current={this.props.currentPage}
                total={this.props.totalPages}
                changePage={this.changePage} />);
        }
        return (
            <div className="dashboard-table-pagination">
                {paginator}
            </div>
        );
    }
}

DashboardTablePagination.defaultProps = defaultProps;
DashboardTablePagination.propTypes = propTypes;
