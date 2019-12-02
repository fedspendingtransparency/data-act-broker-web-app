/**
  * DashboardSummaries.jsx
  * Created by Daniel Boos 11/12/19
  */

import React from 'react';
import PropTypes from 'prop-types';
import { fileLabels } from 'dataMapping/dashboard/fileLabels';
import ErrorMessageOverlay from 'components/SharedComponents/ErrorMessageOverlay';
import LoadingMessage from 'components/SharedComponents/LoadingMessage';
import DashboardSummary from './DashboardSummary';

const propTypes = {
    appliedFilters: PropTypes.object.isRequired,
    results: PropTypes.array,
    inFlight: PropTypes.bool,
    hasFailed: PropTypes.bool
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
                    submissions={result.submissions}
                    inFlight={this.props.inFlight} />
            );
        });
        let summaryContent = summaries;
        if (this.props.inFlight){
            summaryContent = <LoadingMessage />;
        }
        else if (this.props.hasFailed){
            summaryContent = <ErrorMessageOverlay />;
        }

        return (
            <div className="dashboard-viz submission-info">
                <h3 className="dashboard-viz__heading">Submission Information</h3>
                <div>
                    {summaryContent}
                </div>
            </div>
        );
    }
}

DashboardSummaries.propTypes = propTypes;
