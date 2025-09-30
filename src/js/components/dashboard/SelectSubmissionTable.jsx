/**
 * SelectSubmissionTable.jsx
 * Created by Lizzie Salita 3/18/20
 */

import PropTypes from 'prop-types';

import { Pagination } from 'data-transparency-ui';
import { submissionPeriodString, formatMonthlyTimePeriod } from 'helpers/submissionPeriodHelper';
import DashboardTableHeader from 'components/dashboard/table/DashboardTableHeader';
import SelectSubmissionButton from './SelectSubmissionButton';

const propTypes = {
    results: PropTypes.array,
    changeSort: PropTypes.func,
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
    sort: 'reporting_start',
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

const SelectSubmissionTable = (props) => {
    const tableRows = props.results.map((submission) => (
        <tr key={`dashboard-table-row-${submission.submission_id}`}>
            <td>
                <SelectSubmissionButton
                    clickedSubmission={props.clickedSubmission}
                    submissionID={`${submission.submission_id}`} />
            </td>
            <td>
                {submission.quarterly_submission ?
                    submission.time_period : formatMonthlyTimePeriod(submission.time_period)}
            </td>
            <td>
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
                    <table className="broker-table">
                        <DashboardTableHeader
                            headers={tableHeaders}
                            changeSort={props.changeSort}
                            currSort={props.sort}
                            currOrder={props.order} />
                        <tbody className="broker-table__body">
                            {tableRows}
                        </tbody>
                    </table>
                    <Pagination
                        changePage={props.changePage}
                        totalItems={props.totalItems}
                        currentPage={props.page}
                        pageSize={props.limit}
                        changeLimit={props.changeLimit}
                        limitSelector />
                </div>
            </div>
        </div>
    );
};

SelectSubmissionTable.defaultProps = defaultProps;
SelectSubmissionTable.propTypes = propTypes;

export default SelectSubmissionTable;
