/**
 * SelectSubmissionTable.jsx
 * Created by Lizzie Salita 3/18/20
 */

import React from 'react';
import PropTypes from 'prop-types';

import DashboardTableHeader from 'components/dashboard/table/DashboardTableHeader';

const propTypes = {
    results: PropTypes.array,
    setSort: PropTypes.func.isRequired,
    setOrder: PropTypes.func.isRequired,
    sort: PropTypes.string,
    order: PropTypes.string,
    clickedSubmission: PropTypes.func.isRequired
};

const defaultProps = {
    results: [],
    sort: 'time_period',
    order: 'desc'
};

const tableHeaders = [
    {
        text: 'Submission ID',
        sortType: 'file'
    },
    {
        text: 'Time Period',
        sortType: 'period'
    },
    {
        text: 'Created By',
        sortType: 'created_by'
    },
    {
        text: 'Duration',
        sortType: 'duration'
    },
    {
        text: 'Submission Period',
        sortType: 'submission_period'
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
                    {/* TODO - make this a button */}
                    {submission.submission_id}
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
                    {/* TODO - write helper function */}
                    {submission.reporting_end_date}
                </td>
            </tr>
        ));
        return (
            <div className="dashboard-table">
                <h3 className="dashboard-viz__heading">Dashboard Submission Selection</h3>
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
            </div>
        );
    }
}

SelectSubmissionTable.defaultProps = defaultProps;
SelectSubmissionTable.propTypes = propTypes;
