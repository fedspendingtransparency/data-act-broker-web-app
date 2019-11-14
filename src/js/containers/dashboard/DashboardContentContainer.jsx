/**
 * DashboardContentContainer.jsx
 * Created by Alisa Burdeyny 11/7/19
 */

import React from 'react';
import { connect } from 'react-redux';
import ChooseFiltersMessage from 'components/dashboard/ChooseFiltersMessage';
import DashboardContent from 'components/dashboard/DashboardContent';

const DashboardContentContainer = (props) => {
    const dashboardContent = !props.appliedFilters._empty ?
        (
            <ChooseFiltersMessage />
        ) :
        (
            <DashboardContent appliedFilters={props.appliedFilters} />
        );

    return dashboardContent;
};

export default connect(
    (state) => ({
        appliedFilters: state.appliedDashboardFilters
    }),
)(DashboardContentContainer);
