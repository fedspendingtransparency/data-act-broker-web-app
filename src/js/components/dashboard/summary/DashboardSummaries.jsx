/**
  * DashboardSummaries.jsx
  * Created by Daniel Boos 11/12/19
  */

import React from 'react';
import PropTypes from 'prop-types';
import DashboardSummary from './DashboardSummary';

const propTypes = {
    appliedFilters: PropTypes.object.isRequired,
    results: PropTypes.array
};

export default class DashboardSummaries extends React.Component {
    render() {
        // TODO: May need to update this when there are multiple agencies
        let file = '';
        const selectedFile = this.props.appliedFilters.filters.file;
        if (selectedFile.substring(0, 5) === 'cross') {
            const sourceFile = selectedFile.charAt(6);
            const targetFile = selectedFile.substring(7);
            file = `Cross: ${sourceFile}/${targetFile}`;
        }
        else {
            file = `File ${selectedFile}`;
        }

        const summaries = [];
        const { results } = this.props;
        let key = 0;
        const submissions = [
            {
                "submission_id": 104,
                "quarter": 4,
                "certifier": "Administrator",
                "fy": 2019
            },
            {
                "submission_id": 105,
                "quarter": 2,
                "certifier": "Administrator 2",
                "fy": 2014
            }
        ]
        results.forEach((result) => {
            summaries.push(
                <DashboardSummary key={key} file={file} agency={result.agency_name} submissions={submissions} />
            );
            key += 1;
        });

        return (
            <div>
                <h3>Submission Information</h3>
                <div>
                    {summaries}
                </div>
            </div>
        );
    }
}

DashboardSummaries.propTypes = propTypes;
