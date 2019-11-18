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
        summaryRows.push(<DashboardSummaryRow key={key} />);
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
                                <th className="row-8" scope="col"><FontAwesomeIcon icon="file-alt" /></th>
                                <th className="row-12" scope="col">FILE(S)</th>
                                <th className="row-8" scope="col"><FontAwesomeIcon icon="calendar-alt" /></th>
                                <th className="row-16" scope="col">TIME PERIOD</th>
                                <th className="row-8" scope="col"><FontAwesomeIcon icon="file-upload" /></th>
                                <th className="row-17" scope="col">SUBMISSION ID</th>
                                <th className="row-8" scope="col"><FontAwesomeIcon icon="user" /></th>
                                <th className="row-23" scope="col">SUBMITTED BY</th>
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
