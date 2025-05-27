/**
 * ActiveDashboardOverview.jsx
 * Created by Alisa Burdeyny 3/17/2020
 */

import React from 'react';
import PropTypes from 'prop-types';
import { startCase } from 'lodash';

import { formatNumberWithPrecision } from 'helpers/moneyFormatter';
import ErrorMessageOverlay from 'components/SharedComponents/ErrorMessageOverlay';
import LoadingMessage from 'components/SharedComponents/LoadingMessage';

const propTypes = {
    submissionData: PropTypes.object,
    errorLevel: PropTypes.string,
    inFlight: PropTypes.bool,
    hasFailed: PropTypes.bool
};

export default class ActiveDashboardOverview extends React.Component {
    render() {
        let content = (
            <div>
                <h2>
                    {this.props.submissionData.icon_name ?
                        <img
                            src={require(`../../../graphics/agency/${this.props.submissionData.icon_name}`)}
                            alt={this.props.submissionData.agency_name} /> : ''}
                    {this.props.submissionData.agency_name || 'Submission Data' }
                </h2>
                <hr />
                <div className="submission-overview-details">
                    <h3>Submission Period</h3>
                    <div className="flex-wrapper">
                        <div className="overview-section">
                            <h4>Certification Due</h4>
                            {this.props.submissionData.certification_deadline || 'N/A' }
                        </div>
                        <div className="overview-section">
                            <h4>Days Left Until Certification</h4>
                            {this.props.submissionData.days_remaining || 'N/A' }
                        </div>
                        <div className="overview-section">
                            <h4>Reporting Period</h4>
                            {this.props.submissionData.reporting_period || 'N/A' }
                        </div>
                        <div className="overview-section">
                            <h4>Duration</h4>
                            {this.props.submissionData.duration || 'N/A' }
                        </div>
                    </div>
                    <h3>Submission Status ({this.props.errorLevel}s)</h3>
                    <div className="flex-wrapper">
                        <div className="overview-section">
                            <h4>Submission ID</h4>
                            {this.props.submissionData.submission_id || 'N/A' }
                        </div>
                        <div className="overview-section">
                            <h4>Validation Type</h4>
                            {this.props.submissionData.file || 'N/A' }
                        </div>
                        <div className="overview-section">
                            <h4>Number of Rules</h4>
                            {this.props.submissionData.number_of_rules || 'N/A' }
                        </div>
                        <div className="overview-section">
                            <h4>Total # of {startCase(this.props.errorLevel)}s</h4>
                            {(this.props.submissionData.total_instances &&
                                formatNumberWithPrecision(this.props.submissionData.total_instances, 0)) || 'N/A' }
                        </div>
                    </div>
                </div>
            </div>
        );
        if (this.props.inFlight) {
            content = <LoadingMessage />;
        }
        else if (this.props.hasFailed) {
            content = <ErrorMessageOverlay />;
        }
        return (
            <div className="dashboard-page__submission-overview">
                { content }
            </div>
        );
    }
}

ActiveDashboardOverview.propTypes = propTypes;
