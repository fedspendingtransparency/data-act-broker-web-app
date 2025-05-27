/**
 * ActiveDashboardOverviewContainer.jsx
 * Created by Alisa Burdeyny 4/17/2020
 */

import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { connect } from 'react-redux';

import * as DashboardHelper from 'helpers/dashboardHelper';
import ActiveDashboardOverview from 'components/dashboard/ActiveDashboardOverview';

const propTypes = {
    appliedFilters: PropTypes.object.isRequired,
    errorLevel: PropTypes.string,
    submissionID: PropTypes.string
};

export class ActiveDashboardOverviewContainer extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            submissionData: {},
            inFlight: false,
            hasFailed: false
        };

        this.getOverview = this.getOverview.bind(this);
    }

    componentDidMount() {
        this.getOverview();
    }

    componentDidUpdate(prevProps) {
        if (!_.isEqual(prevProps, this.props)) {
            this.getOverview();
        }
    }

    getOverview() {
        this.setState({
            inFlight: true
        });
        const submissionId = parseInt(this.props.submissionID, 10);
        const fileType = this.props.appliedFilters.file;
        const errorLevel = this.props.errorLevel;
        DashboardHelper.fetchActiveOverview(submissionId, fileType, errorLevel)
            .then((res) => {
                this.setState({
                    hasFailed: false,
                    submissionData: res.data,
                    inFlight: false
                });
            })
            .catch((err) => {
                console.error(err);
                this.setState({
                    hasFailed: true,
                    inFlight: false
                });
            });
    }

    render() {
        return (
            <ActiveDashboardOverview
                submissionData={this.state.submissionData}
                errorLevel={this.props.errorLevel}
                inFlight={this.state.inFlight}
                hasFailed={this.state.hasFailed} />
        );
    }
}

ActiveDashboardOverviewContainer.propTypes = propTypes;

export default connect(
    (state) => ({
        appliedFilters: state.appliedDashboardFilters.filters.active
    })
)(ActiveDashboardOverviewContainer);
