/**
  * DashboardSummary.jsx
  * Created by Daniel Boos 11/12/19
  */

import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import DashboardSummaryRow from './DashboardSummaryRow';

const propTypes = {
    results: PropTypes.array,
    appliedFilters: PropTypes.object.isRequired
};

export default class DashboardSummary extends React.Component {
    render() {
        // TODO: Pull from filter
        console.log(this.props.appliedFilters);
        const agency = 'Department of Justice';
        const file = 'File B'; // `File ${this.props.appliedFilters.file}`;

        const summaryRows = [];
        const { results } = this.props;
        let key = 0;
        results.forEach((result) => {
            const fy = `${result.fy}`.substring(2);
            const period = `FY ${fy}, Q${result.quarter}`;
            summaryRows.push(<DashboardSummaryRow
                key={key}
                file={file}
                period={period}
                subID={result.submission_id}
                submitter={result.certifier} />
            );
            key += 1;
        });
        return (
            <div>
                <h3>Submission Information</h3>
                <div className="dashboard-page__agency">
                    <span className="dashboard-page__agency-icon">
                        <FontAwesomeIcon icon="landmark" />
                    </span>
                    {agency}
                </div>
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
        );
    }
}

DashboardSummary.propTypes = propTypes;
