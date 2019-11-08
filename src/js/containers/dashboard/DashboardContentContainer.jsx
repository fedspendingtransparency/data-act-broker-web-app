/**
 * DashboardContentContainer.jsx
 * Created by Alisa Burdeyny 11/7/19
 */

import React from 'react';
import { connect } from 'react-redux';
import ChooseFiltersMessage from 'components/dashboard/ChooseFiltersMessage';

const DashboardContentContainer = (props) => {
    const dashboardContent = props.appliedFilters._empty ?
        (
            <ChooseFiltersMessage />
        ) :
        (
            <div>
                <h2>Historical Data Summary</h2>
                <hr />
            </div>
        );

    return dashboardContent;
};

export default connect(
    (state) => ({
        appliedFilters: state.appliedDashboardFilters
    }),
)(DashboardContentContainer);
