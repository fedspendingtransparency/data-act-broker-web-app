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

function getFileLabel(selectedFile) {
    let file = '';
    if (selectedFile.substring(0, 5) === 'cross') {
        const sourceFile = selectedFile.charAt(6);
        const targetFile = selectedFile.substring(7);
        file = `Cross: ${sourceFile}/${targetFile}`;
    }
    else {
        file = `File ${selectedFile}`;
    }
    return file;
}

export default class DashboardSummaries extends React.Component {
    render() {
        // TODO: May need to update this when there are multiple agencies
        const file = getFileLabel(this.props.appliedFilters.filters.file);
        const summaries = [];
        this.props.results.forEach((result) => {
            summaries.push(
                <DashboardSummary key={result.agency_name} file={file} agency={result.agency_name} submissions={result.submissions} />
            );
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
