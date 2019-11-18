/**
  * DashboardSummary.jsx
  * Created by Daniel Boos 11/12/19
  */

import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import DashboardSummaryRow from './DashboardSummaryRow';

const propTypes = {
    file: PropTypes.string,
    agency: PropTypes.string,
    submissions: PropTypes.array
};

function getSummaryRows(submissions, file) {
    let summaryRows = [];
    if (submissions.length === 0) {
        summaryRows.push(<DashboardSummaryRow key={`dashboard-summary-row-na}`} />);
    }
    else {
        summaryRows = submissions.map(submission => <DashboardSummaryRow
            key={`dashboard-summary-row-${submission.submission_id.toString(10)}`}
            file={file}
            period={`FY ${submission.fy.toString(10).substring(2)}, Q${submission.quarter}`}
            subID={submission.submission_id.toString(10)}
            submitter={submission.certifier} />
        );
    }
    return summaryRows;
}

export default class DashboardSummary extends React.Component {
    render() {
        const summaryRows = getSummaryRows(this.props.submissions, this.props.file);

        return (
            <div>
                <div className="dashboard-page__agency">
                    <span className="dashboard-page__agency-icon">
                        <FontAwesomeIcon icon="landmark" />
                    </span>
                    {this.props.agency}
                </div>
                <div className="table-responsive">
                    <table className="dashboard-page__summary-table">
                        <thead>
                            <tr className="dashboard-page__summary-table-row">
                                <th className="row-20" scope="col"><div className="dashboard-page__summary-table-row-header"><FontAwesomeIcon icon="file-alt" />FILE(S)</div></th>
                                <th className="row-24" scope="col"><div className="dashboard-page__summary-table-row-header"><FontAwesomeIcon icon="calendar-alt" />TIME PERIOD</div></th>
                                <th className="row-25" scope="col"><div className="dashboard-page__summary-table-row-header"><FontAwesomeIcon icon="file-upload" />SUBMISSION ID</div></th>
                                <th className="row-31" scope="col"><div className="dashboard-page__summary-table-row-header"><FontAwesomeIcon icon="user" />SUBMITTED BY</div></th>
                            </tr>
                        </thead>
                        <tbody>
                            {summaryRows}
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
}

DashboardSummary.propTypes = propTypes;
