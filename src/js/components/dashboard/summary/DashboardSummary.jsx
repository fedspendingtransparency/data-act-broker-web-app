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

export default class DashboardSummary extends React.Component {
    render() {
        const summaryRows = [];
        let key = 0;
        if (this.props.submissions.length === 0) {
            summaryRows.push(<DashboardSummaryRow key={key} />);
        }
        else {
            this.props.submissions.forEach((submission) => {
                let period = '';
                const fy = `${submission.fy}`.substring(2);
                period = `FY ${fy}, Q${submission.quarter}`;
                const subid = `${submission.submission_id}`;
                summaryRows.push(<DashboardSummaryRow
                    key={key}
                    file={this.props.file}
                    period={period}
                    subID={subid}
                    submitter={submission.certifier} />
                );
                key += 1;
            });
        }

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
