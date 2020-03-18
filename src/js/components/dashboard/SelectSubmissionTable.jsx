/**
 * SelectSubmissionTable.jsx
 * Created by Lizzie Salita 3/18/20
 */

import React from 'react';
import PropTypes from 'prop-types';

import { Pagination } from 'data-transparency-ui';
import { submissionPeriodString } from 'helpers/submissionPeriodHelper';
import DashboardTableHeader from 'components/dashboard/table/DashboardTableHeader';
import SelectSubmissionButton from './SelectSubmissionButton';

const propTypes = {
    results: PropTypes.array,
    setSort: PropTypes.func.isRequired,
    setOrder: PropTypes.func.isRequired,
    sort: PropTypes.string,
    order: PropTypes.string,
    clickedSubmission: PropTypes.func.isRequired,
    limit: PropTypes.number,
    page: PropTypes.number,
    changeLimit: PropTypes.func,
    changePage: PropTypes.func,
    totalItems: PropTypes.number
};

const defaultProps = {
    results: [],
    sort: 'time_period',
    order: 'desc'
};

const tableHeaders = [
    {
        text: 'Submission ID',
        sortType: 'submission_id'
    },
    {
        text: 'Time Period',
        sortType: 'reporting_start'
    },
    {
        text: 'Created By',
        sortType: 'submitted_by'
    },
    {
        text: 'Duration',
        sortType: 'quarterly_submission'
    },
    {
        text: 'Submission Period',
        sortType: 'reporting_end'
    }
];

export default class SelectSubmissionTable extends React.Component {
    constructor(props) {
        super(props);

        this.changeSort = this.changeSort.bind(this);
    }
    changeSort(sort, order) {
        this.props.setOrder(order);
        this.props.setSort(sort);
    }
    render() {
        const tableRows = this.props.results.map((submission) => (
            <tr key={`dashboard-table-row-${submission.submission_id}`}>
                <td>
                    <SelectSubmissionButton
                        clickedSubmission={this.props.clickedSubmission}
                        submissionID={`${submission.submission_id}`} />
                </td>
                <td>
                    {submission.time_period}
                </td>
                <td>
                    {/* TODO - test with null name */}
                    {submission.user.name}
                </td>
                <td>
                    {submission.quarterly_submission ? 'Quarterly' : 'Monthly'}
                </td>
                <td>
                    {submissionPeriodString(submission.reporting_end_date)}
                </td>
            </tr>
        ));
        return (
            <div className="dashboard-page__content">
                <div className="dashboard-viz select-submission-table">
                    <div className="dashboard-table">
                        <h2 className="dashboard-viz__heading">Dashboard Submission Selection</h2>
                        <hr />
                        <table>
                            <DashboardTableHeader
                                headers={tableHeaders}
                                changeSort={this.changeSort}
                                currSort={this.props.sort}
                                currOrder={this.props.order} />
                            <tbody>
                                {tableRows}
                            </tbody>
                        </table>
                        <Pagination
                            changePage={this.props.changePage}
                            totalItems={this.props.totalItems}
                            currentPage={this.props.page}
                            pageSize={this.props.limit}
                            changeLimit={this.props.changeLimit}
                            limitSelector />
                    </div>
                </div>
            </div>
        );
    }
}

SelectSubmissionTable.defaultProps = defaultProps;
SelectSubmissionTable.propTypes = propTypes;
