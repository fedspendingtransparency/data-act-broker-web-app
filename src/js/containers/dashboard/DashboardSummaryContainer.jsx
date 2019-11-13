/**
 * DashboardSummaryContainer.jsx
 * Created by Daniel Boos 11/13/19
 */

import React from 'react';
import { connect } from 'react-redux';
import DashboardSummary from 'components/dashboard/DashboardSummary';

const DashboardSummaryContainer = (props) => {
    return <DashboardSummary appliedFilters={props.appliedFilters} />;
};

export default connect(
    (state) => ({
        appliedFilters: state.appliedDashboardFilters
    }),
)(DashboardSummaryContainer);
