/**
  * DashboardSummary.jsx
  * Created by Daniel Boos 11/12/19
  */

 import React from 'react';
 import PropTypes from 'prop-types';
 import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
 import DashboardSummaryRow from './DashboardSummaryRow';
 
 const propTypes = {
     appliedFilters: PropTypes.object.isRequired
 };
 
 export default class DashboardSummary extends React.Component {
     constructor(props) {
         super(props);
     }
     
     render() {
        // TODO: Fetch data from Container 
        const records = [
            {
                "file": "B",
                "fy": 2019,
                "quarter": 3,
                "submission_id": 3232,
                "certifier": "John Doe"
            },
            {
                "file": "B",
                "fy": 2013,
                "quarter": 4,
                "submission_id": 1232,
                "certifier": "Jane Doe"
            }
        ];
        const agency = 'Department of Justice';
        const summaryRows = [];
        records.forEach((record) => {
            const period = "FY" + ('' + record.fy).substring(2) + ", Q" + record.quarter;
            const file = "File " + record.file;
            summaryRows.push(<DashboardSummaryRow 
                file={file}
                period={period}
                subID={record.submission_id}
                submitter={record.certifier}
            />);
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
                        <tr className='dashboard-page__summary-table-row'>
                            <th className='row-4' scope='col'><FontAwesomeIcon icon='file-alt'/></th>
                            <th className='row-21' scope='col'>FILE(S)</th>
                            <th className='row-4'  scope='col'><FontAwesomeIcon icon='calendar-alt'/></th>
                            <th className='row-21' scope='col'>TIME PERIOD</th>
                            <th className='row-4'  scope='col'><FontAwesomeIcon icon='file-upload'/></th>
                            <th className='row-21' scope='col'>SUBMISSION ID</th>
                            <th className='row-4'  scope='col'><FontAwesomeIcon icon='user'/></th>
                            <th className='row-21' scope='col'>SUBMITTED BY</th>
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
 