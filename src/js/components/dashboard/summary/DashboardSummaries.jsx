/**
  * DashboardSummaries.jsx
  * Created by Daniel Boos 11/12/19
  */

import React from 'react';
import PropTypes from 'prop-types';
import { fileLabels } from 'dataMapping/dashboard/fileLabels';
import DashboardSummary from './DashboardSummary';

const propTypes = {
    appliedFilters: PropTypes.object.isRequired,
    results: PropTypes.array
};

export default class DashboardSummaries extends React.Component {
    render() {
        // TODO: May need to update this when there are multiple agencies
        const file = fileLabels[this.props.appliedFilters.filters.file];
        const summaries = [];
        this.props.results.forEach((result) => {
            summaries.push(
                <DashboardSummary
                    key={result.agency_name}
                    file={file}
                    agency={result.agency_name}
                    submissions={result.submissions} />
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
